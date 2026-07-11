import type { Metadata } from 'next';
import Link from 'next/link';
import { Scale, FileText, Activity, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | TrendingTopics Tools',
  description: 'Terms of Service and usage conditions for TrendingTopics Tools.',
};

export default function TermsPage() {
  return (
    <main className="tool-page">
      <div className="container--narrow">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb__sep">›</span>
          <span>Terms of Service</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon">
            <Scale size={48} className="text-accent-blue" />
          </span>
          <h1 className="tool-page__title">Terms of Service</h1>
          <p className="tool-page__desc">
            Last Updated: July 1, 2026<br/>
            Please read these terms carefully before using our tools.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="glass-card" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={24} className="text-accent-violet" /> 1. Acceptance of Terms
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              By accessing or using TrendingTopics Tools (tools.trendingtopics.space), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the Service.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Activity size={24} className="text-accent-green" /> 2. Use of Service
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
              Our tools are provided &quot;as is&quot; for your personal and commercial use. You agree not to:
            </p>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, paddingLeft: '20px' }}>
              <li>Use the service for any illegal purposes</li>
              <li>Attempt to reverse engineer or disrupt the service</li>
              <li>Use automated scripts to mass-process files in a way that degrades performance for others</li>
            </ul>
          </div>

          <div className="glass-card" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertTriangle size={24} className="text-accent-red" /> 3. Limitation of Liability
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              In no event shall TrendingTopics.space, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
