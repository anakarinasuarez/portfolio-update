/**
 * Brand lockup: a minimalist split-disc mark (one half coral = design,
 * one half outlined = code — the designer/developer duality) + serif wordmark.
 */
export function Logo() {
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
      <span className="logo-word">
        <span className="logo-word-name">Ana Karina</span>
        <span className="logo-word-sub">Designer &amp; Developer</span>
      </span>
    </span>
  );
}
