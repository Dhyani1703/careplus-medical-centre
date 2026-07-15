import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import doctor from "../assets/Doctor.jpg";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="CarePlus Logo" className="logo" />
        </div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>

        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
      </nav>

      <section className="hero">
        <div className="hero-text">
          <p className="welcome">WELCOME TO CAREPLUS MEDICAL CENTRE</p>

          <h1>
            Your Health,<br />
            <span>Our Priority</span>
          </h1>

          <p className="description">
            Compassionate healthcare with experienced doctors, modern facilities
            and personalised treatment for you and your family.
          </p>

          <div className="hero-buttons">
            <Link to="/login">
              <button className="book-btn">📅 Book Appointment</button>
            </Link>

            <Link to="/services">
              <button className="service-btn">🛡️ Our Services</button>
            </Link>
          </div>

          <div className="features">
            <div className="feature">
              <div className="feature-icon blue">👥</div>
              <div>
                <h4>Experienced Doctors</h4>
                <p>Qualified & Caring</p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon green">🕒</div>
              <div>
                <h4>Open 6 Days a Week</h4>
                <p>Mon - Sat: 8AM - 6PM</p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon blue">🛡️</div>
              <div>
                <h4>Quality Care</h4>
                <p>Your Health First</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img src={doctor} alt="Doctors" />
        </div>
      </section>

      <section className="services">
        <p className="services-tag">OUR SERVICES</p>
        <h2>Comprehensive Healthcare Services</h2>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🩺</div>
            <h3>General Consultation</h3>
            <p>Comprehensive health check-ups and treatment for all ages.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">💚</div>
            <h3>Preventive Care</h3>
            <p>Health screenings and preventive services to keep you healthy.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">💉</div>
            <h3>Vaccinations</h3>
            <p>Stay protected with our range of vaccines for all ages.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">💻</div>
            <h3>Telehealth</h3>
            <p>Consult with our doctors from the comfort of your home.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">🧪</div>
            <h3>Pathology</h3>
            <p>On-site pathology services for accurate health insights.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">➕</div>
            <h3>Chronic Disease Management</h3>
            <p>Personalised care for long-term health conditions.</p>
          </div>
        </div>
      </section>
    </div>
  );
}