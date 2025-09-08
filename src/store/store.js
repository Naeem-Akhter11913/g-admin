import { configureStore } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import uiSlice from './reducers/uiSlice';
import authSlice from './reducers/authSlice';
import serviceSlice from './reducers/service.product.slice';
import serviceBlogSlice from './reducers/service.blog.slice';
import slideSlice from './reducers/admin.slider.slice'


const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
  reducer: {
    ui: uiSlice,
    // user: authSlice,
    user: persistedAuthReducer,
    products: serviceSlice,
    blogs: serviceBlogSlice,
    sliders: slideSlice
  }
});

export const persistor = persistStore(store);

export default store;