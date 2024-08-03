/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["products", "queries"],
  endpoints: (builder) => ({
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
        return {
          url: `/product`,
          method: "GET",
          params: params,
        };
      },

      providesTags: ["products"],
    }),
    getQuery: builder.query({
      query: () => ({
        url: `/query`,
        method: "GET",
      }),
      providesTags: ["queries"],
    }),

    getSingleProduct: builder.query({
      query: (id) => {
        return {
          url: `/product/${id}`,
          method: "GET",
        };
      },
      providesTags: ["products"],
    }),

    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: "/create-payment-intent",
        method: "POST",
        body: data,
      }),
    }),

    addProduct: builder.mutation({
      query: (data) => {
        return {
          url: `/create-product`,
          method: "POST",
          body: data,
        };
      },
    }),
    submitOrder: builder.mutation({
      query: (data) => {
        return {
          url: "/submitOrder",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductQuery,
  useGetQueryQuery,
  useGetSingleProductQuery,
  useSubmitOrderMutation,
  useCreatePaymentIntentMutation,
} = baseApi;
