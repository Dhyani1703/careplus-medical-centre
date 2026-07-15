import { useNavigate } from "react-router-dom";
import doctors from "../data/doctors";
import DoctorCard from "../components/DoctorCard";

function Doctors() {
  const navigate = useNavigate();

  const handleBook = (doctor) => {
    navigate("/appointment", {
      state: { doctor },
    });
  };

  return (
    <div className="find-doctor-page">
      <div className="find-doctor-page-header">
        <div>
          <h1>All Doctors</h1>

          <p>
            Browse every doctor available at CarePlus Medical Centre.
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

      {/* NUMBER OF DOCTORS */}
      <div className="doctor-results-heading">
        <div>
          <h2>Our Doctors</h2>

          <p>
            {doctors.length} doctor{doctors.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>

      {/* ALL DOCTORS */}
      {doctors.length > 0 ? (
        <div className="doctor-grid all-doctors-grid">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBook={() => handleBook(doctor)}
            />
          ))}
        </div>
      ) : (
        <div className="no-doctors-found">
          <div className="no-doctors-icon">🩺</div>

          <h3>No doctors found</h3>

          <p>Please check back later.</p>
        </div>
      )}
    </div>
  );
}

export default Doctors;