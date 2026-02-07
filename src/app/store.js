import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import authSlice from "../features/auth/authSlice";
import {authApi} from "../features/auth/authApi";
import {productsApi} from "../features/tables/productsApi";
import {branchesApi} from "../features/branches/branchesApi";
import tablesSlice from "../features/tables/tablesSlice";

// redux store configuration
export const store = configureStore({
  reducer: {
    auth: authSlice,
    tables: tablesSlice,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [branchesApi.reducerPath]: branchesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // setup rtk for handling async requests
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(
      authApi.middleware,
      productsApi.middleware,
      branchesApi.middleware,
    ),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);
