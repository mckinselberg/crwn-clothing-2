import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../contexts/cart.context";
import CartItem from "../../components/cart-item/cart-item.component";
import "./cart.styles.scss";

const Cart = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  
  useEffect(() => {
  }, [cartItems])

  return (
    <div>
      <div>I'm the cart</div>
      {cartItems.map((item) => (
          <CartItem
            key={item.id}
            cartItem={item}
            showControls={true}
          />
      ))}
      <div className="cart-totals">
        <hr/>
        Cart Total: ${cartTotal}
      </div>
    </div>
  );
};

export default Cart;
