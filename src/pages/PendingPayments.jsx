import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PendingPayments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("careplusAppointments") || "[]"
      );
      setAppointments(
        saved.filter((item) => item.paymentStatus === "pending")
      );
    } catch {
      setAppointments([]);
    }
  }, []);

  return (
    <div className="records-page">
      <div className="records-page-header">
        <div>
          <h1>Pending Payments</h1>
          <p>Complete payment for your booked appointments.</p>
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
          <span>✅</span>
          <h2>No pending payments</h2>
          <p>All appointment payments have been completed.</p>
        </div>
      ) : (
        <div className="records-grid">
          {appointments.map((appointment) => (
            <article className="record-card" key={appointment.id}>
              <div className="record-card-header">
                <div>
                  <h2>{appointment.doctorName}</h2>
                  <p>{appointment.specialty}</p>
                </div>
                <span className="record-status pending">Payment Pending</span>
              </div>

              <div className="record-details">
                <p><strong>Date:</strong> {appointment.formattedDate}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p><strong>Amount:</strong> ${Number(appointment.fee).toFixed(2)}</p>
              </div>

              <button
                type="button"
                className="record-primary-btn"
                onClick={() =>
                  navigate("/payment", { state: { appointment } })
                }
              >
                Complete Payment
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default PendingPayments;