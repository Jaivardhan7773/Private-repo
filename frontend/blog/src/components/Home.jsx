import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Allblogs from './Allblogs';
import Footer from './footer';
import { NavLink, useNavigate } from "react-router-dom";
import Getintouch from "./Contact/Getintouch";
import SEO from "./SEO";
import Carousel from "./carousel";

const Home = () => {
  const navigate = useNavigate();


  return (
    <>
      <SEO
        title="Home"
        description="Welcome to Trending Topics - Your ultimate destination for blogs, music, and entertainment."
        url="/"
      />
      <Carousel />
      <Allblogs />

      <div style={{ background: 'var(--bg-primary)' }}>

        {/* Get in Touch Section - Now full width handled by component */}
        <div id="apply">
          <Getintouch />
        </div>

        {/* Architecture & Discovery Showcase */}
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="glass-panel h-100 p-0 overflow-hidden" style={{ position: 'relative', minHeight: '320px' }}>
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80"
                  className="w-100 h-100"
                  alt="Autonomous AI Architecture"
                  loading="lazy"
                  style={{ objectFit: 'cover', opacity: 0.35 }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, var(--bg-primary) 20%, rgba(9,9,11,0.6) 100%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  padding: '2rem'
                }}>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span style={{
                      background: 'var(--accent-primary)',
                      color: '#000',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      letterSpacing: '1px'
                    }}>
                      SYSTEMS ARCHITECTURE
                    </span>
                  </div>
                  <h4 className="fw-bold mb-2 text-uppercase" style={{ letterSpacing: '-1px', color: 'var(--text-primary)' }}>
                    Agentic AI Pipeline
                  </h4>
                  <p className="small text-secondary mb-4" style={{ fontFamily: 'var(--font-mono)', lineHeight: '1.6' }}>
                    Engineered by <strong>Jaivardhan Singh</strong>. Autonomous Google Trends scraping,
                    Gemini 2.5 Flash research grounding, multi-tier Cloudinary asset routing, and
                    MongoDB performance indexing.
                  </p>
                  <button
                    className="btn-primary-glow w-50 py-2 small"
                    onClick={() => navigate("/portfolio")}
                  >
                    VIEW PORTFOLIO & CV
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="glass-panel h-100 p-0 overflow-hidden" style={{ position: 'relative', minHeight: '320px' }}>
                <img
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80"
                  className="w-100 h-100"
                  alt="Global Trends Database"
                  loading="lazy"
                  style={{ objectFit: 'cover', opacity: 0.35 }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, var(--bg-primary) 20%, rgba(9,9,11,0.6) 100%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  padding: '2rem'
                }}>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span style={{
                      background: 'var(--accent-primary)',
                      color: '#000',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      letterSpacing: '1px'
                    }}>
                      DATABASE INDEXED
                    </span>
                  </div>
                  <h4 className="fw-bold mb-2 text-uppercase" style={{ letterSpacing: '-1px', color: 'var(--text-primary)' }}>
                    Intelligence Archives
                  </h4>
                  <p className="small text-secondary mb-4" style={{ fontFamily: 'var(--font-mono)', lineHeight: '1.6' }}>
                    Browse all verified, categorized reports across Technology, Sports, News,
                    and Entertainment with real-time text search and sub-50ms retrieval.
                  </p>
                  <NavLink to="/totalblogs">
                    <button className="btn-primary-glow w-50 py-2 small">EXPLORE ALL ARTICLES</button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />


    </>
  );
};

export default Home;


