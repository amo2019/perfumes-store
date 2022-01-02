import React, { useState, useEffect } from "react";
import {NavLink, Link} from 'react-router-dom';
import CartDropdown from '../CartDropdown/CartDropdown'
import Nav from '../Nav';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import SearchBar from '../SearchBar/SearchBar';
import SearchOutinedIcon from "@material-ui/icons/SearchOutlined";
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import IconButton from "@material-ui/core/IconButton";
import './header.css';


import { CartItem, cart, clearCart } from "../../lib/cart";
import { currency } from "../../lib/products";
import { History } from 'history';

interface Props {
  setToggleState: React.Dispatch<React.SetStateAction<boolean>>;
  toggleState: boolean;
  history?: History;
  cartItems?: CartItem[];
}

 const  Header: React.FC<Props> = ({toggleState, setToggleState, history}) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const sub = cart.subscribe((value) => setItems(value?.cartItems ?? []));
    return () => sub.unsubscribe();
  }, []);
 const [showSearchField, setShowSearchField] = useState(false)
 const toggleSearchField = () => {
    setShowSearchField(!showSearchField);
  }
  
    return (
      <div className="header">
       <div className="nav-container">
        <NavLink to="/" className="home-title"> PERFUMES </NavLink>
          <div className="title-block">
              <Nav  className="nav-item"/>
          </div>
          <div className="search-block">
          
            <div className="search-icon">
                <IconButton onClick={toggleSearchField}> 
                  <SearchOutinedIcon />
                </IconButton>
              <div className="search-container">
               {showSearchField && <SearchBar />}
               </div>
            </div>
            </div>
              <div className="cart-icon"  onClick={() => {
          setToggleState(!toggleState);
        }}>
                <IconButton >
                  <AddShoppingCartOutlinedIcon />
                </IconButton>
              </div>
              <div className="account-icon">
                <div className="login-icon-container">
                <IconButton >
                  <PermIdentityOutlinedIcon/>
                </IconButton>
                </div>
              </div>
          </div>
          {toggleState ? null : <CartDropdown cartItems={items} clearCart={clearCart} toggleState={toggleState}  history={history} setToggleState={setToggleState}/>}
      </div>
    )
  }

  export default Header;