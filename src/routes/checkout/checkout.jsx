import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-header">
        {["Product", "Description", "Quantity", "Price", "Remove"].map(
          (header, id) => (
            <div key={id} className="header-block">
              <span>{header}</span>
            </div>
          )
        )}
      </div>
      {cartItems.map((item) => (
        <CheckoutItem key={item.id} item={item} />
      ))}
      <div className="cart-totals">
        <span className="total">Cart Total: ${cartTotal}</span>
      </div>
    </div>
  );
};

export default Checkout;
