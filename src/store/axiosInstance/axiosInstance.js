import axios from "axios";
import { BASE_URL, PERSONAL_API_KEY } from "../../config/configuration";
import { getAccessToken } from "../action/authAction";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

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

export default axiosInstance;
