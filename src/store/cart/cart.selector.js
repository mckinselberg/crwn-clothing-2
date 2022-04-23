import { createSelector } from 'reselect';

const cartReducer = (state) => state.cart;

export const selectIsCartOpen = createSelector(
  [cartReducer],
  (cartSlice) => cartSlice.isCartOpen
);

export const selectCartItems = createSelector(
  [cartReducer],
  (cartSlice) => cartSlice.cartItems
);

export const selectCartTotal = createSelector(
  [cartReducer],
  (cartSlice) => cartSlice.cartTotal
);

export const selectTotalItems = createSelector(
  [cartReducer],
  (cartSlice) => cartSlice.totalItems
);
