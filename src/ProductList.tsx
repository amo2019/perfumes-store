import PerfumeCard from './PerfumeCard';
import './ProductList.css';
import products, { Product } from './perfumes';


export default function ProductList() {
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
