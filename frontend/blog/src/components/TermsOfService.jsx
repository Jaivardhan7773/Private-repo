import React from 'react';
import { Container } from 'react-bootstrap';
import SEO from './SEO';

const TermsOfService = () => {
  return (
    <>
      <SEO 
        title="Terms of Service | Trending Topics" 
        description="Terms and conditions for using the Trending Topics platform."
        url="https://trendingtopics.space/terms-of-service"
      />
      <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', padding: '60px 0', color: 'var(--text-secondary)' }}>
        <Container className="glass-panel p-5" style={{ maxWidth: '800px', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
          <h1 className="mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>Terms of Service</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h4 className="mt-4 mb-3" style={{ color: 'var(--text-primary)' }}>1. Acceptance of Terms</h4>
          <p>By accessing and using Trending Topics, you accept and agree to be bound by the terms and provision of this agreement.</p>
          
          <h4 className="mt-4 mb-3" style={{ color: 'var(--text-primary)' }}>2. User Content</h4>
          <p>Users who create blogs or post comments are responsible for their own content. We do not endorse and are not responsible for user-generated content. We reserve the right to remove any content that violates our policies or is deemed inappropriate.</p>
          
          <h4 className="mt-4 mb-3" style={{ color: 'var(--text-primary)' }}>3. Intellectual Property</h4>
          <p>The original content, features, and functionality of Trending Topics are and will remain the exclusive property of Trending Topics and its licensors.</p>
          
          <h4 className="mt-4 mb-3" style={{ color: 'var(--text-primary)' }}>4. Termination</h4>
          <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

          <h4 className="mt-4 mb-3" style={{ color: 'var(--text-primary)' }}>5. Changes to Terms</h4>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.</p>
        </Container>
      </div>
    </>
  );
};

export default TermsOfService;
