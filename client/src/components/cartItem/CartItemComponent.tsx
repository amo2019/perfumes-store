import React from "react";

import "./cartItemStyles.css";
import { CartItem } from "../../lib/cart";
interface Props {
  cartItem: CartItem
}


const CartItemComponent: React.FC<Props>  = ({ cartItem }) => {
  const { image, price, name, quantity } = cartItem;
  return (
    <div className="cartItemContainer">
      <img className="cartItemImage" src={image} alt="item" />
      <div className="itemDetailsContainer">
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </div>
      <div className="removeItemContainer">
        &#10060;
      </div>
    </div>
  );
};


export default CartItemComponent;
