"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { Archive, File, Trash2, CheckCircle2, Download, Settings } from "lucide-react";
import JSZip from "jszip";

export default function ZipMakerTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ url: string; name: string; size: number } | null>(null);
  const [error, setError] = useState("");
  const [outputName, setOutputName] = useState("archive");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const validFiles = Array.from(newFiles);
    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      setResult(null);
      setError("");
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

  const createZip = async () => {
    if (files.length === 0) return;
    setConverting(true);
    setProgress(0);
    setError("");
    setResult(null);

    try {
      const zip = new JSZip();

      files.forEach((file) => {
        zip.file(file.name, file);
      });

      const zipBlob = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 6 },
      }, (metadata) => {
        setProgress(Math.round(metadata.percent));
      });

      const url = URL.createObjectURL(zipBlob);
      let finalName = outputName.trim() || "archive";
      if (!finalName.endsWith(".zip")) finalName += ".zip";

      setResult({ url, name: finalName, size: zipBlob.size });
    } catch (err: any) {
      console.error(err);
      setError("Failed to create ZIP archive.");
    } finally {
      setConverting(false);
      setProgress(0);
    }
  };

  const download = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = result.name;
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
          <span>Zip Maker</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon"><Archive size={48} className="text-accent-violet" /></span>
          <h1 className="tool-page__title">Zip Archive Maker</h1>
          <p className="tool-page__desc">Compress multiple files of any type into a single ZIP archive directly in your browser.</p>
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
              <input ref={inputRef} type="file" multiple style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: 0 }} onChange={e => e.target.files && handleFiles(e.target.files)} />
              <span className="dropzone__icon"><Archive size={36} color="var(--text-muted)" /></span>
              <p className="dropzone__title">Drop files here</p>
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
                        <File size={20} color="var(--text-muted)" />
                        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
                          <span style={{ fontSize: "0.875rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 500 }}>{f.name}</span>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{(f.size / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                      </div>
                      <button onClick={() => removeFile(i)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--accent-pink)", padding: "4px" }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="form-group" style={{ marginBottom: "24px" }}>
                  <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}><Settings size={16} /> Output Archive Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={outputName} 
                    onChange={e => setOutputName(e.target.value)} 
                  />
                </div>
                
                {converting ? (
                  <div style={{ padding: "16px", background: "rgba(124,58,237,0.05)", borderRadius: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.875rem", fontWeight: 600, color: "var(--accent-violet)" }}>
                      <span>Compressing into ZIP...</span>
                      <span>{progress}%</span>
                    </div>
                    <div style={{ height: "6px", background: "rgba(124,58,237,0.1)", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${progress}%`, background: "var(--accent-gradient)", transition: "width 0.2s" }} />
                    </div>
                  </div>
                ) : (
                  <button className="btn btn--primary w-full" onClick={createZip}>
                    Create ZIP Archive →
                  </button>
                )}
              </div>
            )}
            {error && <div className="alert alert--error" style={{ marginTop: "12px" }}>❌ {error}</div>}
          </div>

          {/* Result panel */}
          {result && (
            <div className="glass-card tool-panel animate-scaleIn" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ textAlign: "center", marginBottom: "16px" }}>
                <CheckCircle2 size={48} color="#10b981" style={{ margin: "0 auto 12px" }} />
                <h2 style={{ fontWeight: 700, fontSize: "1.25rem", color: "#10b981" }}>ZIP Created Successfully!</h2>
              </div>
              
              <div className="glass-card--light" style={{ padding: "24px", textAlign: "center", borderRadius: "10px", marginBottom: "24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Archive size={48} color="var(--accent-violet)" style={{ margin: "0 auto 12px" }} />
                <strong style={{ fontSize: "1.25rem", marginBottom: "4px" }}>{result.name}</strong>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 600 }}>{(result.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>

              <button className="btn btn--primary w-full" onClick={download} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <Download size={18} /> Download ZIP
              </button>
              <button className="btn btn--glass w-full" style={{ marginTop: "12px" }} onClick={() => { setResult(null); setFiles([]); }}>Create another</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
