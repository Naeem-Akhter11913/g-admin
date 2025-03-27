import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance/axiosInstance";
import { PERSONAL_API_KEY } from "../../config/configuration";


export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {

    try {
        const response = await axiosInstance.post("/auth/register", userData, {
            headers: {
                apiKey: PERSONAL_API_KEY
            },
            
        });
        return response.data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(
            error.response?.data?.message || "Register failed. Please try again."
        )
    }
})

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/login', userData, {
                headers: {
                    apiKey: PERSONAL_API_KEY
                }
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed. Please try again."
            );
        }
    }
);

export const getAccessToken = createAsyncThunk("auth/refereceToken", async (userData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/auth/referesh-token', {
            headers: {
                apikey: PERSONAL_API_KEY
            },
        })
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Login failed. Please try again.")
    }
})

export const userLogout = createAsyncThunk('auth/logoutUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/auth/logout', {}, {
            headers: {
                apiKey: PERSONAL_API_KEY
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Login failed. Please try again.")
    }
})