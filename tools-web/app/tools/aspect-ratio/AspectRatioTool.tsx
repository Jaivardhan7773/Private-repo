"use client";

import { useState } from "react";
import Link from "next/link";

export default function AspectRatioTool() {
  const [w1, setW1] = useState(1920);
  const [h1, setH1] = useState(1080);
  
  const [w2, setW2] = useState(1280);
  const [h2, setH2] = useState(720);

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const calculateRatio = (width: number, height: number) => {
    if (!width || !height) return "? : ?";
    const d = gcd(width, height);
    return `${width / d} : ${height / d}`;
  };

  const handleW2Change = (val: number) => {
    setW2(val);
    if (w1 && h1) {
      setH2(Math.round((val * h1) / w1));
    }
  };

  const handleH2Change = (val: number) => {
    setH2(val);
    if (w1 && h1) {
      setW2(Math.round((val * w1) / h1));
    }
  };

  const ratioString = calculateRatio(w1, h1);

  return (
    <div className="tool-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span className="breadcrumb__sep">›</span>
          <Link href="/#tools">Tools</Link><span className="breadcrumb__sep">›</span>
          <span>Aspect Ratio Calc</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon">📐</span>
          <h1 className="tool-page__title">Aspect Ratio Calculator</h1>
          <p className="tool-page__desc">Calculate image dimensions and simplify aspect ratios instantly.</p>
        </div>

        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
          
          <div className="glass-card" style={{ padding: "32px", display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "32px", alignItems: "center", textAlign: "center" }}>
            
            {/* Box 1 (Original) */}
            <div>
              <h3 style={{ marginBottom: "16px", color: "var(--text-secondary)", fontSize: "0.9375rem", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}>Original Ratio</h3>
              <div style={{ display: "flex", gap: "12px", alignItems: "center", justifyContent: "center" }}>
                <input type="number" className="form-input" value={w1 || ""} onChange={e => setW1(Number(e.target.value))} style={{ width: "100px", textAlign: "center" }} />
                <span style={{ fontWeight: 700, color: "var(--text-muted)" }}>×</span>
                <input type="number" className="form-input" value={h1 || ""} onChange={e => setH1(Number(e.target.value))} style={{ width: "100px", textAlign: "center" }} />
              </div>
              
              <div style={{ marginTop: "24px", padding: "16px", background: "rgba(124,58,237,0.05)", borderRadius: "8px", border: "1px dashed var(--accent-violet)" }}>
                <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>Simplified Ratio</span>
                <strong style={{ fontSize: "2rem", color: "var(--accent-violet)" }}>{ratioString}</strong>
              </div>
            </div>

            <div style={{ fontSize: "2rem", color: "var(--text-muted)" }}>=</div>

            {/* Box 2 (New) */}
            <div>
              <h3 style={{ marginBottom: "16px", color: "var(--text-secondary)", fontSize: "0.9375rem", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}>New Dimensions</h3>
              <div style={{ display: "flex", gap: "12px", alignItems: "center", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>New Width</label>
                  <input type="number" className="form-input" value={w2 || ""} onChange={e => handleW2Change(Number(e.target.value))} style={{ width: "100px", textAlign: "center" }} />
                </div>
                <span style={{ fontWeight: 700, color: "var(--text-muted)", marginTop: "20px" }}>×</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>New Height</label>
                  <input type="number" className="form-input" value={h2 || ""} onChange={e => handleH2Change(Number(e.target.value))} style={{ width: "100px", textAlign: "center" }} />
                </div>
              </div>
            </div>

          </div>

          <div className="glass-card" style={{ padding: "32px" }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "16px", fontWeight: 700 }}>Common Aspect Ratios</h3>
            <div className="tool-layout-grid" data-cols="2">
              {[
                { label: "Widescreen / HD", ratio: "16:9" },
                { label: "Standard / SD", ratio: "4:3" },
                { label: "Square (Insta)", ratio: "1:1" },
                { label: "Vertical Video", ratio: "9:16" },
                { label: "Classic Photo", ratio: "3:2" },
                { label: "Cinematic", ratio: "21:9" },
              ].map(r => (
                <button 
                  key={r.ratio} 
                  className="btn btn--glass" 
                  style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "12px" }}
                  onClick={() => {
                    const [rw, rh] = r.ratio.split(":").map(Number);
                    setW1(rw); setH1(rh); setW2(rw * 100); setH2(rh * 100);
                  }}
                >
                  <strong style={{ fontSize: "1.125rem", color: "var(--accent-violet)" }}>{r.ratio}</strong>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{r.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
