import React, { useEffect, useState } from "react";
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


const CartDropdown: React.FC<Props> = ({ cartItems, toggleState, history, setToggleState }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>();

  useEffect(() => {
    setItems(cart.value?.cartItems);
    const sub = cart.subscribe((c) => {
      setItems(c?.cartItems);
    });
    return () => sub.unsubscribe();
  }, [setItems]);

  if (!items) return null;

  return (
  <div className="cartDropdownContainer" >
    {items?.length ? (
      <div className="cartItemsContainer">
        {items.map((cartItem: CartItem) => (
          <CartItemComponent cartItem={cartItem}/>
        ))}
      </div>
    ) : (
      <span className="emptyMessageContainer">Your cart is empty</span>
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
      <button className="customButtonContainer invertedButtonStyles">CART IS EMPTY</button>
    )}
  </div>
  </div>
);
    }
export default CartDropdown;
