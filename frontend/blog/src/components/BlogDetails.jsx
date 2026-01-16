import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utills/axios.js";
import { Container } from "react-bootstrap";
import { useToast } from "../context/ToastContext";
import Footer from './footer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SEO from "./SEO";
import { ArrowLeft, User, Calendar, Tag } from "lucide-react";

const BlogDetails = () => {

  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    fetchBlogDetails();
  }, [slug]);

  const fetchBlogDetails = async () => {
    try {
      const response = await axiosInstance.get(`/blog/${slug}`);
      setBlog(response.data);
    } catch (error) {
      addToast("Failed to fetch blog details.", "error");
    }
  };


  return (
    <>
      {blog && (
        <SEO
          title={blog.title}
          description={blog.introduction?.substring(0, 160)}
          keywords={blog.tags?.join(", ")}
          image={blog.image}
          url={`/blog/${blog.slug}`}
          author={blog.author}
          date={blog.createdAt}
          type="article"
        />
      )}

      <div className="min-vh-100" style={{ background: 'var(--bg-primary)' }}>
        {blog ? (
          <>
            {/* Full Width Hero Image with Overlay */}
            <div style={{ position: 'relative', width: '100%', height: '50vh', minHeight: '400px' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, var(--bg-primary) 100%)', zIndex: 2 }}></div>
              <img
                src={blog.image}
                alt={blog.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
              />
              <Container style={{ position: 'absolute', bottom: '2rem', left: '0', right: '0', zIndex: 3 }}>
                <button
                  onClick={() => navigate(-1)}
                  className="btn d-flex align-items-center gap-2 mb-4 text-accent"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <ArrowLeft size={20} /> Back to Intelligence
                </button>
                <h1 className="display-4 fw-bold text-uppercase mb-3" style={{ fontFamily: 'var(--font-main)', textShadow: '2px 2px 4px black' }}>
                  {blog.title}
                </h1>
                <div className="d-flex flex-wrap gap-4 text-light font-monospace small">
                  <div className="d-flex align-items-center gap-2">
                    <User size={16} className="text-accent" /> {blog.author}
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <Calendar size={16} className="text-accent" /> {new Date(blog.createdAt).toISOString().split('T')[0]}
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <Tag size={16} className="text-accent" /> {blog.category}
                  </div>
                </div>
              </Container>
            </div>

            <Container className="py-5">
              <div className="row">
                <div className="col-lg-8 mx-auto">
                  {/* Introduction Block */}
                  <div className="p-4 mb-5" style={{ background: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-primary)' }}>
                    <p className="lead mb-0 text-secondary italic">
                      {blog.introduction}
                    </p>
                  </div>

                  {/* Main Content - No Glass Panel, just text on background */}
                  <div
                    className="blog-content"
                    style={{ color: 'var(--text-primary)', lineHeight: '1.9', fontSize: '1.1rem' }}
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                  />

                  {/* Tags */}
                  <div className="mt-5 pt-4 border-top border-secondary">
                    <h5 className="mb-3 font-monospace text-muted small">TAGGED IDENTIFIERS:</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {blog.tags && blog.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 small font-monospace" style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </Container>
          </>
        ) : (
          <Container className="py-5 mt-5">
            <Skeleton height={400} className="mb-4" baseColor="var(--bg-secondary)" highlightColor="var(--border-color)" />
            <Skeleton count={3} height={20} className="mb-2" baseColor="var(--bg-secondary)" highlightColor="var(--border-color)" />
          </Container>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BlogDetails;
