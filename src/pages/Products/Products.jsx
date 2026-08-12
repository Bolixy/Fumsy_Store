import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { fetchProducts } from "../../lib/api";
import { CATEGORIES } from "../../lib/products-seed";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [products, activeCategory, query]);

  function setCategory(cat) {
    if (cat === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="container shop">
      <div className="shop__header">
        <div>
          <span className="eyebrow">The full collection</span>
          <h1>Shop all shoes</h1>
        </div>
        <input
          type="search"
          placeholder="Search shoes…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="shop__search"
        />
      </div>

      <div className="shop__filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`shop__filter ${activeCategory === cat ? "shop__filter--active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="muted">Loading products…</p>
      ) : filtered.length === 0 ? (
        <p className="muted">No shoes match that search yet.</p>
      ) : (
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
