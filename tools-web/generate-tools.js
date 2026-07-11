const fs = require('fs');
const path = require('path');

const TOOLS = [
  { id: "image-resizer", title: "Image Resizer", desc: "Resize images online", comp: "ImageResizerTool" },
  { id: "image-compressor", title: "Image Compressor", desc: "Compress images online", comp: "ImageCompressorTool" },
  { id: "bg-remover", title: "Background Remover", desc: "Remove image background online", comp: "BgRemoverTool" },
  { id: "image-to-base64", title: "Image to Base64", desc: "Convert image to base64 string", comp: "ImageToBase64Tool" },
  { id: "svg-converter", title: "SVG Converter", desc: "Convert SVG to PNG or JPG", comp: "SvgConverterTool" },
  { id: "bulk-converter", title: "Bulk Converter", desc: "Batch convert images", comp: "BulkConverterTool" },
  { id: "image-to-pdf", title: "Image to PDF", desc: "Convert images to PDF document", comp: "ImageToPdfTool" },
  { id: "pdf-to-image", title: "PDF to Image", desc: "Extract PDF pages to images", comp: "PdfToImageTool" },
  { id: "pdf-compressor", title: "PDF Compressor", desc: "Compress PDF files", comp: "PdfCompressorTool" },
  { id: "pdf-splitter", title: "PDF Splitter", desc: "Split PDF pages", comp: "PdfSplitterTool" },
  { id: "docx-to-pdf", title: "DOCX to PDF", desc: "Convert Word DOCX to PDF", comp: "DocxToPdfTool" },
  { id: "pdf-to-docx", title: "PDF to DOCX", desc: "Convert PDF to Word DOCX", comp: "PdfToDocxTool" },
  { id: "word-counter", title: "Word Counter", desc: "Count words and characters", comp: "WordCounterTool" },
  { id: "markdown-to-html", title: "Markdown to HTML", desc: "Convert Markdown to HTML", comp: "MarkdownToHtmlTool" },
  { id: "json-formatter", title: "JSON Formatter", desc: "Format and validate JSON", comp: "JsonFormatterTool" },
  { id: "base64", title: "Base64 Encoder", desc: "Encode or decode base64 data", comp: "Base64Tool" },
  { id: "csv-to-json", title: "CSV to JSON", desc: "Convert CSV file to JSON", comp: "CsvToJsonTool" },
  { id: "qr-generator", title: "QR Code Generator", desc: "Generate QR codes instantly", comp: "QrGeneratorTool" },
  { id: "color-picker", title: "Color Picker", desc: "Pick and convert colors", comp: "ColorPickerTool" },
  { id: "password-generator", title: "Password Generator", desc: "Generate strong passwords", comp: "PasswordGeneratorTool" },
  { id: "aspect-ratio", title: "Aspect Ratio Calc", desc: "Calculate aspect ratios", comp: "AspectRatioTool" },
];

const basePath = path.join(__dirname, 'app', 'tools');

if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath, { recursive: true });
}

TOOLS.forEach(tool => {
  const dirPath = path.join(basePath, tool.id);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  const pageTsxPath = path.join(dirPath, 'page.tsx');
  const compTsxPath = path.join(dirPath, `${tool.comp}.tsx`);

  if (!fs.existsSync(pageTsxPath)) {
    const pageTsxContent = `import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebAppSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import ${tool.comp} from "./${tool.comp}";

export const metadata: Metadata = {
  title: "${tool.title} — Free Online Tool",
  description: "${tool.desc} instantly in your browser. 100% free.",
  alternates: { canonical: "https://tools.trendingtopics.space/tools/${tool.id}" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        buildWebAppSchema({ name: "${tool.title}", description: "${tool.desc}", url: "https://tools.trendingtopics.space/tools/${tool.id}" }),
        buildBreadcrumbSchema([{ name: "Home", url: "https://tools.trendingtopics.space" }, { name: "${tool.title}", url: "https://tools.trendingtopics.space/tools/${tool.id}" }]),
      ]} />
      <${tool.comp} />
    </>
  );
}
`;
    fs.writeFileSync(pageTsxPath, pageTsxContent);
  }

  if (!fs.existsSync(compTsxPath)) {
    const compTsxContent = `"use client";

import Link from "next/link";

export default function ${tool.comp}() {
  return (
    <div className="tool-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span className="breadcrumb__sep">›</span>
          <Link href="/#tools">Tools</Link><span className="breadcrumb__sep">›</span>
          <span>${tool.title}</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <h1 className="tool-page__title">${tool.title}</h1>
          <p className="tool-page__desc">${tool.desc}</p>
        </div>

        <div className="glass-card" style={{ padding: "64px 32px", textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
          <h2>🚧 Coming Soon</h2>
          <p style={{ color: "var(--text-secondary)", marginTop: "12px" }}>This tool is currently under development. Please check back later.</p>
          <Link href="/" className="btn btn--primary" style={{ marginTop: "24px" }}>← Back to Tools</Link>
        </div>
      </div>
    </div>
  );
}
`;
    fs.writeFileSync(compTsxPath, compTsxContent);
  }
});

console.log("Tool pages generated successfully.");
