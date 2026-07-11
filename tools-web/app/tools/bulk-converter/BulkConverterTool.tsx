"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Layers, Image as ImageIcon, Trash2, CheckCircle2, Download, Settings } from "lucide-react";

export default function BulkConverterTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [format, setFormat] = useState("webp");
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{ url: string; name: string; size: number }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const validFiles = Array.from(newFiles).filter(f => f.type.startsWith("image/"));
    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      setResults([]);
    }
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const convertBatch = async () => {
    if (files.length === 0) return;
    setConverting(true);
    setProgress(0);
    setResults([]);

    const newResults: { url: string; name: string; size: number }[] = [];
    let processed = 0;

    for (const file of files) {
      try {
        const url = URL.createObjectURL(file);
        const img = new Image();
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = url;
        });

        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;

        if (format === "jpeg" || format === "jpg") {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);

        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob(resolve, `image/${format}`, 0.92);
        });

        if (blob) {
          const newUrl = URL.createObjectURL(blob);
          const oldExt = file.name.split(".").pop() || "";
          const newName = file.name.replace(`.${oldExt}`, `.${format}`);
          newResults.push({ url: newUrl, name: newName, size: blob.size });
        }
      } catch (e) {
        console.error("Failed to convert", file.name);
      }
      processed++;
      setProgress(Math.round((processed / files.length) * 100));
    }

    setResults(newResults);
    setConverting(false);
    setProgress(0);
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
      }, i * 300); // Stagger downloads slightly to prevent browser blocking
    });
  };

  return (
    <div className="tool-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span className="breadcrumb__sep">›</span>
          <Link href="/#image">Image Tools</Link><span className="breadcrumb__sep">›</span>
          <span>Bulk Image Converter</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon"><Layers size={48} className="text-accent-violet" /></span>
          <h1 className="tool-page__title">Bulk Image Converter</h1>
          <p className="tool-page__desc">Convert multiple images to a specific format at once. Processed entirely in your browser.</p>
        </div>

        <div className="tool-layout-grid" data-cols={files.length > 0 ? "2" : "1"}>
          
          {/* Upload panel */}
          <div className="glass-card tool-panel">
            <div
              className={`dropzone${dragging ? " dropzone--active" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              role="button" tabIndex={0}
            >
              <input ref={inputRef} type="file" accept="image/*" multiple style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: 0 }} onChange={e => e.target.files && handleFiles(e.target.files)} />
              <span className="dropzone__icon"><Layers size={36} color="var(--text-muted)" /></span>
              <p className="dropzone__title">Drop images here</p>
              <p className="dropzone__subtitle">or click to browse (Select multiple)</p>
            </div>

            {files.length > 0 && (
              <div style={{ marginTop: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <h3 style={{ fontSize: "0.9375rem", fontWeight: 600 }}>Queue ({files.length})</h3>
                  <button onClick={() => setFiles([])} className="btn btn--glass btn--sm">Clear All</button>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px", maxHeight: "250px", overflowY: "auto", paddingRight: "4px" }}>
                  {files.map((f, i) => (
                    <div key={i} className="glass-card--light" style={{ padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", overflow: "hidden", flex: 1 }}>
                        <ImageIcon size={20} color="var(--accent-violet)" />
                        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
                          <span style={{ fontSize: "0.875rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 500 }}>{f.name}</span>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{(f.size / 1024).toFixed(1)} KB</span>
                        </div>
                      </div>
                      <button onClick={() => removeFile(i)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--accent-pink)", padding: "4px" }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="form-group" style={{ marginBottom: "24px" }}>
                  <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}><Settings size={16} /> Target Format</label>
                  <select className="form-select" value={format} onChange={e => setFormat(e.target.value)}>
                    <option value="webp">WebP (Recommended)</option>
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                  </select>
                </div>
                
                {converting ? (
                  <div style={{ padding: "16px", background: "rgba(124,58,237,0.05)", borderRadius: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.875rem", fontWeight: 600, color: "var(--accent-violet)" }}>
                      <span>Converting Batch...</span>
                      <span>{progress}%</span>
                    </div>
                    <div style={{ height: "6px", background: "rgba(124,58,237,0.1)", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${progress}%`, background: "var(--accent-gradient)", transition: "width 0.2s" }} />
                    </div>
                  </div>
                ) : (
                  <button className="btn btn--primary w-full" onClick={convertBatch}>
                    Convert {files.length} {files.length === 1 ? "file" : "files"} to {format.toUpperCase()}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Result panel */}
          {results.length > 0 && (
            <div className="glass-card tool-panel animate-scaleIn" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ textAlign: "center", marginBottom: "16px" }}>
                <CheckCircle2 size={48} color="#10b981" style={{ margin: "0 auto 12px" }} />
                <h2 style={{ fontWeight: 700, fontSize: "1.25rem", color: "#10b981" }}>Converted Successfully!</h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem" }}>{results.length} files ready to download.</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1, overflowY: "auto", marginBottom: "24px", maxHeight: "250px", paddingRight: "4px" }}>
                {results.map((res, i) => (
                  <div key={i} className="glass-card--light" style={{ padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", overflow: "hidden", flex: 1 }}>
                      <img src={res.url} alt={res.name} style={{ width: "32px", height: "32px", objectFit: "cover", borderRadius: "4px" }} />
                      <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
                        <span style={{ fontSize: "0.875rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 500 }}>{res.name}</span>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{(res.size / 1024).toFixed(1)} KB</span>
                      </div>
                    </div>
                    <a href={res.url} download={res.name} className="btn btn--glass btn--sm" style={{ padding: "6px 10px" }} title="Download">
                      <Download size={16} />
                    </a>
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
