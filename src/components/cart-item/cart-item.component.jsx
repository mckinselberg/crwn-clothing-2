import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./cart-item.styles.scss";

const CartControls = ({ itemId }) => {
  const { updateItem, cartItems } = useContext(CartContext);
  return (
    <div className="cart-controls">
      <div onClick={() => updateItem(itemId, cartItems, "increment")}>+</div>
      <div onClick={() => updateItem(itemId, cartItems, "decrement")}>-</div>
      <div onClick={() => updateItem(itemId, cartItems, "delete")}>X</div>
    </div>
  );
};

const CartItem = ({
  cartItem,
  showControls
}) => {
  const { id, name, imageUrl, quantity, price } = cartItem;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
      {showControls ? <CartControls itemId={id} /> : null}
    </div>
  );
};

export default CartItem;
