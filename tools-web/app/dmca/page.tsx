import type { Metadata } from 'next';
import Link from 'next/link';
import { Copyright, ShieldAlert, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DMCA & Copyright | TrendingTopics Tools',
  description: 'DMCA and Copyright information for TrendingTopics Tools.',
};

export default function DmcaPage() {
  return (
    <main className="tool-page">
      <div className="container--narrow">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb__sep">›</span>
          <span>DMCA Policy</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon">
            <Copyright size={48} className="text-accent-red" />
          </span>
          <h1 className="tool-page__title">DMCA / Copyright</h1>
          <p className="tool-page__desc">
            Last Updated: July 1, 2026<br/>
            Our policy on intellectual property and copyright claims.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="glass-card" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldAlert size={24} className="text-accent-red" /> 1. No Hosted Files
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              TrendingTopics Tools operates <strong>entirely client-side</strong>. We do not upload, host, transmit, or store any user files on our servers. All document and image processing occurs locally within the user&apos;s web browser. Because we do not host user-generated files, we cannot remove specific files processed by users.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={24} className="text-accent-blue" /> 2. Reporting Infringement
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
              If you believe that any material on our website (such as our logos, text, or design assets) infringes upon your copyright, please contact us immediately.
            </p>
            <div style={{ padding: '16px', background: 'rgba(59,130,246,0.1)', borderRadius: '8px', display: 'inline-block' }}>
              <strong>Email:</strong> <a href="mailto:aizenxblogs@gmail.com" style={{ color: 'var(--accent-blue)' }}>aizenxblogs@gmail.com</a>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
