import Link from "next/link";
import { Mark } from "@/components/Mark";
import { WalletConnect } from "@/components/WalletConnect";
import { siteConfig } from "@/lib/site-config";

const links = [
  { href: "/#sets", label: "Sets" },
  { href: "/#how", label: "How it works" },
  { href: "/#fees", label: "Fees" },
  { href: "/#faq", label: "FAQ" },
];

/*
 * A floating pane rather than a bar welded to the top edge: it sits inside
 * the page gutter with the same radius and rim as every card, so the
 * chrome is made of the same glass as the content.
 */
export function Nav() {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      {/* The one pane that gets a real backdrop blur: the page scrolls
          under it, so here the blur is the entire effect. */}
      <nav className="glass glass-blur mx-auto flex h-14 max-w-6xl items-center gap-3 rounded-full pr-2 pl-4 sm:pl-5">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-text"
          aria-label={`${siteConfig.name} home`}
        >
          <Mark size={22} />
          <span className="text-[15px] font-semibold tracking-[-0.02em]">
            {siteConfig.name}
          </span>
        </Link>

        {/* Shown from lg, not md: at ~800px the four labels fit the row but
            wrap inside their own pills. */}
        <ul className="ml-4 hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-3 py-2 text-[13.5px] whitespace-nowrap text-soft transition-colors hover:bg-white/6 hover:text-text"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/launch"
            className="btn btn-ghost hidden h-10 px-4 text-[13.5px] sm:inline-flex"
          >
            Launch a set
          </Link>
          <WalletConnect />
        </div>
      </nav>
    </header>
  );
}
