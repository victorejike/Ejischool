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

export const tutorials: Tutorial[] = [
  {
    slug: "html",
    title: "HTML Tutorial",
    language: "HTML",
    level: "Beginner",
    duration: "4 hours",
    description: "Learn the structure of web pages using semantic HTML.",
    objectives: ["Understand document structure", "Use semantic tags", "Build accessible content"],
    sections: [
      {
        title: "Introduction",
        body: "HTML describes the meaning and structure of a web page. Browsers read HTML elements and turn them into headings, paragraphs, forms, images, links, and layouts.",
        code: "<main>\n  <h1>Welcome to EJISCHOOL</h1>\n  <p>Learn by reading, editing, and building.</p>\n</main>"
      },
      {
        title: "Semantic Elements",
        body: "Semantic tags such as header, nav, main, section, article, and footer make pages easier to read, index, and access.",
        exercise: "Create a page with a header, navigation, main article, and footer."
      }
    ]
  },
  {
    slug: "css",
    title: "CSS Tutorial",
    language: "CSS",
    level: "Beginner",
    duration: "5 hours",
    description: "Style responsive pages with modern CSS foundations.",
    objectives: ["Use selectors", "Control layout", "Create responsive interfaces"],
    sections: [
      {
        title: "Introduction",
        body: "CSS controls presentation: color, spacing, typography, layout, motion, and responsiveness.",
        code: ".lesson-card {\n  border: 1px solid rgba(17, 215, 245, 0.35);\n  padding: 1rem;\n  border-radius: 8px;\n}"
      },
      {
        title: "Responsive Layout",
        body: "Use flexible units, grid, flexbox, and media queries to make interfaces work on phones, tablets, and desktops.",
        exercise: "Build a two-column layout that becomes one column on mobile."
      }
    ]
  },
  {
    slug: "javascript",
    title: "JavaScript Tutorial",
    language: "JavaScript",
    level: "Beginner",
    duration: "8 hours",
    description: "Add logic, events, and interactivity to web applications.",
    objectives: ["Use variables and functions", "Handle events", "Work with arrays and objects"],
    sections: [
      {
        title: "Introduction",
        body: "JavaScript is the programming language of the web. It can update pages, validate forms, call APIs, and power rich applications.",
        code: "const skills = ['HTML', 'CSS', 'JavaScript'];\nconsole.log(skills.map((skill) => `Learn ${skill}`));"
      },
      {
        title: "Functions",
        body: "Functions group logic into reusable blocks. They can receive input, return output, and keep programs readable.",
        exercise: "Write a function that accepts a learner name and returns a welcome message."
      }
    ]
  },
  {
    slug: "react",
    title: "React Tutorial",
    language: "React",
    level: "Intermediate",
    duration: "9 hours",
    description: "Build component-driven user interfaces with React.",
    objectives: ["Create components", "Manage state", "Compose UI patterns"],
    sections: [
      {
        title: "Components",
        body: "React components are reusable UI functions. They receive props and return interface elements.",
        code: "function LessonBadge({ title }: { title: string }) {\n  return <span>{title}</span>;\n}"
      },
      {
        title: "State",
        body: "State stores values that change over time, such as form inputs, toggles, filters, and user progress.",
        exercise: "Create a component with a button that increments a lesson counter."
      }
    ]
  },
  {
    slug: "go",
    title: "Go Tutorial",
    language: "Go",
    level: "Beginner",
    duration: "7 hours",
    description: "Learn fast backend programming with Go.",
    objectives: ["Understand packages", "Write handlers", "Model service logic"],
    sections: [
      {
        title: "Introduction",
        body: "Go is a compiled language built for simple, fast, reliable server software. It is a strong backend choice for EJISCHOOL services.",
        code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n  fmt.Println(\"Welcome to EJISCHOOL Go\")\n}"
      },
      {
        title: "HTTP Services",
        body: "Go can build API services with a small standard-library surface and later evolve into Gin, Fiber, or gRPC service boundaries.",
        exercise: "Create a health endpoint that returns JSON status."
      }
    ]
  },
  {
    slug: "python",
    title: "Python Tutorial",
    language: "Python",
    level: "Beginner",
    duration: "6 hours",
    description: "Learn readable programming for automation, data, AI, and backend work.",
    objectives: ["Use variables", "Write functions", "Process lists"],
    sections: [
      {
        title: "Introduction",
        body: "Python emphasizes readability and a rich ecosystem. It is excellent for beginners, automation, data work, and AI workflows.",
        code: "skills = ['syntax', 'functions', 'projects']\nfor skill in skills:\n    print(f'Practice {skill}')"
      },
      {
        title: "Functions",
        body: "Python functions use indentation to define their body. Clear names and small functions make programs easier to maintain.",
        exercise: "Write a function that calculates the average of three quiz scores."
      }
    ]
  }
];

export const tutorialMap = new Map(tutorials.map((tutorial) => [tutorial.slug, tutorial]));
