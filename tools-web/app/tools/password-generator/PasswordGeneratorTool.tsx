"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = "";
    if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (options.numbers) charset += "0123456789";
    if (options.symbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (charset === "") {
      setPassword("Please select at least one option");
      return;
    }

    let newPassword = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      newPassword += charset[array[i] % charset.length];
    }
    
    setPassword(newPassword);
    setCopied(false);
  };

  useEffect(() => {
    generatePassword();
  }, [length, options]);

  const toggleOption = (key: keyof typeof options) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const copyToClipboard = async () => {
    if (!password || password === "Please select at least one option") return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  // Calculate strength
  let strength = "Weak";
  let strengthColor = "#ef4444";
  const typesCount = Object.values(options).filter(Boolean).length;
  
  if (length >= 16 && typesCount >= 3) {
    strength = "Very Strong";
    strengthColor = "#8b5cf6";
  } else if (length >= 12 && typesCount >= 3) {
    strength = "Strong";
    strengthColor = "#10b981";
  } else if (length >= 8 && typesCount >= 2) {
    strength = "Fair";
    strengthColor = "#f59e0b";
  }

  return (
    <div className="tool-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span className="breadcrumb__sep">›</span>
          <Link href="/#tools">Tools</Link><span className="breadcrumb__sep">›</span>
          <span>Password Generator</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon">🔑</span>
          <h1 className="tool-page__title">Secure Password Generator</h1>
          <p className="tool-page__desc">Generate strong, secure passwords instantly in your browser. No data is sent to our servers.</p>
        </div>

        <div className="glass-card tool-panel" style={{ maxWidth: "700px", margin: "0 auto", padding: "32px" }}>
          
          {/* Password Display */}
          <div style={{ position: "relative", marginBottom: "24px" }}>
            <div style={{
              background: "rgba(255,255,255,0.7)",
              border: "2px solid var(--glass-border)",
              borderRadius: "12px",
              padding: "24px 80px 24px 24px",
              fontSize: "1.75rem",
              fontFamily: "monospace",
              wordBreak: "break-all",
              minHeight: "90px",
              display: "flex",
              alignItems: "center",
              color: password === "Please select at least one option" ? "var(--text-muted)" : "var(--text-primary)",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)"
            }}>
              {password}
            </div>
            <button 
              className="btn btn--primary"
              onClick={copyToClipboard}
              style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", padding: "12px" }}
              aria-label="Copy password"
            >
              {copied ? "✅" : "📋"}
            </button>
          </div>

          {/* Strength Indicator */}
          {password !== "Please select at least one option" && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", padding: "0 8px" }}>
              <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)", fontWeight: 600 }}>Password Strength:</span>
              <span style={{ 
                fontSize: "0.875rem", 
                fontWeight: 800, 
                color: strengthColor,
                background: `${strengthColor}20`,
                padding: "4px 12px",
                borderRadius: "999px",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}>
                {strength}
              </span>
            </div>
          )}

          {/* Controls */}
          <div style={{ background: "rgba(255,255,255,0.4)", borderRadius: "12px", padding: "24px" }}>
            <div className="form-group" style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <label className="form-label" style={{ margin: 0 }}>Password Length</label>
                <strong style={{ color: "var(--accent-violet)", fontSize: "1.125rem" }}>{length}</strong>
              </div>
              <input 
                type="range" 
                className="form-range" 
                min={8} 
                max={64} 
                value={length} 
                onChange={(e) => setLength(Number(e.target.value))} 
              />
            </div>

            <div className="tool-layout-grid" data-cols="2">
              <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", padding: "12px", background: "rgba(255,255,255,0.5)", borderRadius: "8px" }}>
                <input type="checkbox" checked={options.uppercase} onChange={() => toggleOption("uppercase")} style={{ width: "18px", height: "18px", cursor: "pointer" }} />
                <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>Uppercase (A-Z)</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", padding: "12px", background: "rgba(255,255,255,0.5)", borderRadius: "8px" }}>
                <input type="checkbox" checked={options.lowercase} onChange={() => toggleOption("lowercase")} style={{ width: "18px", height: "18px", cursor: "pointer" }} />
                <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>Lowercase (a-z)</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", padding: "12px", background: "rgba(255,255,255,0.5)", borderRadius: "8px" }}>
                <input type="checkbox" checked={options.numbers} onChange={() => toggleOption("numbers")} style={{ width: "18px", height: "18px", cursor: "pointer" }} />
                <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>Numbers (0-9)</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", padding: "12px", background: "rgba(255,255,255,0.5)", borderRadius: "8px" }}>
                <input type="checkbox" checked={options.symbols} onChange={() => toggleOption("symbols")} style={{ width: "18px", height: "18px", cursor: "pointer" }} />
                <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>Symbols (!@#$)</span>
              </label>
            </div>
          </div>

          <button 
            className="btn btn--primary w-full" 
            style={{ marginTop: "24px", padding: "16px", fontSize: "1.125rem" }}
            onClick={generatePassword}
          >
            🔄 Generate New Password
          </button>
        </div>
      </div>
    </div>
  );
}
