import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productId: null,
};

export const productIdSlice = createSlice({
  name: "productId",
  initialState,
  reducers: {
    setProductId: (state, action) => {
      state.productId = action.payload;
    },
  },
});

export const { setProductId } = productIdSlice.actions;

export default productIdSlice.reducer;
