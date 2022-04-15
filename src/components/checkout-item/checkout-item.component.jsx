import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import { Checkout, Image, Name, Quantity, Price, RemoveButton } from "./checkout-item.styles";

const CheckoutItem = ({ item }) => {
  const { incrementItem, decrementItem, removeItem } = useContext(CartContext);
  const { id, name, imageUrl, quantity, price } = item;
  return (
    <Checkout key={id}>
      <Image>
        <img src={imageUrl} alt={name} />
      </Image>
      <Name>{name}</Name>
      <Quantity>
        <span
          className="arrow"
          onClick={() => decrementItem(item)}
        >&#10094;</span>{" "}
        <span className="value">{quantity} </span>
        <span
          className="arrow"
          onClick={() => incrementItem(item)}
        >&#10095;</span>
      </Quantity>
      <Price>${price}</Price>
      <RemoveButton onClick={() => removeItem(item)}>
        &#10005;
      </RemoveButton>
    </Checkout>
  );
};

export default CheckoutItem;
