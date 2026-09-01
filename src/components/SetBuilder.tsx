"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { universe } from "@/lib/sets";
import { Button } from "@/components/ui/Button";
import { WalletConnect } from "@/components/WalletConnect";
import { isLive, siteConfig } from "@/lib/site-config";
import { useConnection } from "wagmi";

const MAX_HOLDINGS = 20;

/*
 * The builder is deliberately honest about its two halves.
 *
 * The left half is real: the universe, the selection, the symbol rules and
 * the equal-weight arithmetic all work, and what you assemble here is
 * exactly what a deploy would take. The right half cannot be — cap weights
 * need a price oracle and this page has no feed, so it says "—" instead of
 * inventing a number that looks like data.
 *
 * Deploy is disabled until a factory address exists, and the button says
 * which of the three reasons is stopping it rather than failing silently.
 */
export function SetBuilder() {
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [weighting, setWeighting] = useState<"equal" | "cap">("equal");
  const { isConnected } = useConnection();

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return universe;
    return universe.filter(
      (holding) =>
        holding.symbol.toLowerCase().includes(needle) ||
        holding.name.toLowerCase().includes(needle),
    );
  }, [query]);

  const chosen = useMemo(
    () => picked.map((s) => universe.find((h) => h.symbol === s)!),
    [picked],
  );

  const equalWeight = picked.length > 0 ? 100 / picked.length : 0;

  function toggle(ticker: string) {
    setPicked((current) =>
      current.includes(ticker)
        ? current.filter((s) => s !== ticker)
        : current.length >= MAX_HOLDINGS
          ? current
          : [...current, ticker],
    );
  }

  // The symbol is what the token trades as, so it is constrained here rather
  // than left for a contract revert: caps, letters and digits, 2–10 long.
  const cleanSymbol = symbol.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const symbolValid = cleanSymbol.length >= 2 && cleanSymbol.length <= 10;
  const ready = picked.length >= 2 && name.trim().length > 1 && symbolValid;

  const blockedReason = !isLive
    ? "No factory deployed yet"
    : !isConnected
      ? "Connect a wallet to deploy"
      : !ready
        ? "Finish the definition"
        : null;

  return (
    <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      {/* ---- Definition ------------------------------------------------- */}
      <div className="glass p-6 sm:p-8">
        <p className="type-label">1 — Holdings</p>

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search a company or ticker"
          aria-label="Search the universe"
          className="mt-4 h-11 w-full rounded-full border border-line bg-white/4 px-5 text-[14px] placeholder:text-mute focus:border-line-strong focus:outline-none"
        />

        <div className="mt-4 flex items-center justify-between">
          <p className="type-num text-[12px] text-mute">
            {picked.length} / {MAX_HOLDINGS} selected
          </p>
          {picked.length > 0 && (
            <button
              type="button"
              onClick={() => setPicked([])}
              className="text-[12.5px] text-mute underline underline-offset-4 hover:text-soft"
            >
              Clear
            </button>
          )}
        </div>

        <ul className="mt-3 flex max-h-72 flex-wrap gap-1.5 overflow-y-auto pr-1">
          {results.map((holding) => {
            const on = picked.includes(holding.symbol);
            const full = !on && picked.length >= MAX_HOLDINGS;
            return (
              <li key={holding.symbol}>
                <button
                  type="button"
                  onClick={() => toggle(holding.symbol)}
                  disabled={full}
                  title={holding.name}
                  aria-pressed={on}
                  className={clsx(
                    "chip transition-colors",
                    on
                      ? "border-blue/60 bg-blue/15 text-text"
                      : "hover:border-line-strong hover:text-text",
                    full && "cursor-not-allowed opacity-40",
                  )}
                >
                  {holding.symbol}
                </button>
              </li>
            );
          })}
          {results.length === 0 && (
            <li className="py-4 text-[13.5px] text-mute">
              Nothing in the universe matches that.
            </li>
          )}
        </ul>

        <hr className="my-8 border-line" />

        <p className="type-label">2 — Identity</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1.4fr_1fr]">
          <label className="block">
            <span className="text-[12.5px] text-mute">Set name</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Silicon"
              maxLength={32}
              className="mt-1.5 h-11 w-full rounded-2xl border border-line bg-white/4 px-4 text-[14px] placeholder:text-mute focus:border-line-strong focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-[12.5px] text-mute">Token symbol</span>
            <input
              value={cleanSymbol}
              onChange={(event) => setSymbol(event.target.value)}
              placeholder="SILICON"
              maxLength={10}
              className="type-num mt-1.5 h-11 w-full rounded-2xl border border-line bg-white/4 px-4 text-[14px] placeholder:text-mute focus:border-line-strong focus:outline-none"
            />
          </label>
        </div>
        {symbol.length > 0 && !symbolValid && (
          <p className="mt-2 text-[12.5px] text-loss">
            Symbols are 2–10 letters or digits.
          </p>
        )}

        <hr className="my-8 border-line" />

        <p className="type-label">3 — Weighting</p>
        <div className="mt-4 flex gap-2">
          {(
            [
              { key: "equal", label: "Equal weight" },
              { key: "cap", label: "Cap weight" },
            ] as const
          ).map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setWeighting(option.key)}
              aria-pressed={weighting === option.key}
              className={clsx(
                "btn h-10 px-4 text-[13.5px]",
                weighting === option.key ? "btn-primary" : "btn-ghost",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-[12.5px] leading-relaxed text-mute">
          {weighting === "equal"
            ? "Every holding gets the same share of the set, and the weights are known here and now."
            : "Cap weights are read from a price oracle at deploy time. This page has no feed, so it shows the holdings without weights rather than guessing at them."}
        </p>
      </div>

      {/* ---- Preview ----------------------------------------------------- */}
      <div className="glass p-6 sm:p-8 lg:sticky lg:top-24">
        <div className="flex items-baseline justify-between gap-4">
          <p className="type-label">Preview</p>
          <span className="type-label rounded-full border border-line px-2.5 py-1 text-[10px]">
            Not deployed
          </span>
        </div>

        <p className="type-num mt-5 text-[22px] text-text">
          {cleanSymbol || "—"}
        </p>
        <p className="mt-1 text-[14px] text-soft">
          {name.trim() || "Unnamed set"}
        </p>

        {chosen.length === 0 ? (
          <p className="mt-8 text-[13.5px] text-mute">
            Pick at least two holdings and the set takes shape here.
          </p>
        ) : (
          <ul className="mt-7 space-y-2.5">
            {chosen.map((holding) => (
              <li
                key={holding.symbol}
                className="flex items-baseline justify-between gap-4"
              >
                <span className="type-num text-[13px] text-text">
                  {holding.symbol}
                </span>
                <span className="min-w-0 flex-1 truncate text-[12.5px] text-mute">
                  {holding.name}
                </span>
                <span className="type-num text-[13px] text-soft">
                  {weighting === "equal" ? `${equalWeight.toFixed(1)}%` : "—"}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex flex-col gap-3">
          <Button disabled={blockedReason !== null} className="w-full">
            {blockedReason ?? "Deploy set"}
          </Button>
          {!isConnected && isLive && <WalletConnect wrapperClassName="w-full" />}
          <p className="text-[12px] leading-relaxed text-mute">
            {isLive
              ? "Deploying publishes the definition on chain and mints the set token."
              : `${siteConfig.name} has no contracts deployed. Nothing on this page can spend or move anything, and no definition you write here is stored — it lives in this tab only.`}
          </p>
        </div>
      </div>
    </div>
  );
}
