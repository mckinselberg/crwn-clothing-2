import { useContext } from 'react';
import Button from '../button/button.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-icons">
        <Button>GO TO CHECKOUT</Button>
      </div>
    </div>
  )
}

export default CartDropdown;