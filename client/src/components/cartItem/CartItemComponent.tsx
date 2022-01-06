import React from "react";

import "./cartItemStyles.css";
import { CartItem, deleteOne } from "../../lib/cart";
interface Props {
  cartItem: CartItem
}


const CartItemComponent: React.FC<Props>  = ({ cartItem }) => {
  const { id, image, price, name, quantity, title } = cartItem;
  return (
    <div className="cartItemContainer">
      <img className="cartItemImage" src={image} alt="item" />
      <div className="itemDetailsContainer">
        <span className="titleSpan">{title}</span>
        <span>{name}</span>
        <span >
          {quantity} x ${price}
        </span>
      </div>
      <div className="removeItemContainer" onClick={()=>deleteOne("1", id.toString(), "0")}>
        &#10060;
      </div>
    </div>
  );
};


export default CartItemComponent;
