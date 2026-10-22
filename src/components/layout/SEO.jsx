import React, { useEffect } from 'react';

const SITE_URL = 'https://sabarihospital.in';
const DEFAULT_IMAGE = `${SITE_URL}/hero_image.png`;

function setMetaTag(attribute, key, content) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(href) {
  let element = document.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export function SEO({
  title = "Sabari Hospitals | Multispeciality Hospital",
  description = "Sabari Hospitals is a leading multispeciality hospital in Coimbatore, Tamil Nadu, offering 50+ years of compassionate care across obstetrics, gynaecology, surgery, diabetes, and critical care.",
  canonicalPath = "",
  type = "website",
  image = DEFAULT_IMAGE,
  schema = null,
  noindex = false,
}) {
  const canonicalUrl = canonicalPath.startsWith('http')
    ? canonicalPath
    : `${SITE_URL}${canonicalPath ? (canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`) : '/'}`;

  const fullImageUrl = image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;

  useEffect(() => {
    // 1. Title
    document.title = title;

    // 2. Standard Meta Description
    setMetaTag('name', 'description', description);

    // 3. Robots
    setMetaTag(
      'name',
      'robots',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // 4. Canonical
    setCanonical(canonicalUrl);

    // 5. Open Graph
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:image', fullImageUrl);
    setMetaTag('property', 'og:site_name', 'Sabari Hospitals');
    setMetaTag('property', 'og:locale', 'en_IN');

    // 6. Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', fullImageUrl);

    // 7. Dynamic JSON-LD Structured Data
    const scriptId = 'dynamic-seo-schema';
    let scriptTag = document.getElementById(scriptId);

    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema, null, 2);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Cleanup custom dynamic schema when component unmounts
      const tag = document.getElementById(scriptId);
      if (tag) tag.remove();
    };
  }, [title, description, canonicalUrl, type, fullImageUrl, schema, noindex]);

  // React 19 head tag hoisting support
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={fullImageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </>
  );
}
