import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import axiosInstance from "../utills/axios.js";
import { useAuthStore } from "../store/useAuthStore";
import SEO from "../components/SEO";

const Signup = () => {
  const { addToast } = useToast();
  const { Signup, isSigningUp } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  const [isOtpSending, setIsOtpSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSendOtp = async () => {

    if (!formData.email) {
      addToast("Please enter an email first.", "error");
      return;
    }
    setIsOtpSending(true);
    try {
      await axiosInstance.post("/send-otp", {
        email: formData.email,
      });
      setIsOtpSending(false);
      addToast("OTP sent to your email!", "success");
      setOtpSent(true);
      setResendDisabled(true);
      setTimer(60);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setIsOtpSending(false);
      addToast(error.response?.data?.message || "Failed to send OTP.", "error");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpSent) {
      addToast("Please verify your email by entering OTP.", "error");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      addToast("Passwords do not match!", "error");
      return;
    }

    try {
      const response = await axiosInstance.post("/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        gender: formData.gender,
        otp: formData.otp,
      });

      addToast(response.data.message, "success");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        gender: "",
        otp: "",
      });

      navigate("/login");
    } catch (error) {
      addToast(error.response?.data?.message || "Signup failed.", "error");
    }
  };

  return (
    <>
      <SEO
        title="Sign Up"
        description="Create your AizenX account and start sharing your thoughts with the world."
        url="/signup"
      />
      <div className="d-flex justify-content-center align-items-center min-vh-100 w-100 py-5">
        <Container className="d-flex justify-content-center">
          <div
            className="glass-panel p-5 animate-fade-in"
            style={{ width: "100%", maxWidth: "500px" }}
          >
            <h2 className="text-center mb-4" style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>
              Create Account
            </h2>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: 'var(--text-secondary)' }}>Full Name</Form.Label>
                <Form.Control
                  className="glass-input"
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
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

              {otpSent && (
                <Form.Group className="mb-3">
                  <Form.Label className="text-warning">Enter OTP</Form.Label>
                  <Form.Control
                    type="text"
                    name="otp"
                    className="glass-input border-warning text-success"
                    placeholder="Enter OTP"
                    value={formData.otp}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Label style={{ color: 'var(--text-secondary)' }}>Password</Form.Label>
                <Form.Control
                  className="glass-input"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: 'var(--text-secondary)' }}>Confirm Password</Form.Label>
                <Form.Control
                  className="glass-input"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: 'var(--text-secondary)' }}>Gender</Form.Label>
                <Form.Select
                  className="glass-input"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: 'var(--text-secondary)' }}>Phone Number</Form.Label>
                <Form.Control
                  className="glass-input"
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {!otpSent ? (
                <button
                  type="button"
                  className="btn-primary-glow w-100 mt-2"
                  onClick={handleSendOtp}
                  disabled={isOtpSending}
                >
                  {isOtpSending ? "Sending..." : "Verify Email"}
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    className="btn-primary-glow w-100 mt-2"
                  >
                    Sign Up
                  </button>
                  <p className="text-center mt-3" style={{ color: 'var(--text-secondary)' }}>
                    {resendDisabled ? `Resend OTP in ${timer}s` : (
                      <span
                        onClick={handleSendOtp}
                        style={{ cursor: "pointer", color: "var(--accent-primary)", textDecoration: "underline" }}
                      >
                        Resend OTP
                      </span>
                    )}
                  </p>
                </>
              )}

              <p className="text-center mt-4" style={{ color: 'var(--text-secondary)' }}>
                Already have an account?{" "}
                <NavLink to="/login" style={{ color: "var(--accent-secondary)", textDecoration: 'none', fontWeight: 'bold' }}>
                  Login here
                </NavLink>
              </p>
            </Form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Signup;
