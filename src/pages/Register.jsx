import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import authImage from "../assets/Stethoscope.jpg";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = register(name, email, phone, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setSuccess("Registered successfully! Redirecting to login...");
    setTimeout(() => navigate("/login"), 1200);
  };

  return (
    <div className="auth-page">
      <div className="auth-shell auth-register-shell">
        <section className="auth-media">
          <img
            src={authImage}
            alt="Stethoscope and blood pressure monitor"
            className="auth-media-image"
          />

          <div className="auth-media-overlay" />

          <div className="auth-media-content">
            <span className="auth-media-tag">JOIN CAREPLUS</span>

            <h1>
              Join CarePlus
              <span> for better health.</span>
            </h1>

            <p className="auth-media-description">
              Create your account and book appointments with trusted doctors.
            </p>

            <div className="auth-benefit-list">
              <div>
                <span>✓</span>
                <p>Secure and private</p>
              </div>
              <div>
                <span>✓</span>
                <p>Easy appointment booking</p>
              </div>
              <div>
                <span>✓</span>
                <p>Manage payments and receipts</p>
              </div>
            </div>
          </div>
        </section>

        <section className="auth-form-side">
          <div className="auth-form-card auth-register-card">
            <Link to="/" className="auth-back-link">
              ← Back to Home
            </Link>

            <img
              src={logo}
              alt="CarePlus Medical Centre"
              className="auth-centred-logo"
            />

            <div className="auth-heading">
              <p className="auth-eyebrow">CREATE YOUR ACCOUNT</p>
              <h2>Join CarePlus today</h2>
              <p>Register to book appointments and manage your healthcare.</p>
            </div>

            {error && <p className="auth-message error">{error}</p>}
            {success && <p className="auth-message success">{success}</p>}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-two-column">
                <div className="auth-field">
                  <label htmlFor="register-name">Full name</label>
                  <div className="auth-input">
                    <span className="auth-input-icon">👤</span>
                    <input
                      id="register-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label htmlFor="register-email">Email address</label>
                  <div className="auth-input">
                    <span className="auth-input-icon">✉</span>
                    <input
                      id="register-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="register-phone">Phone number</label>
                <div className="auth-input">
                  <span className="auth-input-icon">☎</span>
                  <input
                    id="register-phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength="10"
                    placeholder="10-digit phone number"
                    value={phone}
                    onChange={(event) =>
                      setPhone(
                        event.target.value.replace(/\D/g, "").slice(0, 10)
                      )
                    }
                  />
                </div>
              </div>

              <div className="auth-two-column">
                <div className="auth-field">
                  <label htmlFor="register-password">Password</label>
                  <div className="auth-input">
                    <span className="auth-input-icon">🔒</span>
                    <input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />

                    <button
                      type="button"
                      className="auth-show-btn"
                      onClick={() => setShowPassword((value) => !value)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div className="auth-field">
                  <label htmlFor="register-confirm-password">
                    Confirm password
                  </label>
                  <div className="auth-input">
                    <span className="auth-input-icon">🔒</span>
                    <input
                      id="register-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                    />

                    <button
                      type="button"
                      className="auth-show-btn"
                      onClick={() =>
                        setShowConfirmPassword((value) => !value)
                      }
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
              </div>

              <button type="submit" className="auth-submit-btn">
                👤 Create Account
              </button>
            </form>

            <p className="auth-switch-text">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Register;