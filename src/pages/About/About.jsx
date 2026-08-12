import { Link } from "react-router-dom";
import images from "../../lib/productImages";
import "./About.css";

const VALUES = [
  {
    title: "Comfort first",
    text: "Every pair is chosen for a wearable heel height and a footbed that holds up past the first hour out.",
  },
  {
    title: "True-to-photo",
    text: "What's on your screen is what gets packed. No filters, no surprise colours at delivery.",
  },
  {
    title: "A real person on WhatsApp",
    text: "No call centres. You size up, confirm and pay with the same person who packs your order.",
  },
];

export default function About() {
  return (
    <div className="about">
      <section className="about__hero">
        <div className="container about__hero-inner">
          <span className="eyebrow">Our story</span>
          <h1>Small store. Big shoe closet energy.</h1>
          <p>
            Funmsy Store started as a personal shoe rack that friends kept
            asking to borrow from. Today it's a small, careful catalogue of
            heels, wedges, flats and kids' shoes — sourced pair by pair,
            sized properly, and sold the way we'd want to buy: no stress,
            straight to WhatsApp.
          </p>
        </div>
      </section>

      <section className="container about__split">
        <img src={images["im19.jpg"]} alt="Row of bow block heel pumps in five colours" className="about__img" />
        <div className="about__split-text">
          <span className="eyebrow">How we work</span>
          <h2>Picked, not mass-produced</h2>
          <p>
            We don't stock a shoe unless we'd wear it ourselves. Every new
            style goes through a fit check before it's listed, and we keep
            the catalogue small on purpose — easier to restock, easier to
            keep prices honest.
          </p>
        </div>
      </section>

      <section className="container about__values">
        <span className="eyebrow">What matters to us</span>
        <h2>Three things we don't compromise on</h2>
        <div className="about__values-grid">
          {VALUES.map((v) => (
            <div className="value-card" key={v.title}>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about__cta">
        <div className="container about__cta-inner">
          <div>
            <h2>Have a size or fit question?</h2>
            <p>Send us a message before you order — we're happy to advise.</p>
          </div>
          <div className="about__cta-actions">
            <a href="https://wa.me/2348169644795" target="_blank" rel="noreferrer" className="btn btn-whatsapp">
              Message us on WhatsApp
            </a>
            <Link to="/shop" className="btn btn-ghost">Browse shoes</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
