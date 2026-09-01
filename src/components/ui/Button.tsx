import { clsx } from "clsx";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

/*
 * Two controls, no third. `primary` is the lit pill — one per screen, on the
 * act the screen exists for. Everything else is `ghost`, a pane like the
 * cards around it. A page of glass with three button weights on it stops
 * reading as one material.
 */
type Variant = "primary" | "ghost";

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  ghost: "btn-ghost",
};

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <button
      type="button"
      className={clsx("btn", variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  variant = "primary",
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <a className={clsx("btn", variants[variant], className)} {...props}>
      {children}
    </a>
  );
}
