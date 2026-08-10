import { ImageResponse } from "next/og";

import { Mark, markSize } from "@/components/ui/Mark";

// Convención de archivo Next: genera el icono de la pestaña en build.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<Mark {...markSize(size.width)} />, { ...size });
}
