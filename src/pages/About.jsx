import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import hospital from "../assets/Hospital.png";
import reception from "../assets/Reception.png";
import anjali from "../assets/Anjali.jpeg";
import rohan from "../assets/Rohan.jpeg";
import priya from "../assets/Priya.jpeg";
import karan from "../assets/Karan.jpeg";


function About() {
  return (
    <>
      <Navbar />
      <div className="about-page">
        <section className="about-hero">
          <div className="about-hero-text">
            <p className="about-tag">ABOUT US</p>
            <h1>About CarePlus<br />Medical Centre</h1>
            <p className="about-desc">
              Providing trusted healthcare with compassion, innovation and
              excellence for every patient.
            </p>
            <div className="about-buttons">
              <Link to="/login">
                <button className="book-btn">📅 Book Appointment</button>
              </Link>
              <Link to="/services">
                <button className="service-btn">Our Services →</button>
              </Link>
            </div>
          </div>
          <div className="about-hero-image">
            <img src={hospital} alt="CarePlus Medical Centre building" />
          </div>
        </section>

        <section className="who-we-are">
          <div className="who-image">
            <img src={reception} alt="CarePlus reception" />
          </div>
          <div className="who-text">
            <p className="who-tag">WHO WE ARE</p>
            <h2>Caring for Your Health Every Day</h2>
            <p>
              At CarePlus Medical Centre, we are committed to providing
              high-quality healthcare services in a friendly, professional and
              patient-focused environment. Our experienced doctors, nurses and
              healthcare professionals work together to deliver personalised
              medical care for individuals and families.
            </p>
            <p>
              Whether you need a routine health check-up, specialist
              consultation, vaccination, telehealth appointment, or long-term
              disease management, our team is dedicated to helping you achieve
              better health through modern medical practices and compassionate
              care.
            </p>

            <div className="mission-vision">
              <div className="mv-card green">
                <h4>🎯 Our Mission</h4>
                <p>
                  To improve the health and wellbeing of our community by
                  providing accessible, affordable and high-quality healthcare
                  services with compassion, professionalism and integrity.
                </p>
              </div>
              <div className="mv-card blue">
                <h4>👁️ Our Vision</h4>
                <p>
                  To become one of Australia's most trusted medical centres by
                  delivering innovative healthcare solutions, exceptional
                  patient experiences and continuous medical excellence.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="values-why">
          <div className="values-box">
            <h3>Our Values</h3>
            <div className="values-grid">
              <div className="value-item">
                <div className="value-icon">🤝</div>
                <h5>Compassion</h5>
                <p>We treat every patient with kindness, dignity and respect.</p>
              </div>
              <div className="value-item">
                <div className="value-icon">🏅</div>
                <h5>Excellence</h5>
                <p>We deliver outstanding healthcare using modern technology and best practices.</p>
              </div>
              <div className="value-item">
                <div className="value-icon">🛡️</div>
                <h5>Integrity</h5>
                <p>We provide honest, ethical and transparent medical care.</p>
              </div>
              <div className="value-item">
                <div className="value-icon">👥</div>
                <h5>Community</h5>
                <p>We are committed to improving the health and wellbeing of our local community.</p>
              </div>
            </div>
          </div>

          <div className="why-box">
            <h3>Why Choose CarePlus?</h3>
            <ul className="why-list">
              <li>✅ Experienced and qualified doctors</li>
              <li>✅ Modern medical equipment</li>
              <li>✅ Online appointment booking</li>
              <li>✅ Secure online payment</li>
              <li>✅ Telehealth consultations</li>
              <li>✅ Same-day appointments</li>
              <li>✅ Personalised healthcare plans</li>
              <li>✅ Friendly and caring staff</li>
            </ul>
          </div>
        </section>

        <section className="stats">
          <h3>By the Numbers</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <p className="stat-num">25+</p>
              <p className="stat-label">Experienced Doctors</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🙂</div>
              <p className="stat-num">15,000+</p>
              <p className="stat-label">Happy Patients</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <p className="stat-num">98%</p>
              <p className="stat-label">Patient Satisfaction</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🩺</div>
              <p className="stat-num">10+</p>
              <p className="stat-label">Healthcare Services</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <p className="stat-num">6 Days</p>
              <p className="stat-label">Open Every Week</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🕒</div>
              <p className="stat-num">24/7</p>
              <p className="stat-label">Online Appointment Booking</p>
            </div>
          </div>
        </section>

        <section className="healthcare-services">
          <h3>Our Healthcare Services</h3>
          <div className="hs-grid">
            <div className="hs-item"><div className="hs-icon">🩺</div>General Consultation</div>
            <div className="hs-item"><div className="hs-icon">💚</div>Preventive Health Care</div>
            <div className="hs-item"><div className="hs-icon">💉</div>Vaccinations</div>
            <div className="hs-item"><div className="hs-icon">👩</div>Women's Health</div>
            <div className="hs-item"><div className="hs-icon">👨</div>Men's Health</div>
            <div className="hs-item"><div className="hs-icon">🧒</div>Children's Health</div>
            <div className="hs-item"><div className="hs-icon">➕</div>Chronic Disease Management</div>
            <div className="hs-item"><div className="hs-icon">💻</div>Telehealth</div>
            <div className="hs-item"><div className="hs-icon">🧪</div>Pathology Services</div>
            <div className="hs-item"><div className="hs-icon">📋</div>Health Assessments</div>
          </div>
        </section>

        <section className="medical-team">
          <h3>Our Medical Team</h3>
          <div className="team-grid">
            <div className="team-card">
              <img src={anjali} alt="Dr. Anjali Sharma" />
              <div>
                <h4>Dr. Anjali Sharma</h4>
                <p className="team-role">Cardiologist</p>
                <p className="team-exp">12 years experience</p>
              </div>
            </div>
            <div className="team-card">
              <img src={rohan} alt="Dr. Rohan Mehta" />
              <div>
                <h4>Dr. Rohan Mehta</h4>
                <p className="team-role">Dermatologist</p>
                <p className="team-exp">8 years experience</p>
              </div>
            </div>
            <div className="team-card">
              <img src={priya} alt="Dr. Priya Nair" />
              <div>
                <h4>Dr. Priya Nair</h4>
                <p className="team-role">Pediatrician</p>
                <p className="team-exp">10 years experience</p>
              </div>
            </div>
            <div className="team-card">
              <img src={karan} alt="Dr. Karan Verma" />
              <div>
                <h4>Dr. Karan Verma</h4>
                <p className="team-role">Orthopedic</p>
                <p className="team-exp">15 years experience</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-banner">
          <div className="cta-icon">📅</div>
          <div className="cta-text">
            <h4>Ready to Take Care of Your Health?</h4>
            <p>Book your appointment today and experience quality healthcare you can trust.</p>
          </div>
         <Link to="/login">
           <button className="book-btn">Book Appointment →</button>
         </Link>
        </section>

        <section className="contact-info">
          <div className="contact-col">
            <h4>Visit Us</h4>
            <p>📍 CarePlus Medical Centre<br />123 Health Street,<br />Sydney NSW 2000, Australia</p>
            <p>📞 (02) 9876 5432</p>
            <p>✉️ info@careplusmedical.com.au</p>
            <p>🕒 Mon - Sat: 8:00 AM - 6:00 PM<br />Sunday: Closed</p>
          </div>

          <div className="contact-col">
            <h4>Our Location</h4>
            <div className="map-wrapper">
              <iframe
                title="CarePlus Medical Centre location"
                src="https://www.google.com/maps?q=123+Health+Street+Sydney+NSW+2000&output=embed"
                width="100%"
                height="220"
                style={{ border: 0, borderRadius: "10px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="contact-col">
            <h4>Follow Us</h4>
            <ul className="social-list">
              <li>
                <a href="https://www.instagram.com/careplus__medical_center/" target="_blank" rel="noopener noreferrer">
                  📸 instagram.com/careplusmedical
                </a>
              </li>
              <li>
                <a href="https://youtube.com/@careplusmedical" target="_blank" rel="noopener noreferrer">
                  ▶️ youtube.com/@careplusmedical
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;