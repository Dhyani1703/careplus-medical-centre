import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="CarePlus Logo" className="logo" />
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>

      <div className="login-btn">
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;