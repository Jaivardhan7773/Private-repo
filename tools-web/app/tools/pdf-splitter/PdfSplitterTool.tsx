"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { PDFDocument } from "pdf-lib";

export default function PdfSplitterTool() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [converting, setConverting] = useState(false);
  
  const [pdfDoc, setPdfDoc] = useState<PDFDocument | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [splitRange, setSplitRange] = useState("");
  
  const [result, setResult] = useState<{ url: string; name: string } | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (f: File) => {
    if (f.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }
    setFile(f);
    setResult(null);
    setError("");
    
    try {
      const arrayBuffer = await f.arrayBuffer();
      const doc = await PDFDocument.load(arrayBuffer);
      setPdfDoc(doc);
      setPageCount(doc.getPageCount());
      setSplitRange(`1-${doc.getPageCount()}`);
    } catch (e) {
      setError("Failed to load PDF. It might be encrypted or corrupted.");
    }
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const splitPdf = async () => {
    if (!pdfDoc || !file) return;
    setConverting(true);
    setError("");

    try {
      // Parse range, e.g., "1-3, 5, 7-9"
      const indices: Set<number> = new Set();
      const parts = splitRange.split(",").map(s => s.trim());
      
      for (const part of parts) {
        if (part.includes("-")) {
          const [startStr, endStr] = part.split("-");
          const start = parseInt(startStr);
          const end = parseInt(endStr);
          if (!isNaN(start) && !isNaN(end) && start >= 1 && end <= pageCount && start <= end) {
            for (let i = start; i <= end; i++) {
              indices.add(i - 1); // 0-indexed for pdf-lib
            }
          }
        } else {
          const page = parseInt(part);
          if (!isNaN(page) && page >= 1 && page <= pageCount) {
            indices.add(page - 1);
          }
        }
      }

      const pagesToExtract = Array.from(indices).sort((a, b) => a - b);
      if (pagesToExtract.length === 0) {
        throw new Error("Invalid page range. Please check your input.");
      }

      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdfDoc, pagesToExtract);
      copiedPages.forEach(page => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      setResult({ url, name: file.name.replace(".pdf", "") + "-split.pdf" });
    } catch (err: any) {
      setError(err.message || "An error occurred during splitting.");
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
          <span>PDF Splitter</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon">✂️</span>
          <h1 className="tool-page__title">Split PDF</h1>
          <p className="tool-page__desc">Extract specific pages or split a PDF document into smaller parts securely in your browser.</p>
        </div>

        <div className="tool-layout-grid" data-cols={file ? "2" : "1"}>
          
          {/* Upload panel */}
          <div className="glass-card tool-panel" style={{ display: "flex", flexDirection: "column" }}>
            <div
              className={`dropzone${dragging ? " dropzone--active" : ""}`}
              style={{ flex: file ? "none" : 1, display: "flex", flexDirection: "column", justifyContent: "center" }}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              role="button" tabIndex={0}
            >
              <input ref={inputRef} type="file" accept="application/pdf" style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: 0 }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
              
              {file ? (
                <div>
                  <span style={{ fontSize: "3rem", display: "block", marginBottom: "12px" }}>📄</span>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", fontWeight: 600 }}>{file.name}</p>
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>{pageCount} Pages</p>
                </div>
              ) : (
                <>
                  <span className="dropzone__icon">✂️</span>
                  <p className="dropzone__title">Drop PDF here</p>
                  <p className="dropzone__subtitle">or click to browse</p>
                </>
              )}
            </div>

            {file && (
              <div style={{ marginTop: "24px" }}>
                <div className="form-group">
                  <label className="form-label">Pages to extract</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={splitRange} 
                    onChange={e => setSplitRange(e.target.value)} 
                    placeholder="e.g. 1-5, 8, 11-13"
                  />
                  <small style={{ color: "var(--text-muted)", marginTop: "8px", display: "block" }}>
                    Example: 1-5, 8, 11-13. The document has {pageCount} pages.
                  </small>
                </div>
                
                <button className="btn btn--primary w-full" style={{ marginTop: "16px" }} onClick={splitPdf} disabled={converting}>
                  {converting ? <><span className="spinner" />Splitting...</> : "Split PDF →"}
                </button>
              </div>
            )}
            
            {error && <div className="alert alert--error" style={{ marginTop: "12px" }}>❌ {error}</div>}
          </div>

          {/* Result panel */}
          {result && (
            <div className="glass-card tool-panel animate-scaleIn">
              <h2 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "1rem" }}>✅ Extracted Successfully!</h2>
              <div className="glass-card--light" style={{ padding: "32px", textAlign: "center", borderRadius: "10px", marginBottom: "16px" }}>
                <span style={{ fontSize: "3rem", display: "block", marginBottom: "12px" }}>📄</span>
                <strong>{result.name}</strong>
              </div>
              <button className="btn btn--primary w-full" onClick={download}>⬇️ Download PDF</button>
              <button className="btn btn--glass w-full" style={{ marginTop: "8px" }} onClick={() => setResult(null)}>Extract more pages</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
