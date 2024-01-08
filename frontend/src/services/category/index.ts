// api.js
import { createApi } from "@reduxjs/toolkit/query/react";
import { authenticatedQuery } from "../apiUtils";
import {
  ICreateCategoryParams,
  ICreateUpdateCategoryResult,
  IGetAllCategoriesResult,
  IGetDetailsCategoryResult,
  IUpdateCategoryParams,
} from "./types";
import { IDefaultResult } from "../types";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: authenticatedQuery(`${process.env.REACT_APP_API_URL}/category`),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    createCategory: builder.mutation<
      ICreateUpdateCategoryResult,
      ICreateCategoryParams
    >({
      query: (data) => ({
        url: "/create-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation<
      ICreateUpdateCategoryResult,
      IUpdateCategoryParams
    >({
      query: (input) => {
        // console.log('data', input.data);
        return {
          url: `/update-category/${input.id}`,
          method: "PUT",
          body: input.data,
        };
      },
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<IDefaultResult, string>({
      query: (id) => ({
        url: `/delete-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    deleteManyCategories: builder.mutation<IDefaultResult, string[]>({
      query: (ids) => {
        // console.log(ids);
        return {
          url: "/delete-many-categories",
          method: "POST",
          body: ids,
        };
      },
      invalidatesTags: ["Category"],
    }),
    getDetailsCategory: builder.query<IGetDetailsCategoryResult, string>({
      query: (id) => ({
        url: `/get-details-category/${id}`,
        method: "GET",
      }),
    }),
    getAllCategories: builder.query<IGetAllCategoriesResult, void>({
      query: () => ({
        url: "/get-all-categories",
        method: "GET",
      }),
      providesTags: (result, error, arg) => {
        // console.log(result);
        return ["Category"];
      },
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useDeleteManyCategoriesMutation,
  useGetDetailsCategoryQuery,
  useGetAllCategoriesQuery,
} = categoryApi;
