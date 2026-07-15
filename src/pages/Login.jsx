import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import authImage from "../assets/Stethoscope.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    const result = login(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <section className="auth-media">
          <img
            src={authImage}
            alt="Stethoscope and blood pressure monitor"
            className="auth-media-image"
          />

          <div className="auth-media-overlay" />

          <div className="auth-media-content">
            <span className="auth-media-tag">CAREPLUS PATIENT PORTAL</span>

            <h1>
              Trusted healthcare,
              <span> made simple.</span>
            </h1>

            <p className="auth-media-description">
              Book appointments, find experienced doctors and manage your care
              securely from one convenient place.
            </p>

            <div className="auth-benefit-list">
              <div>
                <span>✓</span>
                <p>Secure patient access</p>
              </div>
              <div>
                <span>✓</span>
                <p>Easy appointment booking</p>
              </div>
              <div>
                <span>✓</span>
                <p>Trusted local doctors</p>
              </div>
            </div>
          </div>
        </section>

        <section className="auth-form-side">
          <div className="auth-form-card">
            <Link to="/" className="auth-back-link">
              ← Back to Home
            </Link>

            <img
              src={logo}
              alt="CarePlus Medical Centre"
              className="auth-centred-logo"
            />

            <div className="auth-heading">
              <p className="auth-eyebrow">WELCOME BACK</p>
              <h2>Login to your account</h2>
              <p>Access your appointments and CarePlus patient dashboard.</p>
            </div>

            {error && <p className="auth-message error">{error}</p>}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <label htmlFor="login-email">Email address</label>

                <div className="auth-input">
                  <span className="auth-input-icon">✉</span>
                  <input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="login-password">Password</label>

                <div className="auth-input">
                  <span className="auth-input-icon">🔒</span>
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />

                  <button
                    type="button"
                    className="auth-show-btn"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-submit-btn">
                🔒 Login
              </button>
            </form>

            <div className="auth-divider">
              <span />
              <p>or</p>
              <span />
            </div>

            <p className="auth-switch-text">
              Don&apos;t have an account?{" "}
              <Link to="/register">Create an account</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;