import type { NextConfig } from "next";

/** Un año. Solo para assets cuyo nombre cambia si cambia el contenido. */
const ONE_YEAR = 60 * 60 * 24 * 365;

const nextConfig: NextConfig = {
  // Fija la raíz del proyecto: hay otro lockfile en el home del usuario y
  // Turbopack, si no, infiere mal el workspace root.
  turbopack: {
    root: __dirname,
  },

  images: {
    // AVIF pesa ~20% menos que WebP; el navegador que no lo soporte recibe
    // WebP por el header Accept, así que no hay riesgo de quedarse sin imagen.
    formats: ["image/avif", "image/webp"],
    // Las fotos del portfolio no cambian a diario. Sin esto, Next reoptimiza
    // cada 4 horas y se pierde la caché en cada visita nueva.
    minimumCacheTTL: ONE_YEAR,
  },

  // Cabecera X-Powered-By: revela el framework y no aporta nada.
  poweredByHeader: false,

  async headers() {
    return [
      {
        // Los CV son ficheros estables y pesados (340 KB cada uno): que el
        // navegador no los vuelva a descargar en cada visita.
        source: "/cvs/:file*",
        headers: [{ key: "Cache-Control", value: `public, max-age=${ONE_YEAR}, immutable` }],
      },
      {
        source: "/:path*",
        headers: [
          // Impide que el navegador adivine el tipo de un fichero y lo
          // ejecute como algo que no es.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // No filtrar la URL completa del portfolio a sitios externos.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // El portfolio no necesita cámara, micrófono ni ubicación.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
