import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {

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
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    updateTotalItems(cartItems);
    setCartTotal(
      cartItems.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0)
    );
  }, [cartItems, setCartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const updateTotalItems = (cartItems) => {
    setTotalItems(
      cartItems.reduce((total, cartItem) => {
        return total + cartItem.quantity;
      }, 0)
    );
  };

  const confirmDelete = () => {
    return window.confirm("Are you sure you want to delete this item?");
  };
  

  const updateItem = (itemId, action) => {
    let updatedCartItems = cartItems.slice();
    updatedCartItems.forEach((item, idx) => {
      if (item.id === itemId) {
        switch (action) {
          case "increment":
            item.quantity = item.quantity + 1;
            break;
          case "decrement":
            if (item.quantity === 1) {
              if (confirmDelete()) {
                updatedCartItems.splice(idx, 1);
              }
            } else {
              item.quantity = item.quantity - 1;
            }
            break;
          case "delete":
            if (confirmDelete()) {
              updatedCartItems.splice(idx, 1);
            }
            break;
          default:
            return null;
        }
      }
    });
    setCartItems(updatedCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    totalItems,
    updateItem,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
