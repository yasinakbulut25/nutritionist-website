/**
 * middleware.js  —  Next.js Edge Middleware
 *
 * Purpose
 * -------
 * Issues permanent 301 redirects for all legacy PHP URLs so that:
 *  • Users who bookmarked old mixed-case URLs are transparently forwarded.
 *  • Search engine link equity (PageRank) flows from old URLs to new ones.
 *  • No duplicate-content penalty: Google sees one authoritative URL per page.
 *
 * Why 301 and not 302?
 * --------------------
 * A 302 (temporary) redirect tells crawlers "keep indexing the old URL".
 * A 301 (permanent) redirect signals "transfer all SEO signals to the new URL".
 * Google typically consolidates link equity within a few crawl cycles after
 * seeing 301s, which preserves ranking signals accumulated by the old site.
 *
 * How Google handles migrated URLs
 * ---------------------------------
 * 1. Googlebot encounters the old URL (from external links, sitemaps, etc.).
 * 2. Middleware returns HTTP 301 + Location header pointing to the new URL.
 * 3. Googlebot follows the redirect and indexes the new URL.
 * 4. The old URL is removed from the index and its PageRank is credited to
 *    the new URL (process takes days to weeks depending on crawl budget).
 * 5. After consistent 301s, Google stops crawling the old URL entirely.
 *
 * Edge cases & known problems
 * ---------------------------
 * • Redirect loops: prevented by checking that normalized !== original before
 *   redirecting, and by the matcher excluding /_next/* and /api/*.
 * • Infinite loops from the Online-Diyet-Form folder: the Next.js file-system
 *   router is case-insensitive on macOS but case-sensitive on Linux (Vercel).
 *   We redirect /Online-Diyet-Form → /online-diyet-form consistently.
 * • Percent-encoded Turkish chars: decodeURIComponent is called before
 *   comparison so "%C4%B0letisim" and "İletisim" are treated identically.
 * • Query string & hash: NextResponse.redirect preserves the full URL object;
 *   we only rewrite the pathname, so ?query=string is kept intact.
 * • Vercel edge network: middleware runs at the CDN edge before the origin,
 *   so the redirect costs ~0ms and does not hit the Node.js server.
 */

import { NextResponse } from "next/server";
import { normalizePath } from "@/lib/normalizePath";

/**
 * Paths that must NEVER be intercepted by this middleware.
 * Next.js's `matcher` config (below) is the primary filter, but we add a
 * belt-and-suspenders runtime guard for clarity and safety.
 */
const BYPASS_PREFIXES = [
  "/_next/",  // Next.js internal asset pipeline
  "/api/",    // API route handlers — must not be redirected
];

/**
 * File extensions whose requests should pass through without redirect checks.
 * These are static assets served from the /public directory.
 */
const STATIC_EXTENSIONS = new Set([
  ".ico", ".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".avif",
  ".woff", ".woff2", ".ttf", ".otf", ".eot",
  ".css", ".js", ".map",
  ".xml", ".txt", ".json",
  ".pdf", ".zip",
]);

/**
 * Determines whether a pathname points to a static asset that should
 * bypass redirect logic entirely.
 *
 * @param {string} pathname
 * @returns {boolean}
 */
function isStaticAsset(pathname) {
  const lastSegment = pathname.split("/").at(-1) ?? "";
  const dotIndex = lastSegment.lastIndexOf(".");
  if (dotIndex === -1) return false;
  const ext = lastSegment.slice(dotIndex).toLowerCase();
  return STATIC_EXTENSIONS.has(ext);
}

/**
 * Main middleware function — called by Next.js for every matched request.
 *
 * @param {import("next/server").NextRequest} request
 * @returns {NextResponse}
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // ── Guard 1: bypass internal Next.js and API paths ─────────────────────
  for (const prefix of BYPASS_PREFIXES) {
    if (pathname.startsWith(prefix)) return NextResponse.next();
  }

  // ── Guard 2: bypass static file requests ───────────────────────────────
  if (isStaticAsset(pathname)) return NextResponse.next();

  // ── Core redirect logic ─────────────────────────────────────────────────
  const redirect = normalizePath(pathname);

  if (!redirect) {
    // Path is already canonical — serve normally.
    return NextResponse.next();
  }

  // Build the redirect URL by cloning the incoming URL and replacing only
  // the pathname.  This preserves protocol, host, port, query string, etc.
  const url = request.nextUrl.clone();
  url.pathname = redirect.destination;

  // Loop-prevention safety check: if destination equals origin, pass through.
  // This should never happen given the normalizePath logic, but defensive
  // coding here prevents an infinite redirect loop on misconfiguration.
  if (url.pathname === pathname) {
    return NextResponse.next();
  }

  return NextResponse.redirect(url, {
    status: redirect.permanent ? 308 : 307,
    // NOTE: We use 308 (Permanent Redirect) instead of 301 because HTTP 301
    // historically allowed browsers to downgrade POST → GET on redirect.
    // 308 preserves the HTTP method, which matters for form submissions.
    // Both 301 and 308 are treated identically by Google for SEO purposes.
    // If you specifically need 301 for compatibility with older crawlers,
    // change 308 → 301 and 307 → 302.
  });
}

/**
 * Matcher configuration
 * ----------------------
 * The `matcher` array tells Next.js which request paths should invoke this
 * middleware.  It runs at the CDN edge BEFORE the page is rendered, so an
 * overly broad matcher adds latency to every request.
 *
 * Pattern breakdown:
 *  "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"
 *   └─ Match everything EXCEPT:
 *       _next/static  — compiled JS/CSS bundles
 *       _next/image   — Next.js Image Optimization API
 *       favicon.ico   — browser favicon request
 *       .*\\..*       — any path containing a dot (static file heuristic)
 *
 * This is the recommended pattern from the Next.js docs for middleware that
 * should run on all page routes but skip static assets.
 */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
