import { combineReducers, compose, configureStore, createSelector } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlide";
import userReducer from "./slices/UserSlice";
import orderReducer from "./slices/OrderSlice";
import { userApi } from "../services/user";

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
  blacklist: ['user']
};

const rootReducer = combineReducers({
  product: productReducer,
  user: persistReducer(persistConfig,userReducer) ,
  orders: orderReducer,
  [userApi.reducerPath]: userApi.reducer,
});
// const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

// selector
export const userSelector = createSelector(
  (state: RootState) => state,
  (state) => state.user,
  );

// const composeEnhancers = (process.env.REACT_APP_NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userApi.middleware),
    // composeEnhancers,
});

export let persistor = persistStore(store);
