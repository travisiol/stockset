/**
 * Every name, claim and number that is not yet decided lives here, so the
 * pre-launch state is auditable in one file instead of scattered through the
 * markup.
 *
 * Rule for this project: no invented figure ships. Anything a buyer could act
 * on — a fee, a yield, a TVL, a launch date — is either read from an env var
 * or rendered as an em dash. A designed page that lies is worse than an empty
 * one that does not.
 */

export const siteConfig = {
  /** Swapping this one string renames the site: nav, metadata, OG, footer. */
  name: "STOCKSET",
  /** Lowercase form for running copy. */
  nameSoft: "Stockset",
  tagline: "Any tokenized stock. One token.",
  description:
    "Bundle any tokenized equities into a single token that trades around the clock. Launch a set of your own and take a share of every trade in it.",
  seoDescription:
    "Stockset turns a basket of tokenized equities into one token that trades 24/7 on Robinhood Chain. Anyone can launch a set and earn on its volume.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://stockset.example",
  x: process.env.NEXT_PUBLIC_STOCKSET_X ?? null,
  discord: process.env.NEXT_PUBLIC_STOCKSET_DISCORD ?? null,
  docs: process.env.NEXT_PUBLIC_STOCKSET_DOCS ?? null,
} as const;

function envOrNull(value: string | undefined): string | null {
  return value && value.trim().length > 0 ? value : null;
}

/**
 * Deployment surface. With no address set the whole app sits in PREVIEW:
 * wallets still connect, but every write button is disabled and says why
 * rather than looking live and doing nothing.
 */
export const protocolConfig = {
  factoryAddress: envOrNull(
    process.env.NEXT_PUBLIC_STOCKSET_FACTORY_ADDRESS,
  ) as `0x${string}` | null,
  isLive: process.env.NEXT_PUBLIC_STOCKSET_LIVE === "true",
} as const;

export const isLive =
  protocolConfig.isLive && protocolConfig.factoryAddress !== null;

/**
 * The fee split is a launch parameter, not a marketing claim. Until it is
 * decided and set here, the page says so out loud — see `FeeSplit`.
 *
 * Values are percentages of trade notional, e.g. "0.20".
 */
export const feeSplit = {
  creator: envOrNull(process.env.NEXT_PUBLIC_STOCKSET_FEE_CREATOR),
  protocol: envOrNull(process.env.NEXT_PUBLIC_STOCKSET_FEE_PROTOCOL),
  liquidity: envOrNull(process.env.NEXT_PUBLIC_STOCKSET_FEE_LIQUIDITY),
} as const;

export const feesPublished =
  feeSplit.creator !== null &&
  feeSplit.protocol !== null &&
  feeSplit.liquidity !== null;
