"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { PDFDocument } from "pdf-lib";
import { FileUp, GripVertical, Trash2, CheckCircle2 } from "lucide-react";
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
function SortableImageItem({ item, removeFile }: { item: SortableFile, removeFile: (id: string) => void }) {
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
        <img src={URL.createObjectURL(item.file)} alt="Preview" style={{ width: "32px", height: "32px", objectFit: "cover", borderRadius: "4px" }} />
        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <span style={{ fontSize: "0.875rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 500 }}>{item.file.name}</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{(item.file.size / 1024).toFixed(1)} KB</span>
        </div>
      </div>
      <button onClick={() => removeFile(item.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--accent-pink)", padding: "4px" }}>
        <Trash2 size={16} />
      </button>
    </div>
  );
}

export default function ImageToPdfTool() {
  const [files, setFiles] = useState<SortableFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ url: string; size: number; name: string } | null>(null);
  const [error, setError] = useState("");
  const [outputName, setOutputName] = useState("images-converted");
  
  const inputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const validFiles = Array.from(newFiles).filter(f => f.type.startsWith("image/"));
    if (validFiles.length === 0) {
      setError("Please upload image files only.");
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

  const convertToPdf = async () => {
    if (files.length === 0) return;
    setConverting(true);
    setProgress(0);
    setError("");
    setResult(null);

    try {
      const pdfDoc = await PDFDocument.create();
      
      let processed = 0;
      for (const item of files) {
        const file = item.file;
        const arrayBuffer = await file.arrayBuffer();
        
        let image;
        if (file.type === "image/jpeg" || file.type === "image/jpg") {
          image = await pdfDoc.embedJpg(arrayBuffer);
        } else if (file.type === "image/png") {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else {
          const url = URL.createObjectURL(file);
          const img = new Image();
          await new Promise((resolve, reject) => {
            img.onload = resolve; img.onerror = reject; img.src = url;
          });
          const canvas = document.createElement("canvas");
          canvas.width = img.width; canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);
          
          const pngBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
            canvas.toBlob((blob) => {
              if (blob) blob.arrayBuffer().then(resolve).catch(reject);
              else reject(new Error("Canvas conversion failed"));
            }, "image/png");
          });
          image = await pdfDoc.embedPng(pngBuffer);
          URL.revokeObjectURL(url);
        }

        const { width, height } = image.scale(1);
        const page = pdfDoc.addPage([width, height]);
        page.drawImage(image, { x: 0, y: 0, width, height });
        
        processed++;
        setProgress(Math.round((processed / files.length) * 100));
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      let finalName = outputName.trim() || "images-converted";
      if (!finalName.endsWith(".pdf")) finalName += ".pdf";

      setResult({ url, size: blob.size, name: finalName });
    } catch (err) {
      console.error(err);
      setError("Failed to convert images to PDF. Make sure all files are valid images.");
    } finally {
      setConverting(false);
      setProgress(0);
    }
  };

  const download = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    
    let finalName = outputName.trim() || "images-converted";
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
          <span>Image to PDF</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon"><FileUp size={48} className="text-accent-violet" /></span>
          <h1 className="tool-page__title">Image to PDF</h1>
          <p className="tool-page__desc">Combine multiple images into a single PDF document in your browser.</p>
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
              <span className="dropzone__icon"><FileUp size={36} color="var(--text-muted)" /></span>
              <p className="dropzone__title">Drop images here</p>
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
                        <SortableImageItem key={item.id} item={item} removeFile={removeFile} />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
                
                {converting ? (
                  <div style={{ padding: "16px", background: "rgba(124,58,237,0.05)", borderRadius: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.875rem", fontWeight: 600, color: "var(--accent-violet)" }}>
                      <span>Converting...</span>
                      <span>{progress}%</span>
                    </div>
                    <div style={{ height: "6px", background: "rgba(124,58,237,0.1)", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${progress}%`, background: "var(--accent-gradient)", transition: "width 0.2s" }} />
                    </div>
                  </div>
                ) : (
                  <button className="btn btn--primary w-full" onClick={convertToPdf} disabled={files.length === 0}>
                    Convert {files.length} {files.length === 1 ? "Image" : "Images"} to PDF →
                  </button>
                )}
              </div>
            )}
            {error && <div className="alert alert--error" style={{ marginTop: "12px" }}>❌ {error}</div>}
          </div>

          {/* Result panel */}
          {result && (
            <div className="glass-card tool-panel animate-scaleIn">
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <CheckCircle2 size={48} color="#10b981" style={{ margin: "0 auto 12px" }} />
                <h2 style={{ fontWeight: 700, fontSize: "1.25rem", color: "#10b981" }}>Converted Successfully!</h2>
              </div>
              
              <div className="glass-card--light" style={{ padding: "24px", textAlign: "center", borderRadius: "10px", marginBottom: "24px" }}>
                <FileUp size={48} color="var(--accent-violet)" style={{ margin: "0 auto 12px" }} />
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
              <button className="btn btn--glass w-full" style={{ marginTop: "8px" }} onClick={() => { setResult(null); }}>Convert more</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
