"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { Type, Image as ImageIcon, Copy, Check, Code, FileJson } from "lucide-react";

export default function ImageToBase64Tool() {
  const [file, setFile] = useState<File | null>(null);
  const [base64, setBase64] = useState("");
  const [dragging, setDragging] = useState(false);
  const [imgPreview, setImgPreview] = useState("");
  const [includePrefix, setIncludePrefix] = useState(true);
  
  // Copy states
  const [copiedString, setCopiedString] = useState(false);
  const [copiedCss, setCopiedCss] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImgPreview(result);
      setBase64(result);
    };
    reader.readAsDataURL(f);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  // Reset copy state after 2 seconds
  useEffect(() => {
    if (copiedString) {
      const t = setTimeout(() => setCopiedString(false), 2000);
      return () => clearTimeout(t);
    }
  }, [copiedString]);

  useEffect(() => {
    if (copiedCss) {
      const t = setTimeout(() => setCopiedCss(false), 2000);
      return () => clearTimeout(t);
    }
  }, [copiedCss]);

  useEffect(() => {
    if (copiedHtml) {
      const t = setTimeout(() => setCopiedHtml(false), 2000);
      return () => clearTimeout(t);
    }
  }, [copiedHtml]);

  const copyToClipboard = async () => {
    if (!base64) return;
    try {
      const textToCopy = includePrefix ? base64 : base64.split(",")[1];
      await navigator.clipboard.writeText(textToCopy);
      setCopiedString(true);
    } catch (err) {
      console.error("Failed to copy");
    }
  };

  const copyCss = async () => {
    if (!base64) return;
    try {
      const css = `background-image: url("${base64}");`;
      await navigator.clipboard.writeText(css);
      setCopiedCss(true);
    } catch (err) {
      console.error("Failed to copy");
    }
  };

  const copyHtml = async () => {
    if (!base64) return;
    try {
      const html = `<img src="${base64}" alt="${file?.name || 'image'}" />`;
      await navigator.clipboard.writeText(html);
      setCopiedHtml(true);
    } catch (err) {
      console.error("Failed to copy");
    }
  };

  const displayString = base64 ? (includePrefix ? base64 : base64.split(",")[1]) : "";

  return (
    <div className="tool-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span className="breadcrumb__sep">›</span>
          <Link href="/#image">Image Tools</Link><span className="breadcrumb__sep">›</span>
          <span>Image to Base64</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon"><Type size={48} className="text-accent-violet" /></span>
          <h1 className="tool-page__title">Image to Base64 Converter</h1>
          <p className="tool-page__desc">Convert any image to a Base64 string for use in HTML, CSS, or JSON.</p>
        </div>

        <div className="tool-layout-grid" data-cols="2">
          
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
              <input ref={inputRef} type="file" accept="image/*" style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: 0 }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
              
              {imgPreview ? (
                <div style={{ position: "relative", width: "100%", height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img src={imgPreview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", opacity: 0, transition: "opacity 0.2s", borderRadius: "8px" }} className="hover-overlay">
                    <span style={{ color: "white", fontWeight: 600 }}>Click to change image</span>
                  </div>
                </div>
              ) : (
                <>
                  <span className="dropzone__icon"><ImageIcon size={36} color="var(--text-muted)" /></span>
                  <p className="dropzone__title">Drop image here</p>
                  <p className="dropzone__subtitle">or click to browse</p>
                </>
              )}
            </div>

            {file && (
              <div style={{ marginTop: "24px" }}>
                <h3 style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "8px", fontWeight: 600, textTransform: "uppercase" }}>File Info</h3>
                <div className="tool-layout-grid" data-cols="2">
                  <div style={{ background: "rgba(255,255,255,0.5)", padding: "12px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Name</div>
                    <div style={{ fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{file.name}</div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.5)", padding: "12px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Size</div>
                    <div style={{ fontWeight: 600 }}>{(file.size / 1024).toFixed(2)} KB</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Result panel */}
          <div className="glass-card tool-panel" style={{ display: "flex", flexDirection: "column", padding: 0 }}>
            <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--glass-border)", background: "rgba(255,255,255,0.4)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
              <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>Base64 Output</span>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", cursor: "pointer" }}>
                <input type="checkbox" checked={includePrefix} onChange={e => setIncludePrefix(e.target.checked)} />
                Include Data URI prefix
              </label>
            </div>
            
            <textarea
              readOnly
              value={displayString}
              placeholder="Upload an image to generate Base64..."
              style={{
                flex: 1,
                padding: "24px",
                border: "none",
                background: "transparent",
                resize: "none",
                fontFamily: "monospace",
                fontSize: "0.8125rem",
                color: "var(--text-primary)",
                outline: "none",
                wordBreak: "break-all",
                minHeight: "200px"
              }}
            />

            <div style={{ padding: "16px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "12px", background: "rgba(255,255,255,0.4)", borderTop: "1px solid var(--glass-border)" }}>
              <button 
                className={`btn btn--sm ${copiedString ? 'btn--glass' : 'btn--primary'}`} 
                onClick={copyToClipboard} 
                disabled={!base64}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
              >
                {copiedString ? <><Check size={16} color="#10b981" /> <span style={{ color: "#10b981" }}>Copied!</span></> : <><Copy size={16} /> String</>}
              </button>
              <button 
                className={`btn btn--glass btn--sm`} 
                onClick={copyCss} 
                disabled={!base64}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
              >
                {copiedCss ? <><Check size={16} color="#10b981" /> <span style={{ color: "#10b981" }}>Copied!</span></> : <><Code size={16} /> CSS</>}
              </button>
              <button 
                className={`btn btn--glass btn--sm`} 
                onClick={copyHtml} 
                disabled={!base64}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
              >
                {copiedHtml ? <><Check size={16} color="#10b981" /> <span style={{ color: "#10b981" }}>Copied!</span></> : <><FileJson size={16} /> HTML</>}
              </button>
            </div>
          </div>

        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hover-overlay:hover { opacity: 1 !important; }
      `}} />
    </div>
  );
}
