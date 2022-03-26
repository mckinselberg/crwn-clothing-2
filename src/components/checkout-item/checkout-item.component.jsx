import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ item }) => {
  const { updateItem } = useContext(CartContext);
  const { id, name, imageUrl, quantity, price } = item;
  return (
    <div key={id} className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="name">{name}</div>
      <div className="quantity">
        <span
          className="arrow"
          onClick={() => updateItem(id, "decrement")}
        >&#10094;</span>{" "}
        <span className="value">{quantity} </span>
        <span
          className="arrow"
          onClick={() => updateItem(id, "increment")}
        >&#10095;</span>
      </div>
      <div className="price">${price}</div>
      <div className="remove-button" onClick={() => updateItem(id, "delete")}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
