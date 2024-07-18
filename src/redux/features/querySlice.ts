import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type TFilters = {
  searchTerm?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sort?: string;
};

const initialState = {
  category: "",
  brand: "",
  minPrice: 0,
  maxPrice: 100,
  rating: 0,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<TFilters>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
