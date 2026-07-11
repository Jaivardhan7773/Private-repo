"use client";

import { useState } from "react";
import Link from "next/link";

export default function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (err: any) {
      setError(err.message);
      setOutput("");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (err: any) {
      setError(err.message);
      setOutput("");
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="tool-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span className="breadcrumb__sep">›</span>
          <Link href="/#tools">Tools</Link><span className="breadcrumb__sep">›</span>
          <span>JSON Formatter</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon">{"{ }"}</span>
          <h1 className="tool-page__title">JSON Formatter & Validator</h1>
          <p className="tool-page__desc">Format, beautify, minify, and validate JSON data instantly.</p>
        </div>

        <div className="tool-layout-grid" data-cols="2">
          
          {/* Input */}
          <div className="glass-card tool-panel" style={{ display: "flex", flexDirection: "column", padding: 0 }}>
            <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--glass-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>Input JSON</span>
              <button className="btn btn--glass btn--sm" onClick={clear}>🗑️ Clear</button>
            </div>
            <textarea 
              value={input}
              onChange={e => { setInput(e.target.value); setError(""); }}
              placeholder='{"paste": "your json here"}'
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

          {/* Controls & Output */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="glass-card" style={{ padding: "16px", display: "flex", gap: "12px", justifyContent: "center" }}>
              <button className="btn btn--primary" onClick={formatJson} disabled={!input}>✨ Format</button>
              <button className="btn btn--glass" onClick={minifyJson} disabled={!input}>🗜️ Minify</button>
            </div>

            <div className="glass-card tool-panel" style={{ flex: 1, display: "flex", flexDirection: "column", padding: 0 }}>
              <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--glass-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>Output</span>
                <button className="btn btn--glass btn--sm" onClick={copyToClipboard} disabled={!output}>📋 Copy</button>
              </div>
              
              {error ? (
                <div style={{ padding: "24px", color: "#ef4444", fontFamily: "monospace", fontSize: "0.9375rem", background: "rgba(239, 68, 68, 0.05)", flex: 1 }}>
                  <strong>Invalid JSON:</strong><br/>{error}
                </div>
              ) : (
                <textarea 
                  value={output}
                  readOnly
                  placeholder="Output will appear here..."
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
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
