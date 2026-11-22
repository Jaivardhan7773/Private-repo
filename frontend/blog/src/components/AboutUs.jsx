import React from 'react';
import Footer from './footer';
import Queryform from './queryform';
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import SEO from "./SEO";
import { Info, Cpu, Globe, ArrowRight, Database, Sparkles, Terminal, ShieldCheck } from 'lucide-react';
import { Container, Row, Col } from 'react-bootstrap';

AOS.init();

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="About — Architecture & Mission"
        description="Learn about the autonomous AI publishing architecture and systems engineering behind Trending Topics (AizenX)."
        url="/aboutus"
      />
      <div className="min-vh-100" style={{ backgroundColor: 'var(--bg-primary)' }}>

        {/* ── Header Section ───────────────────────────────────── */}
        <div style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }} data-aos="fade-down">
          <Container className="py-5">
            <Row className="align-items-center">
              <Col lg={7} md={12} className="text-center text-lg-start mb-4 mb-lg-0">
                <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 mb-3 text-accent font-monospace small">
                  <Info size={16} /> ABOUT THE PLATFORM
                </div>
                <h1 className="fw-bold mb-4 display-4" style={{ fontFamily: 'var(--font-main)', color: 'var(--text-primary)', letterSpacing: '-1px' }}>
                  Real-Time <span style={{ color: 'var(--accent-primary)' }}>Trend Journalism</span>
                </h1>
                <p className="lead text-secondary mb-4" style={{ lineHeight: '1.8', fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>
                  Trending Topics is a modern publication and editorial engine architected by
                  <strong style={{ color: 'var(--text-primary)' }}> Jaivardhan Singh</strong> (Lead Full Stack & AI Engineer).
                  The platform monitors breakout queries on Google Trends, verifies current facts via Google Search Grounding,
                  and composes factual, in-depth reports with Gemini 2.5 Flash.
                </p>
                <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                  <button
                    className="btn-primary-glow px-4 py-3 d-inline-flex align-items-center gap-2"
                    onClick={() => navigate('/portfolio')}
                  >
                    ABOUT DEVELOPER
                  </button>
                  <button
                    className="d-inline-flex align-items-center gap-2 px-4 py-3"
                    onClick={() => navigate('/totalblogs')}
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      letterSpacing: '1px',
                      fontWeight: 700,
                    }}
                  >
                    BROWSE ARTICLES <ArrowRight size={16} />
                  </button>
                </div>
              </Col>

              <Col lg={5} md={12} className="text-center mt-4 mt-lg-0">
                <div className="p-4" style={{ border: '1px solid var(--accent-primary)', background: 'var(--bg-primary)' }}>
                  <div className="row g-3 text-center font-monospace">
                    <div className="col-6 p-3 border border-secondary">
                      <h3 className="fw-bold text-accent mb-0">100%</h3>
                      <small className="text-muted text-uppercase" style={{ fontSize: '0.7rem' }}>Autonomous Pipeline</small>
                    </div>
                    <div className="col-6 p-3 border border-secondary">
                      <h3 className="fw-bold text-accent mb-0">&lt; 50ms</h3>
                      <small className="text-muted text-uppercase" style={{ fontSize: '0.7rem' }}>Feed Query Latency</small>
                    </div>
                    <div className="col-6 p-3 border border-secondary">
                      <h3 className="fw-bold text-accent mb-0">2.5 Flash</h3>
                      <small className="text-muted text-uppercase" style={{ fontSize: '0.7rem' }}>Gemini Search Model</small>
                    </div>
                    <div className="col-6 p-3 border border-secondary">
                      <h3 className="fw-bold text-accent mb-0">24 / 7</h3>
                      <small className="text-muted text-uppercase" style={{ fontSize: '0.7rem' }}>Cron Scheduled Cycles</small>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        {/* ── Engineering Pillars Section ──────────────────────── */}
        <div className="py-5" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
          <Container>
            <div className="text-center mb-5">
              <h2 className="fw-bold mb-3" style={{ fontFamily: 'var(--font-main)', color: 'var(--text-primary)', letterSpacing: '-1px' }}>
                HOW TRENDING TOPICS WORKS
              </h2>
              <p className="text-secondary mx-auto font-mono small" style={{ maxWidth: '650px' }}>
                An automated pipeline combining real-time trend discovery, verified AI research, and scalable infrastructure.
              </p>
            </div>

            <Row className="g-4 justify-content-center">
              {[
                {
                  title: "1. Google Trends Live Scraper",
                  desc: "Automated HTTP parser extracting real-time search volumes, +1,000% breakout query breakdowns, and Google-cached news thumbnails without paid API dependencies.",
                  icon: <Globe size={22} className="text-accent" />
                },
                {
                  title: "2. Grounded LLM Synthesis",
                  desc: "Gemini 2.5 Flash configured with live Google Search Grounding to extract verified, current quotes, statistics, and facts while strictly eliminating hallucinations.",
                  icon: <Cpu size={22} className="text-accent" />
                },
                {
                  title: "3. Multi-Tier Media Pipeline",
                  desc: "Three-tier cover image resolver: Trends news photo → Google News thumbnail → Pollinations.ai Flux generation, permanently piped into Cloudinary CDN.",
                  icon: <Sparkles size={22} className="text-accent" />
                },
                {
                  title: "4. High-Performance MongoDB",
                  desc: "MongoDB compound indexes on { category: 1, createdAt: -1 } and full-text search indexes paired with Mongoose .lean() projections for sub-50ms feed retrieval.",
                  icon: <Database size={22} className="text-accent" />
                }
              ].map((pillar, idx) => (
                <Col lg={6} md={12} key={idx}>
                  <div className="glass-panel p-4 h-100 d-flex gap-3 align-items-start">
                    <div className="p-3" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                      {pillar.icon}
                    </div>
                    <div>
                      <h5 className="fw-bold text-white mb-2" style={{ fontFamily: 'var(--font-main)' }}>{pillar.title}</h5>
                      <p className="text-secondary small mb-0" style={{ fontFamily: 'var(--font-mono)', lineHeight: '1.6' }}>{pillar.desc}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>

        {/* ── Contact Section ──────────────────────────────────── */}
        <Container className="py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3" style={{ fontFamily: 'var(--font-main)', color: 'var(--text-primary)', letterSpacing: '-1px' }}>
              GET IN TOUCH
            </h2>
            <p className="text-secondary font-mono small">Have questions, feedback, or an inquiry? Feel free to reach out below.</p>
          </div>

          <Row className="justify-content-center align-items-center g-5">
            <Col lg={7} data-aos="fade-right">
              <div className="glass-panel p-4">
                <Queryform />
              </div>
            </Col>

            <Col lg={5} className="text-center">
              <div className="glass-panel p-4 text-start font-monospace">
                <h5 className="fw-bold text-accent mb-3">JAIVARDHAN SINGH</h5>
                <p className="small text-secondary mb-2"><strong>ROLE:</strong> Lead Full Stack & AI Engineer</p>
                <p className="small text-secondary mb-2"><strong>COMPANY:</strong> Aigiglab</p>
                <p className="small text-secondary mb-2"><strong>EMAIL:</strong> jaivardhansinghrathore17@gmail.com</p>
                <p className="small text-secondary mb-4"><strong>PORTFOLIO:</strong> aizenx.netlify.app</p>
                <a
                  href="/jaivardhan-singh-resume.pdf"
                  download="Jaivardhan_Singh_Resume.pdf"
                  className="btn-primary-glow w-100 text-center text-decoration-none d-block small py-2"
                >
                  DOWNLOAD FULL RESUME PDF
                </a>
              </div>
            </Col>
          </Row>
        </Container>

      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
