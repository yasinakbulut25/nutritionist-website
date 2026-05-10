/**
 * normalizePath.js
 *
 * Reusable URL normalization utility for the PHP → Next.js migration.
 *
 * Responsibilities:
 *  1. Turkish uppercase character normalization  (İ → i, Ş → s, etc.)
 *  2. General ASCII lowercase normalization
 *  3. Legacy-to-new route mapping (renamed/restructured pages)
 *  4. Dynamic segment pass-through (slugs, category names)
 *
 * This module is intentionally side-effect free so it can be imported in
 * both middleware (Edge Runtime) and regular Node.js contexts.
 */

// ---------------------------------------------------------------------------
// 1. Turkish character map
//    JavaScript's built-in String.prototype.toLowerCase() correctly handles
//    most Unicode characters, but the Turkish capital dotted İ (U+0130) is
//    an edge case: in a non-Turkish locale toLowerCase() may return "i̇"
//    (combining dot) instead of a plain "i".  We handle it explicitly.
// ---------------------------------------------------------------------------
const TURKISH_CHAR_MAP = {
  İ: "i", // capital dotted I  — the classic Turkish locale trap
  I: "i", // capital undotted I — in Turkish this lowercases to "ı", but
  //   PHP legacy URLs used ASCII "I" to represent the /İletisim
  //   route, so we map it to the Latin "i" the new site expects.
  Ş: "s",
  Ğ: "g",
  Ü: "u",
  Ö: "o",
  Ç: "c",
  // Lowercase variants are already correct but listed for completeness;
  // they are never matched because we call toLowerCase() first on non-Turkish
  // chars and these are reached only when the map lookup runs.
  ş: "s",
  ğ: "g",
  ü: "u",
  ö: "o",
  ç: "c",
};

/**
 * Normalizes a URL path segment (or full path) by:
 *  - Replacing Turkish-specific uppercase letters via TURKISH_CHAR_MAP
 *  - Lower-casing the remainder with the standard JS algorithm
 *
 * @param {string} str - A raw URL path string, e.g. "/Hakkimda"
 * @returns {string} - Normalized string, e.g. "/hakkimda"
 */
function lowercaseTurkish(str) {
  // Replace Turkish chars first, then run the native toLowerCase so that
  // all remaining ASCII/Unicode uppercase letters are also handled.
  return str
    .replace(/[İIŞĞÜÖÇşğüöç]/g, (char) => TURKISH_CHAR_MAP[char] ?? char)
    .toLowerCase();
}

// ---------------------------------------------------------------------------
// 2. Legacy route map
//    Keys   → exact old paths that the PHP site served (case-sensitive as
//             they appeared in the wild — after lowercaseTurkish is applied
//             the comparison is always lowercase).
//    Values → the canonical Next.js App Router path.
//
//    Add new entries here whenever a page is renamed or restructured.
//    Dynamic segments (slugs) are handled separately below.
// ---------------------------------------------------------------------------
const LEGACY_ROUTE_MAP = {
  // Add future renamed routes here whenever a page is restructured, e.g.:
  // "/eski-sayfa": "/yeni-sayfa",
};

// ---------------------------------------------------------------------------
// 3. Dynamic-segment prefix map
//    For routes like /Kategoriler/Beslenme → /kategoriler/beslenme we only
//    need to lowercase the path; no structural change is needed.
//    If a prefix ever needs remapping (e.g. /blog → /yazilarim) add it here.
// ---------------------------------------------------------------------------
const LEGACY_PREFIX_MAP = {
  // "/blog": "/yazilarim",  // example of a prefix rename
};

// ---------------------------------------------------------------------------
// 4. Main export
// ---------------------------------------------------------------------------

/**
 * Normalizes a raw request pathname and returns the canonical destination.
 *
 * Algorithm:
 *  a) Decode percent-encoded characters so "%C4%B0" becomes "İ".
 *  b) Apply Turkish + ASCII lowercase normalization.
 *  c) Check the static LEGACY_ROUTE_MAP for an exact match.
 *  d) Check LEGACY_PREFIX_MAP for prefix-based structural renames.
 *  e) Return null if the path is already canonical (no redirect needed).
 *
 * @param {string} pathname - The raw URL pathname from the request.
 * @returns {{ destination: string, permanent: boolean } | null}
 *   Returns a redirect descriptor, or null if no redirect is needed.
 */
export function normalizePath(pathname) {
  // a) Decode percent-encoding so Turkish chars encoded in URLs are visible.
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    // Malformed percent-encoding — treat as-is to avoid 500 errors.
    decoded = pathname;
  }

  // b) Normalize Turkish + general case.
  const normalized = lowercaseTurkish(decoded);

  // c) Exact-match legacy route lookup (after normalization).
  if (LEGACY_ROUTE_MAP[normalized]) {
    const destination = LEGACY_ROUTE_MAP[normalized];
    // Only redirect if the destination actually differs from the original raw path.
    if (destination !== pathname) {
      return { destination, permanent: true };
    }
    return null;
  }

  // d) Prefix-based structural rename.
  for (const [oldPrefix, newPrefix] of Object.entries(LEGACY_PREFIX_MAP)) {
    if (normalized.startsWith(oldPrefix + "/") || normalized === oldPrefix) {
      const destination = newPrefix + normalized.slice(oldPrefix.length);
      if (destination !== pathname) {
        return { destination, permanent: true };
      }
      return null;
    }
  }

  // e) Simple case-normalization only — no structural change.
  if (normalized !== pathname) {
    return { destination: normalized, permanent: true };
  }

  // Path is already canonical.
  return null;
}
