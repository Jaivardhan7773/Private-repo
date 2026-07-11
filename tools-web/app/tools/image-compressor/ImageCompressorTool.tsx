"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Minimize, Image as ImageIcon, CheckCircle2, Download } from "lucide-react";

export default function ImageCompressorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [quality, setQuality] = useState(80);
  const [result, setResult] = useState<{ url: string; size: number; name: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    setResult(null);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const compress = () => {
    if (!file) return;

    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const newUrl = URL.createObjectURL(blob);
          const ext = file.name.split(".").pop();
          const name = file.name.replace(`.${ext}`, "") + "-compressed.jpg";
          setResult({ url: newUrl, size: blob.size, name });
        },
        "image/jpeg",
        quality / 100
      );
    };
    img.src = url;
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
  
  // Very rough heuristic for estimated size
  const estimatedSize = file ? Math.max(file.size * 0.1, file.size * (quality / 100) * 0.8) : 0;

  return (
    <div className="tool-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span className="breadcrumb__sep">›</span>
          <Link href="/#image">Image Tools</Link><span className="breadcrumb__sep">›</span>
          <span>Image Compressor</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon"><Minimize size={48} className="text-accent-violet" /></span>
          <h1 className="tool-page__title">Image Compressor</h1>
          <p className="tool-page__desc">Reduce the file size of your images instantly in your browser while keeping quality.</p>
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
              <input ref={inputRef} type="file" accept="image/*" style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: 0 }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
              
              {file ? (
                <div>
                  <ImageIcon size={48} color="var(--accent-violet)" style={{ margin: "0 auto 12px" }} />
                  <p style={{ fontSize: "1rem", color: "var(--text-primary)", fontWeight: 700 }}>{file.name}</p>
                  <div style={{ display: "inline-block", background: "rgba(124,58,237,0.1)", color: "var(--accent-violet)", padding: "4px 12px", borderRadius: "99px", marginTop: "8px", fontWeight: 700, fontSize: "0.875rem" }}>
                    Original: {(file.size / 1024).toFixed(2)} KB
                  </div>
                </div>
              ) : (
                <>
                  <span className="dropzone__icon"><Minimize size={36} color="var(--text-muted)" /></span>
                  <p className="dropzone__title">Drop image here</p>
                  <p className="dropzone__subtitle">or click to browse</p>
                </>
              )}
            </div>

            {file && (
              <div style={{ marginTop: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <label style={{ fontWeight: 600, color: "var(--text-secondary)" }}>Compression Quality</label>
                  <strong style={{ color: "var(--accent-violet)" }}>{quality}%</strong>
                </div>
                <input 
                  type="range" 
                  className="form-range" 
                  min="1" 
                  max="100" 
                  value={quality} 
                  onChange={(e) => setQuality(Number(e.target.value))} 
                  style={{ marginBottom: "12px" }}
                />
                <div style={{ textAlign: "right", fontSize: "0.8125rem", color: "var(--text-muted)", marginBottom: "24px" }}>
                  Estimated Output Size: <strong style={{ color: "var(--text-primary)" }}>~{(estimatedSize / 1024).toFixed(2)} KB</strong>
                </div>
                
                <button className="btn btn--primary w-full" onClick={compress}>Compress Image →</button>
              </div>
            )}
          </div>

          {result && file && (
            <div className="glass-card tool-panel animate-scaleIn" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ textAlign: "center", marginBottom: "16px" }}>
                <CheckCircle2 size={48} color="#10b981" style={{ margin: "0 auto 12px" }} />
                <h2 style={{ fontWeight: 700, fontSize: "1.25rem", color: "#10b981" }}>Compressed Successfully!</h2>
              </div>
              
              <div className="tool-layout-grid" data-cols="2" style={{ gap: "12px", marginBottom: "20px" }}>
                <div style={{ padding: "16px", background: "rgba(255,255,255,0.5)", borderRadius: "8px", textAlign: "center" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Original Size</span>
                  <div style={{ fontSize: "1.25rem", fontWeight: 800 }}>{(file.size / 1024).toFixed(2)} KB</div>
                </div>
                <div style={{ padding: "16px", background: "rgba(124,58,237,0.1)", borderRadius: "8px", textAlign: "center", border: "1px dashed var(--accent-violet)" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>New Size</span>
                  <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--accent-violet)" }}>{(result.size / 1024).toFixed(2)} KB</div>
                </div>
              </div>

              <div style={{ padding: "12px", background: "#10b98120", color: "#059669", borderRadius: "8px", textAlign: "center", marginBottom: "24px", fontWeight: 600 }}>
                Saved {Math.round((1 - (result.size / file.size)) * 100)}% space!
              </div>

              <button className="btn btn--primary w-full" onClick={download} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <Download size={18} /> Download ({(result.size / 1024).toFixed(2)} KB)
              </button>
              <button className="btn btn--glass w-full" style={{ marginTop: "12px" }} onClick={() => setResult(null)}>Change quality</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
