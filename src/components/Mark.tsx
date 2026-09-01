/*
 * The mark: two circles overlapping, with the lens between them solid.
 *
 * It is a set diagram, which is the whole product in one glyph — separate
 * holdings, one intersection you can actually hold. Deliberately not a
 * lettermark: an initial in a sphere is what every token on this chain
 * already looks like.
 *
 * Geometry is exact rather than eyeballed. Circles of r=8.2 centred at
 * (12,16) and (20,16) meet at x=16, y=16±√(8.2²−4²) — the two arc endpoints
 * below.
 */
export function Mark({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="16"
        r="8.2"
        stroke="currentColor"
        strokeWidth="1.7"
        opacity="0.75"
      />
      <circle
        cx="20"
        cy="16"
        r="8.2"
        stroke="currentColor"
        strokeWidth="1.7"
        opacity="0.75"
      />
      <path
        d="M16 8.84A8.2 8.2 0 0 1 16 23.16A8.2 8.2 0 0 1 16 8.84Z"
        fill="currentColor"
      />
    </svg>
  );
}
