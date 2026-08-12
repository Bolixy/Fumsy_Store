import { Link } from "react-router-dom";
import { formatNaira } from "../../lib/whatsapp";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const outOfStock = product.inStock === false;

  return (
    <Link to={`/shop/${product.id}`} className="pcard">
      <div className="pcard__image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" className="pcard__image" />
        {outOfStock && <span className="pcard__badge">Out of stock</span>}
      </div>
      <div className="pcard__body">
        <span className="pcard__category">{product.category}</span>
        <h3 className="pcard__name">{product.name}</h3>
        <span className="price-tag">{formatNaira(product.price)}</span>
      </div>
    </Link>
  );
}
