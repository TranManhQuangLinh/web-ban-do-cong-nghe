// api.js
import { createApi } from "@reduxjs/toolkit/query/react";
import { userBaseQuery } from "../apiUtils";
import {
  CreateUpdateUserResult,
  CreateUserParams,
  DefaultResult,
  DeleteManyUsersParams,
  DeleteUserParams,
  GetAllUsersResult,
  GetDetailsUsersResult,
  LoginParams,
  LoginResult,
  SignUpParams,
  UpdateUserParams,
} from "./types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: userBaseQuery(`${process.env.REACT_APP_API_URL}/user`),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResult, LoginParams>({
      query: (data) => ({
        url: "/sign-in",
        method: "POST",
        body: data,
      }),
    }),
    signUp: builder.mutation<CreateUpdateUserResult, SignUpParams>({
      query: (data) => ({
        url: "/sign-up",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<DefaultResult, void>({
      query: () => ({ url: "/log-out", method: "POST" }),
    }),
    createUser: builder.mutation<CreateUpdateUserResult, CreateUserParams>({
      query: (data) => ({
        url: "/create-user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getDetailsUser: builder.query<GetDetailsUsersResult, string>({
      query: (id) => ({
        url: `/get-details-user/${id}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation<CreateUpdateUserResult, UpdateUserParams>({
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
    deleteUser: builder.mutation<DefaultResult, DeleteUserParams>({
      query: (id) => ({
        url: `/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    deleteManyUsers: builder.mutation<DefaultResult, DeleteManyUsersParams>({
      query: (data) => {
        // console.log(data);
        return {
          url: "/delete-many-users",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),
    getAllUsers: builder.query<GetAllUsersResult, void>({
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
  useGetDetailsUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useDeleteManyUsersMutation,
  useGetAllUsersQuery,
} = userApi;
