import { ImageResponse } from "next/og";

import { Mark, markSize } from "@/components/ui/Mark";

// Icono para la pantalla de inicio de iOS.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<Mark {...markSize(size.width)} />, { ...size });
}
