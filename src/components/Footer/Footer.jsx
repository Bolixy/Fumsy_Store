import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo size="md" variant="light" />
          <p className="footer__tagline">
            Footwear, handpicked — heels, wedges, flats and kids' shoes, sent
            straight to your door.
          </p>
        </div>

        <div className="footer__col">
          <span className="footer__heading">Shop</span>
          <Link to="/shop">All shoes</Link>
          <Link to="/shop?category=Heels">Heels</Link>
          <Link to="/shop?category=Wedges">Wedges</Link>
          <Link to="/shop?category=Kids">Kids</Link>
        </div>

        <div className="footer__col">
          <span className="footer__heading">Store</span>
          <Link to="/about">About us</Link>
          <a href="https://wa.me/2348169644795" target="_blank" rel="noreferrer">
            Chat on WhatsApp
          </a>
          <Link to="/admin">Admin</Link>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Funmsy Store. All rights reserved.</span>
      </div>
    </footer>
  );
}
