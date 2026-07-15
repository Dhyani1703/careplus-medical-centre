import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import doctors from "../data/doctors";

const consultationFee = 50;

const allTimeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
];

function Appointment() {
  const navigate = useNavigate();
  const location = useLocation();
  const doctorFromCard = location.state?.doctor || null;

  const [selectedDoctorId, setSelectedDoctorId] = useState(
    doctorFromCard?.id ? String(doctorFromCard.id) : ""
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");

  const availableDoctors = useMemo(
    () => doctors.filter((doctor) => doctor.available !== false),
    []
  );

  const selectedDoctor = useMemo(
    () =>
      availableDoctors.find(
        (doctor) => String(doctor.id) === String(selectedDoctorId)
      ) || null,
    [availableDoctors, selectedDoctorId]
  );

  const minimumDate = new Date().toISOString().split("T")[0];

  const getDoctorTimeSlots = (doctor, dateValue) => {
    if (!doctor || !dateValue) return [];

    const day = new Date(`${dateValue}T00:00:00`).getDay();
    if (day === 0) return [];

    return allTimeSlots.filter(
      (_, index) => (index + Number(doctor.id) + day) % 4 !== 0
    );
  };

  const availableTimeSlots = useMemo(
    () => getDoctorTimeSlots(selectedDoctor, selectedDate),
    [selectedDoctor, selectedDate]
  );

  const nextAvailableDates = useMemo(() => {
    if (!selectedDoctor || !selectedDate || availableTimeSlots.length > 0) {
      return [];
    }

    const suggestions = [];
    const startDate = new Date(`${selectedDate}T00:00:00`);

    for (let offset = 1; offset <= 14 && suggestions.length < 3; offset += 1) {
      const nextDate = new Date(startDate);
      nextDate.setDate(startDate.getDate() + offset);

      const dateValue = nextDate.toISOString().split("T")[0];
      const slots = getDoctorTimeSlots(selectedDoctor, dateValue);

      if (slots.length > 0) {
        suggestions.push({ date: dateValue, slots: slots.slice(0, 3) });
      }
    }

    return suggestions;
  }, [selectedDoctor, selectedDate, availableTimeSlots.length]);

  useEffect(() => {
    setSelectedTime("");
    setMessage("");
  }, [selectedDoctorId, selectedDate]);

  const formatDate = (dateValue) => {
    if (!dateValue) return "Not selected";

    return new Date(`${dateValue}T00:00:00`).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleDoctorSelect = (doctorId) => {
    setSelectedDoctorId(String(doctorId));
    setSelectedDate("");
    setSelectedTime("");
    setMessage("");
  };

  const handleSuggestedDate = (dateValue) => {
    setSelectedDate(dateValue);
    setSelectedTime("");
    setMessage("");
  };

  const handleConfirmAppointment = () => {
    if (!selectedDoctor) {
      setMessage("Please select a doctor.");
      return;
    }

    if (!selectedDate) {
      setMessage("Please select an appointment date.");
      return;
    }

    if (availableTimeSlots.length === 0) {
      setMessage("Please choose one of the doctor's available dates.");
      return;
    }

    if (!selectedTime) {
      setMessage("Please select an available appointment time.");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      doctorImage: selectedDoctor.image,
      date: selectedDate,
      formattedDate: formatDate(selectedDate),
      time: selectedTime,
      fee: consultationFee,
      appointmentStatus: "upcoming",
      paymentStatus: "pending",
      createdAt: new Date().toISOString(),
    };

    const existingAppointments = JSON.parse(
      localStorage.getItem("careplusAppointments") || "[]"
    );

    localStorage.setItem(
      "careplusAppointments",
      JSON.stringify([...existingAppointments, newAppointment])
    );

    window.dispatchEvent(new Event("careplusDataUpdated"));

    navigate("/payment", { state: { appointment: newAppointment } });
  };

  return (
    <div className="appointment-page">
      <div className="appointment-page-header">
        <div>
          <p className="appointment-page-tag">CAREPLUS APPOINTMENTS</p>
          <h1>Book Appointment</h1>
          <p>
            Select a doctor, choose an available date and time, and review your booking.
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

      <div className="appointment-booking-grid">
        <section className="appointment-panel appointment-doctors-panel">
          <div className="appointment-panel-heading">
            <span className="appointment-step-number">1</span>
            <div>
              <h2>Select Doctor</h2>
              <p>Choose the doctor you want to book.</p>
            </div>
          </div>

          <div className="appointment-doctor-list">
            {availableDoctors.map((doctor) => {
              const isSelected = String(doctor.id) === String(selectedDoctorId);
              const selectedDateSlots = selectedDate
                ? getDoctorTimeSlots(doctor, selectedDate)
                : [];
              const isAvailableOnSelectedDate =
                !selectedDate || selectedDateSlots.length > 0;

              return (
                <button
                  type="button"
                  key={doctor.id}
                  className={`appointment-doctor-option ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => handleDoctorSelect(doctor.id)}
                >
                  <img src={doctor.image} alt={doctor.name} />

                  <div className="appointment-doctor-option-info">
                    <div className="appointment-doctor-option-title">
                      <div>
                        <h3>{doctor.name}</h3>
                        <p>{doctor.specialty}</p>
                      </div>

                      {isSelected && (
                        <span className="doctor-selected-check">✓</span>
                      )}
                    </div>

                    <div className="appointment-doctor-status-row">
                      <span
                        className={`appointment-doctor-status ${
                          isAvailableOnSelectedDate ? "available" : "unavailable"
                        }`}
                      >
                        {isAvailableOnSelectedDate
                          ? "● Available"
                          : "● Not Available"}
                      </span>

                      <span className="appointment-doctor-exp">
                        {doctor.experience}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="appointment-panel">
          <div className="appointment-panel-heading">
            <span className="appointment-step-number">2</span>
            <div>
              <h2>Select Date and Time</h2>
              <p>Availability changes according to the selected doctor.</p>
            </div>
          </div>

          <div className="appointment-form-group">
            <label htmlFor="appointment-date">Appointment Date</label>
            <input
              id="appointment-date"
              type="date"
              min={minimumDate}
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              disabled={!selectedDoctor}
            />
          </div>

          {!selectedDoctor && (
            <div className="appointment-empty-state">
              <span>👨‍⚕️</span>
              <h3>Select a Doctor</h3>
              <p>Choose a doctor to view their available dates and times.</p>
            </div>
          )}

          {selectedDoctor && !selectedDate && (
            <div className="appointment-empty-state">
              <span>📅</span>
              <h3>Select a Date</h3>
              <p>Choose a date to check this doctor's available time slots.</p>
            </div>
          )}

          {selectedDoctor && selectedDate && availableTimeSlots.length === 0 && (
            <div className="doctor-unavailable-box">
              <span className="doctor-unavailable-icon">🚫</span>
              <h3>{selectedDoctor.name} is not available</h3>
              <p>There are no appointments available on {formatDate(selectedDate)}.</p>

              {nextAvailableDates.length > 0 && (
                <div className="next-available-list">
                  <h4>Next available dates and times</h4>
                  {nextAvailableDates.map((suggestion) => (
                    <button
                      type="button"
                      key={suggestion.date}
                      className="next-available-option"
                      onClick={() => handleSuggestedDate(suggestion.date)}
                    >
                      <strong>{formatDate(suggestion.date)}</strong>
                      <span>{suggestion.slots.join(" • ")}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {availableTimeSlots.length > 0 && (
            <>
              <div className="available-date-heading">
                <h3>Available on {formatDate(selectedDate)}</h3>
                <p>{availableTimeSlots.length} available times</p>
              </div>

              <div className="appointment-time-grid">
                {availableTimeSlots.map((time) => (
                  <button
                    type="button"
                    key={time}
                    className={`appointment-time-btn ${
                      selectedTime === time ? "selected" : ""
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </>
          )}
        </section>

        <aside className="appointment-summary-card">
          <div className="appointment-panel-heading">
            <span className="appointment-step-number">3</span>
            <div>
              <h2>Appointment Summary</h2>
              <p>Review your booking before confirmation.</p>
            </div>
          </div>

          <div className="appointment-summary-list">
            <div className="appointment-summary-item">
              <span className="summary-icon">👨‍⚕️</span>
              <div>
                <p>Doctor</p>
                <strong>{selectedDoctor?.name || "Not selected"}</strong>
              </div>
            </div>

            <div className="appointment-summary-item">
              <span className="summary-icon">🩺</span>
              <div>
                <p>Speciality</p>
                <strong>{selectedDoctor?.specialty || "Not selected"}</strong>
              </div>
            </div>

            <div className="appointment-summary-item">
              <span className="summary-icon">📅</span>
              <div>
                <p>Date</p>
                <strong>{formatDate(selectedDate)}</strong>
              </div>
            </div>

            <div className="appointment-summary-item">
              <span className="summary-icon">🕒</span>
              <div>
                <p>Time</p>
                <strong>{selectedTime || "Not selected"}</strong>
              </div>
            </div>

            <div className="appointment-summary-item">
              <span className="summary-icon">💳</span>
              <div>
                <p>Payment Status</p>
                <strong className="pending-payment-text">Pending</strong>
              </div>
            </div>
          </div>

          <div className="appointment-fee-row">
            <span>Consultation Fee</span>
            <strong>${consultationFee}</strong>
          </div>

          {message && <p className="appointment-error-message">{message}</p>}

          <button
            type="button"
            className="confirm-appointment-btn"
            onClick={handleConfirmAppointment}
          >
            Confirm Appointment
          </button>

          <p className="appointment-payment-note">
            After confirmation, Upcoming Appointments and Pending Payments will increase by one.
          </p>
        </aside>
      </div>
    </div>
  );
}

export default Appointment;