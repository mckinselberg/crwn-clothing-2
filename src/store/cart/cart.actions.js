import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setIsCartOpen = (isCartOpen) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);

export const setCartTotal = (setCartTotal) => 
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, setCartTotal);