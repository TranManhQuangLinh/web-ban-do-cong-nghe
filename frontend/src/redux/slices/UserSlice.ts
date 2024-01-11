import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  address: string;
  avatar: string;
  access_token: string;
  refresh_token: string;
  isRefresh?: boolean;
}

const initialState: IUserState = {
  _id: "",
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
    updateUser: (state, action: PayloadAction<IUserState>) => {
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
      state._id = _id || state._id;
      state.name = name || state.name;
      state.email = email || state.email;
      state.address = address || state.address;
      state.phone = phone || state.phone;
      state.avatar = avatar || state.avatar;
      state.role = role || state.role;
      state.access_token = access_token || state.access_token;
      state.refresh_token = refresh_token || state.refresh_token;
    },
    resetUser: (state) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.address = "";
      state.phone = "";
      state.avatar = "";
      state.role = "";
      state.access_token = "";
      state.refresh_token = "";
    },
    setIsRefresh: (state, action: PayloadAction<boolean>) => {
      state.isRefresh = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser, setIsRefresh } = userSlice.actions;

export default userSlice.reducer;
