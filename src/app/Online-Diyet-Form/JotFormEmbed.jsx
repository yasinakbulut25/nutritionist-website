"use client";

import Script from "next/script";

export default function JotFormEmbed() {
  return (
    <div className="relative" style={{ margin: "7rem 0 2rem 0" }}>
      <iframe
        id="JotFormIFrame-250124941468053"
        title="Online Diyet Form"
        onLoad={() => window.parent.scrollTo(0, 0)}
        allowtransparency="true"
        allow="geolocation; microphone; camera; fullscreen"
        src="https://form.jotform.com/250124941468053"
        style={{
          minWidth: "100%",
          maxWidth: "100%",
          height: "539px",
          border: "none",
          display: "block",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          height: "60px",
          background: "#edf1fd",
        }}
      />
      <Script
        src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.jotformEmbedHandler(
            "iframe[id='JotFormIFrame-250124941468053']",
            "https://form.jotform.com/",
          );
        }}
      />
    </div>
  );
}
