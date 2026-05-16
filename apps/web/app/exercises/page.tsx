import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { exerciseTracks } from "@/data/platform";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Coding Exercises", "Practice beginner, intermediate, and advanced EJISCHOOL coding exercises.", "/exercises");

export default function ExercisesPage() {
  return (
    <>
      <PageHero eyebrow="Practice" title="Exercises that turn reading into skill" description="Each track pairs short tasks with starter code, expected output, grading status, and progress tracking." />
      <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {exerciseTracks.map((track) => (
          <article key={track.level} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-cyan">{track.level}</p>
            <h2 className="mt-3 text-xl font-bold">{track.title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/65">{track.description}</p>
            <div className="mt-5 grid gap-2 text-sm text-white/72">
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-cyan" />{track.tasks} tasks</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-cyan" />{track.passRate} pass rate</span>
            </div>
          </article>
        ))}
      </div>
      </div>
    </>
  );
}
