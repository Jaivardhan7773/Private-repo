"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { PDFDocument } from "pdf-lib";
import { Link2, GripVertical, Trash2, CheckCircle2, FileText } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Wrap file with a unique ID for dnd-kit
interface SortableFile {
  id: string;
  file: File;
}

// Sortable item component
function SortablePdfItem({ item, removeFile }: { item: SortableFile, removeFile: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} className="glass-card--light" style={{ ...style, padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "8px", background: "rgba(255,255,255,0.6)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", overflow: "hidden", flex: 1 }}>
        <button {...attributes} {...listeners} style={{ background: "transparent", border: "none", cursor: "grab", color: "var(--text-muted)", padding: "4px" }}>
          <GripVertical size={16} />
        </button>
        <FileText size={24} color="var(--accent-violet)" />
        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <span style={{ fontSize: "0.875rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 500 }}>{item.file.name}</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{(item.file.size / 1024 / 1024).toFixed(2)} MB</span>
        </div>
      </div>
      <button onClick={() => removeFile(item.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--accent-pink)", padding: "4px" }}>
        <Trash2 size={16} />
      </button>
    </div>
  );
}

export default function PdfMergerTool() {
  const [files, setFiles] = useState<SortableFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ url: string; size: number; name: string } | null>(null);
  const [error, setError] = useState("");
  const [outputName, setOutputName] = useState("merged-document");
  
  const inputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const validFiles = Array.from(newFiles).filter(f => f.type === "application/pdf");
    if (validFiles.length === 0) {
      setError("Please upload PDF files only.");
      return;
    }
    const sortableNewFiles = validFiles.map(f => ({ id: Math.random().toString(36).substr(2, 9), file: f }));
    setFiles(prev => [...prev, ...sortableNewFiles]);
    setResult(null);
    setError("");
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setFiles((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
      setError("Please select at least 2 PDF files to merge.");
      return;
    }
    setConverting(true);
    setProgress(0);
    setError("");
    setResult(null);

    try {
      const mergedPdf = await PDFDocument.create();
      
      let processed = 0;
      for (const item of files) {
        const arrayBuffer = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
        
        processed++;
        setProgress(Math.round((processed / files.length) * 100));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      let finalName = outputName.trim() || "merged-document";
      if (!finalName.endsWith(".pdf")) finalName += ".pdf";

      setResult({ url, size: blob.size, name: finalName });
    } catch (err) {
      console.error(err);
      setError("Failed to merge PDFs. One of the files might be encrypted or corrupted.");
    } finally {
      setConverting(false);
      setProgress(0);
    }
  };

  const download = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    
    let finalName = outputName.trim() || "merged-document";
    if (!finalName.endsWith(".pdf")) finalName += ".pdf";
    a.download = finalName;
    
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
          <Link href="/#pdf">PDF Tools</Link><span className="breadcrumb__sep">›</span>
          <span>PDF Merger</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon"><Link2 size={48} className="text-accent-violet" /></span>
          <h1 className="tool-page__title">Merge PDF Files</h1>
          <p className="tool-page__desc">Combine multiple PDF documents into a single file instantly. Free, and processed entirely in your browser.</p>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "12px", flexWrap: "wrap" }}>
            <span className="badge badge--free">🔒 No upload to server</span>
            <span className="badge badge--glass">⚡ Instant merge</span>
          </div>
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
              <input ref={inputRef} type="file" accept="application/pdf" multiple style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: 0 }} onChange={e => e.target.files && handleFiles(e.target.files)} />
              <span className="dropzone__icon"><FileText size={36} color="var(--text-muted)" /></span>
              <p className="dropzone__title">Drop PDFs here</p>
              <p className="dropzone__subtitle">or click to browse (Select multiple)</p>
            </div>

            {files.length > 0 && (
              <div style={{ marginTop: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <h3 style={{ fontSize: "0.9375rem", fontWeight: 600 }}>Drag to Reorder ({files.length})</h3>
                  <button onClick={() => setFiles([])} className="btn btn--glass btn--sm">Clear All</button>
                </div>
                
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={files.map(f => f.id)} strategy={verticalListSortingStrategy}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px", maxHeight: "300px", overflowY: "auto", paddingRight: "4px" }}>
                      {files.map((item) => (
                        <SortablePdfItem key={item.id} item={item} removeFile={removeFile} />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
                
                {converting ? (
                  <div style={{ padding: "16px", background: "rgba(124,58,237,0.05)", borderRadius: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.875rem", fontWeight: 600, color: "var(--accent-violet)" }}>
                      <span>Merging...</span>
                      <span>{progress}%</span>
                    </div>
                    <div style={{ height: "6px", background: "rgba(124,58,237,0.1)", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${progress}%`, background: "var(--accent-gradient)", transition: "width 0.2s" }} />
                    </div>
                  </div>
                ) : (
                  <button className="btn btn--primary w-full" onClick={mergePdfs} disabled={files.length < 2}>
                    Merge {files.length} PDFs →
                  </button>
                )}
                {files.length < 2 && <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", textAlign: "center", marginTop: "8px" }}>Select at least 2 files</p>}
              </div>
            )}
            {error && <div className="alert alert--error" style={{ marginTop: "12px" }}>❌ {error}</div>}
          </div>

          {/* Result panel */}
          {result && (
            <div className="glass-card tool-panel animate-scaleIn">
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <CheckCircle2 size={48} color="#10b981" style={{ margin: "0 auto 12px" }} />
                <h2 style={{ fontWeight: 700, fontSize: "1.25rem", color: "#10b981" }}>Merged Successfully!</h2>
              </div>
              
              <div className="glass-card--light" style={{ padding: "24px", textAlign: "center", borderRadius: "10px", marginBottom: "24px" }}>
                <Link2 size={48} color="var(--accent-violet)" style={{ margin: "0 auto 12px" }} />
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 600 }}>File Size</p>
                <strong style={{ fontSize: "1.5rem" }}>{(result.size / 1024 / 1024).toFixed(2)} MB</strong>
              </div>

              <div className="form-group" style={{ marginBottom: "24px" }}>
                <label className="form-label">Rename Output File</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={outputName} 
                  onChange={e => setOutputName(e.target.value)} 
                />
              </div>

              <button className="btn btn--primary w-full" onClick={download}>⬇️ Download PDF</button>
              <button className="btn btn--glass w-full" style={{ marginTop: "8px" }} onClick={() => { setResult(null); setFiles([]); }}>Merge more</button>
            </div>
          )}
        </div>
        
        {/* How to use */}
        <div className="glass-card" style={{ maxWidth: "900px", margin: "32px auto 0", padding: "32px" }}>
          <h2 style={{ fontWeight: 800, fontSize: "1.25rem", marginBottom: "16px" }}>How to merge PDF files</h2>
          <ol style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "10px", color: "var(--text-secondary)", fontSize: "0.9375rem" }}>
            <li>Click the upload area to select multiple PDF files, or drag and drop them.</li>
            <li>Drag the files using the grip icon to reorder them exactly how you want them merged.</li>
            <li>Review the list of selected files. You can remove any file by clicking the trash icon.</li>
            <li>Click &quot;Merge PDFs&quot; — the process is instant and happens entirely in your browser.</li>
            <li>Rename your new merged PDF if you want, then click download!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
