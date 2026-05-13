/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["diyetisyengizemakbulut.com", "panel.diyetisyengizemakbulut.com"],
  },

  // WHY THIS IS NEEDED:
  //
  // isomorphic-dompurify → jsdom@29 → html-encoding-sniffer@6 → @exodus/bytes (pure ESM)
  //
  // html-encoding-sniffer.js (CJS) calls:
  //   require("@exodus/bytes/encoding-lite.js")
  //
  // encoding-lite.js starts with `export { ... }` — it is pure ESM.
  // CJS cannot require() an ESM file unless the Node.js runtime explicitly
  // supports it (added in Node 20.19.0, 22.12.0, 24.0.0).
  //
  // Without this option: webpack tries to statically bundle jsdom and its full
  // dependency tree. It hits @exodus/bytes/index.js (which intentionally throws)
  // and crashes the build. Or it emits a bundle that calls require() on the ESM
  // file at runtime, producing ERR_REQUIRE_ESM on Vercel's older Node runtime.
  //
  // With this option: webpack marks these packages as external — they are NOT
  // bundled. At runtime, Node.js loads them natively. This is safe because
  // isomorphic-dompurify and jsdom are server-only packages (never sent to the
  // browser). Combined with Node 22.x in vercel.json, the native CJS require()
  // of ESM modules works correctly.
  serverExternalPackages: ["isomorphic-dompurify", "jsdom"],
};

export default nextConfig;
