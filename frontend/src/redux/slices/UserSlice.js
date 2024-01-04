import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../../services/userApi";

const initialState = {
  id: "",
  name: "",
  email: "",
  phone: "",
  role: "",
  address: "",
  avatar: "",
  access_token: "",
  refresh_token: "",
  isRefresh: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      // console.log("UserSlice.js: updateUser");
      const {
        name = "",
        email = "",
        access_token = "",
        address = "",
        phone = "",
        avatar = "",
        _id = "",
        role = "",
        refresh_token = "",
      } = action.payload;
      // console.log("UserSlice.js: same access_token:", access_token === state.access_token);
      state.id = _id ? _id : state.id;
      state.name = name ? name : state.name;
      state.email = email ? email : state.email;
      state.address = address ? address : state.address;
      state.phone = phone ? phone : state.phone;
      state.avatar = avatar ? avatar : state.avatar;
      state.role = role ? role : state.role;
      state.access_token = access_token ? access_token : state.access_token;
      state.refresh_token = refresh_token ? refresh_token : state.refresh_token;
    },
    resetUser: (state) => {
      // console.log("UserSlice.js: resetUser");
      state.id = "";
      state.name = "";
      state.email = "";
      state.address = "";
      state.phone = "";
      state.avatar = "";
      state.role = "";
      state.access_token = "";
      state.refresh_token = "";
    },
    setIsRefresh: (state, action) => {
      state.isRefresh = action.payload
      // console.log('UserSlice.js: set isRefresh:', action.payload);
    }
  },
  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     userApi.endpoints.login.matchFulfilled,
  //     (state, { payload }) => {
  //       state.user = payload.data;
  //     }
  //   );
  // },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser, setIsRefresh } = userSlice.actions;

export default userSlice.reducer;
