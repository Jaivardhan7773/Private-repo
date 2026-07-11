import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebAppSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import ImageToPdfTool from "./ImageToPdfTool";

export const metadata: Metadata = {
  title: "Image to PDF — Free Online Tool",
  description: "Convert images to PDF document instantly in your browser. 100% free.",
  alternates: { canonical: "https://tools.trendingtopics.space/tools/image-to-pdf" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        buildWebAppSchema({ name: "Image to PDF", description: "Convert images to PDF document", url: "https://tools.trendingtopics.space/tools/image-to-pdf" }),
        buildBreadcrumbSchema([{ name: "Home", url: "https://tools.trendingtopics.space" }, { name: "Image to PDF", url: "https://tools.trendingtopics.space/tools/image-to-pdf" }]),
      ]} />
      <ImageToPdfTool />
    </>
  );
}
