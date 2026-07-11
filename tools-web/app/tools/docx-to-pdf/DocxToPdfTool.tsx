"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";

export default function DocxToPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [converting, setConverting] = useState(false);
  const [result, setResult] = useState<{ url: string; name: string } | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    if (!f.name.toLowerCase().endsWith(".docx")) {
      setError("Please upload a .docx file.");
      return;
    }
    setFile(f);
    setResult(null);
    setError("");
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const convertFile = async () => {
    if (!file) return;
    setConverting(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/convert/docx-to-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to convert document");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const name = file.name.replace(/\.docx$/i, "") + ".pdf";
      
      setResult({ url, name });
    } catch (err: any) {
      setError(err.message || "An error occurred during conversion.");
    } finally {
      setConverting(false);
    }
  };

  const download = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = result.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="tool-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span className="breadcrumb__sep">›</span>
          <Link href="/#tools">Tools</Link><span className="breadcrumb__sep">›</span>
          <span>DOCX to PDF</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon">📝</span>
          <h1 className="tool-page__title">Convert DOCX to PDF</h1>
          <p className="tool-page__desc">Convert Microsoft Word documents (.docx) to PDF format easily.</p>
        </div>

        <div className="tool-layout-grid" data-cols={file ? "2" : "1"}>
          {/* Upload panel */}
          <div className="glass-card tool-panel">
            <div
              className={`dropzone${dragging ? " dropzone--active" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              role="button" tabIndex={0}
            >
              <input ref={inputRef} type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: 0 }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
              
              {file ? (
                <div>
                  <span style={{ fontSize: "3rem", display: "block", marginBottom: "12px" }}>📝</span>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", fontWeight: 600 }}>{file.name}</p>
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>Click to change file</p>
                </div>
              ) : (
                <>
                  <span className="dropzone__icon">📝</span>
                  <p className="dropzone__title">Drop DOCX here</p>
                  <p className="dropzone__subtitle">or click to browse</p>
                </>
              )}
            </div>

            {file && (
              <div style={{ marginTop: "20px" }}>
                <button className="btn btn--primary w-full" onClick={convertFile} disabled={converting}>
                  {converting ? <><span className="spinner" />Converting...</> : "Convert to PDF →"}
                </button>
              </div>
            )}
            
            {error && <div className="alert alert--error" style={{ marginTop: "12px" }}>❌ {error}</div>}
          </div>

          {/* Result panel */}
          {result && (
            <div className="glass-card tool-panel animate-scaleIn">
              <h2 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "1rem" }}>✅ Converted!</h2>
              <div className="glass-card--light" style={{ padding: "32px", textAlign: "center", borderRadius: "10px", marginBottom: "16px" }}>
                <span style={{ fontSize: "3rem", display: "block", marginBottom: "12px" }}>📄</span>
                <strong>{result.name}</strong>
              </div>
              <button className="btn btn--primary w-full" onClick={download}>⬇️ Download PDF</button>
              <button className="btn btn--glass w-full" style={{ marginTop: "8px" }} onClick={() => { setResult(null); setFile(null); }}>Convert another</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
