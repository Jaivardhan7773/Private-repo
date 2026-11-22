import React, { useEffect } from "react";
import { Carousel, Row, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useHomeStore } from "../store/homeapis/useHomeStore";
import { useAdminStore } from "../store/admin/useAdminStore";
import { Terminal, ArrowRight, Cpu, Sparkles, Globe, Database, ShieldCheck } from 'lucide-react';

AOS.init();

const DEFAULT_SLIDES = [
  {
    _id: "default-1",
    title: "AUTONOMOUS GOOGLE TRENDS ENGINE",
    category: "AI & SYSTEMS",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&h=700&q=80",
    description: "Live breakout topics scraped directly from Google Trends, verified through Google Search grounding, and published with zero manual overhead.",
    author: "TrendPulse AI",
    date: new Date().toISOString().split("T")[0],
    isArticle: false,
  },
  {
    _id: "default-2",
    title: "GEMINI 2.5 FLASH EDITORIAL PIPELINE",
    category: "LLM ORCHESTRATION",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&h=700&q=80",
    description: "Multi-modal journalist prompt engine generating rich, structured 500+ word articles with multi-tier cover image routing to Cloudinary CDN.",
    author: "Jaivardhan Singh",
    date: new Date().toISOString().split("T")[0],
    isArticle: false,
  },
  {
    _id: "default-3",
    title: "HIGH-CONCURRENCY MONGODB ARCHITECTURE",
    category: "INFRASTRUCTURE",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&h=700&q=80",
    description: "Full-text text indexing, compound date+category indexing, and .lean() field projections for sub-50ms high-traffic feed queries.",
    author: "Lead AI Engineer",
    date: new Date().toISOString().split("T")[0],
    isArticle: false,
  }
];

const CarouselComponent = () => {
  const navigate = useNavigate();
  const { blogs, fetchAllBlogs, isLoading: blogsLoading } = useHomeStore();
  const { carouselItems, fetchCarousel, loading: adminLoading } = useAdminStore();

  useEffect(() => {
    if (blogs.length === 0) {
      fetchAllBlogs(1, 6);
    }
    if (carouselItems.length === 0) {
      fetchCarousel();
    }
  }, [fetchAllBlogs, fetchCarousel, blogs.length, carouselItems.length]);

  // Priority: 
  // 1. If admin added custom items, use them
  // 2. Otherwise use top latest automated blogs from the database
  // 3. Fall back to curated tech architecture slides
  let displayItems = [];
  if (carouselItems && carouselItems.length > 0) {
    displayItems = carouselItems.map(c => ({
      _id: c._id,
      title: c.title,
      description: c.description,
      image: c.image,
      category: "FEATURED",
      author: "Editor Pick",
      date: new Date().toISOString().split("T")[0],
      isArticle: false,
    }));
  } else if (blogs && blogs.length > 0) {
    displayItems = blogs.slice(0, 4).map(b => ({
      _id: b._id,
      title: b.title,
      description: b.introduction?.slice(0, 140) + "...",
      image: b.image,
      category: b.category || "INTELLIGENCE",
      author: b.author || "TrendPulse AI",
      date: new Date(b.createdAt || Date.now()).toISOString().split("T")[0],
      slug: b.slug,
      isArticle: true,
    }));
  } else {
    displayItems = DEFAULT_SLIDES;
  }

  const isLoading = blogsLoading && adminLoading && displayItems.length === 0;

  return (
    <div className="container pb-4">
      {/* ── HERO BANNER ────────────────────────────────────────── */}
      <section className="text-center pt-4 pb-5">
        <div className="container">
          {/* Status Badge */}
          <div
            className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3"
            style={{
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: 'var(--accent-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--accent-primary)',
                display: 'inline-block',
                boxShadow: '0 0 8px var(--accent-primary)'
              }}
            />
            AUTONOMOUS TREND ENGINE // REAL-TIME GOOGLE SEARCH GROUNDING
          </div>

          <h1
            className="fw-bold mb-3 display-4"
            style={{
              fontFamily: 'var(--font-main)',
              letterSpacing: '-2px',
              color: 'var(--text-primary)',
              lineHeight: 1.15
            }}
          >
            GLOBAL TRENDS & <span style={{ color: 'var(--accent-primary)' }}>AUTONOMOUS INTELLIGENCE</span>
          </h1>

          <p
            className="lead mb-4 mx-auto"
            style={{
              maxWidth: '720px',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.95rem',
              lineHeight: '1.7'
            }}
          >
            Scraping live breakout queries from Google Trends, synthesizing real-time facts with
            Gemini 2.5 Flash, and serving through high-concurrency MongoDB indexes and Cloudinary CDN.
            Architected by <span style={{ color: 'var(--text-primary)' }}>Jaivardhan Singh</span>.
          </p>

          <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
            <NavLink
              to="/totalblogs"
              className="btn-primary-glow text-decoration-none d-inline-flex align-items-center gap-2"
              style={{ padding: '12px 24px' }}
            >
              <Globe size={16} />
              EXPLORE ALL INTEL
            </NavLink>

            <NavLink
              to="/portfolio"
              className="d-inline-flex align-items-center gap-2 text-decoration-none"
              style={{
                padding: '12px 24px',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '1px',
                fontWeight: 700,
                background: 'var(--bg-secondary)',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
            >
              <Terminal size={16} />
              SYSTEM ARCHITECTURE & RESUME
            </NavLink>
          </div>

          {/* Quick Technical Spec Pills */}
          <div className="d-flex flex-wrap justify-content-center gap-3 pt-3 border-top border-secondary">
            {[
              { label: 'DATA: GOOGLE TRENDS LIVE', icon: Globe },
              { label: 'AI: GEMINI 2.5 FLASH', icon: Cpu },
              { label: 'MEDIA: CLOUDINARY CDN', icon: Sparkles },
              { label: 'DATABASE: MONGODB INDEXED', icon: Database },
            ].map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="d-flex align-items-center gap-2"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.5px',
                }}
              >
                <Icon size={13} style={{ color: 'var(--accent-primary)' }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAROUSEL SLIDER ────────────────────────────────────── */}
      {isLoading ? (
        <Row className="mt-3">
          <Col md={12} className="mb-4">
            <div className="glass-panel" style={{ height: '440px', position: 'relative' }}>
              <Skeleton
                height={440}
                className="w-100 h-100"
                baseColor="var(--bg-secondary)"
                highlightColor="var(--border-color)"
                style={{ borderRadius: 0 }}
              />
            </div>
          </Col>
        </Row>
      ) : (
        <div
          className="glass-panel p-1 overflow-hidden"
          style={{
            border: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
          }}
        >
          <Carousel slide={true} interval={5000} indicators={true}>
            {displayItems.map((item) => (
              <Carousel.Item
                key={item._id}
                onClick={() => {
                  if (item.isArticle && item.slug) {
                    navigate(`/blog/${item.slug}`);
                  } else {
                    navigate('/totalblogs');
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ position: 'relative', height: '440px' }}>
                  {/* Subtle Cinematic Vignette */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(9,9,11,0.95) 0%, rgba(9,9,11,0.4) 60%, rgba(9,9,11,0.2) 100%)',
                      zIndex: 1,
                    }}
                  />

                  <img
                    className="d-block w-100 h-100"
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      objectFit: "cover",
                      filter: 'contrast(105%)',
                    }}
                  />

                  <Carousel.Caption
                    style={{
                      zIndex: 2,
                      bottom: '2.5rem',
                      left: '2rem',
                      right: '2rem',
                      textAlign: 'left',
                      padding: 0,
                    }}
                  >
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span
                        style={{
                          background: 'var(--accent-primary)',
                          color: '#000',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          fontSize: '0.68rem',
                          letterSpacing: '1px',
                          padding: '3px 10px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {item.category}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {item.author} · {item.date}
                      </span>
                    </div>

                    <h2
                      className="fw-bold text-uppercase mb-2"
                      style={{
                        fontFamily: 'var(--font-main)',
                        letterSpacing: '-1px',
                        fontSize: 'clamp(1.3rem, 3vw, 2.2rem)',
                        color: '#fff',
                        textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                        maxWidth: '900px',
                      }}
                    >
                      {item.title}
                    </h2>

                    <p
                      className="d-none d-md-block mb-3"
                      style={{
                        color: 'var(--text-secondary)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.88rem',
                        lineHeight: 1.5,
                        maxWidth: '750px',
                        background: 'rgba(0,0,0,0.45)',
                        backdropFilter: 'blur(8px)',
                        padding: '6px 12px',
                        borderLeft: '2px solid var(--accent-primary)',
                      }}
                    >
                      {item.description}
                    </p>

                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        color: 'var(--accent-primary)',
                        letterSpacing: '1px',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      READ FULL REPORT <ArrowRight size={14} />
                    </span>
                  </Carousel.Caption>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default CarouselComponent;
