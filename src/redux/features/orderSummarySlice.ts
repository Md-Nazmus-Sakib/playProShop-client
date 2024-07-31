import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Quantities = Record<string, number>;
export interface OrderSummaryState {
  quantities: Quantities;
  totalPrice: number;
}

const initialState: OrderSummaryState = {
  quantities: {},
  totalPrice: 0,
};

const orderSummarySlice = createSlice({
  name: "orderSummary",
  initialState,
  reducers: {
    setOrderSummary: (state, action: PayloadAction<OrderSummaryState>) => {
      state.quantities = action.payload.quantities;
      state.totalPrice = action.payload.totalPrice;
    },
  },
});
export const selectOrderSummary = (state: RootState) => state.orderSummary;
export const { setOrderSummary } = orderSummarySlice.actions;
export default orderSummarySlice.reducer;
