import { SectionHead } from "@/components/SectionHead";
import { siteConfig } from "@/lib/site-config";

/*
 * Ordering is deliberate: what you are holding, and what you are not, comes
 * before anything about launching or earning. If a reader only opens one of
 * these it should be the one that could cost them money.
 *
 * Built on <details>, so it works with no JavaScript and stays open when a
 * reader lands on the anchor from a search result.
 */
const faqs = [
  {
    q: "What am I actually holding?",
    a: `A ${siteConfig.name} token is a claim on a basket held by a contract — the tokenized equities the set was defined to hold, in the weights it was defined with. It is not the underlying shares, it is not held for you by a broker, and it carries no shareholder rights of its own: no vote, and no dividend unless the tokenized share it holds passes one through. Whatever the underlying token does or does not entitle you to, this token inherits, and nothing more.`,
  },
  {
    q: "Is any of this live?",
    a: "No. No contracts are deployed. Wallets connect because that part is real, but there is nothing to mint, trade or redeem, and every counter on this site is a genuine zero rather than a placeholder. When a factory address is configured the interface switches over on its own.",
  },
  {
    q: "Who decides which sets exist?",
    a: "Nobody. There is no listing process and no committee — a set is deployed by whoever wrote its definition, and the market opens the moment it exists. The consequence is that a set can be badly conceived, thinly traded, or a copy of someone else's idea. Read the holdings before you buy one.",
  },
  {
    q: "What happens when a set needs to change?",
    a: "Weighting is fixed at deploy time. How, and whether, a set's holdings can be revised afterwards — who may propose it, what holders can do about it — is not decided yet, and this page will not pretend otherwise. It is the first thing to specify before any real money is involved.",
  },
  {
    q: "Does this site hold my keys?",
    a: "No. It connects to an injected browser wallet, keeps no server-side session and has no backend of its own; there is nowhere for a key to be stored. Everything you sign, you sign in your own wallet.",
  },
  {
    q: "Which network is it on?",
    a: "Robinhood Chain. Gas is paid in ETH. The chain id, RPC and explorer this front end ships with were gathered from third-party sources and are overridable by env var — they must be re-confirmed against the official chain documentation before this is pointed at real funds.",
  },
  {
    q: "Is this financial advice?",
    a: "No. Nothing here is a recommendation, and the example sets are illustrations of the format rather than proposals. Tokenized equities are not available, or not permitted, everywhere — whether you may hold one is a question for your own jurisdiction and, if it matters to you, your own advisor.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="reveal px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead label="FAQ" title="The parts worth reading first" />

        <div className="mt-12 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white/3">
          {faqs.map((faq) => (
            <details key={faq.q} className="group px-6 py-5 sm:px-8">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[16.5px] font-medium tracking-[-0.015em] marker:content-['']">
                {faq.q}
                <span
                  aria-hidden="true"
                  className="relative h-4 w-4 shrink-0 text-mute transition-transform duration-300 group-open:rotate-45"
                >
                  <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-current" />
                  <span className="absolute top-0 left-1/2 h-4 w-px -translate-x-1/2 bg-current" />
                </span>
              </summary>
              <p className="mt-3 max-w-3xl text-[14.5px] leading-relaxed text-soft text-pretty">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
