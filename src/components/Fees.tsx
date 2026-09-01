import { SectionHead } from "@/components/SectionHead";
import { feeSplit, feesPublished } from "@/lib/site-config";

/*
 * The fee split, drawn as a bar.
 *
 * The percentages are a launch parameter that has not been decided, and this
 * is exactly the kind of figure a reader would take away and act on — so the
 * bar refuses to guess. With the env vars unset it renders as three equal
 * neutral segments, each labelled "not set", and says so underneath. Set
 * NEXT_PUBLIC_STOCKSET_FEE_* and it becomes a real chart with no code change.
 */
const parties = [
  {
    key: "creator" as const,
    title: "Set creator",
    body: "Whoever defined the set, paid for as long as the set trades.",
    color: "var(--blue)",
  },
  {
    key: "liquidity" as const,
    title: "Liquidity",
    body: "The depth that lets the set be entered and exited at a sane price.",
    color: "var(--violet)",
  },
  {
    key: "protocol" as const,
    title: "Protocol",
    body: "Keeping the contracts, the rebalancer and the front end running.",
    color: "var(--mint)",
  },
];

export function Fees() {
  return (
    <section id="fees" className="reveal px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          label="Fees"
          title="The person who defines a set gets paid for it"
          lead="An index is an idea about what belongs together. On an exchange that idea is free to copy; here it is a contract with a fee route attached, and the route does not expire when its author stops paying attention."
        />

        <div className="glass mt-12 p-7 sm:p-9">
          <div className="flex items-baseline justify-between gap-4">
            <p className="type-label">Split of each trade</p>
            <p className="type-num text-[13px] text-mute">
              {feesPublished ? "Configured" : "Not set"}
            </p>
          </div>

          <div className="mt-4 flex h-3 gap-1 overflow-hidden rounded-full">
            {parties.map((party) => (
              <div
                key={party.key}
                className="flex-1 rounded-full"
                style={{
                  background: feesPublished
                    ? party.color
                    : "rgba(255,255,255,0.09)",
                  flexGrow: feesPublished
                    ? Number(feeSplit[party.key])
                    : undefined,
                }}
              />
            ))}
          </div>

          <dl className="mt-8 grid gap-6 sm:grid-cols-3">
            {parties.map((party) => (
              <div key={party.key}>
                <dt className="flex items-center gap-2 text-[14.5px] font-medium">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: feesPublished
                        ? party.color
                        : "rgba(255,255,255,0.2)",
                    }}
                  />
                  {party.title}
                </dt>
                <dd className="type-num mt-2 text-[22px] text-text">
                  {feeSplit[party.key] ? `${feeSplit[party.key]}%` : "—"}
                </dd>
                <dd className="mt-2 text-[13.5px] leading-relaxed text-soft">
                  {party.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {!feesPublished && (
          <p className="mt-6 text-[12.5px] text-mute">
            The split has not been fixed. Rather than print a number that
            might change before launch, this page shows the shape of the
            arrangement and leaves the figures blank until they are decided.
          </p>
        )}
      </div>
    </section>
  );
}
