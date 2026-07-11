import type { Metadata } from 'next';
import Link from "next/link";
import { Info, ShieldCheck, Zap, Globe, Layers, EyeOff } from "lucide-react";

export const metadata: Metadata = {
  title: 'About Us | TrendingTopics Tools',
  description:
    'Learn about TrendingTopics Tools — a free, privacy-first suite of online image conversion and document tools. No signup, no uploads, all processing happens in your browser.',
  openGraph: {
    title: 'About TrendingTopics Tools',
    description:
      'Free, privacy-first browser-based tools for image conversion and document processing. No signup required. Built by the TrendingTopics.space team.',
    url: 'https://tools.trendingtopics.space/about',
    siteName: 'TrendingTopics Tools',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <main className="tool-page">
      <div className="container--narrow">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb__sep">›</span>
          <span>About</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon"><Info size={48} className="text-accent-violet" /></span>
          <h1 className="tool-page__title">About TrendingTopics Tools</h1>
          <p className="tool-page__desc">
            A free, privacy-first suite of online utilities built by the TrendingTopics.space team. We believe powerful tools should be accessible to everyone.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* Mission */}
          <div className="glass-card" style={{ padding: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <Globe size={24} color="var(--accent-blue)" />
              <h2 style={{ fontWeight: 800, fontSize: "1.25rem", margin: 0 }}>Our Mission</h2>
            </div>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "16px" }}>
              <strong>TrendingTopics Tools</strong> provides completely free, browser-native tools to make everyday file tasks fast and effortless. 
              No subscriptions, no accounts, and absolutely no compromise on your privacy.
            </p>
            <a href="https://trendingtopics.space" target="_blank" rel="noopener noreferrer" className="btn btn--glass btn--sm" style={{ display: "inline-flex" }}>
              Visit our main blog →
            </a>
          </div>

          {/* What We Do */}
          <div className="glass-card" style={{ padding: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <Layers size={24} color="var(--accent-violet)" />
              <h2 style={{ fontWeight: 800, fontSize: "1.25rem", margin: 0 }}>What We Do</h2>
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: "16px", padding: 0, listStyle: "none" }}>
              <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div style={{ background: "rgba(124,58,237,0.1)", padding: "8px", borderRadius: "8px", flexShrink: 0 }}><Zap size={18} color="var(--accent-violet)" /></div>
                <div>
                  <strong style={{ display: "block", marginBottom: "4px" }}>Image Converters</strong>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.9375rem" }}>Convert between PNG, JPEG, WebP, AVIF, SVG, GIF, and more in seconds.</span>
                </div>
              </li>
              <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div style={{ background: "rgba(124,58,237,0.1)", padding: "8px", borderRadius: "8px", flexShrink: 0 }}><Zap size={18} color="var(--accent-violet)" /></div>
                <div>
                  <strong style={{ display: "block", marginBottom: "4px" }}>Document Tools</strong>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.9375rem" }}>Process, compress, and manipulate PDF and document files effortlessly.</span>
                </div>
              </li>
              <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div style={{ background: "rgba(124,58,237,0.1)", padding: "8px", borderRadius: "8px", flexShrink: 0 }}><Zap size={18} color="var(--accent-violet)" /></div>
                <div>
                  <strong style={{ display: "block", marginBottom: "4px" }}>Image Optimizers</strong>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.9375rem" }}>Compress images and reduce file size without sacrificing visual quality.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Privacy First */}
          <div className="glass-card" style={{ padding: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <ShieldCheck size={24} color="#10b981" />
              <h2 style={{ fontWeight: 800, fontSize: "1.25rem", margin: 0 }}>Privacy-First by Design</h2>
            </div>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
              Your files are <strong>yours</strong>. We built this platform with privacy as a core principle, not an afterthought.
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
              <div className="glass-card--light" style={{ padding: "16px", borderRadius: "8px" }}>
                <strong style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontSize: "0.9375rem" }}><EyeOff size={16} /> Browser-Local</strong>
                <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", margin: 0 }}>All processing happens in your browser. Files never leave your device.</p>
              </div>
              <div className="glass-card--light" style={{ padding: "16px", borderRadius: "8px" }}>
                <strong style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontSize: "0.9375rem" }}><EyeOff size={16} /> Zero Storage</strong>
                <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", margin: 0 }}>We have no backend storage. Once you close the tab, the files are gone.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
