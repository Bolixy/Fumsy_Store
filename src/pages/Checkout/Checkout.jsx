import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { buildWhatsAppOrderLink, formatNaira } from "../../lib/whatsapp";
import { createOrder } from "../../lib/api";
import "./Checkout.css";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "", note: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function updateField(field, value) {
    setCustomer((c) => ({ ...c, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!customer.name || !customer.phone || !customer.address) {
      setError("Fill in your name, phone number and delivery address.");
      return;
    }

    setSubmitting(true);
    try {
      await createOrder({ items, customer, total });
      const link = buildWhatsAppOrderLink({ items, customer, total });
      window.open(link, "_blank");
      clearCart();
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Something went wrong saving your order, but you can still message us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="container checkout__empty">
        <h1>Your bag is empty</h1>
        <p>Add a pair to your bag before checking out.</p>
        <Link to="/shop" className="btn btn-primary">Browse the shop</Link>
      </div>
    );
  }

  return (
    <div className="container checkout">
      <div>
        <span className="eyebrow">Checkout</span>
        <h1>Confirm your order</h1>
        <p className="checkout__intro">
          Fill in your details below. We'll open WhatsApp with your order
          summary ready to send — our team confirms sizes and payment there.
        </p>

        <form className="checkout__form" onSubmit={handleSubmit}>
          <label>
            Full name
            <input value={customer.name} onChange={(e) => updateField("name", e.target.value)} placeholder="e.g. Amaka Johnson" />
          </label>
          <label>
            WhatsApp / phone number
            <input value={customer.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="080..." />
          </label>
          <label>
            Delivery address
            <textarea rows={3} value={customer.address} onChange={(e) => updateField("address", e.target.value)} placeholder="Street, area, city, state" />
          </label>
          <label>
            Note (optional)
            <textarea rows={2} value={customer.note} onChange={(e) => updateField("note", e.target.value)} placeholder="Any special instructions" />
          </label>

          {error && <p className="checkout__error">{error}</p>}

          <button type="submit" className="btn btn-whatsapp btn-block" disabled={submitting}>
            {submitting ? "Preparing your order…" : "Send order to WhatsApp"}
          </button>
        </form>
      </div>

      <aside className="checkout__summary">
        <h2>Order summary</h2>
        <div className="checkout__items">
          {items.map((item) => (
            <div className="checkout__item" key={`${item.id}-${item.size}`}>
              <img src={item.image} alt={item.name} />
              <div>
                <span className="checkout__item-name">{item.name}</span>
                <span className="checkout__item-meta">Size {item.size} · Qty {item.quantity}</span>
              </div>
              <span className="price-tag">{formatNaira(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="checkout__total">
          <span>Total</span>
          <span className="price-tag">{formatNaira(total)}</span>
        </div>
      </aside>
    </div>
  );
}
