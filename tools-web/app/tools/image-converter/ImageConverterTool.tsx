"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";

const OUTPUT_FORMATS = [
  { value: "image/webp", label: "WebP", ext: "webp", lossy: true },
  { value: "image/jpeg", label: "JPEG", ext: "jpg", lossy: true },
  { value: "image/png", label: "PNG", ext: "png", lossy: false },
  { value: "image/avif", label: "AVIF", ext: "avif", lossy: true },
  { value: "image/gif", label: "GIF", ext: "gif", lossy: false },
  { value: "image/bmp", label: "BMP", ext: "bmp", lossy: false },
];

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(2)} MB`;
}

export default function ImageConverterTool() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [outputFormat, setOutputFormat] = useState("image/webp");
  const [quality, setQuality] = useState(85);
  const [dragging, setDragging] = useState(false);
  const [converting, setConverting] = useState(false);
  const [result, setResult] = useState<{ url: string; size: number; name: string } | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) { setError("Please upload an image file."); return; }
    setFile(f);
    setResult(null);
    setError("");
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const convert = async () => {
    if (!file || !preview) return;
    setConverting(true); setError(""); setResult(null);
    try {
      const img = new Image();
      img.src = preview;
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      if (outputFormat === "image/jpeg" || outputFormat === "image/webp" || outputFormat === "image/avif") {
        ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const fmt = OUTPUT_FORMATS.find(f => f.value === outputFormat)!;
      canvas.toBlob((blob) => {
        if (!blob) { setError("Conversion failed. Try a different format."); setConverting(false); return; }
        const url = URL.createObjectURL(blob);
        const baseName = file.name.replace(/\.[^.]+$/, "");
        setResult({ url, size: blob.size, name: `${baseName}.${fmt.ext}` });
        setConverting(false);
      }, outputFormat, fmt.lossy ? quality / 100 : undefined);
    } catch {
      setError("Conversion failed. Please try again."); setConverting(false);
    }
  };

  const download = () => {
    if (!result) return;
    const a = document.createElement("a"); a.href = result.url; a.download = result.name;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const selectedFmt = OUTPUT_FORMATS.find(f => f.value === outputFormat)!;

  return (
    <div className="tool-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span className="breadcrumb__sep">›</span>
          <Link href="/#tools">Tools</Link><span className="breadcrumb__sep">›</span>
          <span>Image Converter</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon">🔄</span>
          <h1 className="tool-page__title">Image Converter</h1>
          <p className="tool-page__desc">Convert images between JPEG, PNG, WebP, AVIF, GIF and BMP. Instant, free, and processed entirely in your browser.</p>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "12px", flexWrap: "wrap" }}>
            <span className="badge badge--free">🔒 No upload to server</span>
            <span className="badge badge--glass">⚡ Instant conversion</span>
            <span className="badge badge--free">🆓 Free forever</span>
          </div>
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
              role="button" tabIndex={0} aria-label="Upload image"
              onKeyDown={e => e.key === "Enter" && inputRef.current?.click()}
            >
              <input ref={inputRef} type="file" accept="image/*" style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: 0 }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} id="img-upload" />
              {preview ? (
                <div>
                  <img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: "10px", marginBottom: "12px", objectFit: "contain" }} />
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", fontWeight: 600 }}>{file?.name}</p>
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>{file && formatBytes(file.size)} · Click to change</p>
                </div>
              ) : (
                <>
                  <span className="dropzone__icon">🖼️</span>
                  <p className="dropzone__title">Drop image here</p>
                  <p className="dropzone__subtitle">or click to browse · JPEG, PNG, WebP, AVIF, GIF, BMP</p>
                </>
              )}
            </div>

            {/* Options */}
            {file && (
              <div style={{ marginTop: "20px" }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="output-format">Convert to</label>
                  <select id="output-format" className="form-select" value={outputFormat} onChange={e => setOutputFormat(e.target.value)}>
                    {OUTPUT_FORMATS.map(f => <option key={f.value} value={f.value}>{f.label} (.{f.ext})</option>)}
                  </select>
                </div>
                {selectedFmt.lossy && (
                  <div className="form-group">
                    <label className="form-label" htmlFor="quality-slider">Quality: <strong>{quality}%</strong></label>
                    <input id="quality-slider" type="range" className="form-range" min={10} max={100} value={quality} onChange={e => setQuality(Number(e.target.value))} />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)" }}><span>Smaller file</span><span>Better quality</span></div>
                  </div>
                )}
                <button className="btn btn--primary w-full" onClick={convert} disabled={converting} id="convert-btn">
                  {converting ? <><span className="spinner" />Converting...</> : `Convert to ${selectedFmt.label} →`}
                </button>
              </div>
            )}
            {error && <div className="alert alert--error" style={{ marginTop: "12px" }}>❌ {error}</div>}
          </div>

          {/* Result panel */}
          {result && (
            <div className="glass-card tool-panel animate-scaleIn">
              <h2 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "1rem" }}>✅ Converted!</h2>
              <img src={result.url} alt="Converted" style={{ width: "100%", maxHeight: "220px", objectFit: "contain", borderRadius: "10px", marginBottom: "16px", border: "1.5px solid var(--glass-border)" }} />
              <div className="glass-card--light" style={{ padding: "12px 16px", borderRadius: "10px", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Original</span>
                  <strong>{file && formatBytes(file.size)}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginTop: "4px" }}>
                  <span style={{ color: "var(--text-muted)" }}>Converted</span>
                  <strong style={{ color: result.size < (file?.size || 0) ? "#059669" : "var(--accent-violet)" }}>{formatBytes(result.size)}</strong>
                </div>
                {file && result.size < file.size && (
                  <div style={{ marginTop: "8px", textAlign: "center" }}>
                    <span className="badge badge--free">🎉 {Math.round((1 - result.size / file.size) * 100)}% smaller</span>
                  </div>
                )}
              </div>
              <button className="btn btn--primary w-full" onClick={download} id="download-btn">⬇️ Download {result.name}</button>
              <button className="btn btn--glass w-full" style={{ marginTop: "8px" }} onClick={() => { setResult(null); setFile(null); setPreview(""); }}>Convert another</button>
            </div>
          )}
        </div>

        {/* How to use */}
        <div className="glass-card" style={{ maxWidth: "900px", margin: "32px auto 0", padding: "32px" }}>
          <h2 style={{ fontWeight: 800, fontSize: "1.25rem", marginBottom: "16px" }}>How to convert an image format</h2>
          <ol style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "10px", color: "var(--text-secondary)", fontSize: "0.9375rem" }}>
            <li>Click the upload area or drag and drop your image file</li>
            <li>Select your desired output format from the dropdown (WebP, JPEG, PNG, AVIF, GIF, BMP)</li>
            <li>For lossy formats (WebP, JPEG, AVIF), adjust the quality slider</li>
            <li>Click Convert — the result appears instantly</li>
            <li>Click Download to save the converted file</li>
          </ol>

          {/* FAQ */}
          <h2 style={{ fontWeight: 800, fontSize: "1.125rem", margin: "28px 0 16px" }}>Frequently Asked Questions</h2>
          <div className="faq-list">
            {[
              { q: "Are my images uploaded to a server?", a: "No. Conversion uses the HTML5 Canvas API — everything runs in your browser. Images never touch our servers." },
              { q: "Which format should I convert to for web?", a: "WebP is the best choice for web — it's 25-34% smaller than JPEG with equivalent quality. AVIF is even better but has slightly less browser support." },
              { q: "Why does PNG result in a large file?", a: "PNG is lossless — it preserves every pixel perfectly, which means larger files. Use WebP or JPEG for smaller sizes." },
              { q: "Can I convert a photo (JPEG) to PNG?", a: "Yes. The converted PNG will be lossless but larger in file size since PNG doesn't use lossy compression." },
            ].map(({ q, a }) => (
              <details key={q} className="faq-item glass-card--light">
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
