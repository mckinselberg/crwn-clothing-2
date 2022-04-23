import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectTotalItems,
} from "../../store/cart/cart.selector";

import { CART_ACTION_TYPES } from "../../store/cart/cart.types";
import {
  decrementItem,
  incrementItem,
  removeItem,
} from "../../store/cart/cart.reducer.functions";
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
          onClick={() =>
            dispatch({
              type: CART_ACTION_TYPES.SET_CART_ITEMS,
              payload: decrementItem(cartItems, item, totalItems),
            })
          }
        >
          &#10094;
        </span>
        <span className="value">{quantity} </span>
        <span
          className="arrow"
          onClick={() =>
            dispatch({
              type: CART_ACTION_TYPES.SET_CART_ITEMS,
              payload: incrementItem(cartItems, item, totalItems),
            })
          }
        >
          &#10095;
        </span>
      </Quantity>
      <Price>${price}</Price>
      <RemoveButton
        onClick={() =>
          dispatch({
            type: CART_ACTION_TYPES.SET_CART_ITEMS,
            payload: removeItem(cartItems, item, totalItems),
          })
        }
      >
        &#10005;
      </RemoveButton>
    </Checkout>
  );
};

export default CheckoutItem;
