import type { Metadata } from "next";
import { CaseEvolutionPos } from "@/components/sections/CaseEvolutionPos";

export const metadata: Metadata = {
  title: "Evolution POS · Case study",
  description:
    "Case study — Evolution POS: table-side ordering & payment for restaurants, plus a token-based design system. UX/UI design and frontend by Ana Karina Suárez.",
  alternates: { canonical: "/proyectos/evolution-pos" },
  openGraph: {
    title: "Evolution POS · Case study",
    description:
      "Table-side ordering & payment for restaurants, plus a token-based design system.",
    url: "/proyectos/evolution-pos",
    type: "article",
  },
};

export default function EvolutionPosCasePage() {
  return <CaseEvolutionPos />;
}
