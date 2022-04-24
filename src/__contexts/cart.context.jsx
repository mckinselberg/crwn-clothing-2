import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  totalItems: 0,
  cartTotal: 0,
};

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN: {
      return {
        ...state,
        ...payload,
      };
    }
    case CART_ACTION_TYPES.SET_CART_ITEMS: {
      return {
        ...state,
        ...payload,
      };
    }
    default:
      throw new Error(`unhandled type ${type} in cartReducer`);
  }
};

const checkForExistingItem = (cartItems, product) => {
  if (cartItems.length > 0) {
    let existingItem = cartItems.find((cartItem) => cartItem.id === product.id);
    return existingItem;
  }
  return false;
};

const setCartTotal = (cartItems) => {
  return cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
};

const updateTotalItems = (cartItems) => {
  return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
};

const confirmDelete = () => {
  return window.confirm("Are you sure you want to delete this item?");
};

export const CartContext = createContext({
  isCartOpen: INITIAL_STATE.isCartOpen,
  setIsCartOpen: () => {},
  cartItems: INITIAL_STATE.cartItems,
  addItemToCart: () => {},
  incrementItem: () => {},
  decrementItem: () => {},
  removeItem: () => {},
  totalItems: INITIAL_STATE.totalItems,
  cartTotal: INITIAL_STATE.cartTotal,
});

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, totalItems, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const addItemToCart = (productToAdd) => {
    let existingItem = checkForExistingItem(cartItems, productToAdd);
    let newState;
    if (existingItem) {
      let updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.id === existingItem.id) {
          cartItem.quantity = cartItem.quantity + 1;
        }
        return cartItem;
      });
      newState = {
        cartItems: updatedCartItems,
        totalItems: totalItems + 1,
        cartTotal: setCartTotal(updatedCartItems),
      };
    } else {
      productToAdd.quantity = 1;
      newState = {
        cartItems: [...cartItems, productToAdd],
        totalItems: totalItems + 1,
        cartTotal: setCartTotal([...cartItems, productToAdd]),
      };
    }

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newState));
  };

  const incrementItem = (productToIncrement) => {
    let updatedCartItems = cartItems.slice();
    updatedCartItems.forEach((cartItem) => {
      if (cartItem.id === productToIncrement.id) {
        cartItem.quantity = cartItem.quantity + 1;
      }
    });
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: updatedCartItems,
        totalItems: totalItems + 1,
        cartTotal: setCartTotal(updatedCartItems),
      })
    );
  };

  const decrementItem = (productToDecrement) => {
    let updatedCartItems = cartItems.slice();
    updatedCartItems.forEach((cartItem) => {
      if (cartItem.id === productToDecrement.id) {
        if (cartItem.quantity === 1) {
          removeItem(productToDecrement);
        } else {
          cartItem.quantity = cartItem.quantity - 1;
          dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
              cartItems: updatedCartItems,
              totalItems: totalItems + 1,
              cartTotal: setCartTotal(updatedCartItems),
            })
          );
        }
      }
    });
  };

  const removeItem = (productToRemove) => {
    let updatedCartItems = cartItems.slice();
    if (confirmDelete()) {
      updatedCartItems.forEach((cartItem, idx) => {
        if (cartItem.id === productToRemove.id) {
          updatedCartItems.splice(idx, 1);
        }
      });
      dispatch(
        createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
          cartItems: updatedCartItems,
          totalItems: updateTotalItems(updatedCartItems),
          cartTotal: setCartTotal(updatedCartItems),
        })
      );
    } else {
      return {
        cartItems,
        totalItems,
        cartTotal,
      };
    }
  };

  const setIsCartOpen = () => {
    dispatch(
      createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, {
        isCartOpen: !isCartOpen,
      })
    );
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    incrementItem,
    decrementItem,
    removeItem,
    cartItems,
    totalItems,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
