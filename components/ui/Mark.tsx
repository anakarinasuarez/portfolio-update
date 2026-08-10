/**
 * La marca del portfolio para los iconos generados en build (pestaña del
 * navegador y pantalla de inicio de iOS): el disco partido del Logo — mitad
 * coral (diseño), mitad contorno (código).
 *
 * Se dibuja con divs y no con SVG a propósito: Satori, el motor que usa
 * next/og, falla al rasterizar el arco del Logo original.
 */

type MarkProps = {
  /** Lado del lienzo en px. */
  canvas: number;
  /** Diámetro del disco. */
  disc: number;
  /** Grosor del contorno; a tamaño pestaña el 1.5 del Logo desaparece. */
  stroke: number;
};

/** Proporciones del Logo trasladadas al lienzo del icono. */
export function markSize(canvas: number): MarkProps {
  return {
    canvas,
    disc: Math.round(canvas * 0.72),
    stroke: Math.max(2, Math.round(canvas * 0.045)),
  };
}

export function Mark({ canvas, disc, stroke }: MarkProps) {
  return (
    <div
      style={{
        width: canvas,
        height: canvas,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1C1714",
      }}
    >
      <div
        style={{
          width: disc,
          height: disc,
          display: "flex",
          borderRadius: disc,
          border: `${stroke}px solid #F2EDE9`,
          overflow: "hidden",
        }}
      >
        {/* Media luna rellena: la mitad izquierda del disco. */}
        <div style={{ width: disc / 2, height: disc, background: "#EF5143" }} />
      </div>
    </div>
  );
}
