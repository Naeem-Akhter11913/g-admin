import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance/axiosInstance";
import { PERSONAL_API_KEY } from "../../config/configuration";

export const addBlog = createAsyncThunk('blog/addBlog', async ({ formData, accessToken }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/product/blog/add', formData, {
            headers: {
                apiKey: PERSONAL_API_KEY,
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data"
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to add blog')
    }
});

export const getBlog = createAsyncThunk('blog/getBlog', async ({ accessToken, page, limit }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/product/blog/get?page=${page}&pageSize=${limit}`, {
            headers: {
                apiKey: PERSONAL_API_KEY,
                Authorization: `Bearer ${accessToken}`,
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch blog')
    }
});


export const deleteBlog = createAsyncThunk("blog/deleteBlog", async ({ accessToken, id }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/product/blog/delete/?blogId=${id}`, {
            headers: {
                apiKey: PERSONAL_API_KEY,
                Authorization: `Bearer ${accessToken}`,
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to delete blog')
    }
})


export const getSignleBlog = createAsyncThunk('blog/getSingleBlog', async ({ accessToken, id }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/product/blog/get-single-blog?blogid=${id}`, {
            headers: {
                apiKey: PERSONAL_API_KEY,
                Authorization: `Bearer ${accessToken}`,
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch blog')
    }
});

export const updateBlog = createAsyncThunk('blog/updateBlog', async ({ accessToken, formData, blogid }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`/product/blog/update?blogId=${blogid}`,formData, {
            headers: {
                apiKey: PERSONAL_API_KEY,
                Authorization: `Bearer ${accessToken}`,
            }
        });
        return response.data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response?.data?.message || 'Failed to update blog')
    }
})