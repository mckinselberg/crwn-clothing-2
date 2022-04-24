import { useDispatch, useSelector } from "react-redux";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { ProductCardContainer } from "./product-card.styles";

import { CART_ACTION_TYPES } from "../../store/cart/cart.types";
import { addItemToCart } from "../../store/cart/cart.selector.functions";
import { selectCartItems, selectTotalItems } from "../../store/cart/cart.selector";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectTotalItems);
  const addProductToCart = (product) =>
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: addItemToCart(cartItems, product, totalItems),
    });

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={() => addProductToCart(product)}
      >
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
