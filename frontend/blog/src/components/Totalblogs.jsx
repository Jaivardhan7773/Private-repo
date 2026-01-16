import React, { useEffect, useState, useRef, useCallback } from "react";
import axiosInstance from "../utills/axios.js";
import { Container, Row, Col, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { Search, Filter, Calendar, User, AlignLeft } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

AOS.init();

const Totalblogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const observer = useRef();
  const navigate = useNavigate();

  const limit = 10; // Blogs per page

  // Watch searchTerm & category and debounce API calls
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setBlogs([]);
      setPage(1);
      fetchBlogs(1, true);
    }, 500); // wait 500ms after user stops typing

    return () => clearTimeout(delayDebounce); // cleanup old timer
  }, [searchTerm, selectedCategory]);


  // Fetch blogs from backend with pagination
  const fetchBlogs = async (pageNum = 1, reset = false) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        "/totalblogs",
        {
          params: {
            page: pageNum,
            limit,
            search: searchTerm,
            category: selectedCategory,
          },
        }
      );

      const fetchedBlogs = response.data;
      if (reset) {
        setBlogs(fetchedBlogs);
      } else {
        setBlogs((prev) => [...prev, ...fetchedBlogs]);
      }

      setHasMore(fetchedBlogs.length === limit); // if less than limit, no more pages
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to fetch blogs.");
      console.error("Failed to fetch blogs!", error);
      setIsLoading(false);
    }
  };

  // Infinite scrolling - observe last blog
  const lastBlogRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            fetchBlogs(nextPage);
            return nextPage;
          });
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return (
    <>
      <div className="min-vh-100 py-5" style={{ background: 'var(--bg-primary)' }}>
        <Container>
          {/* Header & Filters */}
          <div className="d-flex flex-column align-items-center mb-5">
            <h1 className="fw-bold mb-3 text-uppercase" style={{ fontFamily: 'var(--font-main)', letterSpacing: '-1px', color: 'var(--text-primary)' }}>
              INTELLIGENCE <span style={{ color: 'var(--accent-primary)' }}>DATABASE</span>
            </h1>
            <p className="text-secondary font-monospace small mb-5">
              SEARCH AND RETRIEVE RECORDS
            </p>

            <div className="w-100 p-4 glass-panel mb-4">
              <div className="d-flex flex-column flex-md-row gap-3">
                {/* Search input */}
                <div className="position-relative flex-grow-1">
                  <span className="position-absolute top-50 translate-middle-y text-secondary" style={{ left: '15px' }}><Search size={18} /></span>
                  <input
                    type="text"
                    placeholder="SEARCH KEYWORDS..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="glass-input w-100 ps-5"
                  />
                </div>

                {/* Category filter */}
                <div className="position-relative" style={{ minWidth: '200px' }}>
                  <span className="position-absolute top-50 translate-middle-y text-secondary" style={{ left: '15px z-index: 5' }}><Filter size={18} /></span>
                  <Form.Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="glass-input ps-5 w-100"
                    style={{ appearance: 'none' }}
                  >
                    <option value="" className="text-dark">ALL CATEGORIES</option>
                    <option value="Technology" className="text-dark">Technology</option>
                    <option value="Health" className="text-dark">Health</option>
                    <option value="Finance" className="text-dark">Finance</option>
                    <option value="Education" className="text-dark">Education</option>
                    <option value="Entertainment" className="text-dark">Entertainment</option>
                  </Form.Select>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          <Row>
            {blogs.map((blog, index) => (
              <Col
                xl={6}
                lg={6}
                md={12}
                key={blog._id}
                className="mb-4"
                ref={index === blogs.length - 1 ? lastBlogRef : null}
              >
                <div
                  className="glass-panel h-100 p-0 overflow-hidden card-hover-effect d-flex flex-column"
                  data-aos="fade-up"
                  style={{ cursor: "pointer", border: '1px solid var(--border-color)' }}
                  onClick={() => navigate(`/blog/${blog.slug}`)}
                >
                  <div className="row g-0 h-100">
                    <div className="col-md-5 h-100" style={{ minHeight: '300px' }}>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        loading="lazy"
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="col-md-7 d-flex flex-column">
                      <div className="p-4 d-flex flex-column h-100">
                        <div className="d-flex justify-content-between mb-3 align-items-center">
                          <span className="badge rounded-pill" style={{ background: 'rgba(255, 193, 7, 0.1)', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary)' }}>
                            {blog.category}
                          </span>
                          <div className="d-flex align-items-center gap-2 small text-secondary font-monospace">
                            <Calendar size={12} /> {new Date(blog.createdAt).toISOString().split("T")[0]}
                          </div>
                        </div>

                        <h4
                          className="fw-bold mb-3"
                          style={{ fontFamily: 'var(--font-main)', color: 'var(--text-primary)', letterSpacing: '0.5px' }}
                        >
                          {blog.title}
                        </h4>

                        <p className="text-secondary small mb-4 flex-grow-1" style={{ lineHeight: '1.6' }}>
                          {blog.introduction?.substring(0, 150) || ""}...
                        </p>

                        <div className="mt-auto border-top border-secondary pt-3 d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center gap-2 small text-muted font-monospace">
                            <User size={14} className="text-accent" /> {blog.author}
                          </div>
                          <small className="text-accent text-uppercase font-monospace">Reading Access &rarr;</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}

            {/* Skeleton loader */}
            {isLoading &&
              [...Array(4)].map((_, index) => (
                <Col xl={6} lg={6} md={12} key={`skeleton-${index}`} className="mb-4">
                  <div className="glass-panel p-0 overflow-hidden" style={{ minHeight: '300px' }}>
                    <Row className="g-0 h-100">
                      <Col md={5}>
                        <Skeleton height="100%" baseColor="var(--bg-secondary)" highlightColor="var(--border-color)" />
                      </Col>
                      <Col md={7} className="p-4">
                        <Skeleton count={1} height={20} width="30%" className="mb-3" baseColor="var(--bg-secondary)" highlightColor="var(--border-color)" />
                        <Skeleton count={1} height={30} className="mb-3" baseColor="var(--bg-secondary)" highlightColor="var(--border-color)" />
                        <Skeleton count={3} baseColor="var(--bg-secondary)" highlightColor="var(--border-color)" />
                      </Col>
                    </Row>
                  </div>
                </Col>
              ))}
          </Row>

          {!isLoading && blogs.length === 0 && (
            <div className="text-center py-5 glass-panel">
              <div className="mb-3 text-secondary opacity-50"><AlignLeft size={48} /></div>
              <h4 style={{ color: 'var(--text-primary)' }}>NO INTELLIGENCE FOUND.</h4>
              <p className="text-secondary">Adjust search parameters to locate data.</p>
            </div>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Totalblogs;
