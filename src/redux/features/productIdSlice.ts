import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductIdState {
  productId: string | null;
}

const initialState: ProductIdState = {
  productId: null,
};

const productIdSlice = createSlice({
  name: "productId",
  initialState,
  reducers: {
    setProductId(state, action: PayloadAction<string | null>) {
      state.productId = action.payload;
    },
  },
});

export const { setProductId } = productIdSlice.actions;
export default productIdSlice.reducer;
