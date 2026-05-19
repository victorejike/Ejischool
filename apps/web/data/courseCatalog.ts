export type CourseTopic = {
  title: string;
  summary: string;
  code?: string;
  exercise?: string;
};

export type Course = {
  slug: string;
  label: string;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  description: string;
  objectives: string[];
  topics: CourseTopic[];
  starterCode: string;
  playgroundMode: "html" | "javascript";
};

const webIntro = (label: string) => `${label} is part of the modern web development toolkit. Learn the syntax, core ideas, and practical patterns by editing examples and building small projects.`;
const programmingIntro = (label: string) => `${label} helps you solve problems with variables, functions, data structures, control flow, and reusable programs. Practice the foundations, then apply them in real projects.`;
const dataIntro = (label: string) => `${label} is useful for data work, automation, analysis, and production workflows. Learn the important concepts, write examples, and connect the skill to practical projects.`;

function createTopics(label: string, kind: "web" | "programming" | "data" | "tool", code: string): CourseTopic[] {
  const intro = kind === "web" ? webIntro(label) : kind === "data" ? dataIntro(label) : kind === "tool" ? `${label} is a professional tool for building, shipping, or organizing software work. Learn the commands, workflow, and best practices with hands-on examples.` : programmingIntro(label);

  return [
    {
      title: `${label} Introduction`,
      summary: intro,
      code
    },
    {
      title: `${label} Syntax and Structure`,
      summary: `Understand the building blocks of ${label}: names, values, statements, comments, and the way a complete file or project is organized.`,
      exercise: `Create a small ${label} example that prints a welcome message, stores three skills, and shows them one by one.`
    },
    {
      title: `${label} Practical Patterns`,
      summary: `Use ${label} in realistic situations: forms, APIs, data processing, components, queries, scripts, or project files depending on the course.`,
      code
    },
    {
      title: `${label} Mini Project`,
      summary: `Build a compact portfolio-ready project with ${label}. Keep it readable, responsive where needed, and easy to improve after the lesson.`,
      exercise: `Open the playground, load the ${label} starter, and extend it with your own title, list, and action.`
    }
  ];
}

const htmlStarter = `<!doctype html>
<html>
  <head>
    <title>EJISCHOOL Demo</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 24px; }
      strong { color: #0ea5c8; }
    </style>
  </head>
  <body>
    <h1>Hello HTML</h1>
    <p>Build structure with <strong>semantic elements</strong>.</p>
  </body>
</html>`;

const jsStarter = (label: string) => `const course = "${label}";
const topics = ["syntax", "practice", "project"];

topics.forEach((topic, index) => {
  console.log(\`\${index + 1}. Learn \${course} \${topic}\`);
});`;

const cssStarter = `.lesson-card {
  border: 1px solid #11d7f5;
  border-radius: 8px;
  padding: 16px;
  display: grid;
  gap: 8px;
}`;

const sqlStarter = `SELECT name, progress
FROM learners
WHERE course = 'SQL'
ORDER BY progress DESC;`;

const coursesSeed = [
  ["html", "HTML", "Web", "web", htmlStarter],
  ["css", "CSS", "Web", "web", cssStarter],
  ["javascript", "JavaScript", "Web", "programming", jsStarter("JavaScript")],
  ["sql", "SQL", "Data", "data", sqlStarter],
  ["python", "Python", "Programming", "programming", jsStarter("Python")],
  ["java", "Java", "Programming", "programming", jsStarter("Java")],
  ["php", "PHP", "Web", "programming", jsStarter("PHP")],
  ["how-to", "How To", "Web", "web", htmlStarter],
  ["w3css", "W3.CSS", "Web", "web", cssStarter],
  ["c", "C", "Programming", "programming", jsStarter("C")],
  ["cpp", "C++", "Programming", "programming", jsStarter("C++")],
  ["csharp", "C#", "Programming", "programming", jsStarter("C#")],
  ["bootstrap", "Bootstrap", "Web", "web", htmlStarter],
  ["react", "React", "Web", "programming", `function LessonBadge({ title }) {
  return <span>{title}</span>;
}`],
  ["mysql", "MySQL", "Data", "data", sqlStarter],
  ["jquery", "jQuery", "Web", "programming", jsStarter("jQuery")],
  ["excel", "Excel", "Data", "data", jsStarter("Excel")],
  ["xml", "XML", "Data", "data", `<course>
  <title>XML</title>
  <level>Beginner</level>
</course>`],
  ["django", "Django", "Web", "programming", jsStarter("Django")],
  ["numpy", "NumPy", "Data", "data", jsStarter("NumPy")],
  ["pandas", "Pandas", "Data", "data", jsStarter("Pandas")],
  ["nodejs", "Node.js", "Web", "programming", jsStarter("Node.js")],
  ["r", "R", "Data", "data", jsStarter("R")],
  ["typescript", "TypeScript", "Programming", "programming", jsStarter("TypeScript")],
  ["angular", "Angular", "Web", "programming", jsStarter("Angular")],
  ["git", "Git", "Tools", "tool", `git status
git add .
git commit -m "Practice Git"`],
  ["postgresql", "PostgreSQL", "Data", "data", sqlStarter],
  ["mongodb", "MongoDB", "Data", "data", jsStarter("MongoDB")],
  ["asp", "ASP", "Web", "programming", jsStarter("ASP")],
  ["ai", "AI", "Data", "data", jsStarter("AI")],
  ["go", "Go", "Programming", "programming", `package main

import "fmt"

func main() {
  fmt.Println("Hello Go")
}`],
  ["kotlin", "Kotlin", "Programming", "programming", jsStarter("Kotlin")],
  ["sass", "Sass", "Web", "web", `$brand: #11d7f5;

.lesson-card {
  border-color: $brand;
}`],
  ["vue", "Vue", "Web", "programming", jsStarter("Vue")],
  ["dsa", "DSA", "Programming", "programming", jsStarter("Data Structures and Algorithms")],
  ["genai", "GenAI", "Data", "data", jsStarter("Generative AI")],
  ["scipy", "SciPy", "Data", "data", jsStarter("SciPy")],
  ["cybersecurity", "Cybersecurity", "Tools", "tool", jsStarter("Cybersecurity")],
  ["data-science", "Data Science", "Data", "data", jsStarter("Data Science")]
] as const;

export const courseCatalog: Course[] = coursesSeed.map(([slug, label, category, kind, starterCode]) => ({
  slug,
  label,
  title: `${label} Tutorial`,
  category,
  level: category === "Web" || category === "Programming" ? "Beginner" : "Intermediate",
  duration: category === "Tools" ? "3 hours" : "6 hours",
  description: `${label} lessons with examples, exercises, topic notes, and a playground starter.`,
  objectives: [`Understand ${label} fundamentals`, `Practice common ${label} patterns`, `Build a small ${label} project`],
  topics: createTopics(label, kind, starterCode),
  starterCode,
  playgroundMode: ["html", "css", "how-to", "w3css", "bootstrap", "sass"].includes(slug) ? "html" : "javascript"
}));

export const courseMap = new Map(courseCatalog.map((course) => [course.slug, course]));
