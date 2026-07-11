import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | TrendingTopics Tools',
  description:
    'Privacy Policy for TrendingTopics Tools (tools.trendingtopics.space). Learn how we handle your data — we collect no personal information and all file processing happens in your browser.',
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
    <main className="section-hero">
      <div className="container">
        <div className="glass-card">
          <h1>Privacy Policy</h1>
          <p className="meta">
            <strong>Last Updated:</strong> July 1, 2026 &nbsp;|&nbsp;{' '}
            <strong>Effective Date:</strong> July 1, 2026
          </p>
          <p>
            Welcome to <strong>TrendingTopics Tools</strong> (
            <a href="https://tools.trendingtopics.space">
              tools.trendingtopics.space
            </a>
            ), operated by the TrendingTopics.space team. We are committed to
            protecting your privacy. This Privacy Policy explains what
            information we collect, how we use it, and your rights regarding
            that information.
          </p>
          <p>
            By using our Service, you agree to the collection and use of
            information in accordance with this policy.
          </p>

          <hr />

          <h2>1. Information We Collect</h2>

          <h3>1.1 Information You Provide</h3>
          <p>
            We do <strong>not</strong> require you to create an account or
            provide any personal information to use TrendingTopics Tools. You
            may use all features of our site anonymously.
          </p>

          <h3>1.2 Files You Upload</h3>
          <p>
            All file processing (image conversion, document editing, etc.)
            happens <strong>entirely within your browser</strong> using
            client-side JavaScript. Files you select or drag onto our tools are{' '}
            <strong>never uploaded to our servers</strong>. They remain on your
            device at all times. We have no access to the content of any files
            you process.
          </p>

          <h3>1.3 Automatically Collected Information</h3>
          <p>
            When you visit our website, our hosting provider and third-party
            services may automatically collect certain technical information,
            including:
          </p>
          <ul>
            <li>IP address (anonymized where possible)</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring URL</li>
            <li>Pages visited and time spent on pages</li>
            <li>Date and time of your visit</li>
          </ul>
          <p>
            This information is used solely for analytics (e.g., understanding
            how users interact with the site) and is not linked to any
            personally identifiable information.
          </p>

          <hr />

          <h2>2. Cookies and Tracking Technologies</h2>

          <h3>2.1 Google AdSense Cookies</h3>
          <p>
            We use <strong>Google AdSense</strong> to display advertisements on
            our website. Google AdSense uses cookies and similar tracking
            technologies to serve ads based on your prior visits to our website
            or other websites. These cookies allow Google and its partners to
            serve ads based on your interests.
          </p>
          <p>
            The cookies used by Google AdSense include, but are not limited to:
          </p>
          <ul>
            <li>
              <strong>__gads / __gpi</strong> — Used to register and report user
              actions related to ads for anti-fraud purposes and ad measurement.
            </li>
            <li>
              <strong>IDE</strong> — Used by Google DoubleClick to register and
              report user actions after viewing or clicking one of the
              advertiser's ads.
            </li>
            <li>
              <strong>NID</strong> — Used for advertising preferences related to
              Google search ads.
            </li>
            <li>
              <strong>ANID, DSID, FLC, AID, TAID, exchange_uid</strong> — Used
              for ad targeting and conversion tracking.
            </li>
          </ul>
          <p>
            You can opt out of personalized advertising by visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>{' '}
            or by visiting the{' '}
            <a
              href="https://optout.aboutads.info/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Digital Advertising Alliance opt-out page
            </a>
            .
          </p>

          <h3>2.2 Analytics Cookies</h3>
          <p>
            We may use analytics tools (such as Google Analytics) to understand
            how visitors interact with our website. Analytics cookies collect
            aggregated, anonymized data about page views, session duration, and
            navigation patterns. No personally identifiable information is
            collected or stored.
          </p>

          <h3>2.3 Essential Cookies</h3>
          <p>
            We may use strictly necessary cookies to ensure the website
            functions correctly (e.g., remembering your cookie consent
            preferences). These cookies do not track you for advertising
            purposes.
          </p>

          <hr />

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, operate, and maintain our website and tools</li>
            <li>Understand and analyze how you use our Service</li>
            <li>Display relevant advertisements via Google AdSense</li>
            <li>Monitor and prevent fraudulent or abusive activity</li>
            <li>Comply with applicable laws and regulations</li>
          </ul>
          <p>
            We do <strong>not</strong> sell, trade, or rent your personal
            information to third parties.
          </p>

          <hr />

          <h2>4. Third-Party Services</h2>
          <p>
            Our Service may contain links to third-party websites or services.
            We have no control over, and assume no responsibility for, the
            content, privacy policies, or practices of any third-party sites or
            services. We encourage you to review the privacy policies of any
            third-party services you visit.
          </p>
          <p>Key third-party services we use include:</p>
          <ul>
            <li>
              <strong>Google AdSense</strong> — Advertising:{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Privacy Policy
              </a>
            </li>
            <li>
              <strong>Google Analytics</strong> (if applicable) — Analytics:{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Privacy Policy
              </a>
            </li>
          </ul>

          <hr />

          <h2>5. Children's Privacy</h2>
          <p>
            Our Service is not directed to children under the age of 13. We do
            not knowingly collect personally identifiable information from
            children under 13. If you are a parent or guardian and you are
            aware that your child has provided us with personal information,
            please contact us so that we can take necessary action.
          </p>

          <hr />

          <h2>6. Your Rights (GDPR &amp; CCPA)</h2>

          <h3>6.1 GDPR Rights (EEA/UK Users)</h3>
          <p>
            If you are located in the European Economic Area (EEA) or United
            Kingdom, you have the following rights under the General Data
            Protection Regulation (GDPR):
          </p>
          <ul>
            <li>
              <strong>Right to Access</strong> — You have the right to request
              copies of any personal data we hold about you.
            </li>
            <li>
              <strong>Right to Rectification</strong> — You have the right to
              request that we correct any inaccurate data.
            </li>
            <li>
              <strong>Right to Erasure</strong> — You have the right to request
              that we delete your personal data.
            </li>
            <li>
              <strong>Right to Restrict Processing</strong> — You have the right
              to request that we restrict processing of your personal data.
            </li>
            <li>
              <strong>Right to Object</strong> — You have the right to object to
              our processing of your personal data.
            </li>
            <li>
              <strong>Right to Data Portability</strong> — You have the right to
              request that we transfer your data to another organization or
              directly to you.
            </li>
          </ul>

          <h3>6.2 CCPA Rights (California Residents)</h3>
          <p>
            If you are a California resident, the California Consumer Privacy
            Act (CCPA) grants you the following rights:
          </p>
          <ul>
            <li>
              <strong>Right to Know</strong> — You have the right to request
              disclosure of personal information we collect, use, disclose, and
              sell.
            </li>
            <li>
              <strong>Right to Delete</strong> &mdash; You have the right to request
              deletion of your personal information.
            </li>
            <li>
              <strong>Right to Opt-Out</strong> — You have the right to opt out
              of the sale of your personal information. We do not sell personal
              information.
            </li>
            <li>
              <strong>Right to Non-Discrimination</strong> — You have the right
              not to be discriminated against for exercising your CCPA rights.
            </li>
          </ul>

          <hr />

          <h2>7. Data Security</h2>
          <p>
            We take reasonable precautions to protect your information. Since
            all file processing occurs client-side in your browser and no files
            are transmitted to our servers, the security risk to your file data
            is minimal. Our website uses HTTPS encryption to protect data in
            transit.
          </p>
          <p>
            However, no method of transmission over the Internet or electronic
            storage is 100% secure. We cannot guarantee absolute security.
          </p>

          <hr />

          <h2>8. Data Retention</h2>
          <p>
            Since we do not store personal data or file content server-side, we
            have no personal data to retain or delete. Any anonymized analytics
            data is retained in accordance with the data retention policies of
            the respective analytics provider (e.g., Google Analytics retains
            data for up to 26 months by default).
          </p>

          <hr />

          <h2>9. International Transfers</h2>
          <p>
            Our Service is operated from servers located in various regions.
            Third-party services such as Google AdSense may transfer and process
            data internationally. By using our Service, you consent to such
            international data transfers, which are subject to appropriate
            safeguards as required by applicable law.
          </p>

          <hr />

          <h2>10. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            with an updated "Last Updated" date. You are advised to review this
            Privacy Policy periodically for any changes. Changes are effective
            immediately upon posting.
          </p>

          <hr />

          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or wish to
            exercise your rights, please contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:aizenxblogs@gmail.com">aizenxblogs@gmail.com</a>
            </li>
            <li>
              <strong>Website:</strong>{' '}
              <a href="https://tools.trendingtopics.space">
                tools.trendingtopics.space
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
