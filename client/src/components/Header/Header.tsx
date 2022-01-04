import React, { useState, useEffect} from "react";
import {NavLink} from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Login from "../Login/Login";
import CartDropdown from '../CartDropdown/CartDropdown'
import Nav from '../Nav';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import SearchBar from '../SearchBar/SearchBar';
import SearchOutinedIcon from "@material-ui/icons/SearchOutlined";
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import IconButton from "@material-ui/core/IconButton";
import './header.css';

import {
  store,
} from "../../lib/store";
import { CartItem, cart, clearCart } from "../../lib/cart";
import { currency } from "../../lib/products";

interface Props {
  setToggleState: React.Dispatch<React.SetStateAction<boolean>>;
  toggleState: boolean;
  history?: History;
  cartItems?: CartItem[];
  search: string;
  onSetSearch: (search: string) => void;
}

 const  Header: React.FC<Props> = ({toggleState, setToggleState, search, onSetSearch}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [showLogin, setShowLogin] = useState(false);

 

  useEffect(() => {
    const sub = cart.subscribe((value) => setItems(value?.cartItems ?? []));
    return () => sub.unsubscribe();
  }, []);
 const [showSearchField, setShowSearchField] = useState(false)
 const toggleSearchField = () => {
    setShowSearchField(!showSearchField);
    if(showSearchField) onSetSearch("");
  }
  
    return (
      <div className="header">
       <div className="nav-container">
        <NavLink to="/" className="home-title"> PERFUMES </NavLink>
          <div className="title-block">
              <Nav  className="nav-item"/>
          </div>
          <div className="search-block" {...toggleState ? "search-block-show" : null}>
          
            <div className="search-icon">
                <IconButton onClick={toggleSearchField}> 
                  <SearchOutinedIcon />
                </IconButton>
              <div className="search-container">
               {showSearchField && <SearchBar onSetSearch={onSetSearch} search={search}/>}
               </div>
            </div>
            </div>
              <div className="cart-icon topbarIconItem"  onClick={() => { setToggleState(!toggleState); }}>
               <IconButton >
                  <AddShoppingCartOutlinedIcon />
                </IconButton>
              <span className="topbarIconBadge">{items.length}</span>
              </div>
              <div className="account-icon" onClick={() => setShowLogin(!showLogin)}>
                <div className="login-icon-container">
                <IconButton >
                  <PermIdentityOutlinedIcon/>
                </IconButton>
                </div>
              </div>
          </div>
          {toggleState ? null : <CartDropdown cartItems={items} clearCart={clearCart} toggleState={toggleState} setToggleState={setToggleState}/>}
          {showLogin && <Login/>}
      </div>
    )
  }
  export default Header;