import "./transaction.css";

const Transaction = ({ total, setPaid }) => {

  const handleClick = ()=>{
    setPaid(false)
  }
  return (
    <div className="container">
      <div className="wrapper">
        <h1 className="title">You have paid {total} successfully.</h1>
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
