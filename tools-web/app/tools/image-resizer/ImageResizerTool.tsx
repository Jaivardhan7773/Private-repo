"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";

export default function ImageResizerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  
  const [imgUrl, setImgUrl] = useState("");
  const [origWidth, setOrigWidth] = useState(0);
  const [origHeight, setOrigHeight] = useState(0);
  
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [maintainRatio, setMaintainRatio] = useState(true);
  
  const [result, setResult] = useState<{ url: string; name: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    setResult(null);
    
    const url = URL.createObjectURL(f);
    setImgUrl(url);
    
    const img = new Image();
    img.onload = () => {
      setOrigWidth(img.width);
      setOrigHeight(img.height);
      setWidth(img.width);
      setHeight(img.height);
    };
    img.src = url;
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (maintainRatio && origWidth && origHeight) {
      setHeight(Math.round((val * origHeight) / origWidth));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (maintainRatio && origWidth && origHeight) {
      setWidth(Math.round((val * origWidth) / origHeight));
    }
  };

  const resizeImage = () => {
    if (!file || !imgUrl || width <= 0 || height <= 0 || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const newUrl = URL.createObjectURL(blob);
        const ext = file.name.split(".").pop() || "png";
        const name = file.name.replace(`.${ext}`, "") + `-resized.${ext}`;
        setResult({ url: newUrl, name });
      }, file.type, 0.92);
    };
    img.src = imgUrl;
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
          <span>Image Resizer</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon">📐</span>
          <h1 className="tool-page__title">Image Resizer</h1>
          <p className="tool-page__desc">Resize images quickly directly in your browser without losing quality.</p>
        </div>

        <div className="tool-layout-grid" data-cols={file ? "2" : "1"}>
          
          {/* Upload & Preview */}
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
              <input ref={inputRef} type="file" accept="image/*" style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: 0 }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
              
              {imgUrl ? (
                <div style={{ position: "relative", width: "100%", height: "250px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img src={imgUrl} alt="Preview" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", opacity: 0, transition: "opacity 0.2s" }} className="hover-overlay">
                    <span style={{ color: "white", fontWeight: 600 }}>Click to change image</span>
                  </div>
                </div>
              ) : (
                <>
                  <span className="dropzone__icon">🖼️</span>
                  <p className="dropzone__title">Drop image here</p>
                  <p className="dropzone__subtitle">or click to browse</p>
                </>
              )}
            </div>

            {file && (
              <div style={{ marginTop: "24px", textAlign: "center" }}>
                <p style={{ fontWeight: 600, color: "var(--text-secondary)" }}>Original Size</p>
                <p style={{ fontSize: "1.25rem", color: "var(--text-primary)", fontWeight: 800 }}>{origWidth} × {origHeight} px</p>
              </div>
            )}
          </div>

          {/* Controls & Result */}
          {file && (
            <div className="glass-card tool-panel" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              
              {!result ? (
                <>
                  <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "16px" }}>Resize Options</h3>
                    
                    <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "16px" }}>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Width (px)</label>
                        <input type="number" className="form-input" value={width || ""} onChange={e => handleWidthChange(Number(e.target.value))} />
                      </div>
                      <div style={{ fontSize: "1.5rem", color: "var(--text-muted)", marginTop: "24px" }}>×</div>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Height (px)</label>
                        <input type="number" className="form-input" value={height || ""} onChange={e => handleHeightChange(Number(e.target.value))} />
                      </div>
                    </div>

                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                      <input type="checkbox" checked={maintainRatio} onChange={e => setMaintainRatio(e.target.checked)} style={{ width: "16px", height: "16px" }} />
                      <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>Maintain aspect ratio</span>
                    </label>
                  </div>

                  <div className="tool-layout-grid" data-cols="2">
                    <button className="btn btn--glass" onClick={() => { handleWidthChange(Math.round(origWidth * 0.5)); handleHeightChange(Math.round(origHeight * 0.5)); }}>50% Smaller</button>
                    <button className="btn btn--glass" onClick={() => { handleWidthChange(Math.round(origWidth * 0.75)); handleHeightChange(Math.round(origHeight * 0.75)); }}>25% Smaller</button>
                    <button className="btn btn--glass" onClick={() => { handleWidthChange(1920); if(maintainRatio) handleHeightChange(Math.round((1920*origHeight)/origWidth)); }}>1920px (HD)</button>
                    <button className="btn btn--glass" onClick={() => { handleWidthChange(1080); if(maintainRatio) handleHeightChange(Math.round((1080*origHeight)/origWidth)); }}>1080px (FHD)</button>
                  </div>

                  <button className="btn btn--primary" style={{ marginTop: "auto" }} onClick={resizeImage}>Resize Image →</button>
                </>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, gap: "16px" }}>
                  <h2 style={{ fontWeight: 700, fontSize: "1.25rem", color: "var(--accent-violet)" }}>✅ Resized Successfully!</h2>
                  
                  <div style={{ padding: "24px", background: "rgba(255,255,255,0.5)", borderRadius: "12px", width: "100%", textAlign: "center" }}>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "4px" }}>New Size</p>
                    <p style={{ fontSize: "2rem", fontWeight: 800 }}>{width} × {height} px</p>
                  </div>

                  <button className="btn btn--primary w-full" onClick={download}>⬇️ Download Resized Image</button>
                  <button className="btn btn--glass w-full" onClick={() => setResult(null)}>Change options</button>
                </div>
              )}
              
            </div>
          )}

        </div>
      </div>
      
      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: 0 }} />
      <style dangerouslySetInnerHTML={{__html: `
        .hover-overlay:hover { opacity: 1 !important; }
      `}} />
    </div>
  );
}
