import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import orderReducer from "./OrderSlice";
import returnReducer from "./returnSlice";
import productReducer from "./productSlice";
import sellerManagementReducer from "./sellerManagementSlice";
import { persistStore, persistReducer } from "redux-persist";

import createWebStorage from "redux-persist/es/storage/createWebStorage";
import { combineReducers } from "redux";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  order: orderReducer,
  products: productReducer,
  return: returnReducer,
  sellerManagement: sellerManagementReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
