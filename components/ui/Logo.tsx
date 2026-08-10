/**
 * Brand lockup: a minimalist split-disc mark (one half coral = design,
 * one half outlined = code — the designer/developer duality) + serif wordmark.
 *
 * Esta es la versión para la web. La misma marca vive también en
 * components/ui/Mark.tsx, dibujada con divs, porque Satori no rasteriza este
 * arco al generar el favicon. Si cambias la forma, cambia las dos.
 */
type LogoProps = {
  /** El navbar solo muestra el disco; el footer, la marca completa. */
  wordmark?: boolean;
};

export function Logo({ wordmark = true }: LogoProps) {
  return (
    <span className="logo">
      <svg
        className="logo-glyph"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.5" />
        <path className="lg-fill" d="M14 3 A11 11 0 0 0 14 25 Z" />
      </svg>
      {wordmark && (
        <span className="logo-word">
          <span className="logo-word-name">Ana Karina</span>
          <span className="logo-word-sub">Designer &amp; Developer</span>
        </span>
      )}
    </span>
  );
}
