import Link from "next/link";
import { tutorials } from "@/data/tutorials";

export function TutorialSidebar() {
  return (
    <aside className="hidden border-r border-white/10 bg-white/[0.025] lg:block">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-cyan">Tutorials</p>
        <nav className="grid gap-1">
          {tutorials.map((tutorial) => (
            <Link key={tutorial.slug} href={`/tutorials/${tutorial.slug}`} className="focus-ring rounded-md px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white">
              {tutorial.language}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
