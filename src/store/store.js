import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './reducers/uiSlice';
import authSlice from './reducers/authSlice';
import serviceSlice from './reducers/service.product.slice';
import serviceBlogSlice from './reducers/service.blog.slice';
import slideSlider from './reducers/service.slider.slice'

const store = configureStore({
    reducer: {
        ui: uiSlice,
        user: authSlice,
        products: serviceSlice,
        blogs: serviceBlogSlice,
        slider: slideSlider
    }
});

export default store;