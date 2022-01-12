import CheckoutItem from '../CheckoutItem/CheckoutItem';
import { CartItem, clearCart } from "../../lib/cart";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();
  
  const propertyValues = Object.values(cartItems);

  const resultArray = Object.keys(cartItems).map((personNamedIndex:any) => cartItems[personNamedIndex]);
  const total = resultArray.reduce(
    (accumalatedQuantity: number, cartItem: { quantity: number; price: number; }) =>
      accumalatedQuantity + cartItem.quantity * cartItem.price,
    0
  ) 

  let prevTotal = total;
  const secretKey: any = process.env.REACT_APP_SECRET_CODE?.toString();

const handleClick = ()=>{
  clearCart("1")
}

const handlePaid = ()=>{
  setPaid(true);
  //setTimeout(()=>{setPaid(false);}, 6000)
}
  const ButtonWrapper = ({ currency, showSpinner }:any) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

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
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: total.toString(),
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              handlePaid();
              handleClick();
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
    {paid && <Transaction total={prevTotal} setPaid={setPaid}/>}
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
