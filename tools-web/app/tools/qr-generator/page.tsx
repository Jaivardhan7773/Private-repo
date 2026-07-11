import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebAppSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import QrGeneratorTool from "./QrGeneratorTool";

export const metadata: Metadata = {
  title: "QR Code Generator — Free Online Tool",
  description: "Generate QR codes instantly instantly in your browser. 100% free.",
  alternates: { canonical: "https://tools.trendingtopics.space/tools/qr-generator" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        buildWebAppSchema({ name: "QR Code Generator", description: "Generate QR codes instantly", url: "https://tools.trendingtopics.space/tools/qr-generator" }),
        buildBreadcrumbSchema([{ name: "Home", url: "https://tools.trendingtopics.space" }, { name: "QR Code Generator", url: "https://tools.trendingtopics.space/tools/qr-generator" }]),
      ]} />
      <QrGeneratorTool />
    </>
  );
}
