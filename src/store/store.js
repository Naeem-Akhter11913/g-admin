import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './reducers/uiSlice';
import authSlice from './reducers/authSlice';
import serviceSlice from './reducers/service.product.slice';
import serviceBlogSlice from './reducers/service.blog.slice';
import slideSlice from './reducers/admin.slider.slice'


const store = configureStore({
    reducer: {
        ui: uiSlice,
        user: authSlice,
        products: serviceSlice,
        blogs: serviceBlogSlice,
        sliders: slideSlice
    }
});

export default store;