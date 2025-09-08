import { createSlice } from "@reduxjs/toolkit"
import { addSlider, deleteSlider, getSlider, updateSlider } from "../action/admin.slider.action"

const initialState = {
    slider: {},
    sliderPostLoading: false,
    sliderGetLoading: false,
    sliderUpdateLoading: false,
    sliderDeleteLoading: false,
    sliderErrorMSG: null,
    sliderSuccessMSG: null,
}

const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
        sliderClearState: (state) => {
            Object.assign(state, {
                sliderErrorMSG: null,
                sliderSuccessMSG: null,
            })
        },
    },

    extraReducers: builder => {
        builder
            .addCase(addSlider.pending, (state) => {
                Object.assign(state, {
                    sliderPostLoading: true,
                    sliderErrorMSG: null,
                    sliderSuccessMSG: null,
                })
            })
            .addCase(addSlider.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    sliderPostLoading: false,
                    sliderSuccessMSG: payload.message,
                })
            })
            .addCase(addSlider.rejected, (state, { payload }) => {
                Object.assign(state, {
                    sliderPostLoading: false,
                    sliderErrorMSG: payload.message || payload,
                })
            })

            .addCase(getSlider.pending, state => {
                Object.assign(state, {
                    sliderGetLoading: true,
                    sliderErrorMSG: null,
                    sliderSuccessMSG: null,
                })
            })
            .addCase(getSlider.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    sliderGetLoading: false,
                    sliderSuccessMSG: null,
                    slider: payload.sliderContent
                })
            })
            .addCase(getSlider.rejected, (state, { payload }) => {
                Object.assign(state, {
                    sliderGetLoading: false,
                    sliderErrorMSG: payload.message || payload,
                })
            })

            .addCase(updateSlider.pending, state => {
                Object.assign(state, {
                    sliderUpdateLoading: true,
                })
            })
            .addCase(updateSlider.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    sliderUpdateLoading: false,
                    sliderSuccessMSG: payload.message,
                })
            })
            .addCase(updateSlider.rejected, (state, { payload }) => {
                Object.assign(state, {
                    sliderUpdateLoading: false,
                    sliderErrorMSG: payload.message || payload,
                })
            })

            .addCase(deleteSlider.pending, state => {
                Object.assign(state, {
                    sliderDeleteLoading: true,
                })
            })
            .addCase(deleteSlider.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    sliderDeleteLoading: false,
                    sliderSuccessMSG: payload.message,
                })
            })
            .addCase(deleteSlider.rejected, (state, { payload }) => {
                Object.assign(state, {
                    sliderDeleteLoading: false,
                    sliderErrorMSG: payload.message || payload,
                })
            })
    }
});

export const { sliderClearState } = sliderSlice.actions;
export default sliderSlice.reducer;