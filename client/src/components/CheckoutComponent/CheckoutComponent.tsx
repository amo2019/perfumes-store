import CheckoutItem from '../CheckoutItem/CheckoutItem';
import { CartItem, clearCart } from "../../lib/cart";
import { useEffect, useState } from "react";
import Transaction from '../Modal/Transaction';
import './checkoutStyles.css';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const CheckoutPage = ({...cartItems}: CartItem[]) => {
  const [open, setOpen] = useState(false);
  const [paid, setPaid] = useState(false);
  const currency = "USD";
  const style: any = { layout: "vertical" };
  const API_SERVER = "http://localhost:8080";
  const propertyValues = Object.values(cartItems);

  const resultArray = Object.keys(cartItems).map((personNamedIndex:any) => cartItems[personNamedIndex]);
  const total = resultArray.reduce(
    (accumalatedQuantity: number, cartItem: { quantity: number; price: number; }) =>
      accumalatedQuantity + cartItem.quantity * cartItem.price,
    0
  ) 

const secretKey: any = process.env.REACT_APP_SECRET_CODE?.toString();

const handleClick = ()=>{
  clearCart("1")
}

const handlePaid = ()=>{
  setPaid(true);
  //setTimeout(()=>{setPaid(false);}, 6000)
}
  const ButtonWrapper = ({ currency, showSpinner }:any) => {
    const [{ options }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, []);

    return (
      <>
        <div className="spinner" />
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[total, currency, style]}
          fundingSource={undefined}
          createOrder={function () {
            return fetch(`${API_SERVER}/order`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
              },
              body: JSON.stringify({
                items: resultArray,
              }),
            })
              .then(res => {
                if (res.ok) return res.json()
                return res.json().then(json => Promise.reject(json))
              })
              .then(({ id }) => {
                return id
              })
              .catch(e => {
                console.error(e.error)
              })
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              handlePaid();
            });
          }}
        />
      </>
    );
  };

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
      return <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    }
    )}
    <div className='flex-div'>
    <div className='totalContainer'>TOTAL: ${total}</div>
    {open && total > 0 ? (
        <div className="paymentMethods">
              <PayPalScriptProvider
                options={{
                  "client-id": secretKey,
                    components: "buttons",
                    currency: "USD",
                    "disable-funding": "sepa,sofort,card,p24,giropay",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
       ):( <button onClick={() => setOpen(true)} className="button">
              CHECKOUT NOW!
            </button>
       )}
    <button className="clearButton" onClick={handleClick} >
              Clear Cart
    </button>
    </div>
    <div className='warningContainer'>
    {paid && <Transaction total={total} setPaid={setPaid}/>}
    </div>
  </div>
);

}

export default CheckoutPage;
