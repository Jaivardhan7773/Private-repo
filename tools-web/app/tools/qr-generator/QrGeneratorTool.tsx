"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { QrCode, Download, Settings, Type } from "lucide-react";

export default function QrGeneratorTool() {
  const [text, setText] = useState("https://trendingtopics.space");
  const [size, setSize] = useState(256);
  const [errorCorrection, setErrorCorrection] = useState<"L" | "M" | "Q" | "H">("M");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    generateQR();
  }, [text, size, errorCorrection]);

  const generateQR = async () => {
    if (!text.trim()) {
      setQrDataUrl("");
      return;
    }
    
    setIsGenerating(true);
    setError("");
    
    try {
      const url = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
        errorCorrectionLevel: errorCorrection,
      });
      setQrDataUrl(url);
    } catch (err: any) {
      setError(err.message || "Failed to generate QR code");
    } finally {
      setIsGenerating(false);
    }
  };

  const download = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "qrcode.png";
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
          <Link href="/#util">Utility Tools</Link><span className="breadcrumb__sep">›</span>
          <span>QR Generator</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon"><QrCode size={48} className="text-accent-violet" /></span>
          <h1 className="tool-page__title">QR Code Generator</h1>
          <p className="tool-page__desc">Generate high-quality QR codes for URLs, text, email, and more. Instantly and for free.</p>
        </div>

        <div className="tool-layout-grid" data-cols="2">
          {/* Input panel */}
          <div className="glass-card tool-panel">
            <div className="form-group">
              <label className="form-label" htmlFor="qr-content" style={{ display: "flex", alignItems: "center", gap: "6px" }}><Type size={16} /> Content (URL, text, email, etc.)</label>
              <textarea 
                id="qr-content" 
                className="form-input" 
                value={text} 
                onChange={e => setText(e.target.value)} 
                rows={4} 
                placeholder="Enter URL or text here..."
                style={{ resize: "none" }}
              />
            </div>
            
            <div className="form-group" style={{ marginTop: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <label className="form-label" htmlFor="qr-size" style={{ margin: 0, display: "flex", alignItems: "center", gap: "6px" }}><Settings size={16} /> Size</label>
                <strong style={{ color: "var(--accent-violet)" }}>{size}x{size}px</strong>
              </div>
              <input 
                id="qr-size" 
                type="range" 
                className="form-range" 
                min={128} 
                max={1024} 
                step={32}
                value={size} 
                onChange={e => setSize(Number(e.target.value))} 
              />
            </div>
            
            <div className="form-group" style={{ marginTop: "24px" }}>
              <label className="form-label" htmlFor="qr-error-correction">Error Correction Level</label>
              <select 
                id="qr-error-correction" 
                className="form-select" 
                value={errorCorrection} 
                onChange={e => setErrorCorrection(e.target.value as "L" | "M" | "Q" | "H")}
              >
                <option value="L">Low (7% damage recovery)</option>
                <option value="M">Medium (15% damage recovery)</option>
                <option value="Q">Quartile (25% damage recovery)</option>
                <option value="H">High (30% damage recovery)</option>
              </select>
            </div>
          </div>

          {/* Result panel */}
          <div className="glass-card tool-panel" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center" }}>
            {error ? (
              <div className="alert alert--error" style={{ margin: "auto" }}>❌ {error}</div>
            ) : qrDataUrl ? (
              <div style={{ margin: "auto", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ padding: "16px", background: "#fff", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", marginBottom: "24px", position: "relative" }}>
                  <img src={qrDataUrl} alt="Generated QR Code" style={{ width: "200px", height: "200px", display: "block", borderRadius: "4px" }} />
                  {isGenerating && (
                    <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px" }}>
                      <span className="spinner" style={{ width: "24px", height: "24px", borderWidth: "3px" }} />
                    </div>
                  )}
                </div>
                <button className="btn btn--primary w-full" onClick={download} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", maxWidth: "300px" }}>
                  <Download size={18} /> Download PNG
                </button>
              </div>
            ) : (
              <div style={{ color: "var(--text-muted)", textAlign: "center", margin: "auto" }}>
                <QrCode size={64} style={{ opacity: 0.3, margin: "0 auto 12px" }} />
                <p>Enter text to generate QR code</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
