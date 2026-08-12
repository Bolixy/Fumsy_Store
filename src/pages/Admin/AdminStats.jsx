import { useEffect, useState } from "react";
import { fetchVisitStats, fetchOrders } from "../../lib/api";
import { formatNaira } from "../../lib/whatsapp";

export default function AdminStats() {
  const [visits, setVisits] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchVisitStats(), fetchOrders()])
      .then(([visitData, orderData]) => {
        setVisits(visitData);
        setOrders(orderData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="muted">Loading overview…</p>;

  const revenue = orders.reduce((sum, o) => sum + Number(o.total), 0);
  const pending = orders.filter((o) => o.status === "pending").length;

  return (
    <div>
      <h1 className="admin-shell__title">Overview</h1>
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <span className="admin-stat-card__label">Total site visits</span>
          <span className="admin-stat-card__value">{visits.total}</span>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-card__label">Visits, last 7 days</span>
          <span className="admin-stat-card__value">{visits.last7Days}</span>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-card__label">Total orders</span>
          <span className="admin-stat-card__value">{orders.length}</span>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-card__label">Pending orders</span>
          <span className="admin-stat-card__value">{pending}</span>
        </div>
        <div className="admin-stat-card admin-stat-card--wide">
          <span className="admin-stat-card__label">Revenue (all orders)</span>
          <span className="admin-stat-card__value">{formatNaira(revenue)}</span>
        </div>
      </div>

      <h2 className="admin-shell__subtitle">Most visited pages</h2>
      {visits.byPath.length === 0 ? (
        <p className="muted">No visits recorded yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Page</th>
              <th>Visits</th>
            </tr>
          </thead>
          <tbody>
            {visits.byPath.slice(0, 8).map((row) => (
              <tr key={row.path}>
                <td>{row.path}</td>
                <td>{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
