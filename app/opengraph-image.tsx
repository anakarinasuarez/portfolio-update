import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

// Convención de archivo Next: genera og:image (y twitter:image) en build.
export const alt = `${siteConfig.name} — ${siteConfig.shortTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "linear-gradient(135deg, #1c1714 0%, #241a17 55%, #1c1714 100%)",
          color: "#f2ede9",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#ff6d5f",
          }}
        >
          <div style={{ width: 44, height: 3, background: "#EF5143" }} />
          Sevilla · Remote
        </div>
        <div
          style={{
            fontSize: 82,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginTop: 28,
            lineHeight: 1.05,
          }}
        >
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 40, marginTop: 20, color: "#c9beb6" }}>
          {siteConfig.shortTitle}
        </div>
        <div
          style={{
            fontSize: 27,
            marginTop: 40,
            color: "#8f847c",
            display: "flex",
          }}
        >
          React · Next.js · TypeScript · Design Systems · AI workflows
        </div>
      </div>
    ),
    { ...size },
  );
}
