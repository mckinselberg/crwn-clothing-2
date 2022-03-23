import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // // find if cartItems contains productToAdd
  // let found = false;
  // let updatedCartItems = cartItems.slice();
  // updatedCartItems = cartItems.map((item) => {
  //   // if found, increment quantity
  //   if (item.id === productToAdd.id) {
  //     found = true;
  //     item.quantity += 1;
  //   }
  //   return item;
  // });
  // if (!found) {
  //   productToAdd.quantity = 1;
  //   updatedCartItems.push(productToAdd);
  // }
  // return updatedCartItems;
  // // return new arry with modifiend cartItems / new cart item

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  totalItems: 0,
  setTotalItems: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([], );
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    updateTotalItems(cartItems)
  },[cartItems, setCartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const updateTotalItems = (cartItems) => {
    setTotalItems(cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    },0));
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    totalItems
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
