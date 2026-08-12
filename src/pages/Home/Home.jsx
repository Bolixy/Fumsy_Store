import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { fetchProducts } from "../../lib/api";
import images from "../../lib/productImages";
import "./Home.css";

const CATEGORY_BLURBS = [
  { name: "Heels", img: "im4.jpg" },
  { name: "Wedges", img: "im9.jpg" },
  { name: "Flats", img: "im15.jpg" },
  { name: "Kids", img: "im1.jpg" },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const featured = products.slice(0, 8);

  return (
    <div className="home">
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="eyebrow">New arrivals weekly</span>
            <h1 className="hero__title">
              Shoes worth <em>walking</em> into the room in.
            </h1>
            <p className="hero__text">
              Handpicked heels, wedges, flats and kids' shoes — every pair
              photographed true to colour, every order confirmed by a real
              person on WhatsApp.
            </p>
            <div className="hero__actions">
              <Link to="/shop" className="btn btn-primary">
                Shop the collection
              </Link>
              <a
                href="https://wa.me/2348169644795"
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                Chat with us
              </a>
            </div>
          </div>
          <div className="hero__gallery">
            <img src={images["im4.jpg"]} alt="Wine croc-embossed slingback heels" className="hero__img hero__img--tall" />
            <img src={images["im9.jpg"]} alt="White cutout wedge sandals" className="hero__img hero__img--short" />
          </div>
        </div>
      </section>

      <section className="container categories">
        <div className="section-heading">
          <span className="eyebrow">Shop by category</span>
          <h2>Find your pair</h2>
        </div>
        <div className="categories__grid">
          {CATEGORY_BLURBS.map((cat) => (
            <Link
              to={`/shop?category=${cat.name}`}
              className="cat-card"
              key={cat.name}
            >
              <img src={images[cat.img]} alt={cat.name} />
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container featured">
        <div className="section-heading">
          <span className="eyebrow">Bestsellers</span>
          <h2>Fresh off the shelf</h2>
        </div>
        {loading ? (
          <p className="muted">Loading products…</p>
        ) : (
          <div className="product-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        <div className="featured__cta">
          <Link to="/shop" className="btn btn-ghost">
            View full shop
          </Link>
        </div>
      </section>

      <section className="strip">
        <div className="container strip__inner">
          <div className="strip__item">
            <strong>Order on WhatsApp</strong>
            <span>Confirm sizes and pay directly with our team.</span>
          </div>
          <div className="strip__item">
            <strong>Delivery nationwide</strong>
            <span>We ship across Nigeria — pay on delivery in select areas.</span>
          </div>
          <div className="strip__item">
            <strong>Real product photos</strong>
            <span>What you see is exactly what gets packed and sent.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
