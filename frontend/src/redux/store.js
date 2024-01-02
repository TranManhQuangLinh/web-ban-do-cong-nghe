import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlide";
import userReducer from "./slices/UserSlice";
import orderReducer from "./slices/OrderSlice";
import { userApiSlice } from '../services/userApiSlice'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["product", "user"],
};

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  orders: orderReducer,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
