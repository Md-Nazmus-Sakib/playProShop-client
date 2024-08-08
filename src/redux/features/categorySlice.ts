import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CategoryState {
  category: string;
}

const initialState: CategoryState = {
  category: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;

// Selector to get the category from the state
export const selectCategory = (state: RootState) => state.category.category;

export default categorySlice.reducer;
