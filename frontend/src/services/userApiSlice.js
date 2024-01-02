// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import store from "../redux/store";
import { resetUser } from "../redux/slices/UserSlice";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/user`,
    prepareHeaders: (headers, { getState }) => {
      // const currentTime = new Date();
      // const { decoded } = handleDecoded(); // Ensure you have the handleDecoded function defined
      // let storageRefreshToken = localStorage.getItem("refresh_token");
      // const refreshToken = JSON.parse(storageRefreshToken);

      // if (refreshToken) {
      //   const decodedRefreshToken = jwtDecode(refreshToken);
      //   if (decoded?.exp < currentTime.getTime() / 1000) {
      //     if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
      //       // Use RTK Query to refresh the token
      //       const { data } = useRefreshTokenMutation(refreshToken);

      //       if (data) {
      //         headers.set("Authorization", `Bearer ${data.access_token}`);
      //       } else {
      //         store.dispatch(resetUser());
      //       }
      //     } else {
      //       store.dispatch(resetUser());
      //     }
      //   }
      // }

      const token = getState().user.access_token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "/refresh-token",
        method: "POST",
        body: {},
        headers: {
          token: `Bearer ${refreshToken}`,
        },
      }),
    }),
    logout: builder.mutation({
      query: () => "/log-out",
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
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpUserMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useCreateUserMutation,
  useGetDetailsUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useDeleteManyUsersMutation,
  useGetAllUsersQuery,
} = userApiSlice;
