import { createSlice } from "@reduxjs/toolkit";
import { getAccessToken, loginUser, registerUser, userLogout } from "../action/authAction";

const initialState = {
    user: null,
    accessToken: null,
    loading: false,
    errorMessage: null,
    successMessage: null,
    isLoginSuccess:false
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearMessages: (state) => {
            Object.assign(state, {
                errorMessage: null,
                successMessage: null,
            });
        },
    },

    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, state => {
                Object.assign(state, {
                    loading: true,
                    errorMessage: null,
                    successMessage: null
                });
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    loading: false,
                    user: payload.user,
                    accessToken: payload.accessToken,
                    successMessage: payload.message,
                });
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                Object.assign(state, { loading: false, errorMessage: payload });
            })

            // for user login
            .addCase(loginUser.pending, state => {
                Object.assign(state, {
                    loading: true,
                    errorMessage: null,
                    successMessage: null
                });
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    loading: false,
                    accessToken: payload.accessToken,
                    user: payload.user,
                    successMessage: payload.message,
                    errorMessage:null,
                    isLoginSuccess:true
                });
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                Object.assign(state, { loading: false, errorMessage: payload })
            })

            // generate access token

            .addCase(getAccessToken.pending, state => {
                Object.assign(state, {
                    loading: true,
                    errorMessage: null,
                    successMessage: null
                });
            })
            .addCase(getAccessToken.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    loading: false,
                    accessToken: payload.accessToken,
                    user: payload.user,
                    isLoginSuccess:true
                });
            })
            .addCase(getAccessToken.rejected, (state, { payload }) => {
                Object.assign(state, { loading: false, errorMessage: null })
            })

            // logout user
            .addCase(userLogout.pending, state => {
                Object.assign(state, {
                    loading: true,
                    errorMessage: null,
                    successMessage: null
                });
            })
            .addCase(userLogout.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    user: null,
                    accessToken: null,
                    loading: false,
                    errorMessage: null,
                    successMessage: payload.message,
                });
            })
            .addCase(userLogout.rejected, (state, { payload }) => {
                Object.assign(state, { loading: false, errorMessage: payload })
            })
    }
})

export const { clearMessages } = authSlice.actions;

export default authSlice.reducer;