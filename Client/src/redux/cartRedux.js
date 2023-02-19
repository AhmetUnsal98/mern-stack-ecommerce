import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    cartTotalAmount: 0,
    cartTotalQuantity: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      //Find item with payload that we sent with  dispatch
      const itemIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      //If there is a product already in the cart adjust quantity
      if (itemIndex >= 0) {
        const qty = action.payload.cartQuantity;
        console.log(qty);
        state.products[itemIndex].cartQuantity += qty;
        state.total =
          state.total +
          state.products[itemIndex].cartQuantity *
            state.products[itemIndex].price;
      } else {
        const tempProduct = action.payload;

        state.products.push(tempProduct);
        state.cartTotalQuantity += 1;
        state.total =
          state.total + tempProduct.cartQuantity * tempProduct.price;
      }
    },
    clearAllCart: (state, action) => {
      state.products = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      state.quantity = 0;
      state.total = 0;
    },
    removeProduct: (state, action) => {
      const newCartItems = state.products.filter(
        (item) => item._id !== action.payload._id
      );
      state.products = newCartItems;

      if (newCartItems) {
        state.total =
          state.total - action.payload.cartQuantity * action.payload.price;
      }
    },
    decreaseCartQuantity: (state, action) => {
      const itemIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      if (state.products[itemIndex].cartQuantity > 1) {
        state.products[itemIndex].cartQuantity -= 1;
      } else if (state.products[itemIndex].cartQuantity === 1) {
        const newCartItems = state.products.filter(
          (item) => item._id !== action.payload._id
        );
        state.products = newCartItems;
      }
    },
    increaseCartQuantity: (state, action) => {
      const itemIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      state.products[itemIndex].cartQuantity += 1;
    },
    getTotals: (state, action) => {
      let { total, quantity } = state.products.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const {
  addProduct,
  clearAllCart,
  removeProduct,
  decreaseCartQuantity,
  increaseCartQuantity,
  getTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
