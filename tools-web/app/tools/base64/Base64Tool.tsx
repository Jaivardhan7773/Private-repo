"use client";

import { useState } from "react";
import Link from "next/link";

export default function Base64Tool() {
  const [mode, setMode] = useState<"text" | "file">("text");
  
  // Text state
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  
  // File state
  const [file, setFile] = useState<File | null>(null);
  const [fileOutput, setFileOutput] = useState("");

  const handleEncodeText = () => {
    try {
      setTextOutput(btoa(unescape(encodeURIComponent(textInput))));
    } catch (e) {
      setTextOutput("Error encoding text");
    }
  };

  const handleDecodeText = () => {
    try {
      setTextOutput(decodeURIComponent(escape(atob(textInput))));
    } catch (e) {
      setTextOutput("Error decoding text (invalid base64)");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setFileOutput("");
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        // result is a data URL like data:image/png;base64,iVBORw0KGgo...
        // We can just keep the whole string or split it. We'll show the whole Data URL.
        setFileOutput(result);
      };
      reader.readAsDataURL(f);
    }
  };

  const copyText = async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy");
    }
  };

  return (
    <div className="tool-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span className="breadcrumb__sep">›</span>
          <Link href="/#tools">Tools</Link><span className="breadcrumb__sep">›</span>
          <span>Base64 Encoder/Decoder</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon">🔐</span>
          <h1 className="tool-page__title">Base64 Encoder & Decoder</h1>
          <p className="tool-page__desc">Encode text or files to Base64 format, or decode Base64 back to text.</p>
        </div>

        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          
          <div style={{ display: "flex", gap: "12px", marginBottom: "24px", justifyContent: "center" }}>
            <button 
              className={`btn ${mode === "text" ? "btn--primary" : "btn--glass"}`} 
              onClick={() => setMode("text")}
            >📝 Text to Base64</button>
            <button 
              className={`btn ${mode === "file" ? "btn--primary" : "btn--glass"}`} 
              onClick={() => setMode("file")}
            >📄 File to Base64</button>
          </div>

          {mode === "text" ? (
            <div className="tool-layout-grid" data-cols="2">
              <div className="glass-card tool-panel" style={{ padding: 0, display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "12px 24px", borderBottom: "1px solid var(--glass-border)", background: "rgba(255,255,255,0.4)" }}>
                  <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>Input</span>
                </div>
                <textarea
                  value={textInput}
                  onChange={e => setTextInput(e.target.value)}
                  placeholder="Enter text or Base64 here..."
                  style={{ flex: 1, minHeight: "300px", padding: "20px", border: "none", background: "transparent", resize: "vertical", fontFamily: "monospace", fontSize: "0.9375rem", outline: "none" }}
                />
                <div style={{ padding: "16px", display: "flex", gap: "12px", background: "rgba(255,255,255,0.4)", borderTop: "1px solid var(--glass-border)" }}>
                  <button className="btn btn--primary" style={{ flex: 1 }} onClick={handleEncodeText}>Encode to Base64</button>
                  <button className="btn btn--glass" style={{ flex: 1 }} onClick={handleDecodeText}>Decode from Base64</button>
                </div>
              </div>
              
              <div className="glass-card tool-panel" style={{ padding: 0, display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "12px 24px", borderBottom: "1px solid var(--glass-border)", background: "rgba(255,255,255,0.4)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>Output</span>
                  <button className="btn btn--glass btn--sm" onClick={() => copyText(textOutput)}>📋 Copy</button>
                </div>
                <textarea
                  value={textOutput}
                  readOnly
                  placeholder="Result will appear here..."
                  style={{ flex: 1, minHeight: "300px", padding: "20px", border: "none", background: "transparent", resize: "vertical", fontFamily: "monospace", fontSize: "0.9375rem", outline: "none" }}
                />
              </div>
            </div>
          ) : (
            <div className="glass-card tool-panel" style={{ textAlign: "center", padding: "48px 32px" }}>
              <div style={{ marginBottom: "32px" }}>
                <input type="file" id="file-upload" style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: 0 }} onChange={handleFileChange} />
                <label htmlFor="file-upload" className="btn btn--primary">Browse File...</label>
                {file && <p style={{ marginTop: "12px", color: "var(--text-secondary)", fontWeight: 600 }}>{file.name}</p>}
              </div>
              
              {fileOutput && (
                <div style={{ textAlign: "left" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontWeight: 600 }}>Base64 Data URL:</span>
                    <button className="btn btn--glass btn--sm" onClick={() => copyText(fileOutput)}>📋 Copy Data</button>
                  </div>
                  <textarea
                    readOnly
                    value={fileOutput}
                    style={{ width: "100%", height: "200px", padding: "16px", borderRadius: "8px", border: "1px solid var(--glass-border)", background: "rgba(255,255,255,0.5)", fontFamily: "monospace", fontSize: "0.8125rem", resize: "vertical" }}
                  />
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
