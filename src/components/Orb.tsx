import { clsx } from "clsx";
import { Mark } from "@/components/Mark";

/*
 * The one object in the room. Everything else on the page is a flat pane, so
 * the orb carries the whole sense of depth on its own — which is why it gets
 * five layers and nothing else gets any.
 *
 * All CSS (see globals.css): no image to load, no canvas to mount, and it
 * stays sharp at any size. `markSize` is passed rather than derived because
 * the mark should not scale linearly with the sphere — at hero size it wants
 * to sit small inside the glass, not fill it.
 */
export function Orb({
  className,
  markSize = 96,
  showMark = true,
}: {
  className?: string;
  markSize?: number;
  showMark?: boolean;
}) {
  return (
    <div className={clsx("orb", className)}>
      <div className="orb-bloom" />
      <div className="orb-body" />
      <div className="orb-film" />
      <div className="orb-rim" />
      <div className="orb-cap" />
      {showMark ? (
        <div className="orb-mark">
          <Mark size={markSize} />
        </div>
      ) : null}
    </div>
  );
}

/*
 * The motes around it. Positions, hues and delays are a fixed table, not
 * Math.random: a random field renders differently on the server than on the
 * client and hydration tears. Percentages are of the containing box.
 */
const MOTES = [
  { x: 6, y: 22, size: 7, hue: "var(--mint)", delay: 0 },
  { x: 18, y: 68, size: 5, hue: "var(--blue)", delay: 2.4 },
  { x: 30, y: 8, size: 4, hue: "var(--pink)", delay: 5.1 },
  { x: 44, y: 88, size: 8, hue: "var(--violet)", delay: 1.2 },
  { x: 62, y: 14, size: 5, hue: "var(--amber)", delay: 3.7 },
  { x: 78, y: 74, size: 6, hue: "var(--blue-bright)", delay: 6.3 },
  { x: 90, y: 34, size: 4, hue: "var(--mint)", delay: 4.4 },
  { x: 84, y: 52, size: 9, hue: "var(--pink)", delay: 7.8 },
  { x: 12, y: 46, size: 4, hue: "var(--violet)", delay: 9.1 },
  { x: 52, y: 96, size: 5, hue: "var(--blue)", delay: 8.2 },
] as const;

export function Bokeh({ className }: { className?: string }) {
  return (
    <div className={clsx("pointer-events-none absolute inset-0", className)}>
      {MOTES.map((mote) => (
        <span
          key={`${mote.x}-${mote.y}`}
          className="mote"
          style={{
            left: `${mote.x}%`,
            top: `${mote.y}%`,
            width: mote.size,
            height: mote.size,
            background: mote.hue,
            animationDelay: `${mote.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
