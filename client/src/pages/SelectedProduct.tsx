import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {API_SERVER} from '../lib/products';
import {selectProducts} from '../lib/store'
import './selectedProduct.css';
import { Product, initialState } from '../perfumes';
import { useSelector } from "react-redux";
import { addToCart } from "../lib/cart";
import { useLoggedIn } from "../lib/cart";

const ProductSelected = (): JSX.Element => {
  const [product, setProduct] = useState<Product>();
  //const [price, setPrice] = useState();
  const products = useSelector(selectProducts);
  const loggedIn = useLoggedIn();
  const {id} = useParams();
  useEffect(() => {
      if (id) {
        setProduct(products.find(product => product.id === Number(id)))
      } else {
        setProduct(initialState);
      }
  }, [id, products]);

   if(!product ) return <></>;
   
    return (
      <div className="product-details-container App-body">
        <div>
        <div className="product-card">
          <img src={`${API_SERVER}/${product.image}`} className="product-selected-image" alt="product"/>
        </div>
        </div>
        <div className="product-details">
        <div className="title">
            {product.title}
          </div>
          <div className="price">
           PRICE: ${product.price} USD
          </div>
          <div className="add-to-cart-button">  
                  
            <button style={ !loggedIn ? { opacity: 0.65, cursor: "not-allowed", color: "red"} : {}} title={!loggedIn? "Please login to activate Add To Cart button!": ""} className="cart-button" onClick={() => addToCart(product.id.toString())}>Add To Cart</button>
          </div>
          <div className="product-desc">
            {product.description}
          </div>
        </div>
      </div>
    )
  }

  export default ProductSelected;
