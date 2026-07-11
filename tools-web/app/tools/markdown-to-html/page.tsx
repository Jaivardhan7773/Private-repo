import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebAppSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import MarkdownToHtmlTool from "./MarkdownToHtmlTool";

export const metadata: Metadata = {
  title: "Markdown to HTML — Free Online Tool",
  description: "Convert Markdown to HTML instantly in your browser. 100% free.",
  alternates: { canonical: "https://tools.trendingtopics.space/tools/markdown-to-html" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        buildWebAppSchema({ name: "Markdown to HTML", description: "Convert Markdown to HTML", url: "https://tools.trendingtopics.space/tools/markdown-to-html" }),
        buildBreadcrumbSchema([{ name: "Home", url: "https://tools.trendingtopics.space" }, { name: "Markdown to HTML", url: "https://tools.trendingtopics.space/tools/markdown-to-html" }]),
      ]} />
      <MarkdownToHtmlTool />
    </>
  );
}
