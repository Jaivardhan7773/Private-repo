import React, { useContext, useState } from "react";
import { Container, Form, Button , Spinner } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { AuthContext } from "../store/authentication";

const Login = () => {
  const [captchaToken, setCaptchaToken] = useState("");
  let { Token, setToken } = useContext(AuthContext);
  const [action , setAction] = useState(false)

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      toast.error("Please verify that you are human.");
      return;
    }
    try {
      setAction(true)
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, formData);
      toast.success(response.data.message);
      setToken(response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem("Token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      navigate("/");
      window.location.reload();
      setAction(false)

    } catch (error) {
      setAction(false)
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100">
      <Container className="d-flex justify-content-center">
        <Form className="p-4 border rounded " onSubmit={handleSubmit} style={{
          background: "rgba(99, 74, 74, 0.2)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: "15px",
          border: "1px solid rgba(255, 255, 255, 0.91)"
        }}>
          <h3 className="text-center mb-4 text-light">Login</h3>

          <Form.Group className="mb-3">
            <Form.Label className="text-light">Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-light">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-center w-100 mb-3">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={(token) => setCaptchaToken(token)}
            />
          </div>
          <Button variant="primary" type="submit" className="w-100 text-light" disabled={action} >
                                       {action? (
                            <>
                              Processing <Spinner animation="border" size="sm" />
                            </>
                          ) : (
                            "Login"
                          )}
          </Button>

          <p className="text-center text-light mt-3">
            Don't have an account?{" "}
            <NavLink to="/signup" className="text-primary text-decoration-none">
              Sign Up now
            </NavLink>
          </p>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
