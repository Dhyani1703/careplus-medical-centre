import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Receipt() {
  const navigate = useNavigate();
  const location = useLocation();
  const { appointmentId } = useParams();

  const appointment = useMemo(() => {
    if (location.state?.appointment) return location.state.appointment;
    if (!appointmentId) return null;

    try {
      const saved = JSON.parse(
        localStorage.getItem("careplusAppointments") || "[]"
      );

      return (
        saved.find((item) => String(item.id) === String(appointmentId)) || null
      );
    } catch {
      return null;
    }
  }, [appointmentId, location.state]);

  const receiptNumber =
    appointment?.receiptNumber ||
    (appointment ? `CP-${String(appointment.id).slice(-8)}` : "CP-TEMP-0001");

  const paymentDate = appointment?.paidAt
    ? new Date(appointment.paidAt).toLocaleString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "Not available";

  if (!appointment || appointment.paymentStatus !== "paid") {
    return (
      <div className="receipt-page">
        <div className="receipt-empty-state">
          <div className="receipt-success-icon">🧾</div>
          <h1>No Receipt Found</h1>
          <p>Complete an appointment payment before viewing a receipt.</p>
          <button
            type="button"
            className="receipt-dashboard-btn"
            onClick={() => navigate("/dashboard")}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="receipt-page">
      <div className="receipt-actions">
        <button
          type="button"
          className="receipt-back-btn"
          onClick={() => navigate("/completed-appointments")}
        >
          ← Back to Completed Appointments
        </button>

        <button
          type="button"
          className="receipt-print-btn"
          onClick={() => window.print()}
        >
          🖨 Print Receipt
        </button>
      </div>

      <div className="receipt-card">
        <div className="receipt-header">
          <div>
            <h1>CarePlus Medical Centre</h1>
            <p>Community healthcare with compassionate care.</p>
          </div>
          <div className="receipt-paid-badge">✓ PAID</div>
        </div>

        <div className="receipt-business-details">
          <p><strong>CarePlus Medical Centre</strong></p>
          <p>Blacktown, NSW 2148, Australia</p>
          <p><strong>Temporary ABN Number:</strong> 12 345 678 901</p>
          <p><strong>Email:</strong> support@careplusmedical.com.au</p>
          <p><strong>Phone:</strong> (02) 9000 1234</p>
          <p className="receipt-disclaimer">
            This receipt is generated for a university class assignment and is
            not for commercial use.
          </p>
        </div>

        <div className="receipt-information-grid">
          <div><span>Receipt Number</span><strong>{receiptNumber}</strong></div>
          <div><span>Payment Date</span><strong>{paymentDate}</strong></div>
          <div>
            <span>Payment Method</span>
            <strong>
              {appointment.paymentMethod === "paypal"
                ? "PayPal"
                : "Credit / Debit Card"}
            </strong>
          </div>
          <div>
            <span>Payment Status</span>
            <strong className="receipt-paid-text">Paid</strong>
          </div>
        </div>

        <section className="receipt-section">
          <h2>Appointment Details</h2>
          <div className="receipt-detail-row"><span>Doctor</span><strong>{appointment.doctorName}</strong></div>
          <div className="receipt-detail-row"><span>Speciality</span><strong>{appointment.specialty}</strong></div>
          <div className="receipt-detail-row"><span>Appointment Date</span><strong>{appointment.formattedDate}</strong></div>
          <div className="receipt-detail-row"><span>Appointment Time</span><strong>{appointment.time}</strong></div>
          <div className="receipt-detail-row"><span>Appointment Status</span><strong className="receipt-completed-text">Completed</strong></div>
        </section>

        <section className="receipt-section">
          <h2>Payment Summary</h2>
          <div className="receipt-detail-row">
            <span>Medical consultation</span>
            <strong>${Number(appointment.fee || 0).toFixed(2)}</strong>
          </div>
          <div className="receipt-detail-row receipt-total-row">
            <span>Total Paid</span>
            <strong>${Number(appointment.fee || 0).toFixed(2)}</strong>
          </div>
        </section>

        <div className="receipt-success-message">
          <div className="receipt-success-icon">✓</div>
          <div>
            <h3>Payment Successful</h3>
            <p>
              Your appointment payment has been completed successfully. Please
              keep this receipt for your records.
            </p>
          </div>
        </div>

        <div className="receipt-footer">
          <p>Thank you for choosing CarePlus Medical Centre.</p>
          <p>Receipt generated electronically. No signature is required.</p>
        </div>
      </div>
    </div>
  );
}

export default Receipt;