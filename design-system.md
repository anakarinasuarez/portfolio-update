# Design System — Portfolio Ana Karina Suárez

Fuente de verdad: **`app/styles/tokens.css`**. Este documento describe los tokens;
si cambias un valor, cámbialo en `tokens.css`, no aquí.

- Todos los estilos son **CSS semántico + design tokens** (variables CSS). No se usan
  utilidades de Tailwind (instalado solo como base/preflight).
- Los valores se consumen siempre como `var(--token)`, nunca literales, salvo en efectos
  puntuales (ver [Excepciones](#excepciones-valores-no-tokenizados)).
- Theming en `<html>` mediante `[data-direction]` (dirección visual) y `[data-accent]`
  (color de acento).

---

## Tipografía

| Token | Valor | Uso |
|-------|-------|-----|
| `--font-serif` | Instrument Serif → Georgia | Display editorial |
| `--font-sans` | Manrope → system-ui | Cuerpo de texto |
| `--font-mono` | JetBrains Mono → ui-monospace | Eyebrows, etiquetas, código |
| `--font-grotesk` | Space Grotesk → system-ui | Títulos "mono", botones |
| `--font-display` | = `--font-serif` (editorial) / `--font-grotesk` (mono) | Títulos de sección |
| `--display-weight` | `400` editorial / `600` mono | Peso del display |
| `--display-tracking` | `-0.01em` / `-0.03em` | Tracking del display |
| `--eyebrow-tracking` | `0.22em` / `0.28em` | Tracking de eyebrows |

Las familias se enlazan a `next/font` en `app/layout.tsx`.

**Escala** (definida en clases, no en tokens):
- Body: `17px` / line-height `1.6`
- Eyebrow: `12px` uppercase
- Section title: `clamp(38px, 6vw, 76px)`

---

## Color

### Superficies

| Token | Editorial Noir | Technical Mono |
|-------|----------------|----------------|
| `--bg` | `oklch(0.15 0.006 60)` | `oklch(0.155 0.008 260)` |
| `--bg-2` | `oklch(0.18 0.007 60)` | `oklch(0.185 0.009 260)` |
| `--bg-3` | `oklch(0.21 0.008 60)` | `oklch(0.215 0.01 260)` |
| `--line` | `oklch(0.30 0.01 60)` | `oklch(0.31 0.012 260)` |
| `--line-soft` | `oklch(0.26 … / 0.6)` | `oklch(0.27 … / 0.6)` |
| `--grid-line` | `transparent` | `oklch(0.27 0.01 260 / 0.5)` |

### Texto

| Token | Editorial | Mono |
|-------|-----------|------|
| `--text` | `oklch(0.95 0.006 70)` | `oklch(0.96 0.004 250)` |
| `--text-dim` | `oklch(0.74 0.008 70)` | `oklch(0.74 0.008 250)` |
| `--text-faint` | `oklch(0.55 0.008 70)` | `oklch(0.55 0.01 250)` |

### Acento (coral por defecto)

| Token | Valor por defecto | Uso |
|-------|-------------------|-----|
| `--accent` | `#EF5143` | Color principal de marca |
| `--accent-bright` | `#ff6d5f` | Hover / énfasis |
| `--accent-dim` | `rgba(239,81,67,0.14)` | Fondos suaves |
| `--accent-line` | `rgba(239,81,67,0.42)` | Bordes de acento |
| `--accent-ink` | `#fff` | Texto sobre acento |

Variantes por `[data-accent]`: `blue` (oklch 245), `amber` (oklch 72), `cream` (= coral).

---

## Layout & espaciado

| Token | Valor | Uso |
|-------|-------|-----|
| `--maxw` | `1240px` | Ancho máximo del contenido (`.wrap`) |
| `--gutter` | `clamp(20px, 5vw, 72px)` | Padding lateral del contenedor |
| `--radius` | `18px` | Radio base |
| Section padding | `clamp(80px, 12vh, 160px)` | Espaciado vertical de sección |

---

## Motion

| Token | Valor | Uso |
|-------|-------|-----|
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | Curva de easing compartida |

- Reveal on scroll: `.reveal` → `.reveal.in` (fade + translateY).
- Respeta `prefers-reduced-motion` y `[data-motion="off"]` / `html.anim-frozen`.

---

## Theming (atributos en `<html>`)

| Atributo | Valores | Efecto |
|----------|---------|--------|
| `data-direction` | `editorial` (Noir) · `mono` (Technical) | Cambia display, superficies, radios de botón |
| `data-accent` | (coral) · `blue` · `amber` · `cream` | Cambia la familia de acento |
| `data-motion` | `on` · `off` | Desactiva reveals/animaciones |
| `data-grain` | (on) · `off` | Oculta el overlay de grano |

---

## Utilidades y componentes base (en `tokens.css`)

- `.wrap` — contenedor centrado con `--maxw` + `--gutter`.
- `.section` — sección con padding vertical fluido + separadores en gradiente.
- `.eyebrow` — etiqueta mono con línea de acento.
- `.section-title` — título display responsive.
- `.btn` / `.btn-primary` / `.btn-ghost` — botones (pill en editorial, `8px` en mono).
- `.reveal` — animación de entrada al hacer scroll.
- `.grain` — overlay de textura (SVG en data-URI).
- `.img-slot` — contenedor de imagen con placeholder (usado por `<ImageSlot/>`).

---

## Excepciones (valores no tokenizados)

No todo está tokenizado, y es intencional: los **efectos puntuales** usan valores
literales porque no forman parte del sistema reutilizable. Concretamente en
`sections.css`:

- Sombras de profundidad (`rgba(0,0,0,x)` en `box-shadow` / `text-shadow`).
- Scrims y degradados cinematográficos (`rgba(8,6,10,x)`).
- Glare/sheen que sigue el cursor (`rgba(255,255,255,x)`).
- Puntos de la ventana de navegador (`#ff5f57`, `#febc2e`, `#28c840`).
- Crema editorial local (`--ed-cream`, definida en el propio `.ed-stage`).

> Regla: **superficies, texto, acento, tipografía, spacing, radius y easing → siempre
> token**. Un efecto visual único y no repetido puede usar un literal local.
