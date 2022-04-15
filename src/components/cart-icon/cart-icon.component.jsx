import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";

const CartIcon = () => {
  const { setIsCartOpen, totalItems } = useContext(CartContext);

  const toggleCart = () => {
    setIsCartOpen();
  };

  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon />
      <ItemCount>{totalItems}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
