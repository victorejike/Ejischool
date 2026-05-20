"use client";

import { Clock, Gauge, ListChecks } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { TutorialSection } from "@/data/tutorials";
import { tutorialSectionId } from "@/data/tutorials";

type CourseProgressTrackerProps = {
  courseSlug: string;
  sections: TutorialSection[];
};

type ProgressState = {
  seconds: number;
  completedIds: string[];
};

const storageKey = (courseSlug: string) => `ejischool:progress:${courseSlug}`;

function readProgress(courseSlug: string): ProgressState {
  if (typeof window === "undefined") {
    return { seconds: 0, completedIds: [] };
  }

  try {
    const saved = window.localStorage.getItem(storageKey(courseSlug));
    if (!saved) {
      return { seconds: 0, completedIds: [] };
    }
    const parsed = JSON.parse(saved) as Partial<ProgressState>;
    return {
      seconds: typeof parsed.seconds === "number" ? parsed.seconds : 0,
      completedIds: Array.isArray(parsed.completedIds) ? parsed.completedIds.filter((id) => typeof id === "string") : []
    };
  } catch {
    return { seconds: 0, completedIds: [] };
  }
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes < 1) {
    return `${seconds}s`;
  }
  return `${minutes}m ${seconds.toString().padStart(2, "0")}s`;
}

export function CourseProgressTracker({ courseSlug, sections }: CourseProgressTrackerProps) {
  const sectionIds = useMemo(() => sections.map((section) => tutorialSectionId(section.title)), [sections]);
  const [progress, setProgress] = useState<ProgressState>(() => ({ seconds: 0, completedIds: [] }));

  useEffect(() => {
    setProgress(readProgress(courseSlug));
  }, [courseSlug]);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setProgress((current) => {
        const next = { ...current, seconds: current.seconds + 1 };
        window.localStorage.setItem(storageKey(courseSlug), JSON.stringify(next));
        window.dispatchEvent(new CustomEvent("ejischool-progress", { detail: { courseSlug, ...next } }));
        return next;
      });
    }, 1000);

    return () => window.clearInterval(tick);
  }, [courseSlug]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleIds = entries.filter((entry) => entry.isIntersecting).map((entry) => entry.target.id);
        if (visibleIds.length === 0) {
          return;
        }

        setProgress((current) => {
          const completed = new Set(current.completedIds);
          visibleIds.forEach((id) => completed.add(id));
          const next = { ...current, completedIds: sectionIds.filter((id) => completed.has(id)) };
          const activeId = visibleIds[0];
          const activeTopic = sections.find((section) => tutorialSectionId(section.title) === activeId)?.title;
          window.localStorage.setItem(storageKey(courseSlug), JSON.stringify(next));
          window.dispatchEvent(new CustomEvent("ejischool-progress", { detail: { courseSlug, activeId, activeTopic, ...next } }));
          return next;
        });
      },
      { rootMargin: "-20% 0px -45% 0px", threshold: 0.35 }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [courseSlug, sectionIds, sections]);

  const topicPercent = sectionIds.length === 0 ? 0 : Math.round((progress.completedIds.length / sectionIds.length) * 100);
  const timePercent = Math.min(100, Math.round((progress.seconds / Math.max(60, sectionIds.length * 180)) * 100));
  const percent = Math.max(topicPercent, timePercent);

  return (
    <section className="mb-8 rounded-lg border border-white/10 bg-white/[0.045] p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-cyan">Live Progress</p>
          <h2 className="mt-2 text-xl font-bold">{percent}% complete</h2>
        </div>
        <div className="flex flex-wrap gap-2 text-sm text-white/68">
          <span className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2">
            <Clock size={16} aria-hidden />
            {formatTime(progress.seconds)}
          </span>
          <span className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2">
            <ListChecks size={16} aria-hidden />
            {progress.completedIds.length}/{sectionIds.length} topics
          </span>
        </div>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-black/25" aria-label={`Course progress ${percent}%`}>
        <div className="h-full rounded-full bg-brand-cyan transition-all duration-500" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-3 inline-flex items-center gap-2 text-sm text-white/64">
        <Gauge size={16} aria-hidden />
        Updates while you read, move through topics, and spend time in this lesson.
      </p>
    </section>
  );
}
