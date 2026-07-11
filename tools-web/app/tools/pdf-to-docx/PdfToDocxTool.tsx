"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { FileEdit, FileText, CheckCircle2, Download } from "lucide-react";

export default function PdfToDocxTool() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ url: string; name: string } | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) {
      setError("Please upload a PDF file.");
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
  
  // Fake progress bar for the API call
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (converting && progress < 90) {
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + Math.random() * 15;
          return next > 90 ? 90 : next;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [converting, progress]);

  const convertFile = async () => {
    if (!file) return;
    setConverting(true);
    setProgress(0);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/convert/pdf-to-docx", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to convert document");
      }

      setProgress(100);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const name = file.name.replace(/\.pdf$/i, "") + ".docx";
      
      setResult({ url, name });
    } catch (err: any) {
      setError(err.message || "An error occurred during conversion.");
    } finally {
      setTimeout(() => {
        setConverting(false);
        setProgress(0);
      }, 500);
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
          <Link href="/#pdf">PDF Tools</Link><span className="breadcrumb__sep">›</span>
          <span>PDF to DOCX</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon"><FileEdit size={48} className="text-accent-violet" /></span>
          <h1 className="tool-page__title">Convert PDF to DOCX</h1>
          <p className="tool-page__desc">Extract text from PDF documents and convert them to editable Microsoft Word format.</p>
        </div>

        <div className="tool-layout-grid" data-cols={file ? "2" : "1"}>
          {/* Upload panel */}
          <div className="glass-card tool-panel">
            <div
              className={`dropzone${dragging ? " dropzone--active" : ""}`}
              style={{ flex: file ? "none" : 1, display: "flex", flexDirection: "column", justifyContent: "center" }}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              role="button" tabIndex={0}
            >
              <input ref={inputRef} type="file" accept=".pdf,application/pdf" style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: 0 }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
              
              {file ? (
                <div>
                  <FileText size={48} color="var(--accent-violet)" style={{ margin: "0 auto 12px" }} />
                  <p style={{ fontSize: "1rem", color: "var(--text-primary)", fontWeight: 700 }}>{file.name}</p>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: "4px" }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <>
                  <span className="dropzone__icon"><FileText size={36} color="var(--text-muted)" /></span>
                  <p className="dropzone__title">Drop PDF here</p>
                  <p className="dropzone__subtitle">or click to browse</p>
                </>
              )}
            </div>

            {file && (
              <div style={{ marginTop: "24px" }}>
                {converting ? (
                  <div style={{ padding: "16px", background: "rgba(124,58,237,0.05)", borderRadius: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.875rem", fontWeight: 600, color: "var(--accent-violet)" }}>
                      <span>Extracting text & formatting...</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div style={{ height: "6px", background: "rgba(124,58,237,0.1)", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${progress}%`, background: "var(--accent-gradient)", transition: "width 0.2s ease-out" }} />
                    </div>
                  </div>
                ) : (
                  <button className="btn btn--primary w-full" onClick={convertFile}>
                    Convert to DOCX →
                  </button>
                )}
              </div>
            )}
            
            {error && <div className="alert alert--error" style={{ marginTop: "12px" }}>❌ {error}</div>}
          </div>

          {/* Result panel */}
          {result && (
            <div className="glass-card tool-panel animate-scaleIn" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <CheckCircle2 size={48} color="#10b981" style={{ margin: "0 auto 12px" }} />
                <h2 style={{ fontWeight: 700, fontSize: "1.25rem", color: "#10b981" }}>Converted Successfully!</h2>
              </div>

              <div className="glass-card--light" style={{ padding: "24px", textAlign: "center", borderRadius: "10px", marginBottom: "24px" }}>
                <FileEdit size={48} color="var(--accent-violet)" style={{ margin: "0 auto 12px" }} />
                <p style={{ color: "var(--text-primary)", fontSize: "1rem", fontWeight: 600 }}>{result.name}</p>
                <span style={{ display: "inline-block", background: "rgba(124,58,237,0.1)", color: "var(--accent-violet)", padding: "4px 12px", borderRadius: "99px", marginTop: "12px", fontSize: "0.8125rem", fontWeight: 600 }}>Ready to edit</span>
              </div>

              <button className="btn btn--primary w-full" onClick={download} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <Download size={18} /> Download Word Document
              </button>
              <button className="btn btn--glass w-full" style={{ marginTop: "12px" }} onClick={() => { setResult(null); setFile(null); }}>Convert another</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
