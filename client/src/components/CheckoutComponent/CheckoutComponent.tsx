import React from 'react';
import CheckoutItem from '../CheckoutItem/CheckoutItem';
import { CartItem, cart, clearCart } from "../../lib/cart";

import './checkoutStyles.css';


const CheckoutPage = ({...cartItems}: CartItem[]) => {
  const propertyValues = Object.values(cartItems);

  const resultArray = Object.keys(cartItems).map((personNamedIndex:any) => cartItems[personNamedIndex]);
  const total = resultArray.reduce(
    (accumalatedQuantity: number, cartItem: { quantity: number; price: number; }) =>
      accumalatedQuantity + cartItem.quantity * cartItem.price,
    0
  ) 

const handleClick = ()=>{
  console.log("clearCart:",clearCart);
  clearCart("1")
}
  return (
  
  <div className='checkoutPageContainer'>
    <div className='checkoutHeaderContainer'>
      <div className='headerBlockContainer'>
        <span>Product</span>
      </div>
      <div className='headerBlockContainer'>
        <span>Description</span>
      </div>
      <div className='headerBlockContainer'>
        <span>Quantity</span>
      </div>
      <div className='headerBlockContainer'>
        <span>Price</span>
      </div>
      <div className='headerBlockContainer'>
        <span>Remove</span>
      </div>
    </div>
    {propertyValues.map((cartItem: CartItem, index) => {
      console.log("cartItemIn:",cartItem, index)
      return <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    }
    )}
    <div className='flex-div'>
    <div className='totalContainer'>TOTAL: ${total}</div>
    <button className="clearButton" onClick={handleClick} >
              Clear Cart
    </button>
    </div>
    <div className='warningContainer'>
      Please use one of the following test credit cards
      <br />
      4242 4242 4242 4242 - Exp: 01/24 - CVV: 123
      <br />
      4242 4242 4242 4242 Visa Any 3 digits Any future date
    </div>
  </div>
);
    }
export default CheckoutPage;
