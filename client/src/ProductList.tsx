import { useState, useEffect } from 'react';
import PerfumeCard from './PerfumeCard';
import './ProductList.css';
import {getProducts} from './lib/products';
import { Product } from './perfumes';



export default function ProductList() {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
        getProducts()?.then(setProducts);
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
