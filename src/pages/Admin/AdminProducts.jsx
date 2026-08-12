import { useEffect, useState } from "react";
import { fetchProducts, updateProductPrice, updateProductStock } from "../../lib/api";
import { formatNaira } from "../../lib/whatsapp";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [message, setMessage] = useState("");

  function load() {
    setLoading(true);
    fetchProducts().then((data) => {
      setProducts(data);
      setDrafts(Object.fromEntries(data.map((p) => [p.id, p.price])));
      setLoading(false);
    });
  }

  useEffect(load, []);

  async function savePrice(product) {
    const newPrice = Number(drafts[product.id]);
    if (!newPrice || newPrice <= 0) return;
    setSavingId(product.id);
    setMessage("");
    try {
      await updateProductPrice(product.id, newPrice);
      setMessage(`Updated "${product.name}" to ${formatNaira(newPrice)}.`);
      load();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSavingId(null);
    }
  }

  async function toggleStock(product) {
    setSavingId(product.id);
    try {
      await updateProductStock(product.id, product.inStock === false);
      load();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSavingId(null);
    }
  }

  if (loading) return <p className="muted">Loading products…</p>;

  return (
    <div>
      <h1 className="admin-shell__title">Prices & stock</h1>
      {message && <p className="admin-message">{message}</p>}
      <table className="admin-table admin-table--products">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price (₦)</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="admin-table__product">
                <img src={p.image} alt={p.name} />
                <span>{p.name}</span>
              </td>
              <td>{p.category}</td>
              <td>
                <input
                  type="number"
                  className="admin-price-input"
                  value={drafts[p.id] ?? p.price}
                  onChange={(e) => setDrafts((d) => ({ ...d, [p.id]: e.target.value }))}
                />
              </td>
              <td>
                <button
                  className={`admin-stock-toggle ${p.inStock === false ? "admin-stock-toggle--off" : ""}`}
                  onClick={() => toggleStock(p)}
                  disabled={savingId === p.id}
                >
                  {p.inStock === false ? "Out of stock" : "In stock"}
                </button>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => savePrice(p)}
                  disabled={savingId === p.id}
                >
                  {savingId === p.id ? "Saving…" : "Save"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
