import React, { useEffect, useState } from "react";
import CartItemComponent from "../cartItem/CartItemComponent";
import { CartItem, cart, clearCart } from "../../lib/cart";
import "./cartDropdownStyles.css";
import { useNavigate } from 'react-router-dom';
import { useLoggedIn } from "../../lib/cart";


interface Props {
  setToggleState: React.Dispatch<React.SetStateAction<boolean>>;
  toggleState: boolean;
}


const CartDropdown: React.FC<Props> = ({ toggleState, setToggleState }) => {
  const navigate = useNavigate();
  const loggedIn = useLoggedIn();
  const [items, setItems] = useState<CartItem[]>();

  useEffect(() => {
    setItems(cart.value?.cartItems);
    const sub = cart.subscribe((c) => {
      setItems(c?.cartItems);
    });
    return () => sub.unsubscribe();
  }, [setItems]);

  //if (!items) return null;

  return (
  <div className="cartDropdownContainer" >
    {items?.length ? (
      <div className="cartItemsContainer">
        {items.map((cartItem: CartItem) => (
          <CartItemComponent key={cartItem.id} cartItem={cartItem}/>
        ))}
      </div>
    ) : (
      <span className="emptyMessageContainer"> {loggedIn? 'Your cart is empty': 'Your cart is empty (please login)'}</span>
    )}
    <div className="flexDiv">
    {items?.length ? (
      <>
      <button className="customButtonContainer buttonStyles"
        onClick={() => {
          navigate("/checkout");
          setToggleState(!toggleState);
        }}
      >
        GO TO CHECKOUT
      </button>
      <button onClick={()=>clearCart("1")} className="customButtonContainer invertedButtonStyles">CLEAR CART</button>
      </>
    ) : (
      null
    )}
  </div>
  </div>
);
    }
export default CartDropdown;
