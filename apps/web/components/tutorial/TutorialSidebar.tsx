import Link from "next/link";
import type { Tutorial } from "@/data/tutorials";
import { tutorialSectionId } from "@/data/tutorials";

type TutorialSidebarProps = {
  tutorial: Tutorial;
};

export function TutorialSidebar({ tutorial }: TutorialSidebarProps) {
  return (
    <aside className="hidden border-r border-white/10 bg-white/[0.025] lg:block">
      <div className="h-full overflow-y-auto px-4 py-5 xl:h-[calc(100vh-7.5rem)]">
        <h2 className="mb-4 text-xl font-normal">{tutorial.language} Tutorial</h2>
        <nav className="grid gap-1" aria-label={`${tutorial.title} topics`}>
          <Link href={`/tutorials/${tutorial.slug}`} className="focus-ring rounded-md px-3 py-2 text-sm font-bold text-white/80 hover:bg-white/10 hover:text-white">
            {tutorial.language} Home
          </Link>
          {tutorial.sections.map((section) => (
            <Link key={section.title} href={`#${tutorialSectionId(section.title)}`} className="focus-ring rounded-md px-3 py-2 text-sm text-white/72 hover:bg-brand-cyan hover:text-brand-ink">
              {section.title}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
