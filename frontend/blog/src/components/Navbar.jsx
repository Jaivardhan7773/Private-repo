import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Dropdown, Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from "axios";

const Navbarog = () => {

  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const getUser = localStorage.getItem("user");
    if (getUser) {
      setUser(JSON.parse(getUser));
    }
  }, []);



  useEffect(() => {
    const handleClickOutside = (event) => {
      const toggleBtn = document.querySelector(".navbar-toggler");
      const collapseMenu = document.getElementById("navbarScroll");
      if (
        expanded &&
        !toggleBtn.contains(event.target) &&
        !collapseMenu.contains(event.target)
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [expanded]);


  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("Token")
      if (!userId) {
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/get-user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
        toast.error("Error fetching user details.");
      }
    };

    fetchUser();
  }, [userId]);


  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem("Token");
    localStorage.removeItem("userId");
    localStorage.removeItem("_grecaptcha")
    setUser(null);
    toast.success("Logged out successfully");
    navigate('/login');
    window.location.reload();

  };

  ; return (
    <>
      <p style={{
        overflowWrap: "break-word",
        whiteSpace: "nowrap",
        textAlign: "center",
        fontWeight: "bold",
        backgroundColor: "black",
        cursor: "pointer"
      }} className='mb-0 text-light ' onClick={() => navigate('/soon')}>
        Write Loud, Read Proud !
      </p>

      <Navbar expand="lg" expanded={expanded}
        onToggle={() => setExpanded((prev) => !prev)} className="sticky-top navblur px-lg-5">
        <Container fluid>
          <Navbar.Brand
            href="#"
            style={{
              fontFamily: "'Tektur', sans-serif",
              fontOpticalSizing: "auto",
              fontWeight: 700,
              fontStyle: "normal",
              fontVariationSettings: '"wdth" 100',
              fontSize: "clamp(1.2rem, 2vw, 2rem)"
            }}
          >

            <img src='https://cdn-icons-png.flaticon.com/128/8149/8149827.png'  className="navbarlogo" style={{
              maxHeight: "40px", maxWidth: "40px",
              position: "relative",
              left: '5px',
              bottom: '4px',
              alt:'Jaivardhan singh '
            }} />
            izen
            <img src='https://cdn-icons-png.flaticon.com/128/16083/16083469.png'  className="navbarlogo" style={{
              maxHeight: "40px",
              maxWidth: "30px",
              position: "relative",
              right: '5px'
            ,
              alt:'Jaivardhan singh '
            }} />
          </Navbar.Brand>




          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" data-bs-toggle="collapse">

            <Nav className="mx-auto d-flex justify-content-center w-100" navbarScroll>
              <Nav.Link as={NavLink} to="/" className=" px-3" onClick={() => { window.scrollTo(0, 0); setExpanded(false); }} style={({ isActive }) => ({
                position: "relative",
                textDecoration: "none",

              })}>
                Home
              </Nav.Link>
              {user?.isEditor && (
                <Nav.Link as={NavLink} to="/user/myblogs" className="px-3"onClick={() => { window.scrollTo(0 , 1500); setExpanded(false); }}>
                  My Blogs
                </Nav.Link>
              )}
              <Nav.Link as={NavLink} to="/totalblogs" onClick={() => { window.scrollTo(0, 0); setExpanded(false); }} className=" px-3">
                All Blogs
              </Nav.Link>
              {user?.isAdmin && (
                <Nav.Link as={NavLink} to="/admin/manage-users" className=" px-3" onClick={() => { window.scrollTo(0, 0); setExpanded(false); }}>
                  Admin Panel
                </Nav.Link>
              )}
              <Nav.Link as={NavLink} to="/vedio" className=" px-3" onClick={() => { window.scrollTo(0, 0); setExpanded(false); }}>
                Song Lyrics
              </Nav.Link>
              <Nav.Link as={NavLink} to="/aboutus" className=" px-3" onClick={() => { window.scrollTo(0, 0); setExpanded(false); }}>
                About Us
              </Nav.Link>
            </Nav>


            <Form className="d-flex">
              {user ? (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-warning"
                    className="d-flex align-items-center  border border-gray-300 rounded-pill px-2 py-1"
                    id="user-dropdown"
                    onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
                    onMouseLeave={(e) => (e.target.style.opacity = "1")}
                    style={{ backgroundColor: "#fff", transition: "opacity 0.2s ease" }}
                  >
                    <img
                      src={user?.profileImage || "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"}
                      alt={`Profile`}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginRight: "8px",
                      }}
                    />
                    <span className="text-dark fw-medium">{user?.name || "Guest"}</span> 
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="shadow">
                    <Dropdown.Item as={NavLink} to="/Userprofile" className='text-center'>Profile</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout} className='text-center'>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Dropdown>
                  <Dropdown.Toggle variant="danger rounded-pill" id="auth-dropdown">
                    SignUp/Login
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="shadow">
                    <Dropdown.Item as={NavLink} to="/login">Login</Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="/signup">Sign Up</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  )
}

export default Navbarog;
