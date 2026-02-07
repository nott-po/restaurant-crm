import {fetchBaseQuery, retry} from "@reduxjs/toolkit/query/react";
import {API_BASE_URL} from "../constants/appConstants";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
});

const authBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, {getState}) => {
    const token = getState().auth?.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("content-type", "application/json");
    return headers;
  },
});

export const baseQueryWithRetry = retry(baseQuery, {maxRetries: 3});
export const authBaseQueryWithRetry = retry(authBaseQuery, {maxRetries: 3});

export const getErrorMessage = (error) => {
  if (!error) return "An unknown error occurred";

  if (error.error === "FETCH_ERROR" || !error.status) {
    return "Network error. Please check your connection.";
  }

  const messages = {
    400: "Invalid request.",
    401: "Session expired. Please log in again.",
    403: "You do not have permission for this action.",
    404: "Resource not found.",
    429: "Too many requests. Please wait.",
    500: "Server error. Please try again later.",
  };

  return (
    error.data?.message || messages[error.status] || `Error: ${error.status}`
  );
};
