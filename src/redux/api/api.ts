/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base API configuration
export const baseApi = createApi({
  reducerPath: "baseApi", // The unique key that the API will be referenced by
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }), // Base URL for API requests
  tagTypes: ["products", "queries"], // Tags used for caching and invalidation
  endpoints: (builder) => ({
    // GET products with various filters
    getProduct: builder.query({
      query: ({
        category,
        brand,
        minPrice,
        maxPrice,
        rating,
        sort,
        searchTerm,
        limit,
      }) => {
        const params = new URLSearchParams();

        // Append filters to the URLSearchParams
        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }
        if (category) {
          params.append("category", category);
        }
        if (brand) {
          params.append("brand", brand);
        }
        if (minPrice !== undefined && minPrice > 0) {
          params.append("minPrice", minPrice.toString());
        }
        if (maxPrice !== undefined && maxPrice > 100) {
          params.append("maxPrice", maxPrice.toString());
        }
        if (rating !== undefined && rating > 0) {
          params.append("rating", rating.toString());
        }
        if (sort !== undefined) {
          params.append("sort", sort);
        }
        if (limit !== undefined) {
          params.append("limit", limit);
        }

        // Return the API request configuration
        return {
          url: `/product`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["products"], // Tag used for cache invalidation
    }),

    // GET all queries
    getQuery: builder.query({
      query: () => ({
        url: `/query`,
        method: "GET",
      }),
      providesTags: ["queries"], // Tag used for cache invalidation
    }),

    // GET a single product by ID
    getSingleProduct: builder.query({
      query: (id) => {
        return {
          url: `/product/${id}`,
          method: "GET",
        };
      },
      providesTags: ["products"], // Tag used for cache invalidation
    }),

    // Create a new payment intent
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: "/create-payment-intent",
        method: "POST",
        body: data,
      }),
    }),

    // Add a new product
    addProduct: builder.mutation({
      query: (data) => {
        return {
          url: `/create-product`,
          method: "POST",
          body: data,
        };
      },
    }),

    // Submit an order
    submitOrder: builder.mutation({
      query: (data) => {
        return {
          url: "/submitOrder",
          method: "POST",
          body: data,
        };
      },
    }),

    // Update an existing product by ID
    updateProduct: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/product/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["products"], // Invalidate the products cache to ensure data freshness
    }),

    // Delete a product by ID
    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/product/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["products"], // Invalidate the products cache to ensure data freshness
    }),
  }),
});

// Export hooks for API operations
export const {
  useAddProductMutation,
  useGetProductQuery,
  useGetQueryQuery,
  useGetSingleProductQuery,
  useSubmitOrderMutation,
  useCreatePaymentIntentMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = baseApi;
