"use client";
import { createContext, useContext, useRef } from "react";
import type { CV, PhotoBox } from "@/lib/types";
export const PhotoEdit = createContext<{ zoom: number; onChange: (b: PhotoBox) => void } | null>(null);
type Drag = { x: number; y: number; dx: number; dy: number; sc: number; mode: "move" | "size" };

/** Profile photo. In the builder preview it can be dragged (move) and resized (corner dot). */
export function Photo({ cv, base, imgClass = "", wrapClass = "" }: { cv: CV; base: number; imgClass?: string; wrapClass?: string }) {
  const ed = useContext(PhotoEdit); const drag = useRef<Drag | null>(null); const b = cv.photoBox;
  if (!cv.photo) return null;
  const start = (mode: Drag["mode"]) => (e: React.PointerEvent<HTMLElement>) => {
    if (!ed) return; e.preventDefault(); e.stopPropagation(); e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, dx: b.dx, dy: b.dy, sc: b.scale, mode };
  };
  const move = (e: React.PointerEvent<HTMLElement>) => {
    const d = drag.current; if (!d || !ed) return; e.stopPropagation();
    const ddx = (e.clientX - d.x) / ed.zoom, ddy = (e.clientY - d.y) / ed.zoom;
    if (d.mode === "move") ed.onChange({ ...b, dx: Math.round(d.dx + ddx), dy: Math.round(d.dy + ddy) });
    else ed.onChange({ ...b, scale: +Math.min(3, Math.max(0.4, (base * d.sc + Math.max(ddx, ddy)) / base)).toFixed(2) });
  };
  const end = (e: React.PointerEvent<HTMLElement>) => { if (drag.current) e.stopPropagation(); drag.current = null; };
  const size = base * b.scale;
  return (
    <div className={`relative z-10 shrink-0 ${ed ? "cursor-move outline outline-2 outline-offset-2 outline-transparent hover:outline-violet-500" : ""} ${wrapClass}`}
      style={{ width: size, height: size, transform: `translate(${b.dx}px, ${b.dy}px)`, touchAction: ed ? "none" : undefined }}
      onPointerDown={start("move")} onPointerMove={move} onPointerUp={end} onPointerCancel={end}>
      <img src={cv.photo} alt="" draggable={false} className={`h-full w-full select-none object-cover ${imgClass}`} />
      {ed && <span onPointerDown={start("size")} onPointerMove={move} onPointerUp={end} onPointerCancel={end}
        className="absolute -bottom-1.5 -right-1.5 h-3.5 w-3.5 cursor-nwse-resize rounded-full border-2 border-white bg-violet-600 shadow" style={{ touchAction: "none" }} />}
    </div>
  );
}
