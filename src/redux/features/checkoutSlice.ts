import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CheckoutFormData {
  userName: string;
  userEmail: string;
  userMobile: string;
  deliveryAddress: string;
  paymentMethod: string;
  orderedProduct: { [productId: string]: number };
  totalPrice: number;
}

interface CheckoutState {
  data: CheckoutFormData;
}

const initialState: CheckoutState = {
  data: {
    userName: "",
    userEmail: "",
    userMobile: "",
    deliveryAddress: "",
    paymentMethod: "Cash on Delivery",
    orderedProduct: {},
    totalPrice: 0,
  },
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutData: (state, action: PayloadAction<CheckoutFormData>) => {
      state.data = action.payload;
    },
  },
});

export const { setCheckoutData } = checkoutSlice.actions;
export default checkoutSlice.reducer;
export type { CheckoutState, CheckoutFormData };
