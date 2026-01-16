import React, { useEffect } from "react";
import { Carousel, Row, Col, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAdminStore } from "../store/admin/useAdminStore";
import { Terminal } from 'lucide-react';

AOS.init();

const CarouselComponent = () => {
  const { fetchCarousel, carouselItems, loading } = useAdminStore();

  useEffect(() => {
    if (carouselItems.length === 0) {
      fetchCarousel();
    }
  }, [fetchCarousel, carouselItems.length]);

  return (
    <div className="container pb-5">

      <section className="text-center py-5">
        <div className="container">
          <div className="d-inline-block px-3 py-1 mb-3 bg-secondary border border-secondary" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-primary)' }}>
            SYSTEM: ONLINE
          </div>
          <h1 className="fw-bold mb-3 display-4" style={{ fontFamily: 'var(--font-main)', letterSpacing: '-2px' }}>
            UNLEASH YOUR <span style={{ color: 'var(--accent-primary)' }}>STYLE</span>
          </h1>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: '600px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '1rem' }}>
            >> Explore the latest in hip hop fashion, lyrics, and culture.
            <br />
            >> Tailored for desi enthusiasts.
          </p>
          <NavLink to="/soon" className="btn-primary-glow text-decoration-none d-inline-flex align-items-center gap-2">
            <Terminal size={18} />
            INITIATE SHOPPING
          </NavLink>

          <div className="mt-4 pt-4 border-top border-secondary d-inline-block px-5">
            <p className="mb-1 text-warning" style={{ letterSpacing: '3px' }}>&#9733; &#9733; &#9733; &#9733; &#9733;</p>
            <p className="mb-0 small font-monospace text-muted">RATED 5 STARS BY OPERATIVES</p>
          </div>
        </div>
      </section>

      {loading ? (
        <Row className="mt-3">
          {[1].map((_, idx) => (
            <Col md={12} key={idx} className="mb-4">
              <div className="glass-panel" style={{ height: '400px', position: 'relative' }}>
                <Skeleton
                  height={400}
                  className="w-100 h-100"
                  baseColor="var(--bg-secondary)"
                  highlightColor="var(--border-color)"
                  style={{ borderRadius: 0 }}
                />
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="glass-panel p-1">
          <Carousel slide={true}>
            {carouselItems.length > 0 ? (
              carouselItems.map((item) => (
                <Carousel.Item key={item._id}>
                  <div style={{ position: 'relative', height: '400px' }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 50%)',
                      zIndex: 1
                    }} />
                    <img
                      className="d-block w-100 h-100"
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                    <Carousel.Caption style={{ zIndex: 2, bottom: '2rem' }}>
                      <h3 className="font-monospace fw-bold text-uppercase" style={{ textShadow: '2px 2px 4px black' }}>{item.title}</h3>
                      <p style={{
                        color: 'var(--text-secondary)',
                        background: 'rgba(0,0,0,0.7)',
                        display: "inline-block",
                        padding: "4px 12px",
                        border: '1px solid var(--border-color)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.9rem'
                      }}>
                        {item.description}
                      </p>
                    </Carousel.Caption>
                  </div>
                </Carousel.Item>
              ))
            ) : (
              <Carousel.Item>
                <div className="d-flex align-items-center justify-content-center bg-secondary" style={{ height: '400px' }}>
                  <p className="font-monospace text-muted">NO DATA AVAILABLE</p>
                </div>
              </Carousel.Item>
            )}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default CarouselComponent;
