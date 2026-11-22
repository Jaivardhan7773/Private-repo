import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import axiosInstance from "../utills/axios.js";
import { Container } from "react-bootstrap";
import { useToast } from "../context/ToastContext";
import Footer from './footer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SEO from "./SEO";
import {
  ArrowLeft, Calendar, Clock, Share2, Check,
  Twitter, Linkedin, MessageCircle, Copy, Bookmark,
  Sparkles, ArrowRight
} from "lucide-react";
import AdSense from "./AdSense";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    fetchBlogDetails();
    window.scrollTo(0, 0);
  }, [slug]);

  // Scroll Progress Indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchBlogDetails = async () => {
    try {
      const response = await axiosInstance.get(`/blog/${slug}`);
      setBlog(response.data);
    } catch (error) {
      addToast("Failed to fetch article details.", "error");
    }
  };

  // Estimate reading time (average 200 words per minute)
  const calculateReadingTime = (text = "") => {
    const cleanText = text.replace(/<[^>]*>/g, "");
    const wordCount = cleanText.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    return `${minutes} min read`;
  };

  // Share handlers
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      addToast("Link copied to clipboard!", "success");
    }
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`${blog?.title || ""}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(currentUrl)}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, "_blank");
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`${blog?.title || ""} - ${currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
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

      {/* ── Scroll Progress Bar ──────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${readingProgress}%`,
          height: "3px",
          background: "var(--accent-primary)",
          zIndex: 9999,
          transition: "width 0.1s ease-out",
        }}
      />

      <div className="min-vh-100" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
        {blog ? (
          <article className="py-4 py-md-5">
            <Container style={{ maxWidth: "880px" }}>

              {/* ── Top Bar: Back & Category ─────────────────────── */}
              <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
                <button
                  onClick={() => navigate(-1)}
                  className="btn p-0 d-inline-flex align-items-center gap-2"
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    textDecoration: "none",
                    border: "none",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  <ArrowLeft size={16} /> Back to articles
                </button>

                <span
                  style={{
                    background: "rgba(245, 158, 11, 0.1)",
                    border: "1px solid rgba(245, 158, 11, 0.3)",
                    color: "var(--accent-primary)",
                    padding: "3px 12px",
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {blog.category || "General"}
                </span>
              </div>

              {/* ── Title ────────────────────────────────────────── */}
              <h1
                className="mb-4"
                style={{
                  fontFamily: "var(--font-main)",
                  fontWeight: 800,
                  fontSize: "clamp(1.85rem, 4vw, 2.85rem)",
                  letterSpacing: "-0.8px",
                  lineHeight: 1.25,
                  color: "var(--text-primary)",
                }}
              >
                {blog.title}
              </h1>

              {/* ── Byline & Metadata Row ────────────────────────── */}
              <div
                className="d-flex align-items-center justify-content-between py-3 mb-4 flex-wrap gap-3"
                style={{
                  borderTop: "1px solid var(--border-color)",
                  borderBottom: "1px solid var(--border-color)",
                }}
              >
                {/* Author & Date */}
                <div className="d-flex align-items-center gap-3">
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-color)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent-primary)",
                      fontWeight: 800,
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.95rem",
                    }}
                  >
                    {blog.author?.charAt(0) || "T"}
                  </div>

                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: "var(--text-primary)",
                        lineHeight: 1.3,
                      }}
                    >
                      {blog.author || "Trending Topics"}
                    </div>
                    <div
                      className="d-flex align-items-center gap-2"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.78rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <span>
                        {new Date(blog.createdAt || Date.now()).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span>·</span>
                      <span className="d-inline-flex align-items-center gap-1">
                        <Clock size={12} /> {calculateReadingTime(blog.description)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Share Toolbar */}
                <div className="d-flex align-items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="btn d-inline-flex align-items-center gap-1"
                    title="Copy Link"
                    style={{
                      background: copied ? "var(--accent-primary)" : "var(--bg-secondary)",
                      color: copied ? "#000" : "var(--text-secondary)",
                      border: "1px solid var(--border-color)",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "0.78rem",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 600,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span className="d-none d-sm-inline">{copied ? "Copied" : "Copy Link"}</span>
                  </button>

                  <button
                    onClick={shareOnTwitter}
                    className="btn p-2"
                    title="Share on X (Twitter)"
                    style={{
                      background: "var(--bg-secondary)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "6px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent-primary)";
                      e.currentTarget.style.borderColor = "var(--accent-primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-secondary)";
                      e.currentTarget.style.borderColor = "var(--border-color)";
                    }}
                  >
                    <Twitter size={15} />
                  </button>

                  <button
                    onClick={shareOnLinkedIn}
                    className="btn p-2"
                    title="Share on LinkedIn"
                    style={{
                      background: "var(--bg-secondary)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "6px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent-primary)";
                      e.currentTarget.style.borderColor = "var(--accent-primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-secondary)";
                      e.currentTarget.style.borderColor = "var(--border-color)";
                    }}
                  >
                    <Linkedin size={15} />
                  </button>

                  <button
                    onClick={shareOnWhatsApp}
                    className="btn p-2"
                    title="Share on WhatsApp"
                    style={{
                      background: "var(--bg-secondary)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "6px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent-primary)";
                      e.currentTarget.style.borderColor = "var(--accent-primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-secondary)";
                      e.currentTarget.style.borderColor = "var(--border-color)";
                    }}
                  >
                    <MessageCircle size={15} />
                  </button>
                </div>
              </div>

              {/* ── Featured Cover Image ─────────────────────────── */}
              {blog.image && (
                <div
                  className="mb-5 overflow-hidden"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-secondary)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                  }}
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      maxHeight: "520px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              )}

              {/* ── Reading Content Body (Constrained for Readability) ── */}
              <div style={{ maxWidth: "760px", margin: "0 auto" }}>
                {/* Introduction Lead Paragraph */}
                {blog.introduction && (
                  <div
                    className="p-4 mb-4"
                    style={{
                      background: "var(--bg-secondary)",
                      borderLeft: "3px solid var(--accent-primary)",
                      borderRadius: "0 6px 6px 0",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "1.15rem",
                        lineHeight: 1.75,
                        color: "var(--text-primary)",
                        margin: 0,
                        fontWeight: 500,
                      }}
                    >
                      {blog.introduction}
                    </p>
                  </div>
                )}

                {/* Top AdSense Banner */}
                <AdSense />

                {/* Main HTML Body */}
                <div
                  className="blog-prose-content"
                  dangerouslySetInnerHTML={{ __html: blog.description }}
                />

                {/* Bottom AdSense Banner */}
                <AdSense />

                {/* ── Tags ───────────────────────────────────────── */}
                {blog.tags && blog.tags.length > 0 && (
                  <div
                    className="mt-5 pt-4"
                    style={{ borderTop: "1px solid var(--border-color)" }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "var(--text-secondary)",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        marginBottom: "12px",
                      }}
                    >
                      Related Tags
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {blog.tags.map((tag, i) => (
                        <span
                          key={i}
                          style={{
                            padding: "4px 12px",
                            background: "var(--bg-secondary)",
                            border: "1px solid var(--border-color)",
                            color: "var(--text-secondary)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.8rem",
                            borderRadius: "4px",
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Share Callout Banner ───────────────────────── */}
                <div
                  className="mt-5 p-4 d-flex align-items-center justify-content-between flex-wrap gap-3"
                  style={{
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "8px",
                  }}
                >
                  <div>
                    <h5
                      style={{
                        fontFamily: "var(--font-main)",
                        fontWeight: 700,
                        margin: 0,
                        marginBottom: "4px",
                        color: "var(--text-primary)",
                      }}
                    >
                      Enjoyed this article?
                    </h5>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.82rem",
                        color: "var(--text-secondary)",
                        margin: 0,
                      }}
                    >
                      Share it with your colleagues and network.
                    </p>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      onClick={shareOnTwitter}
                      className="btn d-inline-flex align-items-center gap-2"
                      style={{
                        background: "var(--bg-primary)",
                        border: "1px solid var(--border-color)",
                        color: "var(--text-primary)",
                        padding: "8px 16px",
                        fontSize: "0.8rem",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                      }}
                    >
                      <Twitter size={14} /> X
                    </button>
                    <button
                      onClick={shareOnLinkedIn}
                      className="btn d-inline-flex align-items-center gap-2"
                      style={{
                        background: "var(--bg-primary)",
                        border: "1px solid var(--border-color)",
                        color: "var(--text-primary)",
                        padding: "8px 16px",
                        fontSize: "0.8rem",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                      }}
                    >
                      <Linkedin size={14} /> LinkedIn
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="btn d-inline-flex align-items-center gap-2"
                      style={{
                        background: "var(--accent-primary)",
                        color: "#000",
                        padding: "8px 16px",
                        fontSize: "0.8rem",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 700,
                        border: "none",
                      }}
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? "Copied" : "Copy Link"}
                    </button>
                  </div>
                </div>

                {/* ── Footer Platform Attribution ────────────────── */}
                <div
                  className="mt-4 p-3 d-flex align-items-center justify-content-between flex-wrap gap-2"
                  style={{
                    border: "1px solid var(--border-color)",
                    background: "rgba(255,255,255,0.01)",
                    borderRadius: "6px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.78rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  <span>
                    Curated autonomously from real-time trends · Researched via Gemini 2.5 Flash
                  </span>
                  <NavLink
                    to="/portfolio"
                    style={{
                      color: "var(--accent-primary)",
                      textDecoration: "none",
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    About Developer <ArrowRight size={13} />
                  </NavLink>
                </div>

              </div>
            </Container>
          </article>
        ) : (
          <Container className="py-5" style={{ maxWidth: "800px" }}>
            <Skeleton height={30} width="30%" className="mb-4" baseColor="var(--bg-secondary)" highlightColor="var(--border-color)" />
            <Skeleton height={50} width="90%" className="mb-4" baseColor="var(--bg-secondary)" highlightColor="var(--border-color)" />
            <Skeleton height={400} className="mb-4" baseColor="var(--bg-secondary)" highlightColor="var(--border-color)" />
            <Skeleton count={4} height={20} className="mb-2" baseColor="var(--bg-secondary)" highlightColor="var(--border-color)" />
          </Container>
        )}
      </div>

      <Footer />

      {/* ── Prose Typography Styles ────────────────────────────── */}
      <style>{`
        .blog-prose-content {
          color: var(--text-primary);
          font-family: var(--font-main);
          font-size: 1.125rem;
          line-height: 1.85;
          letter-spacing: -0.1px;
        }

        .blog-prose-content h1,
        .blog-prose-content h2,
        .blog-prose-content h3 {
          color: var(--text-primary);
          font-family: var(--font-main);
          font-weight: 700;
          letter-spacing: -0.5px;
          line-height: 1.35;
        }

        .blog-prose-content h2 {
          font-size: 1.65rem;
          margin-top: 2.75rem;
          margin-bottom: 1.1rem;
          padding-bottom: 0.4rem;
          border-bottom: 1px solid var(--border-color);
        }

        .blog-prose-content h3 {
          font-size: 1.35rem;
          margin-top: 2.2rem;
          margin-bottom: 0.9rem;
        }

        .blog-prose-content p {
          margin-bottom: 1.6rem;
        }

        .blog-prose-content ul,
        .blog-prose-content ol {
          margin-bottom: 1.75rem;
          padding-left: 1.75rem;
        }

        .blog-prose-content li {
          margin-bottom: 0.65rem;
          line-height: 1.75;
        }

        .blog-prose-content blockquote {
          border-left: 3px solid var(--accent-primary);
          background: var(--bg-secondary);
          padding: 1.1rem 1.4rem;
          margin: 2rem 0;
          font-style: italic;
          color: var(--text-secondary);
          border-radius: 0 6px 6px 0;
        }

        .blog-prose-content a {
          color: var(--accent-primary);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .blog-prose-content strong {
          color: var(--text-primary);
          font-weight: 700;
        }

        .blog-prose-content img {
          max-width: 100%;
          border-radius: 6px;
          margin: 2rem 0;
        }

        @media (max-width: 768px) {
          .blog-prose-content {
            font-size: 1.05rem;
            line-height: 1.75;
          }
          .blog-prose-content h2 {
            font-size: 1.4rem;
            margin-top: 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default BlogDetails;
