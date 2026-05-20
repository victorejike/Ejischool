import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { Tutorial } from "@/data/tutorials";
import { tutorialSectionId } from "@/data/tutorials";
import { AITutorPanel } from "@/components/ai/AITutorPanel";
import { MiniEditor } from "@/components/code-editor/MiniEditor";
import { CourseProgressTracker } from "@/components/tutorial/CourseProgressTracker";
import { LiveCourseHeader } from "@/components/tutorial/LiveCourseHeader";

type TutorialContentProps = {
  tutorial: Tutorial;
};

export function TutorialContent({ tutorial }: TutorialContentProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: tutorial.title,
    description: tutorial.description,
    provider: {
      "@type": "Organization",
      name: "EJISCHOOL"
    }
  };

  return (
    <article className="min-w-0 px-4 py-6 lg:px-6 xl:h-[calc(100vh-7.5rem)] xl:overflow-y-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <LiveCourseHeader slug={tutorial.slug} fallbackTitle={tutorial.title} fallbackLevel={tutorial.level} fallbackDuration={tutorial.duration} fallbackDescription={tutorial.description} />
      <section className="mb-6 lg:hidden" aria-label={`${tutorial.title} mobile topics`}>
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-cyan">Topics</p>
        <nav className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
          {tutorial.sections.map((section, index) => (
            <Link key={section.title} href={`#${tutorialSectionId(section.title)}`} className="focus-ring shrink-0 rounded-md border border-white/10 bg-white/[0.045] px-3 py-2 text-sm font-bold text-white/72">
              {index + 1}. {section.title}
            </Link>
          ))}
        </nav>
      </section>
      <CourseProgressTracker courseSlug={tutorial.slug} sections={tutorial.sections} />
      <Link href={`/playground?course=${tutorial.slug}`} className="focus-ring mb-8 inline-flex min-h-11 items-center rounded-md bg-brand-cyan px-5 text-sm font-black text-brand-ink">
        Open {tutorial.language} Playground
      </Link>
      <div className="mb-6 xl:hidden">
        <AITutorPanel courseSlug={tutorial.slug} courseTitle={tutorial.title} currentTopic={tutorial.sections[0]?.title} topics={tutorial.sections.map((section) => section.title)} />
      </div>
      <section className="mb-8 rounded-lg border border-white/10 bg-white/[0.045] p-5">
        <h2 className="text-xl font-bold">Learning Objectives</h2>
        <div className="mt-4 grid gap-3">
          {tutorial.objectives.map((objective) => (
            <div key={objective} className="flex items-center gap-3 text-sm text-white/78">
              <CheckCircle2 className="text-brand-cyan" size={18} aria-hidden />
              <span>{objective}</span>
            </div>
          ))}
        </div>
      </section>
      <div className="grid gap-8">
        {tutorial.sections.map((section, index) => {
          const previous = tutorial.sections[index - 1];
          const next = tutorial.sections[index + 1];
          return (
          <section key={section.title} id={tutorialSectionId(section.title)} className="scroll-mt-36">
            <h2 className="text-2xl font-bold">{section.title}</h2>
            <p className="mt-3 leading-8 text-white/72">{section.body}</p>
            {section.code ? <MiniEditor code={section.code} language={tutorial.language.toLowerCase()} /> : null}
            {section.exercise ? (
              <div className="mt-4 rounded-lg border border-brand-cyan/30 bg-brand-cyan/10 p-4">
                <p className="text-sm font-bold text-brand-cyan">Exercise</p>
                <p className="mt-2 text-sm leading-6 text-white/75">{section.exercise}</p>
              </div>
            ) : null}
            <nav className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5" aria-label={`${section.title} navigation`}>
              {previous ? (
                <Link href={`#${tutorialSectionId(previous.title)}`} className="focus-ring rounded-md border border-white/10 px-4 py-2 text-sm font-bold text-white/72 hover:bg-white/10 hover:text-white">
                  Previous
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={`#${tutorialSectionId(next.title)}`} className="focus-ring rounded-md bg-brand-cyan px-4 py-2 text-sm font-black text-brand-ink">
                  Next
                </Link>
              ) : (
                <Link href={`/playground?course=${tutorial.slug}`} className="focus-ring rounded-md bg-brand-cyan px-4 py-2 text-sm font-black text-brand-ink">
                  Practice
                </Link>
              )}
            </nav>
          </section>
          );
        })}
      </div>
    </article>
  );
}
