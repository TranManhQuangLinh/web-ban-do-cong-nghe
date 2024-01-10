import {
  combineReducers,
  configureStore,
  createSelector
} from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { categoryApi } from "../services/category";
import { orderApi } from "../services/order";
import { productApi } from "../services/product";
import { shippingPriceApi } from "../services/shippingPrice";
import { userApi } from "../services/user";
import orderReducer from "./slices/OrderSlice";
import userReducer from "./slices/UserSlice";
import productReducer from "./slices/productSlide";

const orderPersistConfig = {
  key: "order",
  version: 1,
  storage,
  // blacklist: ['user']
};
const userPersistConfig = {
  key: "user",
  version: 1,
  storage,
  // blacklist: ['user']
};

const rootReducer = combineReducers({
  product: productReducer,
  // user: userReducer,
  // orders: orderReducer,
  user: persistReducer(userPersistConfig, userReducer),
  orders: persistReducer(orderPersistConfig, orderReducer),
  [userApi.reducerPath]: userApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [shippingPriceApi.reducerPath]: shippingPriceApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// selector
export const userSelector = createSelector(
  (state: RootState) => state,
  (state) => state.user
);

// const composeEnhancers = (process.env.REACT_APP_NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
export const store = configureStore({
  reducer: rootReducer,
  // reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      userApi.middleware,
      categoryApi.middleware,
      productApi.middleware,
      shippingPriceApi.middleware,
      orderApi.middleware
    ),
  // composeEnhancers,
});

export const persistor = persistStore(store);
