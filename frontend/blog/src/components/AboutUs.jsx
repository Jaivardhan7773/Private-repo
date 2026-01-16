import React from 'react';
import Footer from './footer';
import Queryform from './queryform';
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import SEO from "./SEO";
import { Info, Music, Globe, Users, ArrowRight, ActivitySquare, Disc } from 'lucide-react';
import { Container, Row, Col } from 'react-bootstrap';

AOS.init();

const AboutUs = () => {

  const navigate = useNavigate();
  return (
    <>
      <SEO
        title="About Us"
        description="Learn more about AizenX, our mission, and the team behind the content."
        url="/aboutus"
      />
      <div className="min-vh-100" style={{ backgroundColor: 'var(--bg-primary)' }}>

        {/* Header Section */}
        <div style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }} data-aos="fade-down">
          <Container className="py-5">
            <Row className="align-items-center">
              <Col lg={6} md={6} className="text-center text-lg-start mb-4 mb-lg-0">
                <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 mb-3 text-accent font-monospace">
                  <Info size={16} /> ABOUT THE PLATFORM
                </div>
                <h1 className="fw-bold mb-4 display-4" style={{ fontFamily: 'var(--font-main)', color: 'var(--text-primary)', letterSpacing: '-1px' }}>
                  DISCOVER <span style={{ color: 'var(--accent-primary)' }}>AIZEN X</span>
                </h1>
                <p className="lead text-secondary mb-5" style={{ lineHeight: '1.8' }}>
                  AizenX is your go-to destination for all things Desi Hip-Hop blogs, delivering the latest news, Memes, updates, and trends in the Indian blog scene. Stay tuned for exclusive content, artist interviews, and much more!
                </p>
                <button
                  className="btn-primary-glow px-5 py-3 d-inline-flex align-items-center gap-2"
                  onClick={() => navigate('/')}
                >
                  START EXPLORATION <ArrowRight size={18} />
                </button>
              </Col>

              <Col lg={6} md={6} className="text-center">
                <div className="position-relative p-2" style={{ border: '1px solid var(--accent-primary)' }}>
                  <img
                    src="https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    loading='lazy'
                    alt="Aizenx Blogs"
                    className="img-fluid"
                    style={{ filter: 'grayscale(20%) contrast(110%)' }}
                  />
                  <div className="position-absolute bottom-0 end-0 bg-dark p-4 border border-secondary" style={{ maxWidth: '200px' }}>
                    <div className="mb-3">
                      <h3 className="fw-bold text-accent mb-0 font-monospace">150+</h3>
                      <small className="text-muted text-uppercase">Active Members</small>
                    </div>
                    <div>
                      <h3 className="fw-bold text-accent mb-0 font-monospace">15+</h3>
                      <small className="text-muted text-uppercase">Trusted Sources</small>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Music Hub Section */}
        <div className="py-5 text-center position-relative overflow-hidden" data-aos="fade-up" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <Container>
            <div className="d-flex justify-content-center mb-3 text-secondary">
              <Music size={48} strokeWidth={1} />
            </div>
            <h2 className="fw-bold mb-4" style={{ fontFamily: 'var(--font-main)', color: 'var(--text-primary)' }}>MUSIC INTELLIGENCE HUB</h2>
            <p className="text-secondary mx-auto mb-5" style={{ maxWidth: '800px', lineHeight: '1.8' }}>
              Discover the latest in  music, artists, and hiphop culture through <br />
              our comprehensive music and blog information platform.
            </p>
          </Container>
        </div>

        {/* Contact Section */}
        <Container className="py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3" style={{ fontFamily: 'var(--font-main)', color: 'var(--text-primary)' }}>ESTABLISH CONTACT</h2>
            <p className="text-secondary">We value input from all entities. Initialize communication below.</p>
          </div>

          <Row className="justify-content-center align-items-center g-5">
            {/* Left: Contact Form */}
            <Col lg={7} data-aos="fade-right">
              <div className="glass-panel p-4">
                <Queryform />
              </div>
            </Col>

            {/* Right: Image */}
            <Col lg={5} className="text-center">
              <div className="glass-panel p-3 d-inline-block">
                <img
                  src="https://img.freepik.com/free-vector/company-employees-planning-task-brainstorming_74855-6316.jpg"
                  alt="Contact"
                  loading='lazy'
                  className="img-fluid"
                  style={{ maxHeight: '400px', opacity: '0.9' }}
                />
                <p className="mt-3 font-monospace text-accent small mb-0"> TEAM COLLABORATION PROTOCOLS ACTIVE</p>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Blogs Hub Section */}
        <div className="py-5" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
          <Container>
            <div className="text-center mb-5">
              <h2 className="fw-bold mb-4" style={{ fontFamily: 'var(--font-main)', color: 'var(--text-primary)' }}>BLOG OPERATIONS CENTER</h2>
              <p className="text-secondary mx-auto" style={{ maxWidth: '700px' }}>
                Discover the latest in  music, artists, and culture through <br />
                our comprehensive blog information platform.
              </p>
            </div>

            <Row className="g-4 justify-content-center">
              {[
                { title: "Music Reviews", desc: "In-depth reviews of the latest rap albums and tracks.", img: "https://images.unsplash.com/photo-1548527388-e836c900b6c3?ixid=M3wzOTE5Mjl8MHwxfHNlYXJjaHw0fHxyYXAlMjBtdXNpY3xlbnwwfHx8fDE3MzU1Njc3NzV8MA&ixlib=rb-4.0.3&auto=format&fit=crop&w=1006&h=720", icon: <Disc size={20} /> },
                { title: "Artist Spotlights", desc: "Highlighting influential artists and their contributions.", img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixid=M3wzOTE5Mjl8MHwxfHNlYXJjaHwxMnx8cmFwJTIwbXVzaWN8ZW58MHx8fHwxNzM1NTY3Nzc1fDA&ixlib=rb-4.0.3&auto=format&fit=crop&w=1006&h=720", icon: <Users size={20} /> },
                { title: "News Updates", desc: "Stay updated with the latest happenings in rap music.", img: "https://images.unsplash.com/photo-1619983081563-430f63602796?ixid=M3wzOTE5Mjl8MHwxfHNlYXJjaHw5fHxyYXAlMjBtdXNpY3xlbnwwfHx8fHwxNzM1NTY3Nzc1fDA&ixlib=rb-4.0.3&auto=format&fit=crop&w=1006&h=720", icon: <Globe size={20} /> },
                { title: "Event Coverage", desc: "Coverage of rap concerts, festivals, and events.", img: "https://images.unsplash.com/photo-1542395118-9d95347995bc?ixid=M3wzOTE5Mjl8MHwxfHNlYXJjaHwxNXx8cmFwJTIwbXVzaWN8ZW58MHx8fHwxNzM1NTY3Nzc1fDA&ixlib=rb-4.0.3&auto=format&fit=crop&w=1006&h=720", icon: <ActivitySquare size={20} /> }
              ].map((item, idx) => (
                <Col lg={6} md={8} key={idx}>
                  <div className="glass-panel p-0 overflow-hidden h-100 card-hover-effect d-flex flex-column flex-sm-row">
                    <div style={{ width: '100%', maxWidth: '200px', minHeight: '150px' }} className="d-none d-sm-block">
                      <img src={item.img} alt={item.title} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="d-block d-sm-none" style={{ height: '200px' }}>
                      <img src={item.img} alt={item.title} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                    </div>

                    <div className="p-4 d-flex flex-column justify-content-center">
                      <h5 className="fw-bold text-white mb-2" style={{ fontFamily: 'var(--font-main)' }}>{item.title}</h5>
                      <p className="text-secondary small mb-0">{item.desc}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>

      </div>
      <Footer />
    </>
  )
}

export default AboutUs