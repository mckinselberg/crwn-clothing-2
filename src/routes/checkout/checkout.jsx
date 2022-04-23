import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from "./checkout.styles.jsx";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <CheckoutContainer>
      <h1>Checkout</h1>
      <CheckoutHeader>
        {["Product", "Description", "Quantity", "Price", "Remove"].map(
          (header, id) => (
            <HeaderBlock key={id}>
              <span>{header}</span>
            </HeaderBlock>
          )
        )}
      </CheckoutHeader>
      {cartItems.map((item) => (
        <CheckoutItem key={item.id} item={item} />
      ))}
      <div className="cart-totals">
        <Total>Cart Total: ${cartTotal}</Total>
      </div>
    </CheckoutContainer>
  );
};

export default Checkout;
