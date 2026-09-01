import Link from "next/link";
import { Bokeh, Orb } from "@/components/Orb";
import { ButtonLink } from "@/components/ui/Button";
import { isLive, siteConfig } from "@/lib/site-config";

/*
 * The hero is one sentence and one object. The orb is the only thing on the
 * page with volume, so it is given room rather than dressed with badges and
 * floating cards — the fastest way to make glass look cheap is to crowd it.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-14 pb-20 sm:px-6 sm:pt-20 lg:pt-24">
      <Bokeh className="mx-auto max-w-6xl" />

      {/* Three fifths to the words, two to the sphere. An even split leaves
          the headline 560px and it needs 621 at its ceiling size. */}
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-5 lg:gap-8">
        <div className="lg:col-span-3">
          <span className="chip rounded-full px-3 py-1.5">
            <span
              className={
                isLive
                  ? "h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_8px_var(--mint)]"
                  : "h-1.5 w-1.5 rounded-full bg-amber shadow-[0_0_8px_var(--amber)]"
              }
            />
            {isLive ? "Live on Robinhood Chain" : "Preview — not deployed yet"}
          </span>

          <h1 className="type-display mt-6 text-balance">
            Any tokenized stock.
            <br />
            <span className="bg-gradient-to-r from-white via-[#cfdbff] to-[#9b7bff] bg-clip-text text-transparent">
              One token.
            </span>
          </h1>

          <p className="type-lead mt-6 max-w-xl text-pretty">
            Pick the companies. {siteConfig.nameSoft} mints a single token that
            holds them, trades around the clock, and pays the person who
            defined it a share of every trade in it.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="/launch">Launch a set</ButtonLink>
            <ButtonLink href="#sets" variant="ghost">
              See example sets
            </ButtonLink>
          </div>

          <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            {["Trades 24/7", "Non-custodial", "Anyone can launch"].map(
              (fact) => (
                <li
                  key={fact}
                  className="flex items-center gap-2 text-[13.5px] text-soft"
                >
                  <span className="h-1 w-1 rounded-full bg-blue-bright" />
                  {fact}
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[440px] lg:col-span-2 lg:max-w-none">
          <Orb className="mx-auto w-[78%] lg:w-full" markSize={96} />
        </div>
      </div>

      <div className="horizon mx-auto mt-16 max-w-6xl sm:mt-20" />
    </section>
  );
}

/*
 * The counters. Every one of them is a real zero or an em dash until a
 * contract exists — see the note in `site-config.ts`. A pre-launch page with
 * plausible-looking numbers on it is the one thing here a reader could
 * actually be hurt by.
 */
const stats = [
  { label: "Sets deployed", value: "0", numeric: true },
  { label: "Underlyings held", value: "0", numeric: true },
  { label: "Paid to creators", value: "—", numeric: true },
  // Set in words rather than at counter size: at 28px "Robinhood Chain"
  // wraps and stops reading as a peer of the three figures beside it.
  { label: "Network", value: "Robinhood Chain", numeric: false },
];

export function Stats() {
  return (
    <section className="reveal px-4 sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-white/4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-ink/40 px-5 py-7 sm:px-7">
            <p className="type-label">{stat.label}</p>
            <p
              className={
                stat.numeric
                  ? "type-num mt-2 text-[clamp(20px,2.4vw,28px)] text-text"
                  : "mt-2 text-[clamp(16px,1.5vw,19px)] font-medium tracking-[-0.02em] text-text"
              }
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-3 max-w-6xl text-[12.5px] text-mute">
        Counters read from the chain once a factory address is configured.
        Nothing has been deployed, so every figure above is genuinely zero.{" "}
        <Link href="/#faq" className="underline underline-offset-4">
          What that means
        </Link>
      </p>
    </section>
  );
}
