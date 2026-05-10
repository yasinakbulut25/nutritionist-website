"use client";

import DOMPurify from "isomorphic-dompurify";

/**
 * SafeHtml
 *
 * Drop-in replacement for:
 *   <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
 *
 * Usage:
 *   <SafeHtml html={data} className="..." />
 *
 * Why "use client":
 *   isomorphic-dompurify pulls in jsdom → html-encoding-sniffer → @exodus/bytes
 *   which is a pure-ESM package. Webpack cannot bundle CJS packages that
 *   require() ESM files without ERR_REQUIRE_ESM on Vercel's Node runtime.
 *   Marking this component as a Client Component moves the import out of the
 *   server bundle entirely — webpack only bundles it for the browser, where
 *   DOMPurify uses the native DOM and never needs jsdom at all.
 */
export default function SafeHtml({ html, as: Tag = "div", className, ...rest }) {
  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html ?? "") }}
      {...rest}
    />
  );
}
