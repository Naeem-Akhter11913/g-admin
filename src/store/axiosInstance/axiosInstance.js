// import axios from "axios";
import { BASE_URL, PERSONAL_API_KEY } from "../../config/configuration";
import { getAccessToken } from "../action/authAction";







// axiosInstance.ts
import axios from "axios";
import { setAccessToken } from "../reducers/authSlice";
import store from '../store';
console.log(BASE_URL)
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 🔑 send refreshToken cookie automatically
});

// Flag to prevent multiple refresh calls at the same time
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// 🔑 Interceptor for handling expired tokens
axiosInstance.interceptors.response.use(
  (response) => response, // success → just return
  async (error) => {
    const originalRequest = error.config;

    // If request failed because of 401 (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Wait until refresh is done
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axiosInstance.get("/auth/refresh-token", {
          headers: {
            apikey: process.env.REACT_APP_PERSONAL_API_KEY, // if you need it
          },
        });

        const newAccessToken = res.data.accessToken;

        // Save new accessToken (e.g., Redux)
        store.dispatch(setAccessToken(newAccessToken));

        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        store.dispatch(logout());
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;






// const axiosInstance = axios.create({
//     baseURL: BASE_URL,
//     withCredentials: true,
// });

// // Function to get updated access token
// // const refreshAccessToken = async (updateToken) => {
// //     try {
// //         const response = await axios.post(`${BASE_URL}/auth/refresh`, {}, {
// //             withCredentials: true,
// //             headers: {
// //                 api_key: PERSONAL_API_KEY
// //             }
// //         });

// //         const newToken = response.data.accessToken;
// //         updateToken(newToken); // Update token in Redux or Context
// //         return newToken;
// //     } catch (error) {
// //         console.error("Token refresh failed:", error);
// //         return null;
// //     }
// // };

// // Request Interceptor (Pass Token from Function)
// // export const attachToken = (token) => {
// axiosInstance.interceptors.request.use(
//     async config => {
//         // if (token) {
//         //     config.headers.Authorization = `Bearer ${token}`;
//         // }
//         return config;
//     },
//     error => Promise.reject(error)
// );
// // };

// // Response Interceptor (Handle Token Expiry)
// // export const handleTokenRefresh = (updateToken, logout) => {
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             // const newToken = await refreshAccessToken(updateToken);
//             const data = await getAccessToken();
//             const { accessToken } = data;
//             if (accessToken) {
//                 originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//                 return axiosInstance(originalRequest);
//             } else {
//                 // logout(); // If refresh fails, log out user
//                 console.log("call the logout function logout")
//             }
//         }

//         return Promise.reject(error);
//     }
// );
// // };

