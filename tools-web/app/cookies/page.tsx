import type { Metadata } from 'next';
import Link from 'next/link';
import { Cookie, Settings, EyeOff } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookie Policy | TrendingTopics Tools',
  description: 'Cookie Policy for TrendingTopics Tools. We use minimal cookies primarily for advertising via Google AdSense.',
};

export default function CookiesPage() {
  return (
    <main className="tool-page">
      <div className="container--narrow">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb__sep">›</span>
          <span>Cookie Policy</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon">
            <Cookie size={48} className="text-accent-violet" />
          </span>
          <h1 className="tool-page__title">Cookie Policy</h1>
          <p className="tool-page__desc">
            Last Updated: July 1, 2026<br/>
            How and why we use cookies on TrendingTopics Tools.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="glass-card" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Cookie size={24} className="text-accent-violet" /> 1. What are Cookies?
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Cookies are small text files placed on your device to store data that can be recalled by a web server in the domain that placed the cookie. We use cookies primarily for advertising and basic analytics to keep our site free.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <EyeOff size={24} className="text-accent-blue" /> 2. Advertising Cookies
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
              We partner with Google AdSense to display ads. Google uses cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google&apos;s <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-violet)' }}>Ads Settings</a>.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Settings size={24} className="text-accent-green" /> 3. Managing Cookies
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              You can control and manage cookies using your browser settings. Please note that removing or blocking cookies can impact your user experience and parts of this website may no longer be fully accessible.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
