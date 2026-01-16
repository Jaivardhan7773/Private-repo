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
        description="Welcome to AizenX - Your ultimate destination for blogs, music, and entertainment."
        url="/"
      />
      <Carousel />
      <Allblogs />

      <div style={{ background: 'var(--bg-primary)' }}>

        {/* Get in Touch Section - Now full width handled by component */}
        <div id="apply">
          <Getintouch />
        </div>

        {/* Affiliate & Lyrics Section */}
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="glass-panel h-100 p-0 overflow-hidden" style={{ position: 'relative', minHeight: '300px' }}>
                <img
                  src="https://images.unsplash.com/photo-1662947368791-8630979e964b?auto=format&fit=crop&w=861&h=716"
                  className="w-100 h-100"
                  alt="Aizenx Merchandise"
                  loading="lazy"
                  style={{ objectFit: 'cover', opacity: 0.6 }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, var(--bg-primary) 10%, transparent 100%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  padding: '2rem'
                }}>
                  <h4 className="fw-bold mb-2 text-uppercase" style={{ letterSpacing: '-1px' }}>Deals & Products</h4>
                  <p className="small text-secondary mb-4">
                    Explore curated products from <strong>Amazon</strong> and <strong>Flipkart</strong>.
                    Support our platform at no extra cost.
                  </p>
                  <button
                    className="btn-primary-glow w-50 py-2 small"
                    onClick={() => navigate("/soon")}
                  >
                    ACCESS STORE
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="glass-panel h-100 p-0 overflow-hidden" style={{ position: 'relative', minHeight: '300px' }}>
                <img
                  src="https://images.unsplash.com/photo-1508973379184-7517410fb0bc?auto=format&fit=crop&w=861&h=716"
                  className="w-100 h-100"
                  alt="Aizenx Lyrics"
                  loading="lazy"
                  style={{ objectFit: 'cover', opacity: 0.6 }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, var(--bg-primary) 10%, transparent 100%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  padding: '2rem'
                }}>
                  <h4 className="fw-bold mb-2 text-uppercase" style={{ letterSpacing: '-1px' }}>Lyrics Database</h4>
                  <p className="small text-secondary mb-4">Explore and submit your favorite songs lyrics.</p>
                  <NavLink to="/vedio">
                    <button className="btn-primary-glow w-50 py-2 small">VIEW ARCHIVES</button>
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
