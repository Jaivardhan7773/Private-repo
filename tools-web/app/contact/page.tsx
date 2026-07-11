import type { Metadata } from "next";
import ContactForm from "./ContactForm";

import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Have a question, suggestion, or found a bug? Get in touch with the TrendingTopics Tools team. We respond within 24–48 hours.",
  openGraph: {
    title: "Contact Us | TrendingTopics Tools",
    description: "Get in touch with the TrendingTopics Tools team.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact TrendingTopics Tools",
  url: "https://tools.trendingtopics.space/contact",
  mainEntity: {
    "@type": "Organization",
    name: "TrendingTopics",
    url: "https://trendingtopics.space",
    email: "aizenxblogs@gmail.com",
  },
};

export default function ContactPage() {
  return (
    <main>
      <JsonLd data={contactSchema} />
      <ContactForm />
    </main>
  );
}
