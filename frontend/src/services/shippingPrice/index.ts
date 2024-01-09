// api.js
import { createApi } from "@reduxjs/toolkit/query/react";
import { authenticatedQuery } from "../apiUtils";
import {
  ICreateShippingPriceParams,
  IShippingPriceDataResult,
  IShippingPriceDataListResult,
  IUpdateShippingPriceParams,
} from "./types";
import { IDefaultResult } from "../types";

export const shippingPriceApi = createApi({
  reducerPath: "shippingPriceApi",
  baseQuery: authenticatedQuery(`${process.env.REACT_APP_API_URL}/shipping-price`),
  tagTypes: ["ShippingPrice"],
  endpoints: (builder) => ({
    createShippingPrice: builder.mutation<
      IShippingPriceDataResult,
      ICreateShippingPriceParams
    >({
      query: (data) => ({
        url: "/create-shipping-price",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ShippingPrice"],
    }),
    updateShippingPrice: builder.mutation<
      IShippingPriceDataResult,
      IUpdateShippingPriceParams
    >({
      query: (input) => {
        // console.log('data', input.data);
        return {
          url: `/update-shipping-price/${input.id}`,
          method: "PUT",
          body: input.data,
        };
      },
      invalidatesTags: ["ShippingPrice"],
    }),
    deleteShippingPrice: builder.mutation<IDefaultResult, string>({
      query: (id) => ({
        url: `/delete-shipping-price/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ShippingPrice"],
    }),
    deleteManyShippingPrices: builder.mutation<IDefaultResult, string[]>({
      query: (ids) => {
        // console.log(ids);
        return {
          url: "/delete-many-shipping-prices",
          method: "POST",
          body: ids,
        };
      },
      invalidatesTags: ["ShippingPrice"],
    }),
    getShippingPrice: builder.query<IShippingPriceDataResult, number>({
        query: (price) => ({
            url: `/get-shipping-price/${price}`,
            method: "GET",
        })
    }),
    getDetailsShippingPrice: builder.query<IShippingPriceDataResult, string>({
      query: (id) => ({
        url: `/get-details-shipping-price/${id}`,
        method: "GET",
      }),
    }),
    getAllShippingPrices: builder.query<IShippingPriceDataListResult, void>({
      query: () => ({
        url: "/get-all-shipping-prices",
        method: "GET",
      }),
      providesTags: (result, error, arg) => {
        // console.log(result);
        return ["ShippingPrice"];
      },
    }),
  }),
});

export const {
  useCreateShippingPriceMutation,
  useUpdateShippingPriceMutation,
  useDeleteShippingPriceMutation,
  useDeleteManyShippingPricesMutation,
  useGetDetailsShippingPriceQuery,
  useGetAllShippingPricesQuery,
} = shippingPriceApi;
