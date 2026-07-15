import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function DashboardNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <img src="/logo.png" alt="CarePlus" className="logo" />

      <ul className="nav-links">
        <li><Link to="/dashboard">Find Doctor</Link></li>
        <li><Link to="/appointment">Appointment</Link></li>
        <li><Link to="/payment">Payment</Link></li>
      </ul>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {user && <span>Hi, {user.name}</span>}
        <button className="login-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default DashboardNavbar;