import React from 'react';
import { Container } from 'react-bootstrap';
import SEO from './SEO';

const PrivacyPolicy = () => {
  return (
    <>
      <SEO 
        title="Privacy Policy | Trending Topics" 
        description="Learn how Trending Topics collects, uses, and protects your data and privacy."
        url="https://trendingtopics.space/privacy-policy"
      />
      <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', padding: '60px 0', color: 'var(--text-secondary)' }}>
        <Container className="glass-panel p-5" style={{ maxWidth: '800px', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
          <h1 className="mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>Privacy Policy</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h4 className="mt-4 mb-3" style={{ color: 'var(--text-primary)' }}>1. Information We Collect</h4>
          <p>We collect information you provide directly to us when you create an account, subscribe to our newsletter, or submit a query. This may include your name, email address, and profile picture.</p>
          
          <h4 className="mt-4 mb-3" style={{ color: 'var(--text-primary)' }}>2. How We Use Your Information</h4>
          <p>We use the information we collect to operate, maintain, and provide the features and functionality of the Service. We also use it to communicate with you, monitor metrics, and diagnose technical problems.</p>
          
          <h4 className="mt-4 mb-3" style={{ color: 'var(--text-primary)' }}>3. Cookies and Tracking</h4>
          <p>We and our third-party partners (such as Google AdSense) use cookies, web beacons, and other tracking technologies to collect information about your browsing behavior. These technologies help us personalize content and ads, provide social media features, and analyze our traffic.</p>
          
          <h4 className="mt-4 mb-3" style={{ color: 'var(--text-primary)' }}>4. Google AdSense</h4>
          <p>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.</p>
          <p>Users may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)' }}>Ads Settings</a>.</p>

          <h4 className="mt-4 mb-3" style={{ color: 'var(--text-primary)' }}>5. Contact Us</h4>
          <p>If you have any questions about this Privacy Policy, please contact us at jaivardhansinghrathore17@gmail.com.</p>
        </Container>
      </div>
    </>
  );
};

export default PrivacyPolicy;
