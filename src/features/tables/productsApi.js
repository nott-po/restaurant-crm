import {createApi} from "@reduxjs/toolkit/query/react";
import {transformRecipeToProduct, transformRecipes} from "./recipeTransformers";
import {baseQueryWithRetry} from "../../shared/api/baseQuery";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Products", "Recipes"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({limit = 50, skip = 0} = {}) =>
        `/recipes?limit=${limit}&skip=${skip}`,
      transformResponse: (response) => ({
        products: transformRecipes(response.recipes),
        total: response.total,
      }),
      providesTags: ["Products"],
    }),

    getProductById: builder.query({
      query: (id) => `/recipes/${id}`,
      transformResponse: (response) => transformRecipeToProduct(response),
      providesTags: (result, error, id) => [{type: "Products", id}],
    }),

    getProductsByMealType: builder.query({
      query: (mealType) => `/recipes/meal-type/${mealType}`,
      transformResponse: (response) => ({
        products: transformRecipes(response.recipes),
        total: response.total,
      }),
      providesTags: ["Products"],
    }),

    getTags: builder.query({
      query: () => `/recipes/tags`,
    }),

    searchProducts: builder.query({
      query: (searchTerm) => `/recipes/search?q=${searchTerm}`,
      transformResponse: (response) => ({
        products: transformRecipes(response.recipes),
        total: response.total,
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByMealTypeQuery,
  useGetTagsQuery,
  useSearchProductsQuery,
} = productsApi;
