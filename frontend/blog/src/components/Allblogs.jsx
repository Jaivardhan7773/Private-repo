import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useHomeStore } from "../store/homeapis/useHomeStore";
import { Cpu, Calendar } from "lucide-react";

AOS.init();

const Allblogs = () => {
  const navigate = useNavigate();
  const { blogs, fetchAllBlogs } = useHomeStore();

  useEffect(() => {
    if (blogs.length === 0) {
      fetchAllBlogs();
    }
  }, [fetchAllBlogs, blogs.length]);

  return (
    <>
      <div className="py-5" style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
        <Container>
          <div className="d-flex align-items-center gap-3 mb-5 border-bottom border-secondary pb-3">
            <Cpu size={28} className="text-warning" />
            <h2 className="fw-bold mb-0 text-uppercase" style={{ fontFamily: 'var(--font-main)', letterSpacing: '-1px' }}>
              Latest Intelligence
            </h2>
          </div>

          <Row>
            {blogs.length === 0 ? (
              [...Array(4)].map((_, index) => (
                <Col lg={6} key={index} className="mb-4">
                  <div className="glass-panel h-100">
                    <Skeleton height={400} baseColor="var(--bg-secondary)" highlightColor="var(--border-color)" style={{ borderRadius: 0 }} />
                    <div className="p-4">
                      <Skeleton height={20} width="60%" baseColor="var(--bg-secondary)" highlightColor="var(--border-color)" />
                      <Skeleton height={15} count={3} baseColor="var(--bg-secondary)" highlightColor="var(--border-color)" />
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8).map((blog) => (
                <Col lg={6} key={blog._id} className="mb-4">
                  <div
                    className="glass-panel h-100 d-flex flex-column"
                    data-aos="fade-up"
                    onClick={() => {
                      navigate(`/blog/${blog.slug}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ cursor: "pointer", transition: "transform 0.2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    <div style={{ position: 'relative', height: '300px', overflow: 'hidden', borderBottom: '1px solid var(--border-color)' }}>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{
                        position: 'absolute', top: '10px', left: '10px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        padding: '4px 8px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--accent-primary)'
                      }}>
                        {blog.category}
                      </div>
                    </div>

                    <div className="p-4 flex-grow-1 d-flex flex-column">
                      <div className="mb-2 font-monospace text-muted small">
                        {blog.tags.slice(0, 3).map(tag => `#${tag}`).join(" · ")}
                      </div>
                      <h3 className="h4 fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>{blog.title}</h3>
                      <p className="text-secondary mb-4 flex-grow-1" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                        {blog.introduction?.substring(0, 150) || "No intro available"}...
                      </p>

                      <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top border-secondary">
                        <span className="fw-bold text-accent" style={{ fontSize: '0.9rem' }}>
                          {blog.author}
                        </span>
                        <span className="text-muted small d-flex align-items-center gap-1">
                          <Calendar size={14} />
                          {new Date(blog.createdAt).toISOString().split("T")[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
              ))
            )}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Allblogs;
