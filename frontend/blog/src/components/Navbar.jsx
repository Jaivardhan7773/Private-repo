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
import { motion } from 'framer-motion';

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
              TT
            </div>
            Trending<span style={{ color: 'var(--accent-primary)' }}>Topics</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" style={{ borderColor: 'var(--border-color)' }}>
            <span className="navbar-toggler-icon" style={{ filter: theme === 'dark' ? 'invert(1)' : 'invert(0)' }}></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="navbarScroll">
            <Nav className="mx-auto d-flex justify-content-center align-items-center w-100 gap-2" navbarScroll style={{ position: 'relative' }}>
              {[
                { path: '/', label: 'Home', show: true },
                { path: '/user/myblogs', label: 'My Blogs', show: authUser?.isEditor },
                { path: '/totalblogs', label: 'All Blogs', show: true },
                { path: '/admin/manage-users', label: 'Admin', show: authUser?.isAdmin },
                { path: '/video', label: 'Lyrics', show: true },
                { path: '/aboutus', label: 'About', show: true },
              ].filter(link => link.show).map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => { window.scrollTo(0, 0); setExpanded(false); }}
                  className="text-decoration-none position-relative px-3 py-2"
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="liquid-glass-pill"
                          className="position-absolute top-0 start-0 w-100 h-100"
                          style={{
                            background: theme === 'dark' ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)' : 'linear-gradient(135deg, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0.01) 100%)',
                            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
                            borderRadius: '20px',
                            backdropFilter: 'blur(16px) saturate(120%)',
                            WebkitBackdropFilter: 'blur(16px) saturate(120%)',
                            zIndex: 0,
                            boxShadow: theme === 'dark' ? '0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.1), inset 0 -1px 1px rgba(0, 0, 0, 0.2)' : '0 4px 12px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.6), inset 0 -1px 1px rgba(0, 0, 0, 0.05)'
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span style={{
                        position: 'relative',
                        zIndex: 1,
                        color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                        fontWeight: isActive ? '800' : '600',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontSize: '0.8rem',
                        transition: 'color 0.3s ease'
                      }}>
                        {link.label}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </Nav>

            <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
              {/* Theme Switcher Liquid Glass Toggle */}
              <div
                onClick={toggleTheme}
                style={{
                  cursor: 'pointer',
                  width: '64px',
                  height: '32px',
                  background: 'var(--bg-primary)',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 8px',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
                }}
                title="Toggle Theme"
              >
                <Moon size={14} color="var(--text-tertiary)" />
                <Sun size={14} color="var(--text-tertiary)" />
                
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: theme === 'dark' ? '2px' : '32px',
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: theme === 'dark' ? 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)' : 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.02) 100%)',
                    border: theme === 'dark' ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.12)',
                    backdropFilter: 'blur(12px) contrast(120%) saturate(150%)',
                    WebkitBackdropFilter: 'blur(12px) contrast(120%) saturate(150%)',
                    boxShadow: theme === 'dark' ? '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -1px 2px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -1px 2px rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {/* The highlighted pill refracted inside the glass lens */}
                  {theme === 'dark' ? <Moon size={14} color="var(--text-primary)" /> : <Sun size={14} color="var(--text-primary)" />}
                </motion.div>
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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/login')}
                  style={{
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    padding: '8px 24px',
                    background: theme === 'dark' ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)' : 'linear-gradient(135deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.02) 100%)',
                    color: 'var(--text-primary)',
                    border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(16px) saturate(120%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(120%)',
                    boxShadow: theme === 'dark' ? '0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.3), inset 0 -1px 1px rgba(0, 0, 0, 0.2)' : '0 4px 12px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.8), inset 0 -1px 1px rgba(0, 0, 0, 0.1)',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    cursor: 'pointer',
                  }}
                >
                  INITIALIZE
                </motion.button>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Navbarog;
