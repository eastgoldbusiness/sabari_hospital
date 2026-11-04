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
  title = "Sabari Hospitals | Multispeciality Hospital in Coimbatore",
  description = "Sabari Hospitals is a leading multispeciality hospital in Coimbatore, Tamil Nadu, offering 50+ years of compassionate care across obstetrics, gynaecology, surgery, diabetes, and critical care.",
  canonicalPath = "",
  type = "website",
  image = DEFAULT_IMAGE,
  schema = null,
  breadcrumbs = null,
  noindex = false,
}) {
  const canonicalUrl = canonicalPath.startsWith('http')
    ? canonicalPath
    : `${SITE_URL}${canonicalPath ? (canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`) : '/'}`;

  const fullImageUrl = image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;

  // Build standard BreadcrumbList structured data if breadcrumbs prop provided
  const breadcrumbSchema = (breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0) ? {
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => {
      const crumbUrl = crumb.path.startsWith('http')
        ? crumb.path
        : `${SITE_URL}${crumb.path ? (crumb.path.startsWith('/') ? crumb.path : `/${crumb.path}`) : '/'}`;
      return {
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumbUrl
      };
    })
  } : null;

  // Combine custom schema and breadcrumbs into clean JSON-LD graph if needed
  let combinedSchema = null;
  if (schema && breadcrumbSchema) {
    const rawSchemaWithoutContext = { ...schema };
    delete rawSchemaWithoutContext["@context"];
    combinedSchema = {
      "@context": "https://schema.org",
      "@graph": [
        ...(schema["@graph"] ? schema["@graph"] : [rawSchemaWithoutContext]),
        breadcrumbSchema
      ]
    };
  } else if (schema) {
    combinedSchema = schema;
  } else if (breadcrumbSchema) {
    combinedSchema = {
      "@context": "https://schema.org",
      ...breadcrumbSchema
    };
  }

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

    if (combinedSchema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(combinedSchema, null, 2);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Cleanup custom dynamic schema when component unmounts
      const tag = document.getElementById(scriptId);
      if (tag) tag.remove();
    };
  }, [title, description, canonicalUrl, type, fullImageUrl, combinedSchema, noindex]);

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
      {combinedSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
        />
      )}
    </>
  );
}
