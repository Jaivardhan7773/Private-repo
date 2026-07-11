"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";

import { Image as ImageIcon, FileText, CheckCircle2, Download, Settings } from "lucide-react";

export default function PdfToImageTool() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [format, setFormat] = useState("png");
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{ url: string; name: string }[]>([]);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);


  const handleFile = useCallback((f: File) => {
    if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) {
      setError("Please upload a PDF file.");
      return;
    }
    setFile(f);
    setResults([]);
    setError("");
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const convertToImages = async () => {
    if (!file) return;
    setConverting(true);
    setProgress(0);
    setError("");
    setResults([]);

    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      const newResults = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // 2x scale for better quality
        
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        // Fill white background for jpg/webp
        if (format === "jpeg" || format === "jpg") {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        await page.render({ canvasContext: ctx, viewport } as any).promise;
        
        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob(resolve, `image/${format}`, 0.95);
        });

        if (blob) {
          const url = URL.createObjectURL(blob);
          const name = `${file.name.replace(".pdf", "")}-page-${i}.${format}`;
          newResults.push({ url, name });
        }
        
        setProgress(Math.round((i / numPages) * 100));
      }

      setResults(newResults);
    } catch (err: any) {
      console.error(err);
      setError("Failed to extract images from PDF.");
    } finally {
      setConverting(false);
      setProgress(0);
    }
  };

  const downloadAll = () => {
    results.forEach((res, i) => {
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = res.url;
        a.download = res.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, i * 300);
    });
  };

  return (
    <div className="tool-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span className="breadcrumb__sep">›</span>
          <Link href="/#pdf">PDF Tools</Link><span className="breadcrumb__sep">›</span>
          <span>PDF to Image</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon"><ImageIcon size={48} className="text-accent-violet" /></span>
          <h1 className="tool-page__title">PDF to Image</h1>
          <p className="tool-page__desc">Extract pages from a PDF document and save them as high-quality images.</p>
        </div>

        <div className="tool-layout-grid" data-cols={file ? "2" : "1"}>
          
          {/* Upload panel */}
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
              <input ref={inputRef} type="file" accept=".pdf,application/pdf" style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: 0 }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
              
              {file ? (
                <div>
                  <FileText size={48} color="var(--accent-violet)" style={{ margin: "0 auto 12px" }} />
                  <p style={{ fontSize: "1rem", color: "var(--text-primary)", fontWeight: 700 }}>{file.name}</p>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: "4px" }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <>
                  <span className="dropzone__icon"><FileText size={36} color="var(--text-muted)" /></span>
                  <p className="dropzone__title">Drop PDF here</p>
                  <p className="dropzone__subtitle">or click to browse</p>
                </>
              )}
            </div>

            {file && (
              <div style={{ marginTop: "24px" }}>
                <div className="form-group" style={{ marginBottom: "24px" }}>
                  <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}><Settings size={16} /> Image Format</label>
                  <select className="form-select" value={format} onChange={e => setFormat(e.target.value)}>
                    <option value="png">PNG (Best Quality)</option>
                    <option value="jpeg">JPEG (Smaller Size)</option>
                    <option value="webp">WebP (Modern)</option>
                  </select>
                </div>

                {converting ? (
                  <div style={{ padding: "16px", background: "rgba(124,58,237,0.05)", borderRadius: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.875rem", fontWeight: 600, color: "var(--accent-violet)" }}>
                      <span>Extracting Pages...</span>
                      <span>{progress}%</span>
                    </div>
                    <div style={{ height: "6px", background: "rgba(124,58,237,0.1)", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${progress}%`, background: "var(--accent-gradient)", transition: "width 0.2s" }} />
                    </div>
                  </div>
                ) : (
                  <button className="btn btn--primary w-full" onClick={convertToImages}>
                    Extract to {format.toUpperCase()} →
                  </button>
                )}
              </div>
            )}
            
            {error && <div className="alert alert--error" style={{ marginTop: "12px" }}>❌ {error}</div>}
          </div>

          {/* Result panel */}
          {results.length > 0 && (
            <div className="glass-card tool-panel animate-scaleIn" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ textAlign: "center", marginBottom: "16px" }}>
                <CheckCircle2 size={48} color="#10b981" style={{ margin: "0 auto 12px" }} />
                <h2 style={{ fontWeight: 700, fontSize: "1.25rem", color: "#10b981" }}>Extracted {results.length} Pages!</h2>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", overflowY: "auto", maxHeight: "300px", marginBottom: "24px", paddingRight: "4px" }}>
                {results.map((res, i) => (
                  <div key={i} className="glass-card--light" style={{ padding: "8px", borderRadius: "8px", textAlign: "center", display: "flex", flexDirection: "column" }}>
                    <img src={res.url} alt={`Page ${i+1}`} style={{ width: "100%", height: "100px", objectFit: "contain", background: "#fff", borderRadius: "4px", marginBottom: "8px" }} />
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "8px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Page {i + 1}</span>
                    <a href={res.url} download={res.name} className="btn btn--glass btn--sm" style={{ marginTop: "auto" }}>Download</a>
                  </div>
                ))}
              </div>

              <button className="btn btn--primary w-full" onClick={downloadAll} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <Download size={18} /> Download All (.zip coming soon)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
