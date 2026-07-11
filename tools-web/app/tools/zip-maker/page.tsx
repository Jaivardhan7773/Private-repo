import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebAppSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import ZipMakerTool from "./ZipMakerTool";

export const metadata: Metadata = {
  title: "Zip Archive Maker — Free Online Tool",
  description: "Create ZIP archives instantly in your browser. Add multiple files and compress them into a ZIP entirely on your device. 100% free.",
  alternates: { canonical: "https://tools.trendingtopics.space/tools/zip-maker" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        buildWebAppSchema({ name: "Zip Maker", description: "Create ZIP archives", url: "https://tools.trendingtopics.space/tools/zip-maker" }),
        buildBreadcrumbSchema([{ name: "Home", url: "https://tools.trendingtopics.space" }, { name: "Zip Maker", url: "https://tools.trendingtopics.space/tools/zip-maker" }]),
      ]} />
      <ZipMakerTool />
    </>
  );
}
