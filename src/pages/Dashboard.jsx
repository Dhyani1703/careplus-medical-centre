import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import doctors from "../data/doctors";
import DoctorCard from "../components/DoctorCard";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [appointments, setAppointments] = useState([]);

  const availableDoctors = useMemo(
    () => doctors.filter((doctor) => doctor.available !== false),
    []
  );

  const dashboardDoctors = availableDoctors.slice(0, 4);

  const loadAppointments = () => {
    try {
      const savedAppointments = JSON.parse(
        localStorage.getItem("careplusAppointments") || "[]"
      );

      setAppointments(
        Array.isArray(savedAppointments) ? savedAppointments : []
      );
    } catch (error) {
      console.error("Unable to load appointments:", error);
      setAppointments([]);
    }
  };

  useEffect(() => {
    loadAppointments();

    const handleDataUpdate = () => {
      loadAppointments();
    };

    window.addEventListener("careplusDataUpdated", handleDataUpdate);
    window.addEventListener("storage", handleDataUpdate);

    return () => {
      window.removeEventListener(
        "careplusDataUpdated",
        handleDataUpdate
      );
      window.removeEventListener("storage", handleDataUpdate);
    };
  }, []);

  const upcomingCount = appointments.filter(
    (appointment) =>
      appointment.appointmentStatus === "upcoming" &&
      appointment.paymentStatus === "pending"
  ).length;

  const pendingPaymentCount = appointments.filter(
    (appointment) => appointment.paymentStatus === "pending"
  ).length;

  const completedCount = appointments.filter(
    (appointment) =>
      appointment.appointmentStatus === "completed" &&
      appointment.paymentStatus === "paid"
  ).length;

  const handleBook = (doctor) => {
    navigate("/appointment", {
      state: { doctor },
    });
  };

  const handleViewAllDoctors = () => {
    navigate("/doctors");
  };

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">Dashboard</h1>

      <p className="dashboard-welcome">
        Welcome back, {user?.name || "Patient"}! Here&apos;s what&apos;s
        happening with your health.
      </p>

      {/* DASHBOARD STAT CARDS */}
      <div className="stat-cards-grid">
        <button
          type="button"
          className="stat-card-box blue clickable-stat-card"
          onClick={() => navigate("/upcoming-appointments")}
        >
          <div className="stat-card-icon">📅</div>

          <div>
            <p className="stat-card-num">{upcomingCount}</p>
            <p className="stat-card-label">
              Upcoming Appointments
            </p>
          </div>
        </button>

        <button
          type="button"
          className="stat-card-box green clickable-stat-card"
          onClick={handleViewAllDoctors}
        >
          <div className="stat-card-icon">👥</div>

          <div>
            <p className="stat-card-num">
              {availableDoctors.length}
            </p>
            <p className="stat-card-label">Available Doctors</p>
          </div>
        </button>

        <button
          type="button"
          className="stat-card-box purple clickable-stat-card"
          onClick={() => navigate("/completed-appointments")}
        >
          <div className="stat-card-icon">✅</div>

          <div>
            <p className="stat-card-num">{completedCount}</p>
            <p className="stat-card-label">
              Completed Appointments
            </p>
          </div>
        </button>

        <button
          type="button"
          className="stat-card-box orange clickable-stat-card"
          onClick={() => navigate("/pending-payments")}
        >
          <div className="stat-card-icon">💳</div>

          <div>
            <p className="stat-card-num">
              {pendingPaymentCount}
            </p>
            <p className="stat-card-label">Pending Payments</p>
          </div>
        </button>
      </div>

      {/* AVAILABLE DOCTORS */}
      <section className="find-doctor-section">
        <div className="find-doctor-header">
          <div>
            <h2>Available Doctors</h2>
            <p>
              Choose an available doctor and book your appointment.
            </p>
          </div>

          <button
            type="button"
            className="view-all-doctors-btn"
            onClick={handleViewAllDoctors}
          >
            View All Doctors →
          </button>
        </div>

        {dashboardDoctors.length > 0 ? (
          <div className="doctor-grid dashboard-doctor-grid">
            {dashboardDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBook={() => handleBook(doctor)}
              />
            ))}
          </div>
        ) : (
          <div className="no-doctors-found">
            <h3>No doctors are currently available</h3>
            <p>Please check again later.</p>
          </div>
        )}
      </section>

      {/* FEATURE STRIP */}
      <div className="dashboard-features-strip">
        <div className="dashboard-feature-item">
          <div className="dashboard-feature-icon blue">👥</div>

          <div>
            <h4>Experienced Doctors</h4>
            <p>
              Qualified and experienced healthcare professionals.
            </p>
          </div>
        </div>

        <div className="dashboard-feature-item">
          <div className="dashboard-feature-icon green">🛡️</div>

          <div>
            <h4>Trusted Care</h4>
            <p>Your health and safety are our priority.</p>
          </div>
        </div>

        <div className="dashboard-feature-item">
          <div className="dashboard-feature-icon blue">🕒</div>

          <div>
            <h4>Easy Booking</h4>
            <p>Book appointments in a few simple steps.</p>
          </div>
        </div>

        <div className="dashboard-feature-item">
          <div className="dashboard-feature-icon green">❤️</div>

          <div>
            <h4>Patient Focused</h4>
            <p>Compassionate care for every patient.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;