import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com',

        // add auth token to requests automat
        prepareHeaders: (headers, { getState }) => {
            // get token from Redux state
            const token = getState().auth.token;
            // add token to headers
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            headers.set('content-type', 'application/json');
            return headers;
        },
    }),

    tagTypes: ['User'],

    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: {
                    username: credentials.username,
                    password: credentials.password,
                    expiresInMins: 60,
                },
            }),
            // clean up the response data before storing in cache
            transformResponse: (response) => {
                // Separate tokens from user data
                const { accessToken, refreshToken, ...userData } = response;

                return {
                    user: userData,
                    accessToken,
                    refreshToken,
                };
            },
            providesTags: ['User'],
        }),
        // fetch current authenticated user data
        getCurrentUser: builder.query({
            query: () => '/user/me',
            providesTags: ['User'],
        }),
        //  get new access token with refresh token
        refreshToken: builder.mutation({
            query: (refreshToken) => ({
                url: '/auth/refresh',
                method: 'POST',
                body: {
                    refreshToken,
                    expiresInMins: 60,
                },
            }),

            transformResponse: (response) => ({
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
            }),
        }),
        // get all users
        getUsers: builder.query({
            query: ({ limit = 10, skip = 0 } = {}) =>
                `/users?limit=${limit}&skip=${skip}`,

            // Cache for 60 seconds
            keepUnusedDataFor: 60,

            providesTags: ['User'],
        }),
        // get single user
        getUserById: builder.query({
            query: (id) => `/users/${id}`,
            providesTags: (result, error, id) => [{ type: 'User', id }],
        }),
    }),
});

export const {
    useLoginMutation,
    useGetCurrentUserQuery,
    useRefreshTokenMutation,
    useGetUsersQuery,
    useGetUserByIdQuery,
} = authApi;
