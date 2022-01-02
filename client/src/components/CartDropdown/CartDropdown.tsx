import React from "react";

import CartItemComponent from "../cartItem/CartItemComponent";
import { CartItem, cart, clearCart } from "../../lib/cart";


import "./cartDropdownStyles.css";
import { History } from 'history';
import { useNavigate } from 'react-router-dom';


interface Props {
  cartItems: CartItem[];
  setToggleState: React.Dispatch<React.SetStateAction<boolean>>;
  toggleState: boolean;
  history?: History;
  cartItem?: CartItem;
  clearCart: () => Promise<void>
}


const CartDropdown: React.FC<Props> = ({ cartItems, toggleState, clearCart, history, setToggleState }) => {
  const navigate = useNavigate();

  return (
  <div className="cartDropdownContainer" >
    {cartItems?.length ? (
      <div className="cartItemsContainer">
        {cartItems.map((cartItem) => (
          <CartItemComponent cartItem={cartItem}/>
        ))}
      </div>
    ) : (
      <span className="emptyMessageContainer">Your cart is empty</span>
    )}
    {cartItems?.length ? (
      <button className="customButtonContainer buttonStyles"
        onClick={() => {
          navigate("/checkout");
          setToggleState(!toggleState);
        }}
      >
        GO TO CHECKOUT
      </button>
    ) : (
      <button className="customButtonContainer invertedButtonStyles">GO TO CHECKOUT</button>
    )}
  </div>
);
    }
export default CartDropdown;
