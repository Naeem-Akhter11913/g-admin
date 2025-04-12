import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance/axiosInstance";
import { PERSONAL_API_KEY } from "../../config/configuration";



export const addSlider = createAsyncThunk('slider/add', async ({ accessToken, formData }, { rejectWithValue }) => {
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
        return rejectWithValue(error.response?.data?.message || 'Failed to upload slider')
    }
});

export const getSlider = createAsyncThunk('slider/get', async ({ accessToken, id }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/product/slider/get', {}, {
            headers: {
                apiKey: PERSONAL_API_KEY,
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch slider')
    }
});


export const updateSlider = createAsyncThunk('slider/update', async ({ id }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put('/product/slider/get', null, {
            headers: {
                apiKey: PERSONAL_API_KEY,
                Authorization: `Bearer ${accessToken}`,
            }
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to update slider")
    }
});

export const deleteSlider = createAsyncThunk('slider/delete', async ({ id }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/product/slider/delete?sliderId=${id}`, null, {
            headers: {
                apiKey: PERSONAL_API_KEY,
                Authorization: `Bearer ${accessToken}`,
            }
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to delete slider")
    }
})