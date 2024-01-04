// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
      invalidatesTags: ["User"],
    }),
    getDetailsUser: builder.query({
      query: (id) => ({
        url: `/get-details-user/${id}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: (input) => {
        // console.log('data', input.data);
        return ({
        url: `/update-user/${input.id}`,
        method: "PUT",
        body: input.data,
      })},
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    deleteManyUsers: builder.mutation({
      query: (data) => {
        console.log(data);
        return ({
        url: "/delete-many-users",
        method: "POST",
        body: data,
      })},
      invalidatesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/get-all-users",
        method: "GET",
      }),
      providesTags: (result, error, arg) => {
        // console.log(result);
        return result
          ? [...result?.data?.map(({ _id }) => ({ type: "User", _id })), "User"]
          : ["User"];
      },
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
