import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice";
import orderReducer from "./slices/OrderSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
  },
});
