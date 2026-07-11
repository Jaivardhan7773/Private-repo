"use client";

import { useState } from "react";
import Link from "next/link";

export default function CsvToJsonTool() {
  const [csv, setCsv] = useState("");
  const [json, setJson] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [hasHeader, setHasHeader] = useState(true);
  const [error, setError] = useState("");

  const convert = () => {
    if (!csv.trim()) {
      setJson("");
      setError("Please enter some CSV data");
      return;
    }

    try {
      const lines = csv.trim().split("\n");
      const result = [];
      
      let headers: string[] = [];
      let startIndex = 0;

      if (hasHeader) {
        headers = lines[0].split(delimiter).map(h => h.trim());
        startIndex = 1;
      } else {
        const colCount = lines[0].split(delimiter).length;
        headers = Array.from({ length: colCount }, (_, i) => `Column${i + 1}`);
      }

      for (let i = startIndex; i < lines.length; i++) {
        const currentLine = lines[i].split(delimiter);
        
        // Skip empty lines
        if (currentLine.length === 1 && currentLine[0] === "") continue;

        const obj: any = {};
        for (let j = 0; j < headers.length; j++) {
          let val = currentLine[j] ? currentLine[j].trim() : "";
          // Remove surrounding quotes if present
          if (val.startsWith('"') && val.endsWith('"')) {
            val = val.slice(1, -1);
          }
          // Convert to number if possible
          if (!isNaN(Number(val)) && val !== "") {
            obj[headers[j]] = Number(val);
          } else {
            obj[headers[j]] = val;
          }
        }
        result.push(obj);
      }

      setJson(JSON.stringify(result, null, 2));
      setError("");
    } catch (err: any) {
      setError("Failed to parse CSV. Please check your data format.");
      setJson("");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCsv(event.target?.result as string);
        setError("");
      };
      reader.readAsText(file);
    }
  };

  const copyToClipboard = async () => {
    if (!json) return;
    try {
      await navigator.clipboard.writeText(json);
    } catch (err) {
      console.error("Failed to copy");
    }
  };

  const downloadJson = () => {
    if (!json) return;
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="tool-page">
      <div className="container" style={{ maxWidth: "1200px" }}>
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span className="breadcrumb__sep">›</span>
          <Link href="/#tools">Tools</Link><span className="breadcrumb__sep">›</span>
          <span>CSV to JSON</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon">📊</span>
          <h1 className="tool-page__title">CSV to JSON Converter</h1>
          <p className="tool-page__desc">Convert CSV data to structured JSON format instantly in your browser.</p>
        </div>

        {/* Options */}
        <div className="glass-card" style={{ padding: "16px 24px", marginBottom: "20px", display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <label style={{ fontWeight: 600, color: "var(--text-secondary)" }}>Delimiter</label>
            <select className="form-select" value={delimiter} onChange={e => setDelimiter(e.target.value)} style={{ minWidth: "120px" }}>
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="\t">Tab</option>
              <option value="|">Pipe (|)</option>
            </select>
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 600, color: "var(--text-secondary)", cursor: "pointer" }}>
            <input type="checkbox" checked={hasHeader} onChange={e => setHasHeader(e.target.checked)} style={{ width: "16px", height: "16px" }} />
            First row is header
          </label>
          <div style={{ flex: 1 }} />
          <button className="btn btn--primary" onClick={convert}>Convert →</button>
        </div>

        <div className="tool-layout-grid" data-cols="2">
          
          {/* Input */}
          <div className="glass-card tool-panel" style={{ display: "flex", flexDirection: "column", padding: 0 }}>
            <div style={{ padding: "12px 24px", borderBottom: "1px solid var(--glass-border)", background: "rgba(255,255,255,0.4)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>CSV Input</span>
              <div>
                <input type="file" id="csv-upload" accept=".csv" style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: 0 }} onChange={handleFileUpload} />
                <label htmlFor="csv-upload" className="btn btn--glass btn--sm" style={{ cursor: "pointer", marginRight: "8px" }}>📁 Upload File</label>
                <button className="btn btn--glass btn--sm" onClick={() => { setCsv(""); setJson(""); setError(""); }}>🗑️ Clear</button>
              </div>
            </div>
            <textarea 
              value={csv}
              onChange={e => { setCsv(e.target.value); setError(""); }}
              placeholder="id,name,age\n1,John Doe,30\n2,Jane Smith,25"
              style={{
                flex: 1,
                padding: "24px",
                border: "none",
                background: "transparent",
                resize: "none",
                fontFamily: "monospace",
                fontSize: "0.9375rem",
                color: "var(--text-primary)",
                outline: "none",
                whiteSpace: "pre"
              }}
            />
          </div>

          {/* Output */}
          <div className="glass-card tool-panel" style={{ display: "flex", flexDirection: "column", padding: 0 }}>
            <div style={{ padding: "12px 24px", borderBottom: "1px solid var(--glass-border)", background: "rgba(255,255,255,0.4)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>JSON Output</span>
              <div>
                <button className="btn btn--glass btn--sm" onClick={copyToClipboard} disabled={!json} style={{ marginRight: "8px" }}>📋 Copy</button>
                <button className="btn btn--glass btn--sm" onClick={downloadJson} disabled={!json}>⬇️ Download</button>
              </div>
            </div>
            
            {error ? (
              <div style={{ padding: "24px", color: "#ef4444", fontFamily: "monospace", fontSize: "0.9375rem", background: "rgba(239, 68, 68, 0.05)", flex: 1 }}>
                <strong>Error:</strong><br/>{error}
              </div>
            ) : (
              <textarea 
                value={json}
                readOnly
                placeholder="JSON output will appear here..."
                style={{
                  flex: 1,
                  padding: "24px",
                  border: "none",
                  background: "transparent",
                  resize: "none",
                  fontFamily: "monospace",
                  fontSize: "0.9375rem",
                  color: "var(--text-primary)",
                  outline: "none"
                }}
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
