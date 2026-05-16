"use client";

import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { mainNav } from "@/lib/navigation";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link href="/" className="focus-ring flex items-center gap-2 rounded-md">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-brand-cyan text-lg font-black text-brand-ink">E</span>
          <span className="text-lg font-black tracking-wide">EJISCHOOL</span>
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="focus-ring rounded-md px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden min-w-64 items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/55 md:flex">
          <Search size={16} aria-hidden />
          <span>Search tutorials, references, exercises</span>
        </div>
        <button
          className="focus-ring ml-auto inline-grid h-10 w-10 place-items-center rounded-md border border-white/10 lg:hidden"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open ? (
        <nav className="border-t border-white/10 px-4 py-3 lg:hidden">
          <div className="grid gap-1">
            {mainNav.map((item) => (
              <Link key={item.href} href={item.href} className="focus-ring rounded-md px-3 py-3 text-sm text-white/80 hover:bg-white/10" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
