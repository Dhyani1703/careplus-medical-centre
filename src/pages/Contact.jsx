import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import reception from "../assets/Reception.png";
import "../App.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    if (submitted) {
      setSubmitted(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <Navbar />

      <main className="contact-page">
        {/* HERO */}
        <section className="contact-hero">
  <div className="contact-hero-text">
    <p className="contact-tag">CONTACT US</p>

    <h1>
      We&apos;re Here to
      <br />
      Help You
    </h1>

    <div className="contact-heading-line"></div>

    <p className="contact-description">
      Have a question, need assistance or want to book an appointment?
      Our friendly team is ready to assist you.
    </p>

    <div className="contact-hero-buttons">
      <a href="tel:+61298765432">
        <button type="button" className="contact-call-btn">
          📞 Call Us Now
        </button>
      </a>

      <Link to="/appointment">
        <button type="button" className="contact-appointment-btn">
          📅 Book Appointment
        </button>
      </Link>
    </div>
  </div>

  <div className="contact-hero-image">
    <img
      src={reception}
      alt="CarePlus medical centre reception"
    />
  </div>
</section>

        {/* FORM AND CONTACT DETAILS */}
        <section className="contact-main">
          <div className="contact-form-box">
            <h3>Send Us a Message</h3>

            <p className="contact-form-subtitle">
              Fill out the form below and we will get back to you shortly.
            </p>

            {submitted && (
              <p className="success-text">
                Thank you! Your message has been sent. We&apos;ll be in touch
                shortly.
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                />
              </div>

              <div className="form-row">
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />

                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                />
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={6}
                required
              />

              <button type="submit" className="book-btn full-width">
                Send Message
              </button>
            </form>
          </div>

          <div className="contact-details-box">
            <h3>Contact Information</h3>

            <p className="contact-details-subtitle">
              You can also reach us using the details below.
            </p>

            <div className="contact-detail-item">
              <span className="contact-detail-icon">📞</span>

              <div>
                <h4>Phone</h4>
                <a href="tel:+61298765432">(02) 9876 5432</a>
              </div>
            </div>

            <div className="contact-detail-item">
              <span className="contact-detail-icon">✉️</span>

              <div>
                <h4>Email</h4>
                <a href="mailto:info@careplusmedical.com.au">
                  info@careplusmedical.com.au
                </a>
              </div>
            </div>

            <div className="contact-detail-item">
              <span className="contact-detail-icon">📍</span>

              <div>
                <h4>Address</h4>
                <p>123 Health Street, Sydney NSW 2000, Australia</p>
              </div>
            </div>

            <div className="contact-detail-item">
              <span className="contact-detail-icon">🕒</span>

              <div>
                <h4>Opening Hours</h4>
                <p>
                  Mon - Sat: 8:00 AM - 6:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="contact-features-strip">
          <div className="contact-feature-item">
            <div className="contact-feature-icon">🎧</div>

            <div>
              <h4>Friendly Support</h4>
              <p>Our team is here to help you with any questions.</p>
            </div>
          </div>

          <div className="contact-feature-item">
            <div className="contact-feature-icon">🕒</div>

            <div>
              <h4>Quick Response</h4>
              <p>We aim to respond to all enquiries promptly.</p>
            </div>
          </div>

          <div className="contact-feature-item">
            <div className="contact-feature-icon">🛡️</div>

            <div>
              <h4>Trusted Care</h4>
              <p>Your health and privacy are our priority.</p>
            </div>
          </div>

          <div className="contact-feature-item">
            <div className="contact-feature-icon">👥</div>

            <div>
              <h4>Community Focused</h4>
              <p>Proudly serving our local community with care.</p>
            </div>
          </div>
        </section>

        {/* MAP */}
        <section className="contact-map-section">
          <div className="contact-map-text">
            <h3>Find Us Here</h3>

            <p>
              We are conveniently located in the heart of Sydney and are easy
              to reach by car or public transport.
            </p>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=123+Health+Street+Sydney+NSW+2000"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button type="button" className="book-btn">
                Get Directions
              </button>
            </a>
          </div>

          <div className="map-wrapper contact-map-wrapper">
            <iframe
              title="CarePlus Medical Centre location"
              src="https://www.google.com/maps?q=123+Health+Street+Sydney+NSW+2000&output=embed"
              width="100%"
              height="320"
              style={{
                border: 0,
                borderRadius: "12px",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}