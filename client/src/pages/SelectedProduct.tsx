import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {getProductById, API_SERVER} from '../lib/products';
import './SelectedProduct.css';
import { Product, initialState } from '../perfumes';

const ProductSelected = (): JSX.Element => {
  const [product, setProduct] = useState<Product>();
  const [price, setPrice] = useState();


  const {id} = useParams();
  useEffect(() => {
      if (id) {
        getProductById(id).then(setProduct);
      } else {
        setProduct(initialState);
      }
  }, [id]);
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
          <div className="add-to-cart-button-container">
            <button id="add-to-cart-button" >Add To Cart</button>
          </div>
          <div className="product-desc">
            {product.description}
          </div>
        </div>
      </div>
    )
  }

  export default ProductSelected;
