"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/tutorials/html", label: "Courses" },
  { href: "/playground", label: "Playground" },
  { href: "/certificates", label: "Certificates" },
  { href: "/community", label: "Community" },
  { href: "/blog", label: "Blog" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#dff0f7]/80 bg-[#f6fcff]/90 text-[#071a33] backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center gap-6 px-4 md:px-8">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-md" aria-label="Ejischool home">
          <span className="relative grid h-11 w-11 place-items-center rounded-full bg-[#12bfe4] text-xl font-black text-white shadow-[0_12px_30px_rgba(18,191,228,0.32)]">
            E
            <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-white text-[10px] font-black text-[#0878b8]">&lt;/&gt;</span>
          </span>
          <span className="text-lg font-black uppercase tracking-[0.12em]">Ejischool</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="focus-ring rounded-md py-2 text-sm font-bold text-[#071a33] transition hover:text-[#12bfe4]">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/login" className="focus-ring ml-auto hidden min-h-12 items-center rounded-full bg-[#12bfe4] px-7 text-sm font-black text-white shadow-[0_14px_30px_rgba(18,191,228,0.25)] transition hover:-translate-y-0.5 hover:bg-[#08aacf] lg:inline-flex">
          Get Started
        </Link>

        <button
          className="focus-ring ml-auto inline-grid h-11 w-11 place-items-center rounded-full border border-[#d8eaf4] bg-white text-[#071a33] lg:hidden"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-[#dff0f7] bg-white px-4 py-4 text-[#071a33] lg:hidden">
          <div className="grid gap-1">
            {[...navItems, { href: "/login", label: "Get Started" }].map((item) => (
              <Link key={item.href} href={item.href} className="focus-ring rounded-md px-3 py-3 text-sm font-bold hover:bg-[#effaff]" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
