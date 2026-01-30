import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './authApi';

const initialState = {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

// redux state managment for authentication
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.error = null;

            // clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
        },
        clearError: (state) => {
            state.error = null;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        restoreFromStorage: (state) => {
            const token = localStorage.getItem('token');
            const refreshToken = localStorage.getItem('refreshToken');
            const userData = localStorage.getItem('user');

            if (token && userData) {
                state.token = token;
                state.refreshToken = refreshToken;
                state.user = JSON.parse(userData);
                state.isAuthenticated = true;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.login.matchPending,
                (state) => {
                    state.isLoading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, action) => {
                    const { user, accessToken, refreshToken } = action.payload;

                    // upd Redux state
                    state.user = user;
                    state.token = accessToken;
                    state.refreshToken = refreshToken;
                    state.isAuthenticated = true;
                    state.isLoading = false;
                    state.error = null;

                    // persist to localStorage for page refreh
                    localStorage.setItem('token', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    localStorage.setItem('user', JSON.stringify(user));
                }
            )
            .addMatcher(
                authApi.endpoints.login.matchRejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.error.message || 'Login failed';
                    state.user = null;
                    state.token = null;
                    state.refreshToken = null;
                    state.isAuthenticated = false;
                }
            )
            .addMatcher(
                authApi.endpoints.refreshToken.matchFulfilled,
                (state, action) => {
                    const { accessToken, refreshToken } = action.payload;

                    // upd tokens
                    state.token = accessToken;
                    state.refreshToken = refreshToken;

                    // upd localStorage
                    localStorage.setItem('token', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                }
            )
            .addMatcher(
                authApi.endpoints.refreshToken.matchRejected,
                (state) => {
                    // refresh fail = logout user
                    state.user = null;
                    state.token = null;
                    state.refreshToken = null;
                    state.isAuthenticated = false;
                    state.error = 'Session expired. Please login again.';

                    // clear localStorage
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('user');
                }
            );
    },
});

export const {
    logout,
    clearError,
    setLoading,
    restoreFromStorage
} = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;