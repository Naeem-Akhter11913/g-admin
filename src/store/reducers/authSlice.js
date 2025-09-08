import { createSlice } from "@reduxjs/toolkit";
import {
    getAccessToken,
    loginUser,
    registerUser,
    userLogout,
} from "../action/authAction";

const initialState = {
    user: null,
    accessToken: null,
    loading: false,
    errorMessage: null,
    successMessage: null,
    isLoginSuccess: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearMessages: (state) => {
            state.errorMessage = null;
            state.successMessage = null;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        resetAuth: (state) => {
            state.user = null;
            state.accessToken = null;
            state.loading = false;
            state.errorMessage = null;
            state.successMessage = null;
            state.isLoginSuccess = false;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.errorMessage = null;
                state.successMessage = null;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload.user;
                state.accessToken = payload.accessToken;
                state.successMessage = payload.message;
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.errorMessage = payload;
            })

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.errorMessage = null;
                state.successMessage = null;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.accessToken = payload.accessToken;
                state.user = payload.user;
                state.successMessage = payload.message;
                state.errorMessage = null;
                state.isLoginSuccess = true;
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.errorMessage = payload;
            })

            .addCase(getAccessToken.pending, (state) => {
                state.loading = true;
                state.errorMessage = null;
                state.successMessage = null;
            })
            .addCase(getAccessToken.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.accessToken = payload.accessToken;
                state.user = payload.user;
                state.isLoginSuccess = true;
            })
            .addCase(getAccessToken.rejected, (state) => {
                state.loading = false;
                state.errorMessage = null;
            })

            .addCase(userLogout.pending, (state) => {
                state.loading = true;
                state.errorMessage = null;
                state.successMessage = null;
            })
            .addCase(userLogout.fulfilled, (state, { payload }) => {
                state.user = null;
                state.accessToken = null;
                state.loading = false;
                state.errorMessage = null;
                state.successMessage = payload.message;
            })
            .addCase(userLogout.rejected, (state, { payload }) => {
                state.loading = false;
                state.errorMessage = payload;
            });
    },
});

export const { clearMessages, setAccessToken, resetAuth } = authSlice.actions;
export default authSlice.reducer;
