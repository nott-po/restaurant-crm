import {createApi} from "@reduxjs/toolkit/query/react";
import {AUTH_TOKEN_EXPIRES_MINUTES} from "../../shared/constants/appConstants";
import {authBaseQueryWithRetry} from "../../shared/api/baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: authBaseQueryWithRetry,
  tagTypes: ["User"],

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          username: credentials.username,
          password: credentials.password,
          expiresInMins: AUTH_TOKEN_EXPIRES_MINUTES,
        },
      }),
      transformResponse: (response) => {
        const {accessToken, refreshToken, ...userData} = response;

        return {
          user: userData,
          accessToken,
          refreshToken,
        };
      },
      providesTags: ["User"],
    }),
    getCurrentUser: builder.query({
      query: () => "/user/me",
      providesTags: ["User"],
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "/auth/refresh",
        method: "POST",
        body: {
          refreshToken,
          expiresInMins: AUTH_TOKEN_EXPIRES_MINUTES,
        },
      }),

      transformResponse: (response) => ({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      }),
    }),
    getUsers: builder.query({
      query: ({limit = 10, skip = 0} = {}) =>
        `/users?limit=${limit}&skip=${skip}`,

      keepUnusedDataFor: 60,

      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{type: "User", id}],
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
