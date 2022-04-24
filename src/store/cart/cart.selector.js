import { createSelector } from 'reselect';

const selectCartReducer = (state) => state.cart;

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.isCartOpen
);

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.cartItems
);

export const selectCartTotal = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.cartTotal
);

export const selectTotalItems = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.totalItems
);
