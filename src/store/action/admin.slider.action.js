import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance/axiosInstance";
import { PERSONAL_API_KEY } from "../../config/configuration";


export const addSlider = createAsyncThunk('slider/addSlider', async ({ accessToken, formData }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/product/slider/add', formData, {
            headers: {
                apiKey: PERSONAL_API_KEY,
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data"
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Something went wrong!');
    }
});

export const getSlider = createAsyncThunk('slider/getSlider', async ({ accessToken }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/product/slider/get', {
            headers: {
                apiKey: PERSONAL_API_KEY,
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Something went wrong!');
    }
});

export const updateSlider = createAsyncThunk('slider/updateSlider', async ({ accessToken, id, formData }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`/slider/edit?sliderid=${id}`, formData, {
            headers: {
                apiKey: PERSONAL_API_KEY,
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data"
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Something went wrong!');
    }
});

export const deleteSlider = createAsyncThunk('/product/slider/deleteSlider', async ({ accessToken, id }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/slider/delete?sliderid=${id}`, {
            headers: {
                apiKey: PERSONAL_API_KEY,
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Something went wrong!');
    }
});