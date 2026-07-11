import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebAppSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import DocxToPdfTool from "./DocxToPdfTool";

export const metadata: Metadata = {
  title: "DOCX to PDF — Free Online Tool",
  description: "Convert Word DOCX to PDF instantly in your browser. 100% free.",
  alternates: { canonical: "https://tools.trendingtopics.space/tools/docx-to-pdf" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        buildWebAppSchema({ name: "DOCX to PDF", description: "Convert Word DOCX to PDF", url: "https://tools.trendingtopics.space/tools/docx-to-pdf" }),
        buildBreadcrumbSchema([{ name: "Home", url: "https://tools.trendingtopics.space" }, { name: "DOCX to PDF", url: "https://tools.trendingtopics.space/tools/docx-to-pdf" }]),
      ]} />
      <DocxToPdfTool />
    </>
  );
}
