import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  },
  reducers: {
    sortByPrice: (state, action) => {
      return { ...state, sort: action.payload };
    },
    filterByStock: (state, action) => {
      return { ...state, byStock: !state.byStock };
    },
    filterByDelivery: (state, action) => {
      return { ...state, byFastDelivery: !state.byFastDelivery };
    },
    filterByRating: (state, action) => {
      return { ...state, byRating: action.payload };
    },
    filterBySearch: (state, action) => {
      return { ...state, searchQuery: action.payload };
    },
    clearFilters: (state, action) => {
      return {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
      };
    },
  },
});

export const {
  sortByPrice,
  filterByStock,
  filterByDelivery,
  filterByRating,
  filterBySearch,
  clearFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
