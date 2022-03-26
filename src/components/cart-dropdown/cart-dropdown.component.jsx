import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { Link } from "react-router-dom";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <div className="cart-total">
        ${cartTotal}
      </div>
      <Link to="cart">
        <Button>GO TO CHECKOUT</Button>
      </Link>
    </div>
  );
};

export default CartDropdown;
