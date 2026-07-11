"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { marked } from "marked";

export default function MarkdownToHtmlTool() {
  const [markdown, setMarkdown] = useState("# Hello World\\n\\nStart typing **markdown** here...");
  const [html, setHtml] = useState("");

  useEffect(() => {
    try {
      const parsedHtml = marked.parse(markdown) as string;
      setHtml(parsedHtml);
    } catch (e) {
      console.error(e);
    }
  }, [markdown]);

  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(html);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const downloadHtml = () => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="tool-page">
      <div className="container" style={{ maxWidth: "100%" }}>
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span className="breadcrumb__sep">›</span>
          <Link href="/#tools">Tools</Link><span className="breadcrumb__sep">›</span>
          <span>Markdown to HTML</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon">⬇️</span>
          <h1 className="tool-page__title">Markdown to HTML</h1>
          <p className="tool-page__desc">Live preview and convert Markdown to HTML instantly.</p>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginBottom: "16px" }}>
          <button className="btn btn--glass btn--sm" onClick={copyHtml}>📋 Copy HTML Code</button>
          <button className="btn btn--primary btn--sm" onClick={downloadHtml}>⬇️ Download .html</button>
        </div>

        <div className="tool-layout-grid" data-cols="2">
          
          {/* Input Panel */}
          <div className="glass-card tool-panel" style={{ display: "flex", flexDirection: "column", padding: 0 }}>
            <div style={{ padding: "12px 24px", borderBottom: "1px solid var(--glass-border)", background: "rgba(255,255,255,0.4)" }}>
              <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>Markdown Input</span>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              style={{
                flex: 1,
                padding: "24px",
                border: "none",
                background: "transparent",
                resize: "none",
                fontFamily: "monospace",
                fontSize: "0.9375rem",
                color: "var(--text-primary)",
                outline: "none"
              }}
            />
          </div>

          {/* Preview Panel */}
          <div className="glass-card tool-panel" style={{ display: "flex", flexDirection: "column", padding: 0, background: "#fff" }}>
            <div style={{ padding: "12px 24px", borderBottom: "1px solid var(--glass-border)", background: "rgba(255,255,255,0.4)" }}>
              <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>Live HTML Preview</span>
            </div>
            <div 
              style={{ padding: "24px", overflowY: "auto", flex: 1 }}
              className="prose"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
