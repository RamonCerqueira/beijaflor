"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function VLibrasWidget() {
  useEffect(() => {
    // Create the VLibras markup dynamically to avoid TSX type errors and hydration issues
    const containerId = "vlibras-widget-container";
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      container.innerHTML = `
        <div vw="true" class="enabled">
          <div vw-access-button="true" class="active"></div>
          <div vw-plugin-wrapper="true">
            <div class="vw-plugin-top-wrapper"></div>
          </div>
        </div>
      `;
      document.body.appendChild(container);
    }
  }, []);

  return (
    <Script
      src="https://vlibras.gov.br/app/vlibras-plugin.js"
      strategy="afterInteractive"
      onLoad={() => {
        try {
          // @ts-ignore
          if (window.VLibras) {
            // @ts-ignore
            new window.VLibras.Widget("https://vlibras.gov.br/app");
          }
        } catch (e) {
          console.error("Erro ao inicializar o widget VLibras:", e);
        }
      }}
    />
  );
}
