import { createSlice } from "@reduxjs/toolkit";
import { addBlog, deleteBlog, getBlog } from "../action/service.blog.action";


const initialState = {
    blogs: [],
    successMSG: null,
    errorMSG: null,
    bIsLoading: false,
    totalPages: 0,
    totalItems: 0,
    currentPage: 0
}

const service_blog_slice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        bClearState: state => {
            Object.assign(state, {
                errorMSG: null,
                successMSG: null
            });
        }
    },
    extraReducers: builder => {
        builder
            .addCase(addBlog.pending, (state) => {
                Object.assign(state, {
                    bIsLoading: true,
                    successMSG: null,
                    errorMSG: null,
                });
            })

            .addCase(addBlog.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    bIsLoading: false,
                    successMSG: payload.message,
                    errorMSG: null,
                });
            })

            .addCase(addBlog.rejected, (state, { payload }) => {
                Object.assign(state, {
                    bIsLoading: false,
                    successMSG: null,
                    errorMSG: payload.message || payload,
                })
            })

            .addCase(getBlog.pending, state => {
                Object.assign(state, {
                    bIsLoading: true,
                    successMSG: null,
                    errorMSG: null,
                });
            })

            .addCase(getBlog.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    bIsLoading: false,
                    successMSG: null,
                    errorMSG: null,
                    blogs: payload.data,
                    totalPages: payload.totalPages,
                    totalItems: payload.totalItems,
                    currentPage: payload.currentPage,
                })
            })

            .addCase(getBlog.rejected, (state, { payload }) => {
                Object.assign(state, {
                    bIsLoading: false,
                    successMSG: null,
                    errorMSG: payload.message || payload,
                })
            })

            .addCase(deleteBlog.pending, state => {
                Object.assign(state, {
                    bIsLoading: true,
                    successMSG: null,
                    errorMSG: null,
                })
            })

            .addCase(deleteBlog.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    bIsLoading: false,
                    successMSG: payload.message,
                    errorMSG: null,
                })
            })

            .addCase(deleteBlog.rejected, (state, { payload }) => {
                Object.assign(state, {
                    bIsLoading: false,
                    successMSG: null,
                    errorMSG: payload.message || payload,
                })
            })
    }
})
export const { bClearState } = service_blog_slice.actions;
export default service_blog_slice.reducer;