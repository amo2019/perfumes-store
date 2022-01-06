import './App.css';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import CheckoutPage from './components/CheckoutComponent/CheckoutComponent'
import ProductList from './components/ProductList/ProductList';
import SeletedProduct from './pages/SelectedProduct'
import  Header  from "./components/Header/Header";
import { useState, useEffect, useCallback } from "react";
import { CartItem, cart } from "./lib/cart";

import {
  store,
} from "./lib/store";

export interface Props {
  items: CartItem[];
  search: string;
  onSetSearch: (search: string) => void;
}

function App() {
  const [items , setItems] = useState<Props["items"]>([]);
  const [toggleState,  setToggleState] = useState(true)
  const [search, setSearch] = useState("");

  const handleTogggleState = useCallback(
    () => {
      setToggleState(!toggleState);
    },
    [toggleState]
  );

  const togggleStateOff = () => setToggleState(true);
  
  const onSetSearch = useCallback(
    (search: string) => {
      setSearch(search);
    },
    []
  );

  useEffect(() => {
    const sub = cart.subscribe((value) => setItems(value?.cartItems ?? []));
    return () => sub.unsubscribe();
  }, []);
  return (
    <>
  <Router >
      <div className="App">
      <Provider store={store}>
      <Header toggleState={toggleState} setToggleState={handleTogggleState} search={search} onSetSearch={onSetSearch}/>
      <Routes> 
        <Route path="/" element={<ProductList search={search} setToggleState={togggleStateOff}/>} />
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