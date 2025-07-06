/**
 * SEO Optimization Utilities
 * 
 * Functions for improving SEO and metadata management
 */

import type { Metadata } from 'next';

// Base SEO configuration
export const baseSEO = {
  siteName: 'DoubleTap - Kurz profesionální tvorby videí',
  siteUrl: 'https://doubletap.cz',
  defaultTitle: 'Kurz profesionální tvorby videí s 82% dotací od státu',
  defaultDescription: 'Naučte se tvořit profesionální videa s 82% dotací od státu. Kurz se koná osobně v Praze. Registrace zdarma.',
  defaultKeywords: [
    'kurz tvorby videí',
    'profesionální videa',
    'dotace na vzdělávání',
    'video produkce',
    'Praha',
    'rekvalifikace',
    'vzdělávání'
  ],
  author: 'DoubleTap',
  language: 'cs',
  locale: 'cs_CZ'
};

// Generate metadata for pages
export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  noIndex = false
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}): Metadata {
  const fullTitle = title 
    ? `${title} | ${baseSEO.siteName}`
    : baseSEO.defaultTitle;
  
  const fullDescription = description || baseSEO.defaultDescription;
  const fullKeywords = [...baseSEO.defaultKeywords, ...keywords];
  const fullUrl = url ? `${baseSEO.siteUrl}${url}` : baseSEO.siteUrl;
  const fullImage = image ? `${baseSEO.siteUrl}${image}` : `${baseSEO.siteUrl}/images/og-default.jpg`;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: fullKeywords.join(', '),
    authors: [{ name: baseSEO.author }],
    creator: baseSEO.author,
    publisher: baseSEO.author,
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    
    // Open Graph
    openGraph: {
      type,
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: baseSEO.siteName,
      locale: baseSEO.locale,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
    },
    
    // Additional metadata
    alternates: {
      canonical: fullUrl,
    },
    
    // Verification
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

// Generate JSON-LD structured data
export function generateStructuredData({
  type = 'Course',
  name,
  description,
  provider,
  location,
  startDate,
  endDate,
  price,
  currency = 'CZK',
  url
}: {
  type?: 'Course' | 'Organization' | 'WebSite';
  name?: string;
  description?: string;
  provider?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  price?: number;
  currency?: string;
  url?: string;
}) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  if (type === 'Course') {
    return {
      ...baseData,
      name: name || baseSEO.defaultTitle,
      description: description || baseSEO.defaultDescription,
      provider: {
        '@type': 'Organization',
        name: provider || baseSEO.siteName,
        url: baseSEO.siteUrl,
      },
      location: {
        '@type': 'Place',
        name: location || 'Praha',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Praha',
          addressCountry: 'CZ',
        },
      },
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(price && {
        offers: {
          '@type': 'Offer',
          price: price.toString(),
          priceCurrency: currency,
          availability: 'https://schema.org/InStock',
        },
      }),
      ...(url && { url: `${baseSEO.siteUrl}${url}` }),
    };
  }

  if (type === 'Organization') {
    return {
      ...baseData,
      name: name || baseSEO.siteName,
      description: description || baseSEO.defaultDescription,
      url: baseSEO.siteUrl,
      logo: `${baseSEO.siteUrl}/images/logo.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        areaServed: 'CZ',
        availableLanguage: 'Czech',
      },
    };
  }

  if (type === 'WebSite') {
    return {
      ...baseData,
      name: name || baseSEO.siteName,
      description: description || baseSEO.defaultDescription,
      url: baseSEO.siteUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseSEO.siteUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };
  }

  return baseData;
}

// Generate breadcrumb structured data
export function generateBreadcrumbData(items: Array<{ name: string; url?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: `${baseSEO.siteUrl}${item.url}` }),
    })),
  };
}

// SEO-friendly URL slug generator
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Remove multiple consecutive hyphens
}

// Check if content meets SEO best practices
export function validateSEO({
  title,
  description,
  headings,
  images,
  links
}: {
  title?: string;
  description?: string;
  headings?: string[];
  images?: Array<{ alt?: string; src: string }>;
  links?: Array<{ href: string; text: string }>;
}) {
  const issues: string[] = [];
  const recommendations: string[] = [];

  // Title validation
  if (!title) {
    issues.push('Missing page title');
  } else {
    if (title.length < 30) {
      recommendations.push('Title could be longer (30-60 characters recommended)');
    }
    if (title.length > 60) {
      issues.push('Title is too long (over 60 characters)');
    }
  }

  // Description validation
  if (!description) {
    issues.push('Missing meta description');
  } else {
    if (description.length < 120) {
      recommendations.push('Description could be longer (120-160 characters recommended)');
    }
    if (description.length > 160) {
      issues.push('Description is too long (over 160 characters)');
    }
  }

  // Heading validation
  if (headings && headings.length === 0) {
    issues.push('No headings found');
  }

  // Image validation
  if (images) {
    const imagesWithoutAlt = images.filter(img => !img.alt);
    if (imagesWithoutAlt.length > 0) {
      issues.push(`${imagesWithoutAlt.length} images missing alt text`);
    }
  }

  // Link validation
  if (links) {
    const emptyLinks = links.filter(link => !link.text.trim());
    if (emptyLinks.length > 0) {
      issues.push(`${emptyLinks.length} links with empty text`);
    }
  }

  return { issues, recommendations };
}
