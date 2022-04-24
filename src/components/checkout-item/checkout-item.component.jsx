import { useSelector, useDispatch } from "react-redux";
import { CART_ACTION_TYPES } from "../../store/cart/cart.types";
import {
  selectCartItems,
  selectTotalItems,
} from "../../store/cart/cart.selector";
import {
  incrementItem,
  decrementItem,
  removeItem,
} from "../../store/cart/cart.selector.functions";

import {
  Checkout,
  Image,
  Name,
  Quantity,
  Price,
  RemoveButton,
} from "./checkout-item.styles";

const CheckoutItem = ({ item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectTotalItems);

  const incrementItemHandler = () => dispatch({
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: incrementItem(cartItems, item, totalItems),
  });

  const decrementItemHandler = () => dispatch({
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: decrementItem(cartItems, item, totalItems),
  })

  const removeItemHandler = () => dispatch({
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: removeItem(cartItems, item, totalItems),
  });

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
          onClick={decrementItemHandler}
        >
          &#10094;
        </span>
        <span className="value">{quantity} </span>
        <span
          className="arrow"
          onClick={incrementItemHandler}
        >
          &#10095;
        </span>
      </Quantity>
      <Price>${price}</Price>
      <RemoveButton
        onClick={removeItemHandler}
      >
        &#10005;
      </RemoveButton>
    </Checkout>
  );
};

export default CheckoutItem;
