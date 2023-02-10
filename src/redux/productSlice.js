import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const productSlice = createSlice({
  name: "products",
  initialState: { value: [] },
  reducers: {
    displayProducts: (state, action) => {
      // console.log(action.payload);
      action.payload.map((prod) => {
        prod.id = uuidv4();
        // console.log(prod.length);
        return state.value.push(prod);
      });
    },
  },
});

export const { displayProducts } = productSlice.actions;
export default productSlice.reducer;
