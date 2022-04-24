const checkForExistingItem = (cartItems, product) => {
  if (cartItems.length > 0) {
    let existingItem = cartItems.find((cartItem) => cartItem.id === product.id);
    return existingItem;
  }
  return false;
};

const setCartTotal = (cartItems) => {
  return cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
};

const updateTotalItems = (cartItems) => {
  return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
};

const confirmDelete = () => {
  return window.confirm("Are you sure you want to delete this item?");
};

export const addItemToCart = (cartItems, productToAdd, totalItems) => {
  let existingItem = checkForExistingItem(cartItems, productToAdd);
  let newState;
  if (existingItem) {
    let updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === existingItem.id) {
        cartItem.quantity = cartItem.quantity + 1;
      }
      return cartItem;
    });
    newState = {
      cartItems: updatedCartItems,
      totalItems: totalItems + 1,
      cartTotal: setCartTotal(updatedCartItems),
    };
  } else {
    productToAdd.quantity = 1;
    newState = {
      cartItems: [...cartItems, productToAdd],
      totalItems: totalItems + 1,
      cartTotal: setCartTotal([...cartItems, productToAdd]),
    };
  }
  return newState;
};

export const incrementItem = (cartItems, productToIncrement, totalItems) => {
  let updatedCartItems = cartItems.slice();
  updatedCartItems.forEach((cartItem) => {
    if (cartItem.id === productToIncrement.id) {
      cartItem.quantity = cartItem.quantity + 1;
    }
  });
  return {
    cartItems: updatedCartItems,
    totalItems: totalItems + 1,
    cartTotal: setCartTotal(updatedCartItems),
  };
};

export const decrementItem = (cartItems, productToDecrement, totalItems) => {
  let updatedCartItems = cartItems.slice();
  updatedCartItems.forEach((cartItem, idx) => {
    if (cartItem.id === productToDecrement.id) {
      if (cartItem.quantity === 1) {
        if (confirmDelete()) {
          updatedCartItems.splice(idx, 1);
        }
      } else {
        cartItem.quantity = cartItem.quantity - 1;
      }
    }});
    return {
      cartItems: updatedCartItems,
      totalItems: totalItems - 1,
      cartTotal: setCartTotal(updatedCartItems),
    };
};

export const removeItem = (cartItems, productToRemove) => {
  let updatedCartItems = cartItems.slice();
  if (confirmDelete()) {
    updatedCartItems.forEach((cartItem, idx) => {
      if (cartItem.id === productToRemove.id) {
        updatedCartItems.splice(idx, 1);
      }
    });
  }
  return {
    cartItems: updatedCartItems,
    totalItems: updateTotalItems(updatedCartItems),
    cartTotal: setCartTotal(updatedCartItems),
  };
};