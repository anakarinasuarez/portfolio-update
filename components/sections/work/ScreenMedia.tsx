import { ImageSlot } from "@/components/ui/ImageSlot";
import type { Project } from "@/lib/projects";

export function ScreenMedia({ p }: { p: Project }) {
  return (
    <ImageSlot
      className="sc-slot"
      shape="rect"
      src={p.img}
      sizes="(max-width: 768px) 92vw, 960px"
      placeholder={"Drop a screenshot: " + p.title}
    />
  );
}
