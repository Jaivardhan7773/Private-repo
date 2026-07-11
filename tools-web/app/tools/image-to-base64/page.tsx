import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebAppSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import ImageToBase64Tool from "./ImageToBase64Tool";

export const metadata: Metadata = {
  title: "Image to Base64 — Free Online Tool",
  description: "Convert image to base64 string instantly in your browser. 100% free.",
  alternates: { canonical: "https://tools.trendingtopics.space/tools/image-to-base64" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        buildWebAppSchema({ name: "Image to Base64", description: "Convert image to base64 string", url: "https://tools.trendingtopics.space/tools/image-to-base64" }),
        buildBreadcrumbSchema([{ name: "Home", url: "https://tools.trendingtopics.space" }, { name: "Image to Base64", url: "https://tools.trendingtopics.space/tools/image-to-base64" }]),
      ]} />
      <ImageToBase64Tool />
    </>
  );
}
