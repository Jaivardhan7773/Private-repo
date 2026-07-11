import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebAppSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import ImageCompressorTool from "./ImageCompressorTool";

export const metadata: Metadata = {
  title: "Image Compressor — Free Online Tool",
  description: "Compress images online instantly in your browser. 100% free.",
  alternates: { canonical: "https://tools.trendingtopics.space/tools/image-compressor" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        buildWebAppSchema({ name: "Image Compressor", description: "Compress images online", url: "https://tools.trendingtopics.space/tools/image-compressor" }),
        buildBreadcrumbSchema([{ name: "Home", url: "https://tools.trendingtopics.space" }, { name: "Image Compressor", url: "https://tools.trendingtopics.space/tools/image-compressor" }]),
      ]} />
      <ImageCompressorTool />
    </>
  );
}
