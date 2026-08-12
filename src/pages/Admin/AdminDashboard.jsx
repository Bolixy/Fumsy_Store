import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../components/Logo/Logo";
import AdminStats from "./AdminStats";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
import "./Admin.css";

const TABS = [
  { id: "stats", label: "Overview" },
  { id: "products", label: "Prices & stock" },
  { id: "orders", label: "Orders" },
];

export default function AdminDashboard() {
  const { isAdmin, loading, signOut } = useAuth();
  const [tab, setTab] = useState("stats");

  if (loading) return <div className="admin-shell__loading">Loading…</div>;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="admin-shell">
      <aside className="admin-shell__sidebar">
        <Logo size="sm" />
        <nav className="admin-shell__nav">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`admin-shell__nav-item ${tab === t.id ? "admin-shell__nav-item--active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <button className="admin-shell__logout" onClick={signOut}>
          Sign out
        </button>
      </aside>

      <main className="admin-shell__content">
        {tab === "stats" && <AdminStats />}
        {tab === "products" && <AdminProducts />}
        {tab === "orders" && <AdminOrders />}
      </main>
    </div>
  );
}
