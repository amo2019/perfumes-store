import './PerfumeCard.css';
import { Product } from './perfumes';

export default function  PerfumeCard(product: Product) {
return (
  <div className="card-container">
    <img src={product.image} alt={product.title} />
    <div className="card-title" >
      {product.title}
    </div>
  </div>
  )
}