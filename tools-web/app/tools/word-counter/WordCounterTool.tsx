"use client";

import { useState } from "react";
import Link from "next/link";

export default function WordCounterTool() {
  const [text, setText] = useState("");

  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;
  const charCountNoSpace = text.replace(/\s/g, "").length;
  const paragraphCount = text.trim() === "" ? 0 : text.split(/\n+/).filter((p) => p.trim() !== "").length;
  const sentenceCount = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter((s) => s.trim() !== "").length;
  const readingTime = Math.ceil(wordCount / 200);

  const stats = [
    { label: "Words", value: wordCount },
    { label: "Characters", value: charCount },
    { label: "Characters (no spaces)", value: charCountNoSpace },
    { label: "Sentences", value: sentenceCount },
    { label: "Paragraphs", value: paragraphCount },
    { label: "Reading Time", value: `${readingTime} min` },
  ];

  return (
    <div className="tool-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span className="breadcrumb__sep">›</span>
          <Link href="/#tools">Tools</Link><span className="breadcrumb__sep">›</span>
          <span>Word Counter</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon">🔢</span>
          <h1 className="tool-page__title">Word & Character Counter</h1>
          <p className="tool-page__desc">Instantly count words, characters, sentences, paragraphs, and estimate reading time.</p>
        </div>

        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div className="tool-layout-grid" data-cols="2">
            {stats.map((s, i) => (
              <div key={i} className="glass-card" style={{ padding: "20px", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-violet)", marginBottom: "4px" }}>{s.value}</div>
                <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div className="glass-card tool-panel" style={{ padding: "0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 20px", borderBottom: "1px solid var(--glass-border)", background: "rgba(255,255,255,0.4)" }}>
              <div style={{ fontWeight: 600, color: "var(--text-secondary)" }}>Input Text</div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button 
                  className="btn btn--glass btn--sm" 
                  onClick={async () => {
                    try {
                      const clipboardText = await navigator.clipboard.readText();
                      setText(clipboardText);
                    } catch (err) {
                      console.error('Failed to read clipboard contents: ', err);
                    }
                  }}
                >📋 Paste</button>
                <button className="btn btn--glass btn--sm" onClick={() => setText("")}>🗑️ Clear</button>
              </div>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here to begin counting..."
              style={{
                width: "100%",
                minHeight: "400px",
                padding: "20px",
                border: "none",
                background: "transparent",
                resize: "vertical",
                fontSize: "1rem",
                lineHeight: "1.6",
                color: "var(--text-primary)",
                fontFamily: "inherit",
                outline: "none"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
