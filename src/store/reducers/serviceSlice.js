import { createSlice } from "@reduxjs/toolkit";
import { addProducts, getProducts } from "../action/serviceAction";


const initialState = {
    products: [],
    productSuccessMSG: null,
    productErrorMSG: null,
    pIsLoading: false,
}


const serviceSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        pClearState: state => {
            Object.assign(state, {
                productErrorMSG: null,
                productSuccessMSG: null
            });
        }
    },
    extraReducers: builder => {
        builder
            .addCase(addProducts.pending, (state) => {
                Object.assign(state, {
                    pIsLoading: true,
                    productSuccessMSG: null,
                    productErrorMSG: null,
                });
            })
            .addCase(addProducts.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    pIsLoading: false,
                    productSuccessMSG: payload.message,
                    productErrorMSG: null,
                });
            })
            .addCase(addProducts.rejected, (state, { payload }) => {
                Object.assign(state, {
                    pIsLoading: false,
                    productSuccessMSG: null,
                    productErrorMSG: payload.message || payload,
                })
            })
            .addCase(getProducts.pending, state => {
                Object.assign(state, {
                    pIsLoading: true,
                    productSuccessMSG: null,
                    productErrorMSG: null,
                });
            })
            .addCase(getProducts.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    pIsLoading: false,
                    productSuccessMSG: null,
                    productErrorMSG: null,
                    products: payload.products
                })
            })
            .addCase(getProducts.rejected, (state, { payload }) => {
                Object.assign(state, {
                    pIsLoading: false,
                    productSuccessMSG: null,
                    productErrorMSG: null,
                })
            })
    }
});

export const { pClearState } = serviceSlice.actions;
export default serviceSlice.reducer;