import { exampleSets, type StockSet } from "@/lib/sets";
import { SectionHead } from "@/components/SectionHead";

/*
 * Accent per card, applied as light rather than as paint: a blurred wash in
 * the top corner of the pane, the same trick the aurora uses on the page.
 * The card surface itself stays the same neutral glass as every other one,
 * so four cards side by side read as one material in four lights.
 */
const accents: Record<StockSet["accent"], string> = {
  blue: "var(--blue)",
  violet: "var(--violet)",
  mint: "var(--mint)",
  pink: "var(--pink)",
};

function SetCard({ set }: { set: StockSet }) {
  const shown = set.holdings.slice(0, 6);
  const rest = set.holdings.length - shown.length;

  return (
    <article className="glass glass-hover relative overflow-hidden p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full opacity-30 blur-[64px]"
        style={{ background: accents[set.accent] }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="type-num text-[19px] tracking-[-0.01em] text-text">
            {set.symbol}
          </p>
          <p className="mt-0.5 text-[14px] text-soft">{set.name}</p>
        </div>
        <span className="type-label rounded-full border border-line px-2.5 py-1 text-[10px]">
          Example
        </span>
      </div>

      <p className="relative mt-4 text-[14.5px] leading-relaxed text-soft text-pretty">
        {set.thesis}
      </p>

      <ul className="relative mt-5 flex flex-wrap gap-1.5">
        {shown.map((holding) => (
          <li key={holding.symbol} className="chip" title={holding.name}>
            {holding.symbol}
          </li>
        ))}
        {rest > 0 && <li className="chip text-mute">+{rest}</li>}
      </ul>

      <dl className="relative mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-white/6">
        <div className="bg-ink/50 px-4 py-3">
          <dt className="type-label text-[10px]">Holdings</dt>
          <dd className="type-num mt-1 text-[15px]">{set.holdings.length}</dd>
        </div>
        <div className="bg-ink/50 px-4 py-3">
          <dt className="type-label text-[10px]">Weighting</dt>
          <dd className="mt-1 text-[13.5px] text-soft">{set.weighting}</dd>
        </div>
      </dl>
    </article>
  );
}

export function Sets() {
  return (
    <section id="sets" className="reveal px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          label="Sets"
          title="A set is a rule, not a fund"
          lead="Name the holdings and how they are weighted, and that definition becomes a token. Anyone can hold it; anyone can redeem it back into the underlying positions."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {exampleSets.map((set) => (
            <SetCard key={set.symbol} set={set} />
          ))}
        </div>

        <p className="mt-6 text-[12.5px] text-mute">
          These four are illustrations of the format, not products on offer.
          The tickers and company names are matters of record; the groupings
          are ours; none of them has been deployed, and no price, weighting
          drift or performance figure is attached to any of them.
        </p>
      </div>
    </section>
  );
}
