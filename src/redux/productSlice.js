import { createSlice } from "@reduxjs/toolkit";
import { products as initialProducts } from "../data/products";

const formattedProducts = initialProducts.map((p) => ({
  ...p,
}));

const initialState = {
  products: formattedProducts,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.unshift({
        ...action.payload,
      });
    },

    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },

    toggleStatus: (state, action) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.status = product.status === "active" ? "inactive" : "active";
      }
    },

    updateStock: (state, action) => {
      const { id, size, stock } = action.payload;
      const product = state.products.find((p) => p.id === id);
      if (product && product.sizeAvailability) {
        product.sizeAvailability = product.sizeAvailability.map((s) =>
          s.size === size ? { ...s, stock: Number(stock) } : s,
        );
      }
    },

    updateExchangeReturn: (state, action) => {
      const { id, exchangeAvailable, returnAvailable } = action.payload;
      const product = state.products.find((p) => p.id === id);
      if (product) {
        if (exchangeAvailable !== undefined)
          product.exchangeAvailable = exchangeAvailable;
        if (returnAvailable !== undefined)
          product.returnAvailable = returnAvailable;
      }
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  toggleStatus,
  updateStock,
  updateExchangeReturn,
} = productSlice.actions;

export default productSlice.reducer;
