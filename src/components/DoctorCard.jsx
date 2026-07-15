function DoctorCard({ doctor, onBook }) {
  return (
    <div className="doctor-card">
      <div className="doctor-card-top">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="doctor-image"
        />

        <span className="available-badge">
          ● Available
        </span>
      </div>

      <div className="doctor-info">
        <h3>{doctor.name}</h3>

        <p className="specialty">
          {doctor.specialty}
        </p>

        <p className="experience">
          📅 {doctor.experience}
        </p>

        {doctor.description && (
          <p className="doctor-desc">
            {doctor.description}
          </p>
        )}

        <button
          type="button"
          className="book-btn"
          onClick={onBook}
        >
          📅 Book Appointment
        </button>
      </div>
    </div>
  );
}

export default DoctorCard;