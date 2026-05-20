import { courseCatalog, courseMap } from "./courseCatalog";

export type TutorialSection = {
  title: string;
  body: string;
  code?: string;
  exercise?: string;
};

export type Tutorial = {
  slug: string;
  title: string;
  language: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  duration: string;
  objectives: string[];
  sections: TutorialSection[];
};

export const tutorials: Tutorial[] = courseCatalog.map((course) => ({
  slug: course.slug,
  title: course.title,
  language: course.label,
  level: course.level,
  duration: course.duration,
  description: course.description,
  objectives: course.objectives,
  sections: course.topics.map((topic) => ({
    title: topic.title,
    body: topic.summary,
    code: topic.code,
    exercise: topic.exercise
  }))
}));

export function tutorialSectionId(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const tutorialMap = new Map(tutorials.map((tutorial) => [tutorial.slug, tutorial]));
export { courseCatalog, courseMap };
