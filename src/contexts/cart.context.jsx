import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  dropdown: "",
  setDropdown: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartDropdown, setCartDropdown] = useState(false);
  const value = { cartDropdown, setCartDropdown };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
