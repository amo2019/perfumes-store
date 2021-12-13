import './PerfumeCard.css';
import { Product } from './perfumes';

export default function  PerfumeCard(product: Product) {
return (
  <div className="card-container">
    <div className="card-title" >
      {product.title}
    </div>
  </div>
  )
}