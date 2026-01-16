import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, author, date, type = 'website' }) => {
    const siteTitle = "AizenX Blog";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDescription = "Read amazing blogs on AizenX. Join our community of writers and readers.";
    const defaultKeywords = "AizenX, Blogs, Technology, Health, Education, Entertainment, Sports";
    const defaultImage = "https://cdn-icons-png.flaticon.com/128/8133/8133820.png";
    const siteUrl = "https://aizenx.netlify.app";
    const fullUrl = url ? `${siteUrl}${url}` : siteUrl;

    return (
        <Helmet>
            {/* Basic Meta */}
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image || defaultImage} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:locale" content="en_US" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={image || defaultImage} />
            <meta name="twitter:site" content="@AizenX" />
            {author && <meta name="twitter:creator" content={`@${author}`} />}

            {/* Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": type === 'article' ? "BlogPosting" : "WebSite",
                    "headline": fullTitle,
                    "image": image || defaultImage,
                    "author": {
                        "@type": "Person",
                        "name": author || "AizenX Team"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": siteTitle,
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://aizenx.netlify.app/logo.png" // Replace with actual logo URL
                        }
                    },
                    "datePublished": date ? new Date(date).toISOString() : new Date().toISOString(),
                    "description": description || defaultDescription,
                    "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": fullUrl
                    }
                })}
            </script>
        </Helmet>
    );
};

export default SEO;
