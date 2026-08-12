import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatNaira } from "../../lib/whatsapp";
import "./CartDrawer.css";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, total } = useCart();

  return (
    <>
      <div
        className={`drawer__overlay ${isOpen ? "drawer__overlay--visible" : ""}`}
        onClick={() => setIsOpen(false)}
      />
      <aside className={`drawer ${isOpen ? "drawer--open" : ""}`} aria-hidden={!isOpen}>
        <div className="drawer__header">
          <h3>Your bag ({items.length})</h3>
          <button className="drawer__close" onClick={() => setIsOpen(false)} aria-label="Close cart">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="drawer__empty">
            <p>Your bag is empty.</p>
            <Link to="/shop" className="btn btn-primary" onClick={() => setIsOpen(false)}>
              Browse the shop
            </Link>
          </div>
        ) : (
          <>
            <div className="drawer__items">
              {items.map((item) => (
                <div className="drawer__item" key={`${item.id}-${item.size}`}>
                  <img src={item.image} alt={item.name} />
                  <div className="drawer__item-info">
                    <span className="drawer__item-name">{item.name}</span>
                    <span className="drawer__item-size">Size {item.size}</span>
                    <div className="drawer__qty">
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <div className="drawer__item-right">
                    <span className="price-tag">{formatNaira(item.price * item.quantity)}</span>
                    <button
                      className="drawer__remove"
                      onClick={() => removeItem(item.id, item.size)}
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="drawer__footer">
              <div className="drawer__total">
                <span>Total</span>
                <span className="price-tag">{formatNaira(total)}</span>
              </div>
              <Link to="/checkout" className="btn btn-primary btn-block" onClick={() => setIsOpen(false)}>
                Checkout on WhatsApp
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
