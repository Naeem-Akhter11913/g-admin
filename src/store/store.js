import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './reducers/uiSlice';
import authSlice from './reducers/authSlice';
import serviceSlice from './reducers/serviceSlice';

const store = configureStore({
    reducer: {
        ui: uiSlice,
        user: authSlice,
        products: serviceSlice
    }
});

export default store;