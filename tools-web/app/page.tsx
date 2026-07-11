"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  RefreshCw, Maximize, Minimize, Type, Brush, Layers, 
  FileUp, Image as ImageIcon, Link2, SplitSquareHorizontal, 
  FileText, FileEdit, FileCode, Braces, Lock, Table, 
  QrCode, Palette, Key, Ruler, Archive, Wrench, Settings 
} from "lucide-react";

const ALL_TOOLS = [
  { id: "image-converter", icon: <RefreshCw size={24} strokeWidth={1.5} />, title: "Image Converter", desc: "JPEG, PNG, WebP, AVIF, GIF, BMP", category: "image", badge: "Popular" },
  { id: "image-resizer", icon: <Maximize size={24} strokeWidth={1.5} />, title: "Image Resizer", desc: "Resize with aspect ratio lock", category: "image" },
  { id: "image-compressor", icon: <Minimize size={24} strokeWidth={1.5} />, title: "Image Compressor", desc: "Reduce size, keep quality", category: "image", badge: "Popular" },
  { id: "image-to-base64", icon: <Type size={24} strokeWidth={1.5} />, title: "Image to Base64", desc: "Convert images to Base64 string", category: "image" },
  { id: "svg-converter", icon: <Brush size={24} strokeWidth={1.5} />, title: "SVG Converter", desc: "SVG to PNG, JPG or WebP", category: "image" },
  { id: "bulk-converter", icon: <Layers size={24} strokeWidth={1.5} />, title: "Bulk Converter", desc: "Batch convert dozens of images", category: "image" },
  { id: "image-to-pdf", icon: <FileUp size={24} strokeWidth={1.5} />, title: "Image to PDF", desc: "Combine images into PDF", category: "pdf", badge: "Popular" },
  { id: "pdf-to-image", icon: <ImageIcon size={24} strokeWidth={1.5} />, title: "PDF to Image", desc: "Extract pages as JPG/PNG", category: "pdf" },
  { id: "pdf-merger", icon: <Link2 size={24} strokeWidth={1.5} />, title: "PDF Merger", desc: "Merge multiple PDFs into one", category: "pdf", badge: "Popular" },
  { id: "pdf-splitter", icon: <SplitSquareHorizontal size={24} strokeWidth={1.5} />, title: "PDF Splitter", desc: "Split PDF into pages", category: "pdf" },
  { id: "docx-to-pdf", icon: <FileText size={24} strokeWidth={1.5} />, title: "DOCX to PDF", desc: "Word documents to PDF", category: "pdf", badge: "Popular" },
  { id: "pdf-to-docx", icon: <FileEdit size={24} strokeWidth={1.5} />, title: "PDF to DOCX", desc: "PDF to editable Word doc", category: "pdf" },
  { id: "word-counter", icon: <Type size={24} strokeWidth={1.5} />, title: "Word Counter", desc: "Count words, chars, reading time", category: "doc" },
  { id: "markdown-to-html", icon: <FileCode size={24} strokeWidth={1.5} />, title: "Markdown to HTML", desc: "Live markdown preview", category: "doc" },
  { id: "json-formatter", icon: <Braces size={24} strokeWidth={1.5} />, title: "JSON Formatter", desc: "Format, minify, validate JSON", category: "doc" },
  { id: "base64", icon: <Lock size={24} strokeWidth={1.5} />, title: "Base64 Encoder", desc: "Encode/decode text or files", category: "doc" },
  { id: "csv-to-json", icon: <Table size={24} strokeWidth={1.5} />, title: "CSV to JSON", desc: "Convert CSV data to JSON", category: "doc" },
  { id: "qr-generator", icon: <QrCode size={24} strokeWidth={1.5} />, title: "QR Code Generator", desc: "Generate QR codes instantly", category: "util", badge: "Popular" },
  { id: "color-picker", icon: <Palette size={24} strokeWidth={1.5} />, title: "Color Picker", desc: "HEX, RGB, HSL, CMYK converter", category: "util" },
  { id: "password-generator", icon: <Key size={24} strokeWidth={1.5} />, title: "Password Generator", desc: "Strong, secure passwords", category: "util" },
  { id: "aspect-ratio", icon: <Ruler size={24} strokeWidth={1.5} />, title: "Aspect Ratio Calc", desc: "Calculate image dimensions", category: "util" },
  { id: "zip-maker", icon: <Archive size={24} strokeWidth={1.5} />, title: "Zip Maker", desc: "Create ZIP archives", category: "util" },
];

const CATEGORIES = [
  { id: "all", label: "All Tools", icon: <Wrench size={16} /> },
  { id: "image", label: "Image", icon: <ImageIcon size={16} /> },
  { id: "pdf", label: "PDF", icon: <FileText size={16} /> },
  { id: "doc", label: "Document", icon: <FileEdit size={16} /> },
  { id: "util", label: "Utility", icon: <Settings size={16} /> },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  // Sync category with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (CATEGORIES.some(c => c.id === hash)) {
        setActiveCategory(hash);
        // Smooth scroll to tools section if a hash was directly accessed
        const element = document.getElementById("tools");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else if (hash === "tools") {
        setActiveCategory("all");
      }
    };

    // Initial check
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    window.history.pushState(null, "", id === "all" ? "/#tools" : `/#${id}`);
  };

  const filtered = ALL_TOOLS.filter((tool) => {
    const matchCat = activeCategory === "all" || tool.category === activeCategory;
    const matchSearch =
      !search ||
      tool.title.toLowerCase().includes(search.toLowerCase()) ||
      tool.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* ─── HERO ─── */}
      <section style={{ padding: "72px 0 48px", textAlign: "center" }}>
        <div className="container">
          {/* Eyebrow pill */}
          <div className="animate-fadeInUp" style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "6px 16px",
              background: "rgba(124,58,237,0.08)",
              border: "1px solid rgba(124,58,237,0.2)",
              borderRadius: "999px",
              fontSize: "0.8125rem", fontWeight: 700,
              color: "var(--accent-violet)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 6px #22c55e" }} />
              22 Free Tools · No Login · No Upload
            </span>
          </div>

          {/* Main headline */}
          <h1 className="animate-fadeInUp delay-1" style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            color: "var(--text-primary)",
            marginBottom: "20px",
          }}>
            Your files, your device.<br />
            <span style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 50%, #06b6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>No middleman.</span>
          </h1>

          <p className="animate-fadeInUp delay-2" style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "var(--text-secondary)",
            maxWidth: "520px",
            margin: "0 auto 36px",
            lineHeight: 1.65,
          }}>
            Convert images, merge PDFs, format JSON and more. Everything runs instantly in your browser. 100% private.
          </p>

          <div className="animate-fadeInUp delay-3" style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#tools" className="btn btn--primary" style={{ padding: "14px 28px", fontSize: "1.1rem" }}>
              Explore Tools
            </a>
            <Link href="/about" className="btn btn--glass" style={{ padding: "14px 28px", fontSize: "1.1rem" }}>
              How it Works
            </Link>
          </div>
        </div>
      </section>

      {/* ─── QUICK STATS ─── */}
      <section style={{ padding: "32px 0 64px" }}>
        <div className="container">
          <div className="stats-row animate-fadeInUp delay-4">
            <div className="glass-card stat-item">
              <h3 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-violet)" }}>0</h3>
              <p style={{ color: "var(--text-secondary)", fontWeight: 500 }}>Files Uploaded</p>
            </div>
            <div className="glass-card stat-item">
              <h3 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-blue)" }}>22</h3>
              <p style={{ color: "var(--text-secondary)", fontWeight: 500 }}>Browser-Native Tools</p>
            </div>
            <div className="glass-card stat-item">
              <h3 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-cyan)" }}>100%</h3>
              <p style={{ color: "var(--text-secondary)", fontWeight: 500 }}>Free Forever</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TOOLS GRID ─── */}
      <section id="tools" style={{ padding: "48px 0 120px", scrollMarginTop: "60px" }}>
        <div className="container">
          
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "40px" }}>
            {/* Filter Tabs */}
            <div className="category-tabs" style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`btn ${activeCategory === cat.id ? "btn--primary" : "btn--glass"}`}
                  style={{ borderRadius: "999px", padding: "8px 20px", display: "flex", alignItems: "center", gap: "8px" }}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div style={{ maxWidth: "400px", margin: "0 auto", width: "100%", position: "relative" }}>
              <input
                type="text"
                placeholder="Search tools..."
                className="form-input"
                style={{ paddingLeft: "42px", borderRadius: "999px", background: "var(--glass-white)", border: "1px solid var(--glass-border-subtle)" }}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}>
                🔍
              </span>
            </div>
          </div>

          <div className="tool-grid animate-scaleIn">
            {filtered.length === 0 ? (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "64px 20px", color: "var(--text-muted)" }}>
                <span style={{ fontSize: "3rem", display: "block", marginBottom: "16px" }}>🕵️‍♂️</span>
                <p>No tools found matching your search.</p>
              </div>
            ) : (
              filtered.map(tool => (
                <Link href={`/tools/${tool.id}`} key={tool.id} className="glass-card tool-card">
                  {tool.badge && <span className="badge badge--glass" style={{ position: "absolute", top: "16px", right: "16px", fontSize: "0.7rem", color: "var(--accent-violet)" }}>{tool.badge}</span>}
                  
                  <div className="tool-card__icon">
                    {tool.icon}
                  </div>
                  
                  <div className="tool-card__content">
                    <h3 className="tool-card__title">{tool.title}</h3>
                    <p className="tool-card__desc">{tool.desc}</p>
                  </div>
                </Link>
              ))
            )}
          </div>

        </div>
      </section>
    </>
  );
}
