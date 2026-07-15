import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Navbar from "../components/Navbar";
import heroImage from "../assets/Hospital.png";

const services = [
  {
    id: "general",
    icon: "🩺",
    title: "General Consultation",
    summary: "Consult our experienced GPs for all your health concerns and medical needs.",
    details: ["Health check-ups", "Medical certificates", "Prescriptions", "Specialist referrals"],
    duration: "15–30 min",
  },
  {
    id: "preventive",
    icon: "🛡️",
    title: "Preventive Care",
    summary: "Stay healthy with regular check-ups, screenings and preventive health assessments.",
    details: ["Annual checks", "Blood pressure monitoring", "Lifestyle advice", "Health assessments"],
    duration: "20–40 min",
  },
  {
    id: "vaccination",
    icon: "💉",
    title: "Vaccinations",
    summary: "We provide a wide range of vaccinations for children, adults and travel health.",
    details: ["Child vaccines", "Flu shots", "Travel vaccines", "Immunisation records"],
    duration: "10–15 min",
  },
  {
    id: "pathology",
    icon: "🧪",
    title: "Pathology Services",
    summary: "On-site pathology services for accurate diagnosis and timely results.",
    details: ["Blood tests", "Swabs", "Routine testing", "Doctor follow-up"],
    duration: "10 min",
  },
  {
    id: "cardiac",
    icon: "❤️",
    title: "Cardiac Care",
    summary: "Heart health assessments, ECG and management of heart-related conditions.",
    details: ["ECG tests", "Heart risk checks", "Hypertension care", "Cardiology referrals"],
    duration: "20–30 min",
  },
  {
    id: "telehealth",
    icon: "💻",
    title: "Telehealth Consultation",
    summary: "Speak with our doctors online from the comfort of your home.",
    details: ["Video calls", "Phone consults", "E-prescriptions", "Follow-up care"],
    duration: "15–20 min",
  },
  {
    id: "chronic",
    icon: "🩹",
    title: "Chronic Disease Management",
    summary: "We help manage long-term conditions like diabetes, asthma, hypertension and more.",
    details: ["Diabetes care", "Asthma management", "Hypertension monitoring", "Ongoing care plans"],
    duration: "20–30 min",
  },
  {
    id: "womens",
    icon: "♀️",
    title: "Women's Health",
    summary: "Comprehensive women's health services at every stage of life.",
    details: ["Pap smears", "Pregnancy care", "Contraception advice", "Menopause support"],
    duration: "20–30 min",
  },
  {
    id: "children",
    icon: "👶",
    title: "Children's Health",
    summary: "Complete healthcare for infants, children and adolescents.",
    details: ["Newborn checks", "Child illness care", "Growth checks", "Teen health support"],
    duration: "15–30 min",
  },
  {
    id: "assessments",
    icon: "📋",
    title: "Health Assessments",
    summary: "Pre-employment, travel and Medicare health assessments.",
    details: ["Pre-employment checks", "Travel health", "Medicare checks", "Health reports"],
    duration: "30–45 min",
  },
];

const whyChoose = [
  { icon: "👨‍⚕️", title: "Experienced Doctors", text: "Highly qualified and caring professionals." },
  { icon: "🏥", title: "Modern Facilities", text: "State-of-the-art equipment and technology." },
  { icon: "🕐", title: "Easy & Flexible Appointments", text: "Book online and choose a time that suits you." },
  { icon: "🛡️", title: "Trusted & Reliable Care", text: "We are committed to your health and wellbeing." },
  { icon: "❤️", title: "Patient Focused", text: "Your health and satisfaction are our top priorities." },
];

export default function Services() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const service = services.find((s) => s.id === selected);

  if (service) {
    return (
      <>
        <Navbar />
        <div className="services-page">
          <button className="back-btn" onClick={() => setSelected(null)}>
            ← Back to Services
          </button>

          <section className="service-detail">
            <div className="detail-icon" style={{ fontSize: "42px" }}>
              {service.icon}
            </div>

            <div>
              <p className="services-tag">SERVICE</p>
              <h1>{service.title}</h1>
              <p>{service.summary}</p>
            </div>
          </section>

          <section className="detail-content">
            <div>
              <h2>What's Included</h2>
              {service.details.map((item, index) => (
                <p className="included-item" key={index}>
                  ✅ {item}
                </p>
              ))}
            </div>

            <div className="booking-box">
              <p>🕐 Duration: {service.duration}</p>
              <p>📞 Same-day slots available</p>
              <button onClick={() => navigate("/login")}>📅 Book Appointment</button>
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="services-page">
        {/* HERO */}
        <section className="services-hero-split">
          <div className="services-hero-left">
            <p className="services-tag">OUR SERVICES</p>
            <h1>
              Comprehensive Care <span className="green-text">For Every Stage of Life</span>
            </h1>
            <p className="services-hero-desc">
              At CarePlus Medical Centre, we provide a wide range of healthcare
              services to support you and your family. Your health is our priority.
            </p>
            <div className="services-hero-buttons">
              <button className="book-btn" onClick={() => navigate("/login")}>
                📅 Book Appointment
              </button>
              <button className="service-btn" onClick={() => navigate("/login")}>
                Find a Doctor 
              </button>
            </div>
          </div>

          <div className="services-hero-right">
            <img src={heroImage} alt="CarePlus Reception" />
          </div>
        </section>

        {/* SERVICES GRID */}
        <section className="healthcare-services-section">
          <h2>Our Healthcare Services</h2>

          <div className="services-list">
            {services.map((service) => (
              <div className="service-card" key={service.id}>
                <div className="service-card-icon" style={{ fontSize: "34px" }}>
                  {service.icon}
                </div>

                <h3>{service.title}</h3>
                <p>{service.summary}</p>

                <button className="learn-more-link" onClick={() => setSelected(service.id)}>
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="why-choose-section">
          <h3>Why Choose CarePlus?</h3>
          <div className="why-choose-grid">
            {whyChoose.map((item, index) => (
              <div className="why-choose-item" key={index}>
                <div className="why-choose-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="services-cta-banner">
          <div className="cta-banner-icon">❤️</div>
          <div className="cta-banner-text">
            <h3>Your Health, Our Priority</h3>
            <p>
              At CarePlus Medical Centre, we are here to provide you with the
              best possible care for a healthier tomorrow.
            </p>
            <button className="book-btn" onClick={() => navigate("/login")}>
              Book Appointment →
            </button>
          </div>
        </section>
      </div>
    </>
  );
}