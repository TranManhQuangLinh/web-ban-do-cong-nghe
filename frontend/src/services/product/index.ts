import { IGetAllProductsParams } from "./types";
// api.js
import { createApi } from "@reduxjs/toolkit/query/react";
import { authenticatedQuery } from "../apiUtils";
import {
  ICreateProductParams,
  ICreateUpdateProductResult,
  IGetAllProductsResult,
  IGetDetailsProductResult,
  IUpdateProductParams,
} from "./types";
import { IDefaultResult } from "../types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: authenticatedQuery(`${process.env.REACT_APP_API_URL}/product`),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    createProduct: builder.mutation<
      ICreateUpdateProductResult,
      ICreateProductParams
    >({
      query: (data) => ({
        url: "/create-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<
      ICreateUpdateProductResult,
      IUpdateProductParams
    >({
      query: (input) => {
        // console.log('data', input.data);
        return {
          url: `/update-product/${input.id}`,
          method: "PUT",
          body: input.data,
        };
      },
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<IDefaultResult, string>({
      query: (id) => ({
        url: `/delete-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    deleteManyProducts: builder.mutation<IDefaultResult, string[]>({
      query: (ids) => {
        // console.log(ids);
        return {
          url: "/delete-many-products",
          method: "POST",
          body: ids,
        };
      },
      invalidatesTags: ["Product"],
    }),
    getDetailsProduct: builder.query<IGetDetailsProductResult, string>({
      query: (id) => ({
        url: `/get-details-product/${id}`,
        method: "GET",
      }),
    }),
    getAllProducts: builder.query<IGetAllProductsResult, IGetAllProductsParams>(
      {
        query: (input) => {
            return {
                url: `/get-all-products`,
                method: "GET",
                params  : {
                    filter :input.search,
                    limit: input.limit
                }
              };
        },
        providesTags: (result, error, arg) => {
          // console.log(result);
          return ["Product"];
        },
      }
    ),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useDeleteManyProductsMutation,
  useGetDetailsProductQuery,
  useGetAllProductsQuery,
} = productApi;
