import "./transaction.css";
import { clearCart } from "../../lib/cart";

const Transaction = ({ total, setPaid }) => {

  const handleClick = ()=>{
    clearCart("1")
    setPaid(false)
  }

  return (
    <div className="container">
      <div className="wrapper">
        <h1 className="title">You have paid ${total} successfully.</h1>
        <div className="item">
        </div>
        <button className="modal-button" onClick={handleClick}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Transaction;
