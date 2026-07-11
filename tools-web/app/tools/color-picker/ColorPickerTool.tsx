"use client";

import { useState } from "react";
import Link from "next/link";

export default function ColorPickerTool() {
  const [color, setColor] = useState("#7c3aed");

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, Math.min(m, y));

    if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
    
    c = Math.round((c - k) / (1 - k) * 100);
    m = Math.round((m - k) / (1 - k) * 100);
    y = Math.round((y - k) / (1 - k) * 100);
    k = Math.round(k * 100);
    return { c, m, y, k };
  };

  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

  const formats = [
    { label: "HEX", value: color.toUpperCase() },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: "CMYK", value: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` }
  ];

  const presets = [
    "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#10b981", 
    "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", 
    "#d946ef", "#ec4899", "#f43f5e", "#000000", "#64748b", "#ffffff"
  ];

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="tool-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span className="breadcrumb__sep">›</span>
          <Link href="/#tools">Tools</Link><span className="breadcrumb__sep">›</span>
          <span>Color Picker</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon">🎨</span>
          <h1 className="tool-page__title">Color Picker & Converter</h1>
          <p className="tool-page__desc">Select a color to get its HEX, RGB, HSL, and CMYK values instantly.</p>
        </div>

        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
          
          <div className="glass-card" style={{ display: "flex", flexWrap: "wrap", gap: "32px", padding: "32px" }}>
            
            {/* Native Picker */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
              <div style={{ 
                width: "150px", height: "150px", borderRadius: "50%", 
                background: color, boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                border: "4px solid white", overflow: "hidden", position: "relative"
              }}>
                <input 
                  type="color" 
                  value={color} 
                  onChange={e => setColor(e.target.value)} 
                  style={{ width: "200%", height: "200%", position: "absolute", top: "-50%", left: "-50%", cursor: "pointer", opacity: 0 }} 
                />
              </div>
              <span style={{ fontSize: "0.875rem", color: "var(--text-muted)", fontWeight: 600 }}>Click to pick</span>
            </div>

            {/* Values */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px", minWidth: "250px" }}>
              {formats.map(f => (
                <div key={f.label} style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.5)", borderRadius: "8px", overflow: "hidden" }}>
                  <div style={{ padding: "12px 16px", background: "rgba(0,0,0,0.03)", fontWeight: 700, fontSize: "0.875rem", width: "80px", color: "var(--text-secondary)" }}>
                    {f.label}
                  </div>
                  <div style={{ padding: "12px 16px", flex: 1, fontFamily: "monospace", fontSize: "1rem" }}>
                    {f.value}
                  </div>
                  <button onClick={() => copy(f.value)} className="btn btn--glass" style={{ margin: "4px", padding: "8px 12px", border: "none" }}>
                    📋
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Presets */}
          <div className="glass-card" style={{ padding: "32px" }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "16px", fontWeight: 700 }}>Preset Palette</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {presets.map(p => (
                <button 
                  key={p} 
                  onClick={() => setColor(p)}
                  style={{
                    width: "40px", height: "40px", borderRadius: "50%", background: p,
                    border: p === "#ffffff" ? "1px solid #e2e8f0" : "none",
                    boxShadow: color.toLowerCase() === p.toLowerCase() ? `0 0 0 3px white, 0 0 0 6px ${p}` : "0 2px 4px rgba(0,0,0,0.1)",
                    cursor: "pointer", transition: "all 0.15s ease"
                  }}
                  aria-label={`Select color ${p}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
