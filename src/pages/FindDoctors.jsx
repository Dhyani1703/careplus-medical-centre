import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import doctors from "../data/doctors";
import DoctorCard from "../components/DoctorCard";

const specialties = [
  "All Specialities",
  ...new Set(
    doctors
      .map((doctor) => doctor.specialty)
      .filter(Boolean)
  ),
];

function FindDoctors() {
  const [searchText, setSearchText] = useState("");
  const [specialty, setSpecialty] = useState("All Specialities");

  const navigate = useNavigate();

  const filteredDoctors = useMemo(() => {
    const searchValue = searchText.trim().toLowerCase();

    return doctors.filter((doctor) => {
      const doctorName = doctor.name?.toLowerCase() || "";
      const doctorSpecialty = doctor.specialty?.toLowerCase() || "";
      const doctorDescription = doctor.description?.toLowerCase() || "";

      const doctorIllnesses = Array.isArray(doctor.illnesses)
        ? doctor.illnesses
        : [];

      const matchesSpecialty =
        specialty === "All Specialities" ||
        doctor.specialty === specialty;

      const matchesIllness = doctorIllnesses.some((illness) =>
        illness.toLowerCase().includes(searchValue)
      );

      const matchesSearch =
        searchValue === "" ||
        doctorName.includes(searchValue) ||
        doctorSpecialty.includes(searchValue) ||
        doctorDescription.includes(searchValue) ||
        matchesIllness;

      return matchesSpecialty && matchesSearch;
    });
  }, [searchText, specialty]);

  const handleBook = (doctor) => {
    navigate("/appointment", {
      state: { doctor },
    });
  };

  const clearFilters = () => {
    setSearchText("");
    setSpecialty("All Specialities");
  };

  return (
    <div className="find-doctor-page">
      <div className="find-doctor-page-header">
        <div>
          <h1>Find a Doctor</h1>

          <p>
            Search by illness, doctor name or speciality to find the right
            healthcare professional.
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

      {/* SEARCH AND FILTER */}
      <div className="find-doctor-filter-box">
        <div className="find-doctor-search">
          <span className="find-doctor-search-icon">🔍</span>

          <input
            type="text"
            placeholder="Search illness, doctor or speciality..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>

        <select
          value={specialty}
          onChange={(event) => setSpecialty(event.target.value)}
        >
          {specialties.map((specialtyItem) => (
            <option key={specialtyItem} value={specialtyItem}>
              {specialtyItem}
            </option>
          ))}
        </select>

        {(searchText || specialty !== "All Specialities") && (
          <button
            type="button"
            className="clear-doctor-filter-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* RESULTS HEADING */}
      <div className="doctor-results-heading">
        <div>
          <h2>Matching Doctors</h2>

          <p>
            {filteredDoctors.length} doctor
            {filteredDoctors.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {/* DOCTOR RESULTS */}
      {filteredDoctors.length > 0 ? (
        <div className="doctor-grid all-doctors-grid">
          {filteredDoctors.map((doctor) => (
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

          <p>
            Try another illness, doctor name or speciality.
          </p>

          <button
            type="button"
            className="clear-doctor-filter-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default FindDoctors;