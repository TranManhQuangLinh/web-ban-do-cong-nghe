import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as UserService from "../services/UserService";
import { resetUser, setIsRefresh, updateUser } from "../redux/slices/UserSlice";

export const userBaseQuery = (baseUrl) => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers, { getState, dispatch }) => {
      // console.log("dispatch", dispatch);
      const user = getState().user;
      // console.log("user", user);

      let access_token =
        user?.access_token ?? JSON.parse(localStorage.getItem("access_token"));

      if (access_token) {
        headers.set("token", `Bearer ${access_token}`);
      }

      return headers;
    },
  });

  return async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    // console.log('result', result);
    try {
      if (result.error && result.error.status === 401) {
        const user = api.getState().user;

        if(!user.isRefresh){
          api.dispatch(setIsRefresh(true))
          // return result
        }

        const refresh_token = user?.refresh_token || JSON.parse(localStorage.getItem("refresh_token"));
        // console.log('user?.refresh_token:', user?.refresh_token);
        // console.log('storage refresh_token:', JSON.parse(localStorage.getItem("refresh_token")));
        console.log('refresh_token:', refresh_token);
        console.log('user?.isRefresh:', user?.isRefresh);
        if (refresh_token && !user?.isRefresh) {
          console.log('refresh');
          const data = await UserService.refresh_token(refresh_token);
          // console.log('data', data);
          
          if (data?.access_token) {
            // Update access_token in local storage and userSlice
            console.log('refresh access_token SUCCESS');
            localStorage.setItem("access_token", JSON.stringify(data.access_token));
            api.dispatch(updateUser({ ...user, access_token: data.access_token }));
            result = await baseQuery(args, api, extraOptions)
            api.dispatch(setIsRefresh(false))
          } else {
            // Clear local storage and reset userSlice on refresh_token expiration
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            console.log('data?.access_token:', data?.access_token);
            api.dispatch(resetUser());
            api.dispatch(setIsRefresh(false))
          }
        } else if(!refresh_token) {
          // Clear local storage and reset userSlice if there is no refresh_token
          localStorage.removeItem("access_token");
          console.log('refresh_token not found');
          api.dispatch(resetUser());
          api.dispatch(setIsRefresh(false))
        }
      }

      return result;
    } catch (error) {
      console.error("Error in userBaseQuery:", error);
      // Handle other errors as needed
      return { error };
    }
  };
};
