import React, { useEffect, useMemo } from "react";
import PerfumeCard from '../PerfumeCard/PerfumeCard';
import './productList.css';
import {fetchProducts, selectProducts, store} from '../../lib/store';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../perfumes';

export type RootState = ReturnType<typeof store.getState>;


export default function ProductList({search, setToggleState}: any) {
  const products = useSelector(selectProducts);
  const productsSelector = useSelector(
    (state: RootState) => state
  );
 
  const filteredProducts = useMemo(
    () =>
      (productsSelector ?? []).filter(
        (product: { title: string | any[]; description: any; }) =>
          product.title
            .includes(search) ||
          product.description
            .toLocaleLowerCase()
            .includes(search)
      ),
    [productsSelector, search]
  );
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
   if(!products ) return <></>;


 return (
      <div className="perfume-container" >
        <div onClick={() => setToggleState()}>
        <div className="most-popular">
          MOST POPULAR
        </div>
        <div className="perfume-cards">
           products
        </div>
        <div className="divider-line"/>
        </div>
        <div className="product-list-card-container">
          {filteredProducts.map((card: Product) => (
            <div className="product-list-card" key={card?.id}>
              <PerfumeCard {...card} />
            </div>
          ))}
        </div>
      </div>
    )
}
