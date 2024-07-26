import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of a CartItem
export interface CartItem {
  id: string;
  quantity: number;
}

// Define the initial state structure
export interface CartState {
  items: CartItem[];
}

// Utility function to load cart items from local storage
const loadCartFromLocalStorage = (): CartItem[] => {
  try {
    const serializedCart = localStorage.getItem("cart");
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (e) {
    console.error("Could not load cart data from local storage", e);
    return [];
  }
};

// Utility function to save cart items to local storage
const saveCartToLocalStorage = (cart: CartItem[]) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem("cart", serializedCart);
  } catch (e) {
    console.error("Could not save cart data to local storage", e);
  }
};

// Initialize the cart state
const initialState: CartState = {
  items: loadCartFromLocalStorage(),
};

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add an item to the cart
    addItemToCart: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ id, quantity });
      }
      saveCartToLocalStorage(state.items);
    },
    // Increment the quantity of an item in the cart
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        saveCartToLocalStorage(state.items);
      }
    },
    // Decrement the quantity of an item in the cart
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 0) {
        item.quantity -= 1;
        saveCartToLocalStorage(state.items);
      }
    },
    // Remove an item from the cart
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(state.items);
    },
    // Clear all items from the cart
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items);
    },
  },
});

// Selector to get cart items from the state
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

// Export actions and reducer
export const {
  addItemToCart,
  incrementQuantity,
  decrementQuantity,
  removeItemFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
