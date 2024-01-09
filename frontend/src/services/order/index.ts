// api.js
import { createApi } from "@reduxjs/toolkit/query/react";
import { authenticatedQuery } from "../apiUtils";
import {
    ICancelOrderParams,
  ICreateOrderParams,
  IOrderDataResult,
  IOrderDataListResult,
  IUpdateOrderParams,
} from "./types";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: authenticatedQuery(`${process.env.REACT_APP_API_URL}/order`),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      IOrderDataResult,
      ICreateOrderParams
    >({
      query: (data) => ({
        url: "/create-order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
    updateStatus: builder.mutation<
      IOrderDataResult,
      IUpdateOrderParams
    >({
      query: (input) => {
        // console.log('data', input.data);
        return {
          url: `/update-order/${input.id}`,
          method: "PUT",
          body: input.data,
        };
      },
      invalidatesTags: ["Order"],
    }),
    cancelOrder: builder.mutation<IOrderDataResult, ICancelOrderParams>({
      query: (input) => ({
        url: `/delete-order/${input.userId}`,
        method: "PUT",
        body: input.data
      }),
      invalidatesTags: ["Order"],
    }),
    
    getDetailsOrder: builder.query<IOrderDataResult, string>({
      query: (id) => ({
        url: `/get-details-order/${id}`,
        method: "GET",
      }),
    }),
    getAllUserOrders: builder.query<IOrderDataListResult, string>({
        query: (userId) => ({
          url: `/get-al-user-orders/${userId}`,
          method: "GET",
        }),
        providesTags: (result, error, arg) => {
          // console.log(result);
          return ["Order"];
        },
      }),
    getAllOrders: builder.query<IOrderDataListResult, void>({
      query: () => ({
        url: "/get-all-orders",
        method: "GET",
      }),
      providesTags: (result, error, arg) => {
        // console.log(result);
        return ["Order"];
      },
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useUpdateStatusMutation,
  useGetDetailsOrderQuery,
  useGetAllOrdersQuery,
} = orderApi;
