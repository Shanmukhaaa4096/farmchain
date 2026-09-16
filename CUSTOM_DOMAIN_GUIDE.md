# FarmChain - Custom Domain Setup & Configuration Guide

This guide provides step-by-step instructions for attaching a custom domain (e.g., `farmchain.in`, `farmchain.org`, or `farmchain.io`) to your deployed Vercel application (`farmchain-gamma.vercel.app`).

---

## 1. Domain Registrar Configuration (DNS Records)

Log in to your domain registrar (GoDaddy, Namecheap, Cloudflare, Google Domains/Squarespace) and access the DNS Management console for your domain.

### Option A: Recommended Setup (Apex + Subdomain)

| Type | Name / Host | Value / Target | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` (or empty) | `76.76.21.21` | Automatic / 300 | Points apex domain directly to Vercel global edge network |
| **CNAME** | `www` | `cname.vercel-dns.com.` | Automatic / 300 | Routes `www` traffic to Vercel with seamless HTTPS cert |

### Option B: Dedicated Subdomain (e.g. `app.farmchain.in`)

| Type | Name / Host | Value / Target | TTL |
| :--- | :--- | :--- | :--- |
| **CNAME** | `app` | `cname.vercel-dns.com.` | 300 |

---

## 2. Vercel Dashboard Configuration

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Select the **`farmchain`** project (or corresponding deployment name).
3. Navigate to **Settings** → **Domains**.
4. In the text field, enter your custom domain (e.g., `farmchain.in`).
5. Click **Add**.
6. When prompted, choose the redirect preference:
   - **Recommended:** Add `farmchain.in` and automatically redirect `www.farmchain.in` to `farmchain.in` (or vice versa).
7. Vercel will automatically verify the DNS records. Once verified:
   - Status badge will change from "Pending Verification" to "Valid Configuration".
   - Automatic Let's Encrypt / ZeroSSL TLS Certificate will be issued within 60 seconds.

---

## 3. Cloudflare Proxy Considerations (If using Cloudflare DNS)

If your domain is managed through Cloudflare:
- Set the DNS record proxy status to **DNS Only (Gray Cloud)** during initial verification.
- In Cloudflare SSL/TLS settings, set SSL mode to **Full (Strict)**.
- Once Vercel shows "Valid Configuration", you can re-enable Cloudflare proxy (Orange Cloud) if DDoS protection and edge caching are required.

---

## 4. Post-Setup Verification Checklist

Run these command-line checks to confirm routing and SSL enforcement:

```bash
# Verify DNS A record points to Vercel Edge IP
nslookup yourdomain.com

# Verify CNAME for www
nslookup www.yourdomain.com

# Verify HTTP to HTTPS 301 redirection & HSTS response headers
curl -I https://yourdomain.com
```

Look for:
- `HTTP/2 200` or `HTTP/1.1 200 OK`
- `strict-transport-security: max-age=63072000; includeSubDomains; preload`
- `x-content-type-options: nosniff`
- `x-frame-options: DENY`

---

## 5. Canonical & Sitemap URL Update

After attaching the custom domain:
1. Update `<link rel="canonical" href="https://yourdomain.com/" />` in `index.html`.
2. Update `<loc>https://yourdomain.com/...</loc>` in `public/sitemap.xml`.
3. Update `Sitemap: https://yourdomain.com/sitemap.xml` in `public/robots.txt`.
4. Resubmit the sitemap to **Google Search Console** and **Bing Webmaster Tools**.
