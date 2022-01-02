import './App.css';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import CheckoutPage from './components/CheckoutComponent/CheckoutComponent'
import ProductList from './components/ProductList/ProductList';
import SeletedProduct from './pages/SelectedProduct'
import  Header  from "./components/Header/Header";
import { useState, useEffect } from "react";
import { CartItem, cart, clearCart } from "./lib/cart";

import {
  store,
} from "./lib/store";
import { History } from 'history';

export interface Props {
  items: CartItem[];
}

function App(props: { history: History; }) {
  const [items , setItems] = useState<Props["items"]>([]);
  const [toggleState,  setToggleState] = useState(true)

  useEffect(() => {
    const sub = cart.subscribe((value) => setItems(value?.cartItems ?? []));
    return () => sub.unsubscribe();
  }, []);
  return (
    <>
  <Router >
      <div className="App">
      <Provider store={store}>
      <Header history={props.history} toggleState={toggleState} setToggleState={setToggleState}/>
      <Routes> 
        <Route path="/" element={<ProductList/>} />
        <Route path="/perfume/:id" element={<SeletedProduct/>} />
        <Route path="/checkout" element={ <CheckoutPage {...items}/>  }/>
      </Routes>
      </Provider>
    </div>
  </Router>
</>
  );
}

export default App;