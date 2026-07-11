import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebAppSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import Base64Tool from "./Base64Tool";

export const metadata: Metadata = {
  title: "Base64 Encoder — Free Online Tool",
  description: "Encode or decode base64 data instantly in your browser. 100% free.",
  alternates: { canonical: "https://tools.trendingtopics.space/tools/base64" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        buildWebAppSchema({ name: "Base64 Encoder", description: "Encode or decode base64 data", url: "https://tools.trendingtopics.space/tools/base64" }),
        buildBreadcrumbSchema([{ name: "Home", url: "https://tools.trendingtopics.space" }, { name: "Base64 Encoder", url: "https://tools.trendingtopics.space/tools/base64" }]),
      ]} />
      <Base64Tool />
    </>
  );
}
