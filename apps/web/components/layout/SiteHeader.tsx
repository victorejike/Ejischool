"use client";

import { ChevronDown, Code2, Menu, Moon, Search, Sun, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { courseCatalog } from "@/data/courseCatalog";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/tutorials/html", label: "Courses" },
  { href: "/playground", label: "Playground" },
  { href: "/certificates", label: "Certificates" },
  { href: "/community", label: "Community" },
  { href: "/blog", label: "Blog" }
];

type Theme = "light" | "dark";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeCourse, setActiveCourse] = useState(courseCatalog[0]);
  const [courseMenuOpen, setCourseMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = window.localStorage.getItem("ejischool-theme") as Theme | null;
    const nextTheme = saved ?? "light";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("ejischool-theme", nextTheme);
  }

  const searchResults = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) {
      return courseCatalog.slice(0, 8).map((course) => ({
        href: `/tutorials/${course.slug}`,
        title: course.title,
        body: course.description
      }));
    }

    return courseCatalog
      .flatMap((course) => [
        {
          href: `/tutorials/${course.slug}`,
          title: course.title,
          body: `${course.label} course, ${course.category}, ${course.level}`
        },
        ...course.topics.map((topic) => ({
          href: `/tutorials/${course.slug}#${topic.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
          title: topic.title,
          body: topic.summary
        }))
      ])
      .filter((item) => `${item.title} ${item.body}`.toLowerCase().includes(value))
      .slice(0, 12);
  }, [query]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-[var(--header-bg)] text-[var(--text-main)] shadow-sm backdrop-blur-xl dark:border-white/10">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center gap-4 px-4 md:px-8">
        <Link href="/" className="focus-ring flex shrink-0 items-center gap-3 rounded-md" aria-label="Ejischool home">
          <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-white shadow-[0_12px_30px_rgba(18,191,228,0.28)]">
            <Image src="/assets/ejicode-logo.png" width={48} height={48} alt="" className="h-full w-full object-cover" priority />
          </span>
          <span className="text-lg font-black uppercase tracking-[0.12em]">Ejischool</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="focus-ring rounded-md py-2 text-sm font-bold transition hover:text-[#12bfe4]">
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="focus-ring hidden h-11 w-11 place-items-center rounded-full border border-[var(--border-soft)] bg-[var(--control-bg)] text-[var(--text-main)] transition hover:text-[#12bfe4] sm:inline-grid"
          type="button"
          aria-label="Search EJISCHOOL"
          onClick={() => setSearchOpen(true)}
        >
          <Search size={19} />
        </button>

        <button
          className="focus-ring inline-grid h-11 w-11 place-items-center rounded-full border border-[var(--border-soft)] bg-[var(--control-bg)] text-[var(--text-main)] transition hover:text-[#12bfe4]"
          type="button"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          onClick={toggleTheme}
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <Link href="/login" className="focus-ring hidden min-h-12 items-center rounded-full bg-[#12bfe4] px-7 text-sm font-black text-white shadow-[0_14px_30px_rgba(18,191,228,0.25)] transition hover:-translate-y-0.5 hover:bg-[#08aacf] lg:inline-flex">
          Get Started
        </Link>

        <button
          className="focus-ring inline-grid h-11 w-11 place-items-center rounded-full border border-[var(--border-soft)] bg-[var(--control-bg)] text-[var(--text-main)] lg:hidden"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="relative border-t border-[var(--border-soft)] bg-[var(--coursebar-bg)]">
        <div className="mx-auto flex h-10 max-w-7xl items-center overflow-x-auto px-2 md:px-6">
          {courseCatalog.map((course) => (
            <button
              key={course.slug}
              className={`focus-ring flex h-10 shrink-0 items-center gap-1 px-3 text-[12px] font-black uppercase tracking-normal transition hover:bg-[#12bfe4] hover:text-white ${activeCourse.slug === course.slug && courseMenuOpen ? "bg-[#12bfe4] text-white" : "text-[var(--coursebar-text)]"}`}
              type="button"
              onClick={() => {
                setActiveCourse(course);
                setCourseMenuOpen((value) => (activeCourse.slug === course.slug ? !value : true));
              }}
            >
              {course.label}
              <ChevronDown size={12} aria-hidden />
            </button>
          ))}
        </div>

        {courseMenuOpen ? (
          <div className="absolute left-0 right-0 top-10 z-50 border-y border-[var(--border-soft)] bg-[var(--panel-bg)] shadow-2xl">
            <div className="mx-auto grid max-w-7xl gap-4 px-4 py-4 md:grid-cols-[14rem_minmax(0,1fr)_12rem] md:px-8">
              <aside className="hidden border-r border-[var(--border-soft)] pr-4 md:block">
                <p className="text-xs font-black uppercase tracking-widest text-[#12bfe4]">{activeCourse.category}</p>
                <h2 className="mt-2 text-2xl font-black">{activeCourse.label}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{activeCourse.description}</p>
              </aside>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {activeCourse.topics.map((topic) => (
                  <Link
                    key={topic.title}
                    href={`/tutorials/${activeCourse.slug}#${topic.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="focus-ring rounded-md border border-[var(--border-soft)] bg-[var(--control-bg)] p-3 transition hover:border-[#12bfe4] hover:bg-[#e9fbff]"
                    onClick={() => setCourseMenuOpen(false)}
                  >
                    <span className="block text-sm font-black">{topic.title}</span>
                    <span className="mt-1 line-clamp-2 block text-xs leading-5 text-[var(--text-muted)]">{topic.summary}</span>
                  </Link>
                ))}
              </div>
              <div className="grid gap-2 self-start">
                <Link className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#12bfe4] px-4 text-sm font-black text-white" href={`/tutorials/${activeCourse.slug}`} onClick={() => setCourseMenuOpen(false)}>
                  Start Course
                </Link>
                <Link className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[var(--border-soft)] bg-[var(--control-bg)] px-4 text-sm font-black" href={`/playground?course=${activeCourse.slug}`} onClick={() => setCourseMenuOpen(false)}>
                  <Code2 size={16} />
                  Playground
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {open ? (
        <nav className="border-t border-[var(--border-soft)] bg-[var(--panel-bg)] px-4 py-4 lg:hidden">
          <button className="focus-ring mb-3 flex w-full items-center gap-2 rounded-md border border-[var(--border-soft)] bg-[var(--control-bg)] px-3 py-3 text-sm font-bold" type="button" onClick={() => setSearchOpen(true)}>
            <Search size={17} />
            Search courses, topics, pages
          </button>
          <div className="grid gap-1">
            {[...navItems, { href: "/login", label: "Get Started" }].map((item) => (
              <Link key={item.href} href={item.href} className="focus-ring rounded-md px-3 py-3 text-sm font-bold hover:bg-[#effaff]" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}

      {searchOpen ? (
        <div className="fixed inset-0 z-[60] bg-black/45 px-4 py-20 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="mx-auto max-w-2xl overflow-hidden rounded-lg border border-[var(--border-soft)] bg-[var(--panel-bg)] shadow-2xl">
            <div className="flex items-center gap-3 border-b border-[var(--border-soft)] px-4 py-3">
              <Search size={18} className="text-[#12bfe4]" />
              <input
                autoFocus
                className="min-h-11 flex-1 bg-transparent text-base font-semibold outline-none placeholder:text-[var(--text-muted)]"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search HTML, Python, React, topics, exercises..."
              />
              <button className="focus-ring inline-grid h-10 w-10 place-items-center rounded-md hover:bg-black/5" type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-3">
              {searchResults.length ? (
                <div className="grid gap-2">
                  {searchResults.map((result) => (
                    <Link key={`${result.href}-${result.title}`} href={result.href} className="focus-ring rounded-md p-3 hover:bg-[#e9fbff]" onClick={() => setSearchOpen(false)}>
                      <span className="block text-sm font-black">{result.title}</span>
                      <span className="mt-1 block text-sm leading-6 text-[var(--text-muted)]">{result.body}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="px-3 py-8 text-center text-sm text-[var(--text-muted)]">No results found. Try a course name, topic, or skill.</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
