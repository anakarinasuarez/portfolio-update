@AGENTS.md

# Portfolio

Portfolio profesional de frontend developer + UX/UI designer.
Objetivo: conseguir entrevistas. Prioridades: claridad, velocidad, SEO, a11y.

## Stack
- Next.js (App Router) + TypeScript estricto.
- Server Components por defecto; "use client" solo cuando sea imprescindible.
- Fuentes con next/font, imágenes con next/image.
- Idiomas: español e inglés (i18n).
- Deploy: Vercel.

## Estilado (IMPORTANTE — leer antes de tocar estilos)
- El estilado real es **CSS semántico + design tokens**, NO utilidades de Tailwind.
  Tailwind v4 está instalado solo como base (reset/preflight vía `@import "tailwindcss"`).
- Estilos en `app/styles/`: `tokens.css` (design system), `sections.css`, `fx.css`, `chat.css`.
- Los componentes usan clases semánticas (`className="ed-cap ed-cap-l"`), nunca strings
  de utilidades (`flex p-4 text-center`). NO mezclar los dos paradigmas en un componente.
- Todos los valores salen de tokens: `var(--accent)`, `var(--font-grotesk)`, `var(--ease)`, etc.

## Design system
- Definido en `app/styles/tokens.css`: tipografía, superficies, texto, acento, spacing,
  radius y easing como variables CSS.
- Dos direcciones visuales por `[data-direction]` (Editorial Noir · Technical Mono) y
  temas de acento por `[data-accent]` en `<html>`.

## Documentación (Context7 MCP) — OBLIGATORIO
- ANTES de escribir código que use un framework o librería, consulta Context7.
  No confíes en tu conocimiento previo para APIs de Next.js, React o Tailwind.
- IDs directos: /vercel/next.js · /tailwindlabs/tailwindcss · /facebook/react
- Si una librería no está indexada, dilo y usa búsqueda web; nunca inventes APIs.

## Estándares de código
- Componentes pequeños (<150 líneas), reutilizables, sin lógica duplicada.
- Tipado estricto, sin `any`. Nombres descriptivos.
- HTML semántico, accesibilidad AA, navegación completa por teclado.

## SEO técnico (en todas las páginas)
- Metadata API de Next.js, Open Graph + Twitter cards, canonical.
- JSON-LD (Person + WebSite), sitemap.xml, robots.txt.

## Flujo de trabajo por sección
1. El usuario aporta el diseño (imagen/Figma/descripción). NO diseñes por tu cuenta.
2. design-guardian extrae/verifica tokens del design system y marca issues de a11y.
3. frontend-senior consulta Context7 e implementa con fidelidad exacta al diseño
   (spacing, tipografía y colores exactos, no aproximados).
4. code-reviewer y seo-marketing verifican.
5. Itera hasta pasar TODOS los criterios de aceptación. No cierres antes.

## Criterios de aceptación
- `npm run build` y `npx tsc --noEmit` sin errores ni warnings.
- Lighthouse (mobile) ≥ 95 en Performance, SEO y Accessibility.
- 0 errores de accesibilidad, foco visible, navegación por teclado.
- Metadata, JSON-LD y OG verificados.
- Fidelidad al diseño aportado.
