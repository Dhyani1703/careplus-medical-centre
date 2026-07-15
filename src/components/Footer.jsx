import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../App.css";

export default function Footer() {
  const handleSubscribe = (event) => {
    event.preventDefault();
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* CAREPLUS INFORMATION */}
        <div className="footer-brand">
          <img
            src={logo}
            alt="CarePlus Medical Centre"
            className="footer-logo-img"
          />

          <p>
            CarePlus Medical Centre is committed to providing high-quality
            healthcare with compassion, innovation and excellence.
          </p>

          <div className="footer-socials">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              📘
            </a>

            <a
              href="https://www.instagram.com/careplus__medical_center/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              📸
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              💼
            </a>

            <a
              href="https://youtube.com/@careplusmedical"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              ▶️
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-column">
          <h4>Quick Links</h4>

          <ul>
            <li>
              <Link to="/doctors">Find Doctor</Link>
            </li>

            <li>
              <Link to="/appointment">Appointment</Link>
            </li>

            <li>
              <Link to="/services">Services</Link>
            </li>

            <li>
              <Link to="/about">About Us</Link>
            </li>

            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* OUR SERVICES */}
        <div className="footer-column">
          <h4>Our Services</h4>

          <ul>
            <li>
              <Link to="/services">General Consultation</Link>
            </li>

            <li>
              <Link to="/services">Preventive Care</Link>
            </li>

            <li>
              <Link to="/services">Vaccinations</Link>
            </li>

            <li>
              <Link to="/services">Telehealth</Link>
            </li>

            <li>
              <Link to="/services">Pathology</Link>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div className="footer-column">
          <h4>Support</h4>

          <ul>
            <li>
              <a href="#faqs">FAQs</a>
            </li>

            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>

            <li>
              <a href="#terms">Terms &amp; Conditions</a>
            </li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-newsletter">
          <h4>Subscribe to Our Newsletter</h4>

          <p>Get health tips and updates.</p>

          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              required
            />

            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>
            © {new Date().getFullYear()} CarePlus Medical Centre. All rights
            reserved.
          </p>

          <p>
            Compassionate Care
            <span>|</span>
            Trusted Doctors
            <span>|</span>
            Better Health
          </p>
        </div>
      </div>
    </footer>
  );
}