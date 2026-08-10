import { ImageResponse } from "next/og";

import { brand } from "@/lib/brand";
import { siteConfig, siteUrl } from "@/lib/site";

// Convención de archivo Next: genera og:image (y twitter:image) en build.
export const alt = `${siteConfig.name}, ${siteConfig.shortTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * La tarjeta que se ve al pegar el enlace en LinkedIn o WhatsApp. Se lee en un
 * scroll, así que lleva una sola idea grande (diseña y programa, con agentes de
 * IA) y tres pruebas concretas debajo — no una lista de tecnologías.
 */
const PROOF = ["Del diseño al código sin pérdida", "Agentes de IA en producción", "−40% bugs · +23,1% ingresos"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `linear-gradient(135deg, ${brand.ink} 0%, #241a17 55%, ${brand.ink} 100%)`,
          color: brand.paper,
        }}
      >
        {/* Marca: el mismo disco partido del sitio y del favicon. */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              display: "flex",
              borderRadius: 52,
              border: `3px solid ${brand.paper}`,
              overflow: "hidden",
            }}
          >
            <div style={{ width: 26, height: 52, background: brand.accent }} />
          </div>
            <div
              style={{
                fontSize: 24,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#a2958c",
              }}
            >
              {siteConfig.name}
            </div>
          </div>
          <div style={{ fontSize: 23, color: "#6f655e" }}>
            {siteUrl.replace(/^https?:\/\//, "")}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.08 }}>
            Diseño y programo
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              color: brand.accent,
            }}
          >
            el mismo producto
          </div>
          <div style={{ fontSize: 33, marginTop: 22, color: "#c9beb6" }}>
            UX/UI en Figma · Frontend en React y Next.js · Agentes de IA
          </div>
        </div>

        <div style={{ display: "flex", gap: 40, fontSize: 23, color: "#8f847c" }}>
          {PROOF.map((p) => (
            <div key={p} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 7, height: 7, borderRadius: 7, background: brand.accent }} />
              {p}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
