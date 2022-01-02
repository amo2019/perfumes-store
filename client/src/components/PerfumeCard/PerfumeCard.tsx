import './perfumeCard.css';
import { Product } from '../../perfumes';
import { useNavigate } from 'react-router-dom';

export default function  PerfumeCard(product: Product) {
  const navigate = useNavigate();

const onCardClick = () => {
  navigate(`/perfume/${product.id}`);
}

  return (
  <div className="card-container" onClick={onCardClick}>
    <img src={product.image} className='card-img' alt={product.title} />
    <div className="card-title" >
      {product.title}
    </div>
  </div>
  )
}