import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const appointmentFromBooking =
    location.state?.appointment || null;

  const [appointments, setAppointments] = useState([]);
  const [selectedAppointmentId, setSelectedAppointmentId] =
    useState(
      appointmentFromBooking?.id
        ? String(appointmentFromBooking.id)
        : ""
    );

  const [paymentMethod, setPaymentMethod] =
    useState("card");

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [message, setMessage] = useState("");

  const loadAppointments = () => {
    try {
      const savedAppointments = JSON.parse(
        localStorage.getItem("careplusAppointments") || "[]"
      );

      const appointmentList = Array.isArray(savedAppointments)
        ? savedAppointments
        : [];

      setAppointments(appointmentList);

      if (!selectedAppointmentId) {
        const firstPendingAppointment = appointmentList.find(
          (appointment) =>
            appointment.paymentStatus === "pending"
        );

        if (firstPendingAppointment) {
          setSelectedAppointmentId(
            String(firstPendingAppointment.id)
          );
        }
      }
    } catch (error) {
      console.error("Unable to load payments:", error);
      setAppointments([]);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const pendingAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) =>
        appointment.paymentStatus === "pending"
    );
  }, [appointments]);

  const selectedAppointment = useMemo(() => {
    return pendingAppointments.find(
      (appointment) =>
        String(appointment.id) ===
        String(selectedAppointmentId)
    );
  }, [pendingAppointments, selectedAppointmentId]);

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const handlePayment = (event) => {
    event.preventDefault();
    setMessage("");

    if (!selectedAppointment) {
      setMessage("Please select a pending appointment.");
      return;
    }

    if (paymentMethod === "card") {
      const plainCardNumber = cardNumber.replace(/\s/g, "");

      if (!cardName.trim()) {
        setMessage("Please enter the cardholder name.");
        return;
      }

      if (plainCardNumber.length !== 16) {
        setMessage("Please enter a valid 16-digit card number.");
        return;
      }

      if (!expiryDate.trim()) {
        setMessage("Please enter the card expiry date.");
        return;
      }

      if (cvv.length !== 3) {
        setMessage("Please enter a valid 3-digit CVV.");
        return;
      }
    }

    const paidAppointment = {
      ...selectedAppointment,
      appointmentStatus: "completed",
      paymentStatus: "paid",
      paymentMethod,
      paidAt: new Date().toISOString(),
    };

    const updatedAppointments = appointments.map(
      (appointment) =>
        String(appointment.id) ===
        String(selectedAppointment.id)
          ? paidAppointment
          : appointment
    );

    localStorage.setItem(
      "careplusAppointments",
      JSON.stringify(updatedAppointments)
    );

    window.dispatchEvent(
      new Event("careplusDataUpdated")
    );

    navigate("/receipt", {
      state: {
        appointment: paidAppointment,
      },
    });
  };

  return (
    <div className="payment-page">
      <div className="payment-page-header">
        <div>
          <p className="appointment-page-tag">
            CAREPLUS PAYMENTS
          </p>

          <h1>Complete Payment</h1>

          <p>
            Pay securely to confirm and complete your appointment.
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

      {pendingAppointments.length === 0 ? (
        <div className="no-doctors-found">
          <div className="no-doctors-icon">✅</div>

          <h3>No pending payments</h3>

          <p>
            You have completed all your current appointment
            payments.
          </p>

          <button
            type="button"
            className="view-all-doctors-btn"
            onClick={() => navigate("/appointment")}
          >
            Book an Appointment
          </button>
        </div>
      ) : (
        <div className="payment-layout">
          <section className="payment-form-card">
            <h2>Payment Details</h2>

            <div className="appointment-form-group">
              <label htmlFor="pending-appointment">
                Select Pending Appointment
              </label>

              <select
                id="pending-appointment"
                value={selectedAppointmentId}
                onChange={(event) => {
                  setSelectedAppointmentId(event.target.value);
                  setMessage("");
                }}
              >
                <option value="">
                  Choose an appointment
                </option>

                {pendingAppointments.map((appointment) => (
                  <option
                    key={appointment.id}
                    value={appointment.id}
                  >
                    {appointment.doctorName} —{" "}
                    {appointment.formattedDate} —{" "}
                    {appointment.time}
                  </option>
                ))}
              </select>
            </div>

            <div className="payment-methods">
              <button
                type="button"
                className={`payment-method-btn ${
                  paymentMethod === "card" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                💳 Credit or Debit Card
              </button>

              <button
                type="button"
                className={`payment-method-btn ${
                  paymentMethod === "paypal" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("paypal")}
              >
                PayPal
              </button>
            </div>

            <form onSubmit={handlePayment}>
              {paymentMethod === "card" && (
                <>
                  <div className="appointment-form-group">
                    <label htmlFor="card-name">
                      Cardholder Name
                    </label>

                    <input
                      id="card-name"
                      type="text"
                      value={cardName}
                      onChange={(event) =>
                        setCardName(event.target.value)
                      }
                      placeholder="Name on card"
                    />
                  </div>

                  <div className="appointment-form-group">
                    <label htmlFor="card-number">
                      Card Number
                    </label>

                    <input
                      id="card-number"
                      type="text"
                      inputMode="numeric"
                      value={cardNumber}
                      onChange={(event) =>
                        setCardNumber(
                          formatCardNumber(event.target.value)
                        )
                      }
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div className="payment-form-row">
                    <div className="appointment-form-group">
                      <label htmlFor="expiry-date">
                        Expiry Date
                      </label>

                      <input
                        id="expiry-date"
                        type="text"
                        value={expiryDate}
                        onChange={(event) =>
                          setExpiryDate(event.target.value)
                        }
                        placeholder="MM/YY"
                      />
                    </div>

                    <div className="appointment-form-group">
                      <label htmlFor="cvv">CVV</label>

                      <input
                        id="cvv"
                        type="password"
                        inputMode="numeric"
                        maxLength="3"
                        value={cvv}
                        onChange={(event) =>
                          setCvv(
                            event.target.value
                              .replace(/\D/g, "")
                              .slice(0, 3)
                          )
                        }
                        placeholder="123"
                      />
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === "paypal" && (
                <div className="paypal-information">
                  <p>
                    You will be redirected securely to PayPal
                    to complete the payment.
                  </p>
                </div>
              )}

              {message && (
                <p className="appointment-error-message">
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="confirm-appointment-btn"
              >
                Pay $
                {selectedAppointment?.fee || 0}
              </button>
            </form>
          </section>

          <aside className="appointment-summary-card">
            <div className="appointment-panel-heading">
              <span className="appointment-step-number">✓</span>

              <div>
                <h2>Payment Summary</h2>
                <p>Review the appointment before payment.</p>
              </div>
            </div>

            <div className="appointment-summary-list">
              <div className="appointment-summary-item">
                <span className="summary-icon">👨‍⚕️</span>

                <div>
                  <p>Doctor</p>
                  <strong>
                    {selectedAppointment?.doctorName ||
                      "Not selected"}
                  </strong>
                </div>
              </div>

              <div className="appointment-summary-item">
                <span className="summary-icon">🩺</span>

                <div>
                  <p>Speciality</p>
                  <strong>
                    {selectedAppointment?.specialty ||
                      "Not selected"}
                  </strong>
                </div>
              </div>

              <div className="appointment-summary-item">
                <span className="summary-icon">📅</span>

                <div>
                  <p>Date</p>
                  <strong>
                    {selectedAppointment?.formattedDate ||
                      "Not selected"}
                  </strong>
                </div>
              </div>

              <div className="appointment-summary-item">
                <span className="summary-icon">🕒</span>

                <div>
                  <p>Time</p>
                  <strong>
                    {selectedAppointment?.time ||
                      "Not selected"}
                  </strong>
                </div>
              </div>

              <div className="appointment-summary-item">
                <span className="summary-icon">💳</span>

                <div>
                  <p>Payment Status</p>
                  <strong className="pending-payment-text">
                    Pending
                  </strong>
                </div>
              </div>
            </div>

            <div className="appointment-fee-row">
              <span>Total Payment</span>
              <strong>
                ${selectedAppointment?.fee || 0}
              </strong>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default Payment;