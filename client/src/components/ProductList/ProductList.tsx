import React, { useEffect, useMemo } from "react";
import PerfumeCard from '../PerfumeCard/PerfumeCard';
import './productList.css';
import {fetchProducts, selectProducts, store} from '../../lib/store';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../perfumes';
import { Popular } from "../Popular/Popular";

export type RootState = ReturnType<typeof store.getState>;


export default function ProductList({search, setToggleState}: any) {
  const products = useSelector(selectProducts);
  const productsSelector = useSelector(
    (state: RootState) => state.product
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
        <a className="most-popular" href="#popular">
          MOST POPULAR
        </a>
        <div className="perfume-cards">
           {/* products */}
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
        <section id="popular">
        <Popular />
        </section>
      </div>
    )
}
