import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      console.log("Adding to cart:", state, newItem, action);

      const existing = state.cartItems.find(
        (item) => item.id === newItem.id && item.size === newItem.size,
      );

      if (existing) {
        existing.quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }
    },
    removeFromCart: (state, action) => {
      const { id, size } = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) => !(item.id === id && item.size === size),
      );
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.cartItems.find((item) => item.id === id);

      if (item) {
        item.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
