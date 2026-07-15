import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="CarePlus Medical Centre" />
      </div>

      <p className="sidebar-section-label">PATIENT PORTAL</p>

      <nav className="sidebar-nav">
        <Link
          to="/dashboard"
          className={`sidebar-link ${
            isActive("/dashboard") ? "active" : ""
          }`}
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/find-doctors"
          className={`sidebar-link ${
            isActive("/find-doctors") ? "active" : ""
          }`}
        >
          👤 Find Doctors
        </Link>

        <Link
          to="/appointment"
          className={`sidebar-link ${
            isActive("/appointment") ? "active" : ""
          }`}
        >
          📅 Appointment
        </Link>

        <Link
          to="/payment"
          className={`sidebar-link ${
            isActive("/payment") ? "active" : ""
          }`}
        >
          💳 Payment
        </Link>
      </nav>

      <div className="sidebar-divider" />

      <button
        type="button"
        className="sidebar-logout"
        onClick={handleLogout}
      >
        ⬅ Logout
      </button>

      <div className="sidebar-help-box">
        <h4>Need Help?</h4>
        <p>Our friendly CarePlus team is ready to assist you.</p>

        <Link to="/contact" className="sidebar-help-link">
          <span className="sidebar-help-btn">Contact Us</span>
        </Link>
      </div>

      <p className="sidebar-footer">
        © {new Date().getFullYear()} CarePlus Medical Centre.
        <br />
        All rights reserved.
      </p>
    </aside>
  );
}