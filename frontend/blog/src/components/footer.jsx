import React from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Github, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-5" style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      color: 'var(--text-secondary)'
    }}>
      <Container>
        <Row className="g-5">

          <Col lg={4}>
            <Navbar.Brand
              href="#"
              className='d-flex align-items-center gap-2 mb-4'
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: "1.5rem",
                color: 'var(--text-primary)',
                letterSpacing: '-1px'
              }}
            >
              <div style={{
                width: '36px', height: '36px',
                background: 'var(--text-primary)',
                color: 'var(--bg-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                AI
              </div>
              AIZEN<span style={{ color: 'var(--accent-primary)' }}>X</span>
            </Navbar.Brand>
            <p className="mb-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
              >> Your go-to platform for creating and managing blogs.
              <br />
              >> Explore stories, culture, and more.
            </p>
            <div className='d-flex gap-3'>
              <a href="https://github.com/Jaivardhan7773" target="_blank" className="text-secondary hover-accent"><Github size={20} /></a>
              <a href="https://www.instagram.com/jaivardhan7773_/#" target="_blank" className="text-secondary hover-accent"><Instagram size={20} /></a>
              <a href="https://x.com/Jay_Vardhan7773" target="_blank" className="text-secondary hover-accent"><Twitter size={20} /></a>
              <a href="https://www.linkedin.com/in/jaivardhan7773/" target='_blank' className="text-secondary hover-accent"><Linkedin size={20} /></a>
            </div>
          </Col>


          <Col lg={4}>
            <h5 className="text-uppercase fw-bold mb-4" style={{ color: 'var(--text-primary)', letterSpacing: '1px' }}>Quick Navigation</h5>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontFamily: 'var(--font-mono)' }}>
              <li><NavLink to="/" className="text-decoration-none text-secondary hover-accent d-flex align-items-center gap-2"><ArrowRight size={14} /> HOME</NavLink></li>
              <li><NavLink to="/totalblogs" className="text-decoration-none text-secondary hover-accent d-flex align-items-center gap-2"><ArrowRight size={14} /> INTEL</NavLink></li>
              <li><NavLink to="/user/myblogs" className="text-decoration-none text-secondary hover-accent d-flex align-items-center gap-2"><ArrowRight size={14} /> MY ARCHIVES</NavLink></li>
              <li><NavLink to="/admin/manage-users" className="text-decoration-none text-secondary hover-accent d-flex align-items-center gap-2"><ArrowRight size={14} /> ADMIN COMMAND</NavLink></li>
            </ul>
          </Col>


          <Col lg={4}>
            <h5 className="text-uppercase fw-bold mb-4" style={{ color: 'var(--text-primary)', letterSpacing: '1px' }}>Transmission Channels</h5>
            <p className="mb-2" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>EMAIL: <a href="mailto:jaivardhansinghrathore17@gmail.com" className="text-accent hover-accent text-decoration-none">jaivardhansinghrathore17@gmail.com</a></p>
            <p className="mb-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>PORTFOLIO: <a href="https://jaivardhan.vercel.app" target="_blank" className="text-accent hover-accent text-decoration-none">jaivardhan.vercel.app</a></p>

            <div className="glass-panel p-3" style={{ border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
              <h6 className="fw-bold mb-2 text-uppercase small text-white">Join the Editorial Team</h6>
              <p className="small text-muted mb-3">Submit request to access write permissions.</p>
              <a
                href="#apply"
                className="btn-primary-glow w-100 text-center text-decoration-none d-block small py-2"
              >
                REQUEST ACCESS
              </a>
            </div>
          </Col>
        </Row>

        <div className="border-top border-secondary mt-5 pt-4 text-center">
          <p className="mb-0 small font-monospace text-muted">
            &copy; {new Date().getFullYear()} AIZENX SYSTEMS. DEVELOPED BY <a href="https://jaivardhan.vercel.app" target="_blank" className="text-accent text-decoration-none">JAIVARDHAN</a>.
            <br />
            ALL RIGHTS RESERVED.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
