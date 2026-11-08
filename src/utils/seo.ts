import type { CollectionEntry } from 'astro:content';

export interface SEOProps {
  title: string;
  description: string;
  canonicalURL?: string;
  ogImage?: string;
  ogImageAlt?: string;
  twitterCard?: 'summary_large_image';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export function generateArticleSEO(post: CollectionEntry<'post'>, siteURL: string): SEOProps {
  const url = `${siteURL}/artigos/${post.slug}/`;
  return {
    title: `${post.data.title} | Verbo Oculto`,
    description: post.data.description,
    canonicalURL: url,
    ogImage: post.data.heroImage ? `${siteURL}${post.data.heroImage}` : undefined,
    ogImageAlt: post.data.heroAlt,
    publishedTime: formatDateISO(post.data.pubDate),
    modifiedTime: post.data.updatedDate ? formatDateISO(post.data.updatedDate) : undefined,
    author: post.data.author,
    section: post.data.category,
    tags: post.data.tags,
  };
}

function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function generateArticleJsonLd(post: CollectionEntry<'post'>, siteURL: string) {
  const url = `${siteURL}/artigos/${post.slug}/`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.data.title,
    description: post.data.description,
    url,
    image: post.data.heroImage ? `${siteURL}${post.data.heroImage}` : undefined,
    datePublished: formatDateISO(post.data.pubDate),
    dateModified: post.data.updatedDate ? formatDateISO(post.data.updatedDate) : formatDateISO(post.data.pubDate),
    author: { '@type': 'Person', name: post.data.author },
    publisher: { '@type': 'Organization', name: 'Verbo Oculto', logo: { '@type': 'ImageObject', url: `${siteURL}/logo.svg` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    wordCount: post.data.schema?.wordCount,
    timeRequired: post.data.schema?.timeRequired,
    keywords: post.data.keywords.join(', '),
    articleSection: post.data.category,
  };
}
