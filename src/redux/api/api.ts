/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["products", "queries"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ category, brand, minPrice, maxPrice, rating }) => {
        const params = new URLSearchParams();
        if (category) {
          params.append("category", category);
        }
        if (brand) {
          params.append("brand", brand);
        }
        if (minPrice !== undefined) {
          params.append("minPrice", minPrice.toString());
        }
        if (maxPrice !== undefined) {
          params.append("maxPrice", maxPrice.toString());
        }
        if (rating !== undefined) {
          params.append("rating", rating.toString());
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

    addProduct: builder.mutation({
      query: (data) => {
        return {
          url: `/create-product`,
          method: "POST",
          body: data,
        };
      },
    }),

    // getMovieReviews: builder.query({
    //   query: (slug) => ({
    //     url: `/movies/${slug}/reviews`,
    //     method: "GET",
    //   }),
    // }),

    // getMovieDetailsAndReviews: builder.query({
    //   queryFn: async (slug: string): Promise<any> => {
    //     try {
    //       const [movieResponse, reviewsResponse] = await Promise.all([
    //         fetch(`http://localhost:5000/api/movies/${slug}`),
    //         fetch(`http://localhost:5000/api/movies/${slug}/reviews`),
    //       ]);

    //       if (!movieResponse.ok || !reviewsResponse.ok) {
    //         throw new Error("Network response was not ok.");
    //       }
    //       const [movieData, reviewsData] = await Promise.all([
    //         movieResponse.json(),
    //         reviewsResponse.json(),
    //       ]);

    //       // Combine results
    //       return {
    //         data: {
    //           movie: movieData,
    //           reviews: reviewsData,
    //         },
    //       };
    //     } catch (error) {
    //       return error;
    //     }
    //   },
    // }),
  }),
});

export const { useAddProductMutation, useGetProductQuery, useGetQueryQuery } =
  baseApi;
