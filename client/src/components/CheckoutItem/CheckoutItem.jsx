import React from 'react';
import './checkoutItemStyles.css';
import { deleteOne, addToCart } from "../../lib/cart";

const CheckoutItem = ({ cartItem }) => {
  const { id, name, image, price, quantity, title } = cartItem;
  return (
    <div className='checkoutItemContainer'>
      <div className='imageContainer'>
        <img src={image} alt='item' />
      </div>
      <span className='textContainer spanClass'>{title}</span>
      <span className='textContainer spanClass'>{name}</span>
      <div className='quantityContainer'>
        <div onClick={()=>deleteOne("1", id.toString(), "1")}>&#10094;</div>
        <span className='spanClass'>{quantity}</span>
        <div onClick={() => addToCart(id.toString())}>&#10095;</div>
      </div>
      <span className='textContainer spanClass'>{price}</span>
      <div className='removeButtonContainer' onClick={()=>deleteOne("1", id.toString(), "0")}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
