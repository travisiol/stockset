/*
 * Every section opens the same way: a mono label, a tight display line, and
 * one paragraph. Repeating the rhythm exactly is what lets the sections
 * differ in content without the page feeling assembled from parts.
 */
export function SectionHead({
  label,
  title,
  lead,
}: {
  label: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="type-label">{label}</p>
      <h2 className="type-section mt-4 text-balance">{title}</h2>
      {lead ? <p className="type-lead mt-5 text-pretty">{lead}</p> : null}
    </div>
  );
}
