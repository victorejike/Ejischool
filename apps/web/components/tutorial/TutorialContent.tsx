import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { Tutorial } from "@/data/tutorials";
import { MiniEditor } from "@/components/code-editor/MiniEditor";
import { LiveCourseHeader } from "@/components/tutorial/LiveCourseHeader";

type TutorialContentProps = {
  tutorial: Tutorial;
};

export function TutorialContent({ tutorial }: TutorialContentProps) {
  const sectionId = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
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
    <article className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <LiveCourseHeader slug={tutorial.slug} fallbackTitle={tutorial.title} fallbackLevel={tutorial.level} fallbackDuration={tutorial.duration} fallbackDescription={tutorial.description} />
      <Link href={`/playground?course=${tutorial.slug}`} className="focus-ring mb-8 inline-flex min-h-11 items-center rounded-md bg-brand-cyan px-5 text-sm font-black text-brand-ink">
        Open {tutorial.language} Playground
      </Link>
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
        {tutorial.sections.map((section) => (
          <section key={section.title} id={sectionId(section.title)} className="scroll-mt-36">
            <h2 className="text-2xl font-bold">{section.title}</h2>
            <p className="mt-3 leading-8 text-white/72">{section.body}</p>
            {section.code ? <MiniEditor code={section.code} language={tutorial.language.toLowerCase()} /> : null}
            {section.exercise ? (
              <div className="mt-4 rounded-lg border border-brand-cyan/30 bg-brand-cyan/10 p-4">
                <p className="text-sm font-bold text-brand-cyan">Exercise</p>
                <p className="mt-2 text-sm leading-6 text-white/75">{section.exercise}</p>
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}
