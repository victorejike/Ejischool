"use client";

import { CheckCircle2, Play } from "lucide-react";
import { useState } from "react";
import { courseCatalog } from "@/data/courseCatalog";
import { apiRequest } from "@/lib/api";

type Result = {
  status: string;
  score: number;
  hint: string;
};

export function ExerciseRunner() {
  const [courseSlug, setCourseSlug] = useState("javascript");
  const course = courseCatalog.find((item) => item.slug === courseSlug) ?? courseCatalog[0];
  const [code, setCode] = useState(course.starterCode);
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);

  function switchCourse(slug: string) {
    const next = courseCatalog.find((item) => item.slug === slug) ?? courseCatalog[0];
    setCourseSlug(slug);
    setCode(next.starterCode);
    setResult(null);
  }

  async function submit() {
    setBusy(true);
    try {
      const response = await apiRequest<Result>("/v1/exercises/submit", {
        method: "POST",
        body: JSON.stringify({ courseSlug, userId: "demo-user", code })
      });
      setResult(response);
    } catch (error) {
      setResult({ status: "failed", score: 0, hint: error instanceof Error ? error.message : "Submission failed." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="overflow-hidden rounded-lg border border-white/10 bg-[#071014]">
        <div className="flex flex-col gap-3 border-b border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-brand-cyan">Functional Exercise</p>
            <h2 className="mt-1 text-xl font-black">{course.label} Challenge</h2>
          </div>
          <select className="focus-ring rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm font-bold text-white" value={courseSlug} onChange={(event) => switchCourse(event.target.value)}>
            {courseCatalog.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <textarea className="min-h-80 w-full resize-y bg-transparent p-4 font-mono text-sm leading-6 text-white outline-none" value={code} onChange={(event) => setCode(event.target.value)} spellCheck={false} />
        <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/65">Submit working code that includes real structure, output, or query logic.</p>
          <button className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-cyan px-5 text-sm font-black text-brand-ink disabled:opacity-60" type="button" disabled={busy} onClick={submit}>
            <Play size={17} />
            {busy ? "Checking..." : "Check Answer"}
          </button>
        </div>
      </div>
      <aside className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
        <p className="text-sm font-black uppercase tracking-widest text-brand-cyan">Task</p>
        <h3 className="mt-3 text-2xl font-black">{course.topics[3]?.title ?? `${course.label} Project`}</h3>
        <p className="mt-3 text-sm leading-6 text-white/70">{course.topics[3]?.summary ?? course.description}</p>
        <div className="mt-5 grid gap-2 text-sm text-white/72">
          <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-cyan" />Uses database-backed submission API</span>
          <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-cyan" />Broadcasts a live event</span>
          <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-cyan" />Returns score and feedback</span>
        </div>
        {result ? (
          <div className="mt-5 rounded-md border border-brand-cyan/30 bg-brand-cyan/10 p-4">
            <p className="text-sm font-black text-brand-cyan">{result.status.toUpperCase()} - {result.score}%</p>
            <p className="mt-2 text-sm leading-6 text-white/75">{result.hint}</p>
          </div>
        ) : null}
      </aside>
    </section>
  );
}
