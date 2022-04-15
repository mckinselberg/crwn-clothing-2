import { createContext, useState, useReducer } from "react";

const INITIAL_STATE = {
  cartItems: [],
  totalItems: 0,
  cartTotal: 0,
};

const CART_ACTION_TYPES = {
  ADD_ITEM: "ADD_ITEM",
  INCREMENT_ITEM: "INCREMENT_ITEM",
  DECREMENT_ITEM: "DECREMENT_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.ADD_ITEM: {
      let existingItem = checkForExistingItem(state.cartItems, payload);
      if (existingItem) {
        let updatedCartItems = state.cartItems.map((cartItem) => {
          if (cartItem.id === existingItem.id) {
            cartItem.quantity = cartItem.quantity + 1;
          }
          return cartItem;
        });
        return {
          ...state,
          cartItems: updatedCartItems,
          totalItems: state.totalItems + 1,
          cartTotal: setCartTotal(updatedCartItems),
        };
      } else {
        console.log("new item");
        payload.quantity = 1;
        return {
          ...state,
          cartItems: [...state.cartItems, payload],
          totalItems: state.totalItems + 1,
          cartTotal: setCartTotal([...state.cartItems, payload]),
        };
      }
    }
    case CART_ACTION_TYPES.INCREMENT_ITEM: {
      // INCREMENT ITEM
      let updatedCartItems = state.cartItems.slice();
      updatedCartItems.forEach((cartItem) => {
        if (cartItem.id === payload.id) {
          cartItem.quantity = cartItem.quantity + 1;
        }
      });
      return {
        ...state,
        cartItems: updatedCartItems,
        totalItems: state.totalItems + 1,
        cartTotal: setCartTotal(updatedCartItems),
      };
    }
    case CART_ACTION_TYPES.DECREMENT_ITEM: {
      // DECREMENT ITEM
      let updatedCartItems = state.cartItems.slice();
      updatedCartItems.forEach((cartItem) => {
        if (cartItem.id === payload.id) {
          cartItem.quantity = cartItem.quantity - 1;
        }
      });
      return {
        ...state,
        cartItems: updatedCartItems,
        totalItems: state.totalItems + 1,
        cartTotal: setCartTotal(updatedCartItems),
      };
    }
    case CART_ACTION_TYPES.REMOVE_ITEM: {
      let updatedCartItems = state.cartItems.slice();
      if (confirmDelete()) {
        updatedCartItems.forEach((cartItem, idx) => {
          if (cartItem.id === payload.id) {
            updatedCartItems.splice(idx, 1);
          }
        });
        return {
          cartItems: updatedCartItems,
          totalItems: updateTotalItems(updatedCartItems),
          cartTotal: setCartTotal(updatedCartItems),
        };
      } else {
        return {
          ...state,
        };
      }
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
  isCartOpen: false,
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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [{ cartItems, totalItems, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const addItemToCart = (productToAdd) => {
    dispatch({ type: CART_ACTION_TYPES.ADD_ITEM, payload: productToAdd });
  };
  const incrementItem = (productToIncrement) => {
    dispatch({ type: CART_ACTION_TYPES.INCREMENT_ITEM, payload: productToIncrement
    });
  };
  const decrementItem = (productToDecrement) => {
    dispatch({
      type: CART_ACTION_TYPES.DECREMENT_ITEM, payload: productToDecrement });
  };
  const removeItem = (productToRemove) => {
    dispatch({ type: CART_ACTION_TYPES.REMOVE_ITEM, payload: productToRemove });
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
