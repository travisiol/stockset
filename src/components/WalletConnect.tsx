"use client";

import { useEffect, useState } from "react";
import { useConnect, useConnection, useDisconnect, useSwitchChain } from "wagmi";
import { clsx } from "clsx";
import { robinhoodChain } from "@/lib/chain";

function short(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

/**
 * Whether a wallet is actually reachable in this browser.
 *
 * wagmi registers the injected connector whether or not anything is there to
 * inject, so its presence proves nothing — trusting it leaves an enabled
 * button that does nothing on a machine with no wallet. This looks for a
 * real provider instead: `window.ethereum` for older wallets, and the
 * EIP-6963 announcement current ones use.
 *
 * Starts optimistic so the server render and the first client render agree,
 * then corrects itself once the browser has had a moment to answer.
 */
function useWalletAvailable(): boolean {
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    let found = typeof window !== "undefined" && "ethereum" in window;

    const onAnnounce = () => {
      found = true;
      setAvailable(true);
    };
    window.addEventListener("eip6963:announceProvider", onAnnounce);
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    // Wallets answer synchronously in practice; the delay is for the ones
    // that answer on the next tick.
    const timer = window.setTimeout(() => setAvailable(found), 400);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("eip6963:announceProvider", onAnnounce);
    };
  }, []);

  return available;
}

export function WalletConnect({
  className,
  wrapperClassName,
}: {
  className?: string;
  /** Lets a caller stretch the control, e.g. full width inside a panel. */
  wrapperClassName?: string;
}) {
  const { address, isConnected, chainId } = useConnection();
  const {
    connect,
    connectors,
    isPending: isConnecting,
    error: connectError,
  } = useConnect();
  const { disconnect } = useDisconnect();
  const { mutate: switchChain, isPending: isSwitching } = useSwitchChain();
  const walletAvailable = useWalletAvailable();

  if (isConnected && address) {
    if (chainId !== robinhoodChain.id) {
      return (
        <button
          type="button"
          onClick={() => switchChain({ chainId: robinhoodChain.id })}
          disabled={isSwitching}
          className={clsx("btn btn-primary h-10 px-4 text-[13.5px]", className)}
        >
          {isSwitching ? "Switching…" : "Switch network"}
        </button>
      );
    }
    return (
      <button
        type="button"
        onClick={() => disconnect()}
        title="Disconnect wallet"
        className={clsx(
          "btn btn-ghost type-num h-10 px-4 text-[13px] text-soft",
          className,
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_8px_var(--mint)]" />
        {short(address)}
      </button>
    );
  }

  const connector = connectors[0];
  const canConnect = walletAvailable && !!connector;

  return (
    <span
      className={clsx("inline-flex flex-col items-start gap-1", wrapperClassName)}
    >
      <button
        type="button"
        disabled={!canConnect || isConnecting}
        onClick={() => connector && connect({ connector })}
        title={
          canConnect ? undefined : "No browser wallet detected on this device"
        }
        className={clsx("btn btn-primary h-10 px-4 text-[13.5px]", className)}
      >
        {isConnecting
          ? "Connecting…"
          : canConnect
            ? "Connect wallet"
            : "No wallet found"}
      </button>

      {/* A refused or failed connection used to end in silence. */}
      {connectError && (
        <span className="type-num max-w-[240px] text-[11px] text-loss">
          {connectError.message.split("\n")[0]}
        </span>
      )}
    </span>
  );
}
