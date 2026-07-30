"use client";

import dynamic from "next/dynamic";

// The chat widget is a floating, below-the-fold enhancement — not needed for the
// first paint or SEO. Load it client-side only, after hydration, so its JS never
// competes with the initial render.
const Chat = dynamic(() => import("./Chat").then((m) => m.Chat), { ssr: false });

export function ChatLazy() {
  return <Chat />;
}
