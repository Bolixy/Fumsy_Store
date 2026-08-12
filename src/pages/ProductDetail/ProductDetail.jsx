import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchProducts } from "../../lib/api";
import { useCart } from "../../context/CartContext";
import { formatNaira } from "../../lib/whatsapp";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const product = products.find((p) => p.id === id);
  const related = products.filter((p) => p.category === product?.category && p.id !== id).slice(0, 4);

  useEffect(() => {
    setSize(null);
    setError("");
  }, [id]);

  if (loading) return <div className="container pd__state">Loading…</div>;

  if (!product) {
    return (
      <div className="container pd__state">
        <p>We couldn't find that shoe.</p>
        <Link to="/shop" className="btn btn-ghost">Back to shop</Link>
      </div>
    );
  }

  function handleAdd() {
    if (!size) {
      setError("Pick a size first.");
      return;
    }
    addItem(product, size, 1);
  }

  function handleBuyNow() {
    if (!size) {
      setError("Pick a size first.");
      return;
    }
    addItem(product, size, 1);
    navigate("/checkout");
  }

  return (
    <div className="container pd">
      <div className="pd__grid">
        <div className="pd__image-wrap">
          <img src={product.image} alt={product.name} className="pd__image" />
        </div>

        <div className="pd__info">
          <span className="eyebrow">{product.category}</span>
          <h1 className="pd__title">{product.name}</h1>
          <span className="price-tag pd__price">{formatNaira(product.price)}</span>
          <p className="pd__desc">{product.description}</p>

          <div className="pd__sizes">
            <span className="pd__label">Select size</span>
            <div className="pd__size-options">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  className={`pd__size ${size === s ? "pd__size--active" : ""}`}
                  onClick={() => {
                    setSize(s);
                    setError("");
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
            {error && <span className="pd__error">{error}</span>}
          </div>

          <div className="pd__actions">
            <button className="btn btn-ghost btn-block" onClick={handleAdd}>
              Add to bag
            </button>
            <button className="btn btn-primary btn-block" onClick={handleBuyNow}>
              Buy now on WhatsApp
            </button>
          </div>

          <div className="pd__notes">
            <p>• Delivery nationwide, 2–5 working days.</p>
            <p>• Orders are confirmed by our team on WhatsApp before dispatch.</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="pd__related">
          <h2>You may also like</h2>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
