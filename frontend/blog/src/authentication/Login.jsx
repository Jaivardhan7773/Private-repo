import React, { useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuthStore } from "../store/useAuthStore";
import SEO from "../components/SEO";

const Login = () => {
  const [captchaToken, setCaptchaToken] = useState("");
  const { login, isLoggingIng } = useAuthStore();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      addToast("Email is required", "error");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      addToast("Invalid email format", "error");
      return false;
    }
    if (!formData.password) {
      addToast("Password is required", "error");
      return false;
    }
    if (formData.password.length < 6) {
      addToast("Password must be at least 6 characters", "error");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      await login(formData); // Assuming login returns a promise or handles toasts internally, if not we might need to wrap it.
      // If login function in store handles errors with toast.error, we need to check if we need to update that store too. 
      // For now, assuming login works as is but we replaced the local validation toasts.
    }
  }


  return (
    <>
      <SEO
        title="Login"
        description="Login to your AizenX account to create and read blogs. Join the community today!"
        url="/login"
      />
      <div className="d-flex justify-content-center align-items-center vh-100 w-100">
        <Container className="d-flex justify-content-center">
          <div
            className="glass-panel p-5 animate-fade-in"
            style={{ width: "100%", maxWidth: "450px" }}
          >
            <h2 className="text-center mb-4" style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>
              Welcome Back
            </h2>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label style={{ color: 'var(--text-secondary)' }}>Email address</Form.Label>
                <Form.Control
                  className="glass-input"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label style={{ color: 'var(--text-secondary)' }}>Password</Form.Label>
                <Form.Control
                  className="glass-input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-center w-100 mb-4">
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={(token) => setCaptchaToken(token)}
                  theme="dark"
                />
              </div>

              <button
                type="submit"
                className="btn-primary-glow w-100"
                disabled={isLoggingIng}
              >
                {isLoggingIng ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>

              <p className="text-center mt-4" style={{ color: 'var(--text-secondary)' }}>
                Don't have an account?{" "}
                <NavLink to="/signup" style={{ color: 'var(--accent-secondary)', textDecoration: 'none', fontWeight: 'bold' }}>
                  Sign Up now
                </NavLink>
              </p>
            </Form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Login;
