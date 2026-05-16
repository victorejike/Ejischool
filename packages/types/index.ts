export type UserRole = "learner" | "admin" | "instructor";

export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export type TutorialSummary = {
  slug: string;
  title: string;
  language: string;
  level: CourseLevel;
  description: string;
};

export type PlaygroundRunRequest = {
  language: string;
  code: string;
};

export type PlaygroundRunResult = {
  language: string;
  output: string;
  duration: number;
  sandboxed: boolean;
  executable: boolean;
};
