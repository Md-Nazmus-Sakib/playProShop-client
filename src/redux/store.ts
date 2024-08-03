import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/api";
import filtersReducer from "./features/querySlice";
import cartReducer from "./features/cartSlice";
import productIdReducer from "./features/productIdSlice";

import orderSummaryReducer from "./features/orderSummarySlice";
import checkoutReducer from "./features/checkoutSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    filters: filtersReducer,
    cart: cartReducer,
    productId: productIdReducer,

    orderSummary: orderSummaryReducer,
    checkout: checkoutReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
