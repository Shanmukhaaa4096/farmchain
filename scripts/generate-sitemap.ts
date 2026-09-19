/**
 * FarmChain Build-time Sitemap Generator
 *
 * Generates sitemap.xml with canonical URLs, accurate lastmod dates,
 * and appropriate change frequencies for search engine crawlers.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = (process.env.VITE_SITE_URL || 'https://farmchain-gamma.vercel.app').replace(/\/$/, '');
const TODAY = new Date().toISOString().split('T')[0];

interface SitemapRoute {
  path: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
}

const PUBLIC_ROUTES: SitemapRoute[] = [
  { path: '', changefreq: 'daily', priority: 1.0 },
  { path: 'market', changefreq: 'hourly', priority: 0.9 },
  { path: 'how-it-works', changefreq: 'monthly', priority: 0.8 },
  { path: 'prices', changefreq: 'hourly', priority: 0.8 },
  { path: 'forecast', changefreq: 'daily', priority: 0.7 },
  { path: 'logistics', changefreq: 'daily', priority: 0.7 },
  { path: 'technology', changefreq: 'monthly', priority: 0.6 },
  { path: 'help', changefreq: 'monthly', priority: 0.6 },
  { path: 'privacy', changefreq: 'yearly', priority: 0.4 },
  { path: 'terms', changefreq: 'yearly', priority: 0.4 },
];

function generateSitemapXml(): string {
  const urls = PUBLIC_ROUTES.map((route) => {
    const loc = route.path ? `${BASE_URL}/${route.path}` : `${BASE_URL}/`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function main() {
  const xml = generateSitemapXml();
  
  // Write to public/ so dev/build always includes it
  const publicPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(publicPath, xml, 'utf8');
  console.log(`✅ Generated ${publicPath}`);

  // Also write to dist/ if dist/ exists
  const distDir = path.resolve(__dirname, '../dist');
  if (fs.existsSync(distDir)) {
    const distPath = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(distPath, xml, 'utf8');
    console.log(`✅ Generated ${distPath}`);
  }
}

main();
