import Link from "next/link";
import { Mark } from "@/components/Mark";
import { Orb } from "@/components/Orb";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

/*
 * The closing band brings the orb back at a quarter of the hero size. It is
 * the same object, so the page ends where it started rather than trailing
 * off into a footer.
 */
export function ClosingCta() {
  return (
    <section className="reveal px-4 pb-24 sm:px-6 sm:pb-32">
      <div className="glass relative mx-auto flex max-w-6xl flex-col items-center gap-8 overflow-hidden px-6 py-16 text-center sm:px-12">
        <Orb className="w-24" markSize={30} />
        <div>
          <h2 className="type-section text-balance">
            Have an index in your head?
          </h2>
          <p className="type-lead mx-auto mt-4 max-w-lg text-pretty">
            Write it down as a set. If other people want to hold it, you get
            paid every time they trade it.
          </p>
        </div>
        <ButtonLink href="/launch">Open the builder</ButtonLink>
      </div>
    </section>
  );
}

const columns = [
  {
    heading: "Product",
    links: [
      { href: "/#sets", label: "Example sets" },
      { href: "/#how", label: "How it works" },
      { href: "/#fees", label: "Fees" },
      { href: "/launch", label: "Launch a set" },
    ],
  },
  {
    heading: "Understand",
    links: [
      { href: "/#faq", label: "What you hold" },
      { href: "/#faq", label: "Network details" },
      { href: "/#faq", label: "Risks" },
    ],
  },
];

export function Footer() {
  // Social links stay out of the DOM until their env vars exist, so no dead
  // link ever ships.
  const externals = [
    siteConfig.x ? { href: siteConfig.x, label: "X" } : null,
    siteConfig.discord ? { href: siteConfig.discord, label: "Discord" } : null,
    siteConfig.docs ? { href: siteConfig.docs, label: "Docs" } : null,
  ].filter((link) => link !== null);

  return (
    <footer className="border-t border-line px-4 py-14 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Mark size={22} />
            <span className="text-[15px] font-semibold tracking-[-0.02em]">
              {siteConfig.name}
            </span>
          </div>
          <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-mute">
            {siteConfig.tagline} Built for Robinhood Chain.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.heading}>
            <p className="type-label">{column.heading}</p>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13.5px] text-soft transition-colors hover:text-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="type-label">Elsewhere</p>
          {externals.length > 0 ? (
            <ul className="mt-4 space-y-2.5">
              {externals.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    rel="noreferrer noopener"
                    target="_blank"
                    className="text-[13.5px] text-soft transition-colors hover:text-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-[13.5px] text-mute">Nothing to link yet.</p>
          )}
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-6xl border-t border-line pt-6">
        <p className="max-w-3xl text-[12px] leading-relaxed text-mute">
          {siteConfig.name} is not a broker, a dealer, an exchange or an
          adviser, and nothing on this site is an offer or a recommendation. A
          set token is a claim on tokenized instruments held by a contract, not
          on the shares themselves. Nothing described here is deployed.
        </p>
      </div>
    </footer>
  );
}
