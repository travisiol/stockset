/**
 * Example sets.
 *
 * These are illustrations of what a set *is*, not products on offer: the
 * tickers and company names are matters of record, the groupings are ours,
 * and nothing here has been deployed. Every card carrying one of these is
 * marked EXAMPLE, and no price, weight-drift or performance figure is
 * attached to any of them — see `site-config.ts` for why.
 */

export type Holding = {
  /** Underlying equity ticker, as listed on its home exchange. */
  symbol: string;
  name: string;
};

export type StockSet = {
  /** On-chain symbol the set would trade under. */
  symbol: string;
  name: string;
  /** One line, plain: what belongs in this set and what does not. */
  thesis: string;
  /** Ordered as they would appear in the token's holdings readout. */
  holdings: Holding[];
  /** Rule the set uses to weight its holdings. */
  weighting: "Equal weight" | "Cap weight";
  accent: "blue" | "violet" | "mint" | "pink";
};

export const exampleSets: StockSet[] = [
  {
    symbol: "SILICON",
    name: "Silicon",
    thesis:
      "The companies that design and print the chips, from the fab tools up.",
    weighting: "Equal weight",
    accent: "blue",
    holdings: [
      { symbol: "NVDA", name: "NVIDIA" },
      { symbol: "AVGO", name: "Broadcom" },
      { symbol: "TSM", name: "TSMC" },
      { symbol: "ASML", name: "ASML" },
      { symbol: "AMD", name: "AMD" },
      { symbol: "MU", name: "Micron" },
      { symbol: "QCOM", name: "Qualcomm" },
      { symbol: "LRCX", name: "Lam Research" },
      { symbol: "ARM", name: "Arm Holdings" },
      { symbol: "KLAC", name: "KLA" },
    ],
  },
  {
    symbol: "MAG7",
    name: "The Seven",
    thesis:
      "The seven American mega-caps that carry most of the index on their own.",
    weighting: "Equal weight",
    accent: "violet",
    holdings: [
      { symbol: "AAPL", name: "Apple" },
      { symbol: "MSFT", name: "Microsoft" },
      { symbol: "NVDA", name: "NVIDIA" },
      { symbol: "GOOGL", name: "Alphabet" },
      { symbol: "AMZN", name: "Amazon" },
      { symbol: "META", name: "Meta Platforms" },
      { symbol: "TSLA", name: "Tesla" },
    ],
  },
  {
    symbol: "GRID",
    name: "Grid",
    thesis:
      "Generation and the equipment that moves it — the build-out behind rising load.",
    weighting: "Cap weight",
    accent: "mint",
    holdings: [
      { symbol: "NEE", name: "NextEra Energy" },
      { symbol: "CEG", name: "Constellation Energy" },
      { symbol: "VST", name: "Vistra" },
      { symbol: "GEV", name: "GE Vernova" },
      { symbol: "ETN", name: "Eaton" },
      { symbol: "FSLR", name: "First Solar" },
      { symbol: "ENPH", name: "Enphase Energy" },
      { symbol: "PWR", name: "Quanta Services" },
    ],
  },
  {
    symbol: "VITAL",
    name: "Vital",
    thesis: "Large-cap pharma and the payers, weighted by size.",
    weighting: "Cap weight",
    accent: "pink",
    holdings: [
      { symbol: "LLY", name: "Eli Lilly" },
      { symbol: "NVO", name: "Novo Nordisk" },
      { symbol: "JNJ", name: "Johnson & Johnson" },
      { symbol: "ABBV", name: "AbbVie" },
      { symbol: "UNH", name: "UnitedHealth" },
      { symbol: "MRK", name: "Merck" },
      { symbol: "AZN", name: "AstraZeneca" },
      { symbol: "PFE", name: "Pfizer" },
    ],
  },
];

/**
 * The strip that runs under the hero. Symbols only — a ticker with invented
 * prices attached would be the single most misleading object on the page.
 */
export const tickerSymbols: string[] = [
  "AAPL",
  "NVDA",
  "MSFT",
  "TSM",
  "AMZN",
  "ASML",
  "GOOGL",
  "LLY",
  "META",
  "AVGO",
  "TSLA",
  "NVO",
  "JPM",
  "COST",
  "AMD",
  "NFLX",
  "V",
  "XOM",
  "ARM",
  "UNH",
];

/** Tickers offered by the builder on /launch. Superset of the examples. */
export const universe: Holding[] = [
  ...new Map(
    [
      ...exampleSets.flatMap((set) => set.holdings),
      { symbol: "JPM", name: "JPMorgan Chase" },
      { symbol: "V", name: "Visa" },
      { symbol: "MA", name: "Mastercard" },
      { symbol: "COST", name: "Costco" },
      { symbol: "WMT", name: "Walmart" },
      { symbol: "NFLX", name: "Netflix" },
      { symbol: "XOM", name: "Exxon Mobil" },
      { symbol: "BRK.B", name: "Berkshire Hathaway" },
      { symbol: "ORCL", name: "Oracle" },
      { symbol: "CRM", name: "Salesforce" },
      { symbol: "UBER", name: "Uber" },
      { symbol: "SHOP", name: "Shopify" },
    ].map((holding) => [holding.symbol, holding] as const),
  ).values(),
].sort((a, b) => a.symbol.localeCompare(b.symbol));
