import React from 'react';

import './checkoutItemStyles.css';

const CheckoutItem = ({ cartItem }) => {
  const { name, image, price, quantity } = cartItem;
  console.log("cartItem::", cartItem, image)
  console.log("image::", image)
  return (
    <div className='checkoutItemContainer'>
      <div className='imageContainer'>
        <img src={image} alt='item' />
      </div>
      <span className='textContainer spanClass'>{name}</span>
      <div className='quantityContainer'>
        <div >&#10094;</div>
        <span className='spanClass'>{quantity}</span>
        <div >&#10095;</div>
      </div>
      <span className='textContainer spanClass'>{price}</span>
      <div className='removeButtonContainer' >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
