import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth?.token;

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            headers.set('content-type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['User', 'Auth', 'Product', 'Cart', 'Post', 'Todo'],
    endpoints: (builder) => ({
    // login
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
            transformResponse: (response) => {
                // separate tokens from usr data
                const { accessToken, refreshToken, ...userData } = response;
                return {
                    user: userData,
                    accessToken,
                    refreshToken,
                };
            },
            invalidatesTags: ['Auth', 'User'],
        }),
        // get curr user
        getCurrentUser: builder.query({
            query: () => '/user/me',
            providesTags: ['User'],
        }),
        // refresh token
        refreshToken: builder.mutation({
            query: (refreshToken) => ({
                url: '/auth/refresh',
                method: 'POST',
                body: { refreshToken, expiresInMins: 60 },
            }),
            transformResponse: (response) => ({
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
            }),
        }),
        // get all users
        getUsers: builder.query({
            query: ({ limit = 10, skip = 0, select } = {}) => {
                let url = `/users?limit=${limit}&skip=${skip}`;
                if (select) {
                    url += `&select=${select}`;
                }
                return url;
            },
            providesTags: ['User'],
            // Transform response to match your needs
            transformResponse: (response) => ({
                users: response.users || [],
                total: response.total || 0,
                skip: response.skip || 0,
                limit: response.limit || 10,
            }),
        }),
        // user by id
        getUserById: builder.query({
            query: (id) => `/users/${id}`,
            providesTags: (result, error, id) => [{ type: 'User', id }],
        }),
        // search
        searchUsers: builder.query({
            query: (searchTerm) => `/users/search?q=${encodeURIComponent(searchTerm)}`,
            providesTags: ['User'],
        }),
        /* PRODUCT ENDPOINTS FOR MENU*/
        getProducts: builder.query({
            query: ({ limit = 20, skip = 0, category, select } = {}) => {
                let url = `/products?limit=${limit}&skip=${skip}`;
                if (category) url += `&category=${category}`;
                if (select) url += `&select=${select}`;
                return url;
            },
            providesTags: ['Product'],
        }),
        // one prod
        getProductById: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
        // prod categories
        getProductCategories: builder.query({
            query: () => '/products/categories',
            providesTags: ['Product'],
        }),
        // search
        searchProducts: builder.query({
            query: (searchTerm) => `/products/search?q=${encodeURIComponent(searchTerm)}`,
            providesTags: ['Product'],
        }),
        // cart for orders
        getCarts: builder.query({
            query: ({ limit = 20, skip = 0 } = {}) => `/carts?limit=${limit}&skip=${skip}`,
            providesTags: ['Cart'],
        }),
        // one cart
        getCartById: builder.query({
            query: (id) => `/carts/${id}`,
            providesTags: (result, error, id) => [{ type: 'Cart', id }],
        }),
        // users cart
        getUserCarts: builder.query({
            query: (userId) => `/carts/user/${userId}`,
            providesTags: ['Cart'],
        }),
        // posts
        getPosts: builder.query({
            query: ({ limit = 10, skip = 0, select } = {}) => {
                let url = `/posts?limit=${limit}&skip=${skip}`;
                if (select) url += `&select=${select}`;
                return url;
            },
            providesTags: ['Post'],
        }),
        getPostById: builder.query({
            query: (id) => `/posts/${id}`,
            providesTags: (result, error, id) => [{ type: 'Post', id }],
        }),
        getUserPosts: builder.query({
            query: (userId) => `/posts/user/${userId}`,
            providesTags: ['Post'],
        }),
        // tasks
        getTodos: builder.query({
            query: ({ limit = 20, skip = 0 } = {}) => `/todos?limit=${limit}&skip=${skip}`,
            providesTags: ['Todo'],
        }),
        getTodoById: builder.query({
            query: (id) => `/todos/${id}`,
            providesTags: (result, error, id) => [{ type: 'Todo', id }],
        }),
        getUserTodos: builder.query({
            query: (userId) => `/todos/user/${userId}`,
            providesTags: ['Todo'],
        }),
        addTodo: builder.mutation({
            query: (todoData) => ({
                url: '/todos/add',
                method: 'POST',
                body: todoData,
            }),
            invalidatesTags: ['Todo'],
        }),
        updateTodo: builder.mutation({
            query: ({ id, ...todoData }) => ({
                url: `/todos/${id}`,
                method: 'PUT',
                body: todoData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Todo', id }],
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Todo', id }],
        }),
    }),
});

export const {
    // Auth
    useLoginMutation,
    useGetCurrentUserQuery,
    useRefreshTokenMutation,

    // User
    useGetUsersQuery,
    useGetUserByIdQuery,
    useSearchUsersQuery,

    // Product
    useGetProductsQuery,
    useGetProductByIdQuery,
    useGetProductCategoriesQuery,
    useSearchProductsQuery,

    // Cart
    useGetCartsQuery,
    useGetCartByIdQuery,
    useGetUserCartsQuery,

    // Post
    useGetPostsQuery,
    useGetPostByIdQuery,
    useGetUserPostsQuery,

    // Todo
    useGetTodosQuery,
    useGetTodoByIdQuery,
    useGetUserTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} = apiSlice;

