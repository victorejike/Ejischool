"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

type Course = {
  slug: string;
  title: string;
  level: string;
  description: string;
};

type LiveCourseHeaderProps = {
  slug: string;
  fallbackTitle: string;
  fallbackLevel: string;
  fallbackDuration: string;
  fallbackDescription: string;
};

export function LiveCourseHeader({ slug, fallbackTitle, fallbackLevel, fallbackDuration, fallbackDescription }: LiveCourseHeaderProps) {
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    apiRequest<Course>(`/v1/courses/${slug}`)
      .then(setCourse)
      .catch(() => setCourse(null));
  }, [slug]);

  return (
    <div className="mb-8">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-cyan">{course?.level ?? fallbackLevel} · {fallbackDuration}</p>
      <h1 className="mt-3 text-4xl font-black tracking-normal text-white md:text-5xl">{course?.title ?? fallbackTitle}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">{course?.description ?? fallbackDescription}</p>
    </div>
  );
}
