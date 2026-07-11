import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, EyeOff, ServerOff, Database } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | TrendingTopics Tools',
  description:
    'Privacy Policy for TrendingTopics Tools. Learn how we handle your data — we collect no personal information and all file processing happens in your browser.',
  openGraph: {
    title: 'Privacy Policy | TrendingTopics Tools',
    description:
      'Learn how TrendingTopics Tools protects your privacy. No data stored server-side. All conversions happen in your browser.',
    url: 'https://tools.trendingtopics.space/privacy-policy',
    siteName: 'TrendingTopics Tools',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="tool-page">
      <div className="container--narrow">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb__sep">›</span>
          <span>Privacy Policy</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon">
            <ShieldCheck size={48} className="text-accent-green" />
          </span>
          <h1 className="tool-page__title">Privacy Policy</h1>
          <p className="tool-page__desc">
            Last Updated: July 1, 2026<br/>
            Your privacy is our priority. We process files on your device and never store them.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="glass-card" style={{ padding: '32px' }}>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Welcome to <strong>TrendingTopics Tools</strong> (
              <a href="https://tools.trendingtopics.space" style={{ color: 'var(--accent-violet)' }}>
                tools.trendingtopics.space
              </a>
              ), operated by the TrendingTopics.space team. We are committed to
              protecting your privacy. This Privacy Policy explains what
              information we collect, how we use it, and your rights regarding
              that information.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: '16px' }}>
              By using our Service, you agree to the collection and use of
              information in accordance with this policy.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px' }}>1. Information We Collect</h2>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <EyeOff size={18} className="text-accent-violet" /> 1.1 Information You Provide
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              We do <strong>not</strong> require you to create an account or
              provide any personal information to use TrendingTopics Tools. You
              may use all features of our site anonymously.
            </p>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ServerOff size={18} className="text-accent-blue" /> 1.2 Files You Upload
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              All file processing (image conversion, document editing, etc.)
              happens <strong>entirely within your browser</strong> using
              client-side JavaScript. Files you select or drag onto our tools are{' '}
              <strong>never uploaded to our servers</strong>. They remain on your
              device at all times. We have no access to the content of any files
              you process.
            </p>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={18} className="text-accent-green" /> 1.3 Automatically Collected Information
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
              When you visit our website, our hosting provider and third-party
              services may automatically collect certain technical information,
              including:
            </p>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, paddingLeft: '20px', marginBottom: '16px' }}>
              <li>IP address (anonymized where possible)</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring URL</li>
              <li>Pages visited and time spent on pages</li>
              <li>Date and time of your visit</li>
            </ul>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              This information is used solely for analytics and is not linked to any
              personally identifiable information.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px' }}>2. Cookies & Advertising</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
              We use <strong>Google AdSense</strong> to display advertisements on
              our website. Google AdSense uses cookies to serve ads based on your prior visits to our website
              or other websites.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              You may opt out of personalized advertising by visiting Google&apos;s{' '}
              <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-violet)' }}>
                Ads Settings
              </a>.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
