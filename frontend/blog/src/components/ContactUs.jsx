import React from 'react';
import { Container } from 'react-bootstrap';
import SEO from './SEO';

const ContactUs = () => {
  return (
    <>
      <SEO 
        title="Contact Us | Trending Topics" 
        description="Get in touch with the Trending Topics team."
        url="https://trendingtopics.space/contact-us"
      />
      <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', padding: '60px 0', color: 'var(--text-secondary)' }}>
        <Container className="glass-panel p-5" style={{ maxWidth: '800px', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
          <h1 className="mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>Contact Us</h1>
          
          <p className="mb-4">We'd love to hear from you. Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions.</p>
          
          <h4 className="mt-4 mb-3" style={{ color: 'var(--text-primary)' }}>General Inquiries & Support</h4>
          <p>Email: <a href="mailto:jaivardhansinghrathore17@gmail.com" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>jaivardhansinghrathore17@gmail.com</a></p>
          
          <h4 className="mt-4 mb-3" style={{ color: 'var(--text-primary)' }}>Developer & Portfolio</h4>
          <p>Website: <a href="https://jaivardhan.vercel.app" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>jaivardhan.vercel.app</a></p>

          <h4 className="mt-4 mb-3" style={{ color: 'var(--text-primary)' }}>Social Media</h4>
          <p>
            Twitter: <a href="https://x.com/Jay_Vardhan7773" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>@Jay_Vardhan7773</a><br />
            Instagram: <a href="https://www.instagram.com/jayvardhannsingh/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>@jayvardhannsingh</a>
          </p>
        </Container>
      </div>
    </>
  );
};

export default ContactUs;
