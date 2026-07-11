import { MetadataRoute } from "next";

const TOOLS = [
  "image-converter",
  "image-resizer",
  "image-compressor",
  "image-to-base64",
  "svg-converter",
  "bulk-converter",
  "image-to-pdf",
  "pdf-to-image",
  "pdf-merger",
  "pdf-splitter",
  "docx-to-pdf",
  "pdf-to-docx",
  "word-counter",
  "markdown-to-html",
  "json-formatter",
  "base64",
  "csv-to-json",
  "qr-generator",
  "color-picker",
  "password-generator",
  "aspect-ratio",
  "zip-maker",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tools.trendingtopics.space";
  const now = new Date();

  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/terms-of-service`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/cookies`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/dmca`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const toolPages = TOOLS.map((tool) => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...toolPages];
}
