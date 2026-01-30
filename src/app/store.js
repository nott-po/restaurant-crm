import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import authSlice from '../features/auth/authSlice';
import { authApi } from '../features/auth/authApi';

// redux store configuration
export const store = configureStore({
    reducer: {
        auth: authSlice, // auth state slice
        [authApi.reducerPath]: authApi.reducer, // rtk query state slice
        // uers, products, etc goes here
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // setup rtk for handling async requests
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }).concat(authApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})

setupListeners(store.dispatch);