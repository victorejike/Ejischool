"use client";

import { Save, Wifi } from "lucide-react";
import { useEffect, useState } from "react";
import { apiBaseUrl, apiRequest } from "@/lib/api";

type Course = {
  slug: string;
  title: string;
  language: string;
  level: string;
  description: string;
};

export function AdminCourseEditor() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [draft, setDraft] = useState<Course | null>(null);
  const [status, setStatus] = useState("Loading courses from the API...");
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    apiRequest<Course[]>("/v1/courses")
      .then((items) => {
        setCourses(items);
        setSelectedSlug(items[0]?.slug ?? "");
        setDraft(items[0] ?? null);
        setStatus("Courses loaded from database/API.");
      })
      .catch((error) => setStatus(error instanceof Error ? error.message : "Could not load courses."));
  }, []);

  useEffect(() => {
    const source = new EventSource(`${apiBaseUrl}/v1/events`);
    source.addEventListener("ready", () => setEvents((items) => ["Live database events connected.", ...items].slice(0, 5)));
    source.addEventListener("message", (event) => setEvents((items) => [event.data, ...items].slice(0, 5)));
    source.onerror = () => setEvents((items) => ["Live event stream reconnecting...", ...items].slice(0, 5));
    return () => source.close();
  }, []);

  function selectCourse(slug: string) {
    const course = courses.find((item) => item.slug === slug) ?? null;
    setSelectedSlug(slug);
    setDraft(course);
  }

  async function saveCourse() {
    if (!draft) {
      return;
    }
    setStatus("Saving course to the database...");
    try {
      const saved = await apiRequest<Course>(`/v1/courses/${draft.slug}`, {
        method: "PUT",
        body: JSON.stringify(draft)
      });
      setCourses((items) => items.map((item) => (item.slug === saved.slug ? saved : item)));
      setDraft(saved);
      setStatus(`${saved.title} saved. Other admin screens receive the live event.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not save course.");
    }
  }

  return (
    <section className="mt-10 grid gap-5 lg:grid-cols-[18rem_minmax(0,1fr)_18rem]">
      <aside className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
        <p className="text-xs font-black uppercase tracking-widest text-brand-cyan">Courses</p>
        <select className="focus-ring mt-4 w-full rounded-md border border-white/10 bg-black/20 px-3 py-3 text-sm font-bold text-white" value={selectedSlug} onChange={(event) => selectCourse(event.target.value)}>
          {courses.map((course) => (
            <option key={course.slug} value={course.slug}>
              {course.title}
            </option>
          ))}
        </select>
        <div className="mt-4 grid max-h-72 gap-1 overflow-y-auto">
          {courses.map((course) => (
            <button key={course.slug} className={`focus-ring rounded-md px-3 py-2 text-left text-sm font-bold ${selectedSlug === course.slug ? "bg-brand-cyan text-brand-ink" : "hover:bg-white/10"}`} type="button" onClick={() => selectCourse(course.slug)}>
              {course.language || course.title}
            </button>
          ))}
        </div>
      </aside>

      <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-brand-cyan">Course Editor</p>
            <h2 className="mt-2 text-2xl font-black">{draft?.title ?? "No course selected"}</h2>
          </div>
          <button className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-cyan px-4 text-sm font-black text-brand-ink" type="button" onClick={saveCourse} disabled={!draft}>
            <Save size={17} />
            Save
          </button>
        </div>
        {draft ? (
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2 text-sm font-semibold text-white/80">
              Title
              <input className="focus-ring rounded-md border border-white/10 bg-black/20 px-3 py-3 text-white" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-white/80">
              Level
              <select className="focus-ring rounded-md border border-white/10 bg-black/20 px-3 py-3 text-white" value={draft.level} onChange={(event) => setDraft({ ...draft, level: event.target.value })}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-white/80">
              Description
              <textarea className="focus-ring min-h-32 rounded-md border border-white/10 bg-black/20 px-3 py-3 text-white" value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} />
            </label>
          </div>
        ) : null}
        <p className="mt-4 rounded-md border border-white/10 bg-black/15 p-3 text-sm leading-6 text-white/70">{status}</p>
      </div>

      <aside className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
        <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-cyan">
          <Wifi size={15} />
          Live Events
        </p>
        <div className="mt-4 grid gap-2">
          {events.map((event, index) => (
            <div key={`${event}-${index}`} className="rounded-md border border-white/10 bg-black/15 p-3 text-xs leading-5 text-white/70">
              {event}
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}
