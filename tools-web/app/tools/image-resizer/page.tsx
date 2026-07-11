import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebAppSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import ImageResizerTool from "./ImageResizerTool";

export const metadata: Metadata = {
  title: "Image Resizer — Free Online Tool",
  description: "Resize images online instantly in your browser. 100% free.",
  alternates: { canonical: "https://tools.trendingtopics.space/tools/image-resizer" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        buildWebAppSchema({ name: "Image Resizer", description: "Resize images online", url: "https://tools.trendingtopics.space/tools/image-resizer" }),
        buildBreadcrumbSchema([{ name: "Home", url: "https://tools.trendingtopics.space" }, { name: "Image Resizer", url: "https://tools.trendingtopics.space/tools/image-resizer" }]),
      ]} />
      <ImageResizerTool />
    </>
  );
}
