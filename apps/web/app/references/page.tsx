import { Search } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { references } from "@/data/platform";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Developer References", "Fast EJISCHOOL references for HTML tags, CSS properties, JavaScript methods, SQL commands, and APIs.", "/references");

export default function ReferencesPage() {
  return (
    <>
      <PageHero eyebrow="Reference Library" title="Fast answers for daily development" description="Searchable reference material for syntax, browser behavior, common APIs, and production patterns." />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex max-w-xl items-center gap-3 rounded-lg border border-white/10 bg-white/[0.045] px-4 py-3">
          <Search className="text-brand-cyan" size={18} aria-hidden />
          <span className="text-sm text-white/55">Search tags, properties, methods, commands, and APIs</span>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {references.map((item) => (
          <article key={item.title} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <p className="text-sm font-bold text-brand-cyan">{item.count}</p>
            <h2 className="mt-3 text-xl font-bold">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/65">{item.description}</p>
          </article>
        ))}
        </div>
      </div>
    </>
  );
}
