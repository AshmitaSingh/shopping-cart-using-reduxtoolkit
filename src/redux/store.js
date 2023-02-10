import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import filtersReducer from "./filtersSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    filters: filtersReducer,
  },
});
