import Link from "next/link";
import type { ReactNode } from "react";

type PrimaryButtonProps = {
  href: string;
  children: ReactNode;
};

export function PrimaryButton({ href, children }: PrimaryButtonProps) {
  return (
    <Link
      href={href}
      className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md bg-brand-cyan px-5 py-2 text-sm font-bold text-brand-ink transition hover:bg-brand-mist"
    >
      {children}
    </Link>
  );
}
