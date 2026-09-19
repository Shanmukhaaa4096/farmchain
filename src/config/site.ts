/**
 * FarmChain Site Configuration
 *
 * All site-wide constants (name, domain, social links, brand copy) are
 * sourced from here. Components import from this file — never from
 * hard-coded string literals scattered in JSX.
 *
 * Environment variables are read at build time by Vite.
 * Fall back to sensible defaults so the dev server always works.
 */

/** Production canonical URL (no trailing slash). Set via VITE_SITE_URL in .env */
export const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ?? 'https://farmchain-gamma.vercel.app';

/** Brand name displayed in UI, meta tags, and JSON-LD */
export const SITE_NAME = (import.meta.env.VITE_SITE_NAME as string | undefined) ?? 'FarmChain';

/** Short tagline (≤ 60 chars) */
export const SITE_TAGLINE = 'Farm to Buyer, No Middleman';

/** Meta description (≤ 160 chars) */
export const SITE_DESCRIPTION =
  'FarmChain connects verified Indian farmers directly to households, shops, and restaurants. 0% broker fee. Fresh produce. Safe payment.';

/** OG image path (relative to /public or absolute URL) */
export const OG_IMAGE_URL = `${SITE_URL}/og-image.jpg`;

/** Twitter handle (without @) */
export const TWITTER_HANDLE = 'farmchain_in';

/** Supabase project URL (set in .env.local / Vercel) */
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;

/** Supabase anon key (set in .env.local / Vercel) */
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** JSON-LD Organization schema data */
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  logo: `${SITE_URL}/icon-192.png`,
  sameAs: [
    `https://twitter.com/${TWITTER_HANDLE}`,
  ],
} as const;

/** JSON-LD WebSite schema */
export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/market?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
} as const;

/**
 * Generate a page title in format "Page Name | FarmChain"
 */
export function pageTitle(title?: string): string {
  return title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — ${SITE_TAGLINE}`;
}
