import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance/axiosInstance";
import { PERSONAL_API_KEY } from "../../config/configuration";

export const addProducts = createAsyncThunk("produt/addProduct", async ({ formData, accessToken }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/product/add', formData, {
            headers: {
                apiKey: PERSONAL_API_KEY,
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data"
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to add product')
    }

});


export const getProducts = createAsyncThunk("product/getProduct", async ({ accessToken, page, limit }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/product/get', {
            headers: {
                apiKey: PERSONAL_API_KEY,
                Authorization: `Bearer ${accessToken}`,
                page,
                limit,
                isadmin: true
            }
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch product')
    }
});

export const getSingleProduct = createAsyncThunk("product/getSingleProduct", async ({ accessToken, productid }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/product/get-single-product?productid=${productid}`, {
            headers: {
                apiKey: PERSONAL_API_KEY,
                Authorization: `Bearer ${accessToken}`,
            }
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch product')
    }
})


export const updateProduct = createAsyncThunk("product/updateProduct", async ({ formData, accessToken ,productid}, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`/product/update?item_id=${productid}`, formData, {
            headers: {
                apiKey: PERSONAL_API_KEY,
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data"
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update product')
    }
});