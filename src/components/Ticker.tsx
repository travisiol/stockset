import { tickerSymbols } from "@/lib/sets";

/*
 * Symbols only, no prices.
 *
 * The obvious move here is a scrolling tape with quotes on it, and it would
 * be the most misleading object on the site: there is no feed behind this
 * page, so every number on that tape would be invented. The strip says what
 * it can honestly say — these are the kinds of things a set holds.
 *
 * The track is rendered twice and translated -50%, which is what makes the
 * loop seamless; `aria-hidden` on the copy keeps it out of the a11y tree.
 */
export function Ticker() {
  return (
    <section className="marquee border-y border-line py-4">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {tickerSymbols.map((symbol) => (
              <li
                key={symbol}
                className="type-num flex items-center gap-8 px-8 text-[13px] text-mute"
              >
                {symbol}
                <span className="h-1 w-1 rounded-full bg-white/20" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
