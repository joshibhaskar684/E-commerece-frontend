import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { CartReducer } from "./cart/reducer";
import { OrderReducer } from "./Order/reducer";
import { CategoriesReducer } from "./Categories/reducer";
import { ProductReducer } from "./products/reducer";
import UserReducer from "./user/reducer";

const rootReducer = combineReducers({
  UserReducer: UserReducer,
  CategoriesReducer: CategoriesReducer,
  ProductReducer: ProductReducer,
  CartReducer: CartReducer,
  OrderReducer: OrderReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
