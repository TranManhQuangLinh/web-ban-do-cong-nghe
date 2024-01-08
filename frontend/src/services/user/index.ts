// api.js
import { createApi } from "@reduxjs/toolkit/query/react";
import { authenticatedQuery } from "../apiUtils";
import {
  ICreateUpdateUserResult,
  ICreateUserParams,
  IGetAllUsersResult,
  IGetDetailsUserResult,
  ILoginParams,
  ILoginResult,
  ISignUpParams,
  IUpdateUserParams,
} from "./types";
import { IDefaultResult } from "../types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: authenticatedQuery(`${process.env.REACT_APP_API_URL}/user`),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResult, ILoginParams>({
      query: (data) => ({
        url: "/sign-in",
        method: "POST",
        body: data,
      }),
    }),
    signUp: builder.mutation<ICreateUpdateUserResult, ISignUpParams>({
      query: (data) => ({
        url: "/sign-up",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<IDefaultResult, void>({
      query: () => ({ url: "/log-out", method: "POST" }),
    }),
    createUser: builder.mutation<ICreateUpdateUserResult, ICreateUserParams>({
      query: (data) => ({
        url: "/create-user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation<ICreateUpdateUserResult, IUpdateUserParams>({
      query: (input) => {
        // console.log('data', input.data);
        return {
          url: `/update-user/${input.id}`,
          method: "PUT",
          body: input.data,
        };
      },
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<IDefaultResult, string>({
      query: (id) => ({
        url: `/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    deleteManyUsers: builder.mutation<IDefaultResult, string[]>({
      query: (ids) => {
        // console.log(input);
        return {
          url: "/delete-many-users",
          method: "POST",
          body: ids,
        };
      },
      invalidatesTags: ["User"],
    }),
    getDetailsUser: builder.query<IGetDetailsUserResult, string>({
      query: (id) => ({
        url: `/get-details-user/${id}`,
        method: "GET",
      }),
    }),
    getAllUsers: builder.query<IGetAllUsersResult, void>({
      query: () => ({
        url: "/get-all-users",
        method: "GET",
      }),
      providesTags: (result, error, arg) => {
        // console.log(result);
        return ["User"];
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useLogoutMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useDeleteManyUsersMutation,
  useGetDetailsUserQuery,
  useGetAllUsersQuery,
} = userApi;
