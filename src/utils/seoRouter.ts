import { BeautyArticle, BeautyProductType } from '../types/article';
import { STEP_2_KEYWORD_MAP, getKeywordMappingForPage } from '../data/keywordMap';

export interface RouteMatch {
  view: 'home' | 'articles' | 'detail';
  slug?: string;
  productType?: BeautyProductType | 'All';
}

export const PRODUCT_SLUG_MAP: Record<string, BeautyProductType> = {
  'lipstick': 'Lipstick',
  'serum': 'Serum',
  'compact-powder': 'Compact Powder',
  'compact': 'Compact Powder',
  'sunscreen': 'Sunscreen',
  'spf': 'Sunscreen',
  'blush': 'Blush',
  'foundation-tint': 'Foundation & Tint',
  'foundation': 'Foundation & Tint',
  'cleansing-balm': 'Cleansing Balm',
  'cleanser': 'Cleansing Balm',
  'eye-cream': 'Eye Cream',
  'setting-mist': 'Setting Mist',
  'barrier-cream': 'Barrier Cream'
};

export const PRODUCT_TYPE_TO_SLUG: Record<BeautyProductType, string> = {
  'Lipstick': 'lipstick',
  'Serum': 'serum',
  'Compact Powder': 'compact-powder',
  'Sunscreen': 'sunscreen',
  'Blush': 'blush',
  'Foundation & Tint': 'foundation-tint',
  'Cleansing Balm': 'cleansing-balm',
  'Eye Cream': 'eye-cream',
  'Setting Mist': 'setting-mist',
  'Barrier Cream': 'barrier-cream'
};

/**
 * Normalizes any text string into a clean, lowercase, hyphen-separated SEO slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Short unique URLs mapping for core spotlight blogs.
 */
export const SHORT_ARTICLE_URLS: Record<string, string> = {
  'velvet-lipstick-formulation-science': '/lipstick',
  'lipstick': '/lipstick',
  'ultimate-serum-layering-radiance': '/serum',
  'serum': '/serum',
  'invisible-fluid-sunscreens-makeup-prep': '/sunscreen',
  'sunscreen': '/sunscreen',
};

/**
 * Returns the unique, descriptive SEO URL path for an article.
 * For spotlight blogs, returns short unique URLs: /lipstick, /serum, /sunscreen.
 */
export function getArticleUrl(article: BeautyArticle): string {
  if (SHORT_ARTICLE_URLS[article.id] || SHORT_ARTICLE_URLS[article.slug]) {
    return SHORT_ARTICLE_URLS[article.id] || SHORT_ARTICLE_URLS[article.slug];
  }
  return `/article/${article.slug}`;
}

/**
 * Returns the unique SEO URL for the homepage.
 */
export function getHomeUrl(): string {
  return '/home';
}

/**
 * Returns the SEO URL for the blog articles hub.
 */
export function getArticlesHubUrl(productType?: BeautyProductType | 'All'): string {
  if (productType && productType !== 'All') {
    const slug = PRODUCT_TYPE_TO_SLUG[productType] || slugify(productType);
    return `/articles/${slug}`;
  }
  return '/articles';
}

/**
 * Parses the current browser URL (supporting pathname, hash, or query).
 */
export function parseCurrentRoute(articles: BeautyArticle[]): RouteMatch {
  if (typeof window === 'undefined') {
    return { view: 'home' };
  }

  // Look at pathname first, then hash fallback
  let path = window.location.pathname.toLowerCase().trim();
  if (path === '' || path === '/') {
    const hash = window.location.hash.toLowerCase().replace(/^#/, '');
    if (hash.startsWith('/')) {
      path = hash;
    }
  }

  // Helper to match short unique URLs or legacy slugs for the 3 spotlight articles
  const resolveSpotlightSlug = (slugCandidate: string): BeautyArticle | undefined => {
    if (
      slugCandidate === 'lipstick' ||
      slugCandidate === 'lipstick-blog' ||
      slugCandidate === 'the-velvet-lip-revolution-hydrating-matte-polymers-and-clean-pigments' ||
      slugCandidate === 'velvet-lipstick-formulation-science'
    ) {
      return articles.find(a => a.id === 'velvet-lipstick-formulation-science' || a.slug === 'lipstick');
    }
    if (
      slugCandidate === 'serum' ||
      slugCandidate === 'serum-blog' ||
      slugCandidate === 'the-ultimate-serum-layering-guide-hyaluronic-acid-vitamin-c-and-peptides' ||
      slugCandidate === 'ultimate-serum-layering-radiance'
    ) {
      return articles.find(a => a.id === 'ultimate-serum-layering-radiance' || a.slug === 'serum');
    }
    if (
      slugCandidate === 'sunscreen' ||
      slugCandidate === 'sunscreen-blog' ||
      slugCandidate === 'weightless-invisible-sunscreens-chemical-vs-mineral-uv-shields' ||
      slugCandidate === 'invisible-fluid-sunscreens-makeup-prep'
    ) {
      return articles.find(a => a.id === 'invisible-fluid-sunscreens-makeup-prep' || a.slug === 'sunscreen');
    }
    return undefined;
  };

  // Check query params fallback (e.g. ?article=slug)
  const searchParams = new URLSearchParams(window.location.search);
  const articleParam = searchParams.get('article');
  if (articleParam) {
    const spotlight = resolveSpotlightSlug(articleParam);
    if (spotlight) {
      return { view: 'detail', slug: spotlight.slug };
    }
    const matched = articles.find(a => a.slug === articleParam || a.id === articleParam);
    if (matched) {
      return { view: 'detail', slug: matched.slug };
    }
  }

  // Trim trailing slash (unless root)
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  // Route: /article/:slug or /blog/:slug
  const articleMatch = path.match(/^\/(?:article|blog)\/([a-z0-9-]+)/);
  if (articleMatch) {
    const slugCandidate = articleMatch[1];
    const spotlight = resolveSpotlightSlug(slugCandidate);
    if (spotlight) {
      return { view: 'detail', slug: spotlight.slug };
    }
    const foundArticle = articles.find(a => a.slug === slugCandidate || a.id === slugCandidate);
    if (foundArticle) {
      return { view: 'detail', slug: foundArticle.slug };
    }
  }

  // Route: /articles or /articles/:productType
  const articlesMatch = path.match(/^\/articles(?:\/([a-z0-9-]+))?$/);
  if (articlesMatch) {
    const subSlug = articlesMatch[1];
    if (subSlug) {
      const spotlight = resolveSpotlightSlug(subSlug);
      if (spotlight) {
        return { view: 'detail', slug: spotlight.slug };
      }

      // Check if it's an article slug directly under /articles/
      const foundArticle = articles.find(a => a.slug === subSlug || a.id === subSlug);
      if (foundArticle) {
        return { view: 'detail', slug: foundArticle.slug };
      }

      // Check if it's a product type filter
      if (PRODUCT_SLUG_MAP[subSlug]) {
        return { view: 'articles', productType: PRODUCT_SLUG_MAP[subSlug] };
      }
    }
    return { view: 'articles', productType: 'All' };
  }

  // Route: Direct slug /:slug match (e.g. /home, /lipstick, /serum, /sunscreen)
  const directSlugMatch = path.match(/^\/([a-z0-9-]+)$/);
  if (directSlugMatch) {
    const slugCandidate = directSlugMatch[1];
    if (slugCandidate === 'home' || slugCandidate === 'index' || slugCandidate === 'beauty-and-skincare-blog') {
      return { view: 'home' };
    }
    if (slugCandidate === 'articles') {
      return { view: 'articles', productType: 'All' };
    }
    const spotlight = resolveSpotlightSlug(slugCandidate);
    if (spotlight) {
      return { view: 'detail', slug: spotlight.slug };
    }
    if (PRODUCT_SLUG_MAP[slugCandidate]) {
      return { view: 'articles', productType: PRODUCT_SLUG_MAP[slugCandidate] };
    }
    const foundArticle = articles.find(a => a.slug === slugCandidate || a.id === slugCandidate);
    if (foundArticle) {
      return { view: 'detail', slug: foundArticle.slug };
    }
  }

  // Default: Homepage
  return { view: 'home' };
}

/**
 * Updates browser history and fires custom event so components can re-render.
 */
export function navigateTo(url: string, replace = false): void {
  if (typeof window === 'undefined') return;

  if (replace) {
    window.history.replaceState(null, '', url);
  } else {
    window.history.pushState(null, '', url);
  }

  window.dispatchEvent(new CustomEvent('elixir-route-change', { detail: { url } }));
}

/**
 * Synchronizes HTML document title, meta tags, and Schema.org JSON-LD structured data for SEO.
 * Applies the specific main keyword and two related keywords assigned to each page.
 */
export function updateSeoMetadata(article: BeautyArticle | null, view: 'home' | 'articles' | 'detail'): void {
  if (typeof document === 'undefined') return;

  const origin = window.location.origin;
  const canonicalUrl = `${origin}${article && view === 'detail' ? getArticleUrl(article) : view === 'articles' ? '/articles' : getHomeUrl()}`;

  // Default values from Homepage Step 2 Keyword Map
  const homeMapping = STEP_2_KEYWORD_MAP['home'];
  const hubMapping = STEP_2_KEYWORD_MAP['articles-hub'];

  let title = homeMapping.seoTitle;
  let description = homeMapping.metaDescription;
  let keywords = `${homeMapping.mainKeyword}, ${homeMapping.relatedKeyword1}, ${homeMapping.relatedKeyword2}`;
  let ogType = 'website';
  let ogImage = `${origin}/src/assets/images/home_hero_beauty_collection_1791632078081.jpg`;
  let keywordsArray = [homeMapping.mainKeyword, homeMapping.relatedKeyword1, homeMapping.relatedKeyword2];

  if (view === 'detail' && article) {
    const articleMapping = article.seoKeywords || getKeywordMappingForPage(article.id);
    if (articleMapping) {
      title = articleMapping.seoTitle;
      description = articleMapping.metaDescription;
      keywords = `${articleMapping.mainKeyword}, ${articleMapping.relatedKeyword1}, ${articleMapping.relatedKeyword2}`;
      keywordsArray = [articleMapping.mainKeyword, articleMapping.relatedKeyword1, articleMapping.relatedKeyword2];
    } else {
      title = `${article.title} | ÉLIXIR & DERMA`;
      description = article.dek;
    }
    ogType = 'article';
    ogImage = `${origin}${article.heroImage}`;
  } else if (view === 'articles') {
    title = hubMapping.seoTitle;
    description = hubMapping.metaDescription;
    keywords = `${hubMapping.mainKeyword}, ${hubMapping.relatedKeyword1}, ${hubMapping.relatedKeyword2}`;
    keywordsArray = [hubMapping.mainKeyword, hubMapping.relatedKeyword1, hubMapping.relatedKeyword2];
  }

  // 1. Update <title>
  document.title = title;

  // 2. Helper to set or create meta tags
  const setMetaTag = (selector: string, attr: 'name' | 'property', attrValue: string, content: string) => {
    let el = document.querySelector(selector) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, attrValue);
      document.head.appendChild(el);
    }
    el.content = content;
  };

  setMetaTag('meta[name="description"]', 'name', 'description', description);
  setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

  // 3. Update canonical link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.rel = 'canonical';
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.href = canonicalUrl;

  // 4. Update Schema.org JSON-LD structured data
  let schemaScript = document.getElementById('seo-structured-data') as HTMLScriptElement | null;
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'seo-structured-data';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }

  let structuredData: Record<string, any>;

  if (view === 'detail' && article) {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': title,
      'description': description,
      'keywords': keywordsArray,
      'url': canonicalUrl,
      'image': {
        '@type': 'ImageObject',
        'url': ogImage,
        'caption': article.imageAlt
      },
      'datePublished': '2026-10-01T08:00:00+00:00',
      'dateModified': '2026-10-10T12:00:00+00:00',
      'author': {
        '@type': 'Person',
        'name': article.author.name,
        'jobTitle': article.author.role
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'ÉLIXIR & DERMA Publishing Corp.',
        'logo': {
          '@type': 'ImageObject',
          'url': `${origin}/src/assets/images/home_hero_beauty_collection_1791632078081.jpg`
        }
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': canonicalUrl
      },
      'about': {
        '@type': 'Product',
        'name': article.productFormulations[0]?.title || article.productType,
        'category': article.category
      }
    };
  } else {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'ÉLIXIR & DERMA',
      'url': `${origin}${getHomeUrl()}`,
      'description': description,
      'keywords': keywordsArray,
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': canonicalUrl
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'ÉLIXIR & DERMA Publishing Corp.'
      }
    };
  }

  schemaScript.textContent = JSON.stringify(structuredData, null, 2);
}
