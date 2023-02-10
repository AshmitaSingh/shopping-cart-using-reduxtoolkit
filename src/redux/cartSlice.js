import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      return [...state, { item: action.payload, qty: 1 }];
    },
    removeFromCart: (state, action) => {
      console.log(action.payload.id);
      return state.filter((prod) => prod.item.id !== action.payload.id);
    },
    changeCartQty: (state, action) => {
        // No need to return the state, as we encounter an unexpected immer produced error
       state.filter((c) =>
        (c.item.id === action.payload.id)
          ? c.qty = action.payload.qty
          : c.qty
      );
    },
  },
});

export const { addToCart, removeFromCart, changeCartQty } = cartSlice.actions;
export default cartSlice.reducer;
