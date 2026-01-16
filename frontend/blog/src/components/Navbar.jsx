import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Dropdown, Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axiosInstance from '../utills/axios.js';
import { useAuthStore } from '../store/useAuthStore';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Cpu } from 'lucide-react';

const Navbarog = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { authUser, logout } = useAuthStore();
  const { theme, toggleTheme } = useTheme();

  const userId = localStorage.getItem("userId");

  // Industrial Style Override for Navbar
  const navStyle = {
    background: 'var(--bg-secondary)',
    borderBottom: '1px solid var(--border-color)',
    fontFamily: 'var(--font-mono)',
  };

  const linkStyle = ({ isActive }) => ({
    position: "relative",
    textDecoration: "none",
    color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
    fontWeight: isActive ? 'bold' : 'normal',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '0.8rem',
    transition: 'color 0.3s ease'
  });

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
        toggleBtn && collapseMenu &&
        !toggleBtn.contains(event.target) &&
        !collapseMenu.contains(event.target)
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [expanded]);

  return (
    <>
      {/* Industrial Top Bar */}
      <div style={{
        background: 'var(--accent-primary)',
        color: '#000',
        fontSize: '0.7rem',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '2px 0',
        fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase',
        letterSpacing: '2px'
      }}>
        System Status: Operational // Write Loud, Read Proud
      </div>

      <Navbar expand="lg" expanded={expanded}
        onToggle={() => setExpanded((prev) => !prev)}
        className="sticky-top py-3"
        style={navStyle}
      >
        <Container fluid>
          <Navbar.Brand
            href="#"
            className='d-flex align-items-center gap-2'
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: "1.2rem",
              color: 'var(--text-primary)',
              letterSpacing: '-1px'
            }}
          >
            <div style={{
              width: '32px', height: '32px',
              background: 'var(--text-primary)',
              color: 'var(--bg-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              AI
            </div>
            AIZEN<span style={{ color: 'var(--accent-primary)' }}>X</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" style={{ borderColor: 'var(--border-color)' }}>
            <span className="navbar-toggler-icon" style={{ filter: theme === 'dark' ? 'invert(1)' : 'invert(0)' }}></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="navbarScroll">
            <Nav className="mx-auto d-flex justify-content-center w-100 gap-4" navbarScroll>
              <Nav.Link as={NavLink} to="/" onClick={() => { window.scrollTo(0, 0); setExpanded(false); }} style={linkStyle}>
                Home
              </Nav.Link>
              {authUser?.isEditor && (
                <Nav.Link as={NavLink} to="/user/myblogs" onClick={() => setExpanded(false)} style={linkStyle}>
                  My Blogs
                </Nav.Link>
              )}
              <Nav.Link as={NavLink} to="/totalblogs" onClick={() => { window.scrollTo(0, 0); setExpanded(false); }} style={linkStyle}>
                All Blogs
              </Nav.Link>
              {authUser?.isAdmin && (
                <Nav.Link as={NavLink} to="/admin/manage-users" onClick={() => { window.scrollTo(0, 0); setExpanded(false); }} style={linkStyle}>
                  Admin
                </Nav.Link>
              )}
              <Nav.Link as={NavLink} to="/vedio" onClick={() => { window.scrollTo(0, 0); setExpanded(false); }} style={linkStyle}>
                Lyrics
              </Nav.Link>
              <Nav.Link as={NavLink} to="/aboutus" onClick={() => { window.scrollTo(0, 0); setExpanded(false); }} style={linkStyle}>
                About
              </Nav.Link>
            </Nav>

            <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
              {/* Theme Switcher */}
              <div
                onClick={toggleTheme}
                style={{
                  cursor: 'pointer',
                  padding: '8px',
                  border: '1px solid var(--border-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent-primary)'
                }}
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </div>

              {authUser ? (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="link"
                    className="p-0 border-0 d-flex align-items-center"
                    id="user-dropdown"
                    style={{ textDecoration: 'none', boxShadow: 'none' }}
                  >
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '6px 12px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-primary)'
                    }}>
                      <img
                        src={authUser?.profileImage || "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"}
                        alt="Profile"
                        style={{
                          width: "24px", height: "24px",
                          objectFit: "cover",
                          filter: 'grayscale(100%)'
                        }}
                      />
                      <span style={{
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem'
                      }}>
                        {authUser?.name?.split(' ')[0] || "USER"}
                      </span>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end" style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 0,
                    marginTop: '10px'
                  }}>
                    <Dropdown.Item as={NavLink} to="/Userprofile" className='text-light font-monospace small'>PROFILE DATABASE</Dropdown.Item>
                    <Dropdown.Divider style={{ borderColor: 'var(--border-color)' }} />
                    <Dropdown.Item onClick={logout} className='text-danger font-monospace small'>TERMINATE SESSION</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  variant="outline-warning"
                  onClick={() => navigate('/login')}
                  className="btn-primary-glow"
                  style={{
                    borderRadius: 0,
                    fontSize: '0.8rem',
                    padding: '8px 20px',
                    background: 'var(--accent-primary)',
                    color: 'black',
                    border: 'none'
                  }}
                >
                  INITIALIZE
                </Button>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Navbarog;