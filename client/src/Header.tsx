import { useState } from 'react'
import {NavLink} from 'react-router-dom';
import Nav from './Nav';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import SearchBar from './SearchBar';
import SearchOutinedIcon from "@material-ui/icons/SearchOutlined";
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import IconButton from "@material-ui/core/IconButton";
import './Header.css';


export default function  Header() {
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
              <div className="cart-icon">
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
      </div>
    )
  }