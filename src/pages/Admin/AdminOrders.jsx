import { useEffect, useState } from "react";
import { fetchOrders, updateOrderStatus } from "../../lib/api";
import { formatNaira } from "../../lib/whatsapp";

const STATUSES = ["pending", "confirmed", "fulfilled", "cancelled"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  function load() {
    setLoading(true);
    fetchOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function changeStatus(id, status) {
    await updateOrderStatus(id, status);
    load();
  }

  if (loading) return <p className="muted">Loading orders…</p>;

  return (
    <div>
      <h1 className="admin-shell__title">Customer orders</h1>
      {orders.length === 0 ? (
        <p className="muted">No orders placed yet.</p>
      ) : (
        <div className="admin-orders">
          {orders.map((o) => (
            <div className="admin-order" key={o.id}>
              <button
                className="admin-order__summary"
                onClick={() => setExpanded(expanded === o.id ? null : o.id)}
              >
                <div>
                  <span className="admin-order__customer">{o.customer_name}</span>
                  <span className="admin-order__date">
                    {new Date(o.created_at).toLocaleString("en-NG")}
                  </span>
                </div>
                <span className="price-tag">{formatNaira(o.total)}</span>
                <span className={`admin-order__status admin-order__status--${o.status}`}>
                  {o.status}
                </span>
              </button>

              {expanded === o.id && (
                <div className="admin-order__details">
                  <p><strong>Phone:</strong> {o.customer_phone}</p>
                  <p><strong>Address:</strong> {o.customer_address}</p>
                  {o.note && <p><strong>Note:</strong> {o.note}</p>}
                  <ul className="admin-order__items">
                    {o.items.map((item, i) => (
                      <li key={i}>
                        {item.name} — Size {item.size} × {item.quantity} —{" "}
                        {formatNaira(item.price * item.quantity)}
                      </li>
                    ))}
                  </ul>
                  <div className="admin-order__status-row">
                    <span>Update status:</span>
                    {STATUSES.map((s) => (
                      <button
                        key={s}
                        className={`admin-order__status-btn ${o.status === s ? "admin-order__status-btn--active" : ""}`}
                        onClick={() => changeStatus(o.id, s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
