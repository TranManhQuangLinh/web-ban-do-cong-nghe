// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isJsonString } from "../utils";
import { jwtDecode } from "jwt-decode";
import * as UserService from "../services/UserService";
import { resetUser, updateUser } from "../redux/slices/UserSlice";
import { userBaseQuery } from "./apiUtils";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: userBaseQuery(`${process.env.REACT_APP_API_URL}/user`),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/sign-in",
        method: "POST",
        body: data,
      }),
    }),
    signUpUser: builder.mutation({
      query: (data) => ({
        url: "/sign-up",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({ url: "/log-out", method: "POST" }),
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: "/create-user",
        method: "POST",
        body: data,
      }),
    }),
    getDetailsUser: builder.query({
      query: (id) => ({
        url: `/get-details-user/${id}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: (id, data) => ({
        url: `/update-user/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/delete-user/${id}`,
        method: "DELETE",
      }),
    }),
    deleteManyUsers: builder.mutation({
      query: (data) => ({
        url: "/delete-many-users",
        method: "POST",
        body: data,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/get-all-users",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpUserMutation,
  useLogoutMutation,
  useCreateUserMutation,
  useGetDetailsUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useDeleteManyUsersMutation,
  useGetAllUsersQuery,
} = userApi;
