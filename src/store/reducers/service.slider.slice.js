import { createSlice } from "@reduxjs/toolkit"
import { addSlider, deleteSlider, getSlider, updateSlider } from "../action/service.slider.action";



const initialState = {
    slider: {},
    sliderSuccMSG: null,
    sliderErrorMSG: null,
    sliderLoading: false,
}

const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
        clearSliderState: state => {
            Object.assign(state, {
                sliderSuccMSG: null,
                sliderErrorMSG: null,
                sliderLoading: false,
            })
        }
    },

    extraReducers: builder => {
        builder
            .addCase(addSlider.pending, state => {
                Object.assign(state, {
                    sliderLoading: true,
                })
            })
            .addCase(addSlider.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    sliderSuccMSG: payload.message,
                    sliderLoading: false,
                })
            })
            .addCase(addSlider.rejected, (state, { payload }) => {
                Object.assign(state, {
                    sliderErrorMSG: payload.message || payload,
                    sliderLoading: false,
                })
            })

            .addCase(getSlider.pending, state => {
                Object.assign(state, {
                    sliderLoading: true,
                })
            })

            .addCase(getSlider.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    slider: payload.sliderContent,
                })
            })

            .addCase(getSlider.rejected, (state, { payload }) => {
                Object.assign(state, {
                    sliderErrorMSG: payload.message || payload,
                    sliderLoading: false,
                })
            })
            .addCase(updateSlider.pending, state => {
                Object.assign(state, {
                    sliderLoading: true,
                })
            })

            .addCase(updateSlider.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    slider: payload.sliderContent,
                })
            })

            .addCase(updateSlider.rejected, (state, { payload }) => {
                Object.assign(state, {
                    sliderErrorMSG: payload.message || payload,
                    sliderLoading: false,
                })
            })

            .addCase(deleteSlider.pending, state => {
                Object.assign(state, {
                    sliderLoading: true,
                })
            })

            .addCase(deleteSlider.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    sliderSuccMSG: payload.message,
                })
            })

            .addCase(deleteSlider.rejected, (state, { payload }) => {
                Object.assign(state, {
                    sliderErrorMSG: payload.message || payload,
                    sliderLoading: false,
                })
            })
    }
});
export const { clearSliderState } = sliderSlice.actions;
export default sliderSlice.reducer 