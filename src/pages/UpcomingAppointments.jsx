import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UpcomingAppointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  const loadUpcomingAppointments = () => {
    try {
      const savedAppointments = JSON.parse(
        localStorage.getItem("careplusAppointments") || "[]"
      );

      const upcomingAppointments = Array.isArray(savedAppointments)
        ? savedAppointments.filter(
            (appointment) =>
              appointment.appointmentStatus === "upcoming" &&
              appointment.paymentStatus === "pending"
          )
        : [];

      setAppointments(upcomingAppointments);
    } catch (error) {
      console.error("Unable to load upcoming appointments:", error);
      setAppointments([]);
    }
  };

  useEffect(() => {
    loadUpcomingAppointments();

    const handleDataUpdate = () => {
      loadUpcomingAppointments();
    };

    window.addEventListener(
      "careplusDataUpdated",
      handleDataUpdate
    );

    window.addEventListener("storage", handleDataUpdate);

    return () => {
      window.removeEventListener(
        "careplusDataUpdated",
        handleDataUpdate
      );

      window.removeEventListener("storage", handleDataUpdate);
    };
  }, []);

  const getAppointmentDay = (dateValue) => {
    if (!dateValue) {
      return "";
    }

    return new Date(`${dateValue}T00:00:00`).toLocaleDateString(
      "en-AU",
      {
        weekday: "long",
      }
    );
  };

  return (
    <div className="records-page">
      <div className="records-page-header">
        <div>
          <h1>Upcoming Appointments</h1>

          <p>
            View your confirmed appointments that are waiting for
            payment.
          </p>
        </div>

        <button
          type="button"
          className="back-dashboard-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>

      {appointments.length === 0 ? (
        <div className="records-empty-state">
          <span>📅</span>

          <h2>No upcoming appointments</h2>

          <p>
            Confirm an appointment to see the doctor, date and time
            details here.
          </p>

          <button
            type="button"
            className="record-primary-btn empty-booking-btn"
            onClick={() => navigate("/appointment")}
          >
            Book Appointment
          </button>
        </div>
      ) : (
        <div className="records-grid">
          {appointments.map((appointment) => (
            <article
              className="record-card upcoming-record-card"
              key={appointment.id}
            >
              <div className="record-card-header">
                <div className="record-doctor-heading">
                  {appointment.doctorImage && (
                    <img
                      src={appointment.doctorImage}
                      alt={appointment.doctorName}
                      className="record-doctor-image"
                    />
                  )}

                  <div>
                    <h2>{appointment.doctorName}</h2>
                    <p>{appointment.specialty}</p>
                  </div>
                </div>

                <span className="record-status upcoming">
                  Confirmed
                </span>
              </div>

              <div className="record-details">
                <div className="record-detail-item">
                  <span className="record-detail-icon">📅</span>

                  <div>
                    <p>Appointment Date</p>

                    <strong>
                      {getAppointmentDay(appointment.date)},{" "}
                      {appointment.formattedDate}
                    </strong>
                  </div>
                </div>

                <div className="record-detail-item">
                  <span className="record-detail-icon">🕒</span>

                  <div>
                    <p>Time Slot</p>
                    <strong>{appointment.time}</strong>
                  </div>
                </div>

                <div className="record-detail-item">
                  <span className="record-detail-icon">🩺</span>

                  <div>
                    <p>Doctor</p>
                    <strong>{appointment.doctorName}</strong>
                  </div>
                </div>

                <div className="record-detail-item">
                  <span className="record-detail-icon">💳</span>

                  <div>
                    <p>Payment Status</p>

                    <strong className="upcoming-payment-status">
                      Pending
                    </strong>
                  </div>
                </div>
              </div>

              <div className="record-appointment-total">
                <span>Consultation Fee</span>

                <strong>
                  ${Number(appointment.fee || 0).toFixed(2)}
                </strong>
              </div>

              <button
                type="button"
                className="record-primary-btn"
                onClick={() =>
                  navigate("/payment", {
                    state: {
                      appointment,
                    },
                  })
                }
              >
                Pay Now
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingAppointments;