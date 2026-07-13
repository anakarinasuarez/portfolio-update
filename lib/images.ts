/**
 * Mapa central de imágenes (bajo /public/images).
 * Todas en WebP (lossless en gráficas/mockups; el retrato a q92, visualmente
 * idéntico). Sustituye o amplía estas rutas cuando cambien los assets.
 * Un valor `undefined` hace que <ImageSlot> muestre su placeholder.
 */
export const IMAGES = {
  // Retrato del hero + Person JSON-LD.
  portrait: "/images/image-me.webp",

  // Capturas de los proyectos del carrusel de trabajo.
  work: {
    deepfilm: "/images/deepfilm-collage.webp", // collage del proyecto DeepFilm
    evopos: "/images/evolution-pos.webp", // showcase de 3 pantallas de la app
    chef: "/images/chef-at-home.webp", // mockup de portátil — detalle de receta
    readeasily: "/images/read-easy.webp", // case study board de la app
  },

  // Fotos flotantes decorativas del hero (se reciclan; el orden no importa).
  floats: [
    "/images/image-3.webp",
    "/images/claude-figma.webp",
    "/images/chef-at-home.webp",
  ],
} as const;
