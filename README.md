# STOCKSET

Any tokenized stock. One token.

A basket of tokenized equities, defined by whoever thought of it, deployed as a
single token that trades around the clock — and pays its author a share of
every trade in it, for as long as it trades.

Same product category as [Slate](https://x.com/slateetf), under a different
name and a mark of its own. Sibling to, not part of, the Dustland repo.

`STOCKSET` is one string in `src/lib/site-config.ts` plus the
`NEXT_PUBLIC_STOCKSET_*` env prefix, so renaming is a two-line change.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · wagmi v3 + viem ·
TypeScript. Injected wallets only, Robinhood Chain, no backend.

## Routes

| | |
| --- | --- |
| `/` | The pitch: hero, counters, example sets, mechanism, fee split, FAQ. |
| `/launch` | The builder. Assemble a set, name it, see what would be deployed. |
| `not-found` | Styled 404. |

## Nothing here is deployed

The site ships before the contracts do, and it says so rather than performing
liveness:

- Every counter is a real zero or an em dash. No TVL, no fee revenue, no APY,
  no holder count, no launch date appears anywhere, because none of it exists.
- Wallets connect — that part is real. There is nothing to deploy against, so
  **Deploy set** is disabled and names which of the three reasons is stopping
  it.
- The four example sets are marked EXAMPLE. Tickers and company names are
  matters of record; the groupings are ours; no price or performance figure is
  attached to any of them.
- The fee split renders as three blank segments labelled *not set*, because the
  split has not been decided. Set `NEXT_PUBLIC_STOCKSET_FEE_*` and it becomes a
  real chart with no code change.
- Social links stay out of the DOM until their env vars exist, so no dead link
  ships.

Everything flips automatically once `NEXT_PUBLIC_STOCKSET_FACTORY_ADDRESS` and
`NEXT_PUBLIC_STOCKSET_LIVE=true` exist.

## The builder is honest about its two halves

`src/components/SetBuilder.tsx`. The left half is real: the universe, the
selection, the symbol rules (2–10 caps or digits) and the equal-weight
arithmetic all work, and what you assemble is exactly what a deploy would take.

The right half cannot be. Cap weighting needs a price oracle and this page has
no feed, so a cap-weighted set shows its holdings with `—` where the weights
would be instead of inventing numbers that look like data.

## Art direction

Glass in a dark room. One lit object floats in near-black and everything else
is a pane held in front of it: hairline white borders at 9%, one specular line
along the top edge where the light catches.

Colour never comes from a fill. It comes from the light behind the glass —
four blurred aurora ellipses fixed behind the document, in blue, violet, mint
and pink, at 16–50% opacity. The surfaces stay neutral, so the hues read as
light passing through glass rather than as brand paint. A card's accent is a
wash in its corner, not a border or a fill.

The orb in `src/components/Orb.tsx` is five stacked CSS layers — body,
iridescent conic film, specular cap, rim light, bloom. No image, so it stays
crisp at any size and ships nothing. The mark inside it is a set diagram: two
circles overlapping with the lens solid, which is the whole product in one
glyph. Deliberately not a lettermark — an initial in a sphere is what every
other token on this chain already looks like.

Type is Inter for everything spoken, IBM Plex Mono for everything counted.
Display sizes run at weight 600 with tracking pulled to -0.035em. Radii are
999px on controls, 24px on panes, 14px on chips; a glass system with mixed
corner logic reads as broken glass.

Two notes for anyone editing the CSS:

- **Everything lives in `@layer components`.** Tailwind v4 puts utilities in
  `@layer utilities`, and an unlayered rule outranks any layered one no matter
  how weak its selector. Unlayered, `.btn`'s 46px height beat `h-10` and
  `.chip` beat `bg-blue/15` — every per-instance override silently did nothing.
- **`backdrop-filter` is on the nav only** (`.glass-blur`). The page scrolls
  under the nav, so there the blur is the entire effect. Behind the cards there
  is only the fixed aurora, which is already a 90px blur; blurring it again
  costs a full-viewport readback per card and changes almost nothing. Write it
  unprefixed — adding the `-webkit-` alias underneath makes Lightning CSS drop
  the standard property and emit the alias alone, which Chrome ignores.

## Setup

```bash
npm install
cp .env.example .env.local   # optional — it runs with no env at all
npm run dev
```

## Going live

1. Deploy the factory and set `NEXT_PUBLIC_STOCKSET_FACTORY_ADDRESS` and
   `NEXT_PUBLIC_STOCKSET_LIVE=true`.
2. Decide the fee split and set `NEXT_PUBLIC_STOCKSET_FEE_CREATOR`,
   `_PROTOCOL` and `_LIQUIDITY`.
3. Set `NEXT_PUBLIC_SITE_URL` so metadata, `sitemap.xml` and `robots.txt` point
   at the real domain.
4. Wire the builder's **Deploy set** button to the factory. It is a disabled
   button with a reason today; the definition it assembles is complete.
5. Answer the FAQ's fourth question — how, and whether, a set's holdings can be
   revised after deploy — before any real money is involved. It is the one
   piece of the design that is genuinely undecided rather than merely unbuilt.

Robinhood Chain network details in `src/lib/chain.ts` (chain id, RPC, explorer)
are unverified third-party research and must be re-confirmed against
`docs.robinhood.com/chain` before mainnet use.

## Before this reaches a real domain

Everything about what a set token legally *is* — the claim in the first FAQ
answer, the "not a broker, dealer, exchange or adviser" line in the footer, the
dividend and voting sentence — is written to be accurate to the design as
specified, not reviewed by anyone qualified. The tokenized-equity wrapper it
depends on is a third party's product with its own terms. That paragraph and
the first FAQ answer are deliberately the two places this is concentrated, so a
compliance pass is one read.

## Verification

`npx tsc --noEmit`, `npx eslint` and `npx next build` all pass clean.
