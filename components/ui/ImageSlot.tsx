import Image from "next/image";

type ImageSlotProps = {
  /** Path under /public. When omitted, a styled placeholder renders instead. */
  src?: string;
  alt?: string;
  /** Label shown in the placeholder while no real image is set. */
  placeholder?: string;
  className?: string;
  shape?: "rect" | "square";
  priority?: boolean;
  sizes?: string;
  /** Decorative slots (hero floats) are hidden from assistive tech. */
  decorative?: boolean;
};

/**
 * Drop-in replacement for the design's `<image-slot>` web component.
 * Renders a real optimized image when `src` is provided, otherwise a
 * branded placeholder box so the layout reads intentionally until the
 * final asset is added under /public.
 */
export function ImageSlot({
  src,
  alt,
  placeholder,
  className,
  shape = "rect",
  priority = false,
  sizes = "(max-width: 768px) 90vw, 45vw",
  decorative = false,
}: ImageSlotProps) {
  return (
    <span
      className={`img-slot${className ? ` ${className}` : ""}`}
      data-shape={shape}
      aria-hidden={decorative || undefined}
    >
      {src ? (
        <Image
          src={src}
          alt={decorative ? "" : (alt ?? placeholder ?? "")}
          fill
          sizes={sizes}
          className="img-slot-img"
          priority={priority}
        />
      ) : (
        <span className="img-slot-ph">{placeholder}</span>
      )}
    </span>
  );
}
