import { useState, useEffect } from 'react';
import PerfumeCard from '../PerfumeCard/PerfumeCard';
import './productList.css';
import {fetchProducts, selectProducts, store} from '../../lib/store';
import { Provider, useSelector, useDispatch } from "react-redux";

import { Product } from '../../perfumes';

export default function ProductList() {
  const products = useSelector(selectProducts);
  const state = useSelector(state=>state);
  console.log("store:", store.getState());
  console.log("products:", products);
  
  // const [products, setProducts] = useState<Product[]>();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
        // getProducts()?.then(setProducts);
  }, []);
   if(!products ) return <></>;

 return (
      <div className="perfume-container">
        <div className="most-popular">
          MOST POPULAR
        </div>
        <div className="perfume-cards">
           products
        </div>
        <div>
          <hr className="divider-line"/>
        </div>
        <div className="product-list-card-container">
          {products.map((card: Product) => (
            <div className="product-list-card" key={card?.id}>
              <PerfumeCard {...card} />
            </div>
          ))}
        </div>
      </div>
    )
}
