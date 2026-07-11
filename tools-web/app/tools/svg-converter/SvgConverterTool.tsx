"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";

export default function SvgConverterTool() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [format, setFormat] = useState<"png" | "jpeg">("png");
  const [scale, setScale] = useState(2);
  const [result, setResult] = useState<{ url: string; name: string; size: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    if (f.type !== "image/svg+xml" && !f.name.endsWith(".svg")) {
      alert("Please upload an SVG file.");
      return;
    }
    setFile(f);
    setResult(null);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const convertSvg = () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const svgData = e.target?.result as string;
      
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        // Apply scaling for better quality (e.g. 2x)
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        
        // If JPEG, fill white background first
        if (format === "jpeg") {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const name = file.name.replace(".svg", `.${format}`);
          setResult({ url, name, size: blob.size });
        }, `image/${format}`, 1.0);
      };
      img.src = svgData;
    };
    reader.readAsDataURL(file);
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
          <span>SVG Converter</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon">🎨</span>
          <h1 className="tool-page__title">Convert SVG to PNG / JPG</h1>
          <p className="tool-page__desc">Convert vector SVG files to standard raster images instantly.</p>
        </div>

        <div className="tool-layout-grid" data-cols={file ? "2" : "1"}>
          
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
              <input ref={inputRef} type="file" accept=".svg,image/svg+xml" style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: 0 }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
              
              {file ? (
                <div>
                  <span style={{ fontSize: "3rem", display: "block", marginBottom: "12px" }}>💠</span>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", fontWeight: 600 }}>{file.name}</p>
                </div>
              ) : (
                <>
                  <span className="dropzone__icon">💠</span>
                  <p className="dropzone__title">Drop SVG here</p>
                  <p className="dropzone__subtitle">or click to browse</p>
                </>
              )}
            </div>

            {file && (
              <div style={{ marginTop: "24px" }}>
                <div className="form-group" style={{ marginBottom: "16px" }}>
                  <label className="form-label">Output Format</label>
                  <select className="form-select" value={format} onChange={e => setFormat(e.target.value as "png" | "jpeg")}>
                    <option value="png">PNG (Transparent)</option>
                    <option value="jpeg">JPG (White background)</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: "24px" }}>
                  <label className="form-label">Scale Factor (Quality)</label>
                  <select className="form-select" value={scale} onChange={e => setScale(Number(e.target.value))}>
                    <option value={1}>1x (Original size)</option>
                    <option value={2}>2x (High resolution)</option>
                    <option value={4}>4x (Ultra resolution)</option>
                  </select>
                </div>
                
                <button className="btn btn--primary w-full" onClick={convertSvg}>Convert SVG →</button>
              </div>
            )}
          </div>

          {result && (
            <div className="glass-card tool-panel animate-scaleIn" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h2 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "1.25rem", color: "var(--accent-violet)", textAlign: "center" }}>✅ Converted!</h2>
              
              <div style={{ padding: "24px", background: "rgba(255,255,255,0.5)", borderRadius: "12px", width: "100%", textAlign: "center", marginBottom: "24px" }}>
                <p style={{ color: "var(--text-secondary)", marginBottom: "4px" }}>{result.name}</p>
                <p style={{ fontSize: "1.25rem", fontWeight: 800 }}>{(result.size / 1024).toFixed(2)} KB</p>
              </div>

              <button className="btn btn--primary w-full" onClick={download}>⬇️ Download {format.toUpperCase()}</button>
              <button className="btn btn--glass w-full" style={{ marginTop: "12px" }} onClick={() => setResult(null)}>Change format</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
