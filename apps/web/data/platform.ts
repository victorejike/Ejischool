import { BarChart3, BookOpenCheck, Bot, BriefcaseBusiness, Code2, CreditCard, FileBadge, GraduationCap, MessageSquare, ShieldCheck, Users } from "lucide-react";

export const references = [
  { title: "HTML Tags", description: "Semantic elements, form controls, metadata, tables, media, and accessibility notes.", count: "112 entries" },
  { title: "CSS Properties", description: "Layout, color, typography, animation, transforms, responsive rules, and browser behavior.", count: "248 entries" },
  { title: "JavaScript Methods", description: "Array, object, string, date, promise, DOM, fetch, storage, and event APIs.", count: "186 entries" },
  { title: "SQL Commands", description: "Queries, joins, indexes, constraints, transactions, aggregation, and schema design.", count: "64 entries" },
  { title: "API Docs", description: "HTTP status codes, REST patterns, authentication, rate limits, payloads, and pagination.", count: "42 guides" }
];

export const exerciseTracks = [
  { level: "Beginner", title: "Syntax and Structure", tasks: 36, passRate: "84%", description: "Practice tags, selectors, variables, functions, loops, and basic components." },
  { level: "Intermediate", title: "Real UI and API Work", tasks: 28, passRate: "67%", description: "Build forms, fetch data, validate input, handle errors, and compose reusable features." },
  { level: "Advanced", title: "Production Challenges", tasks: 18, passRate: "41%", description: "Solve performance, architecture, testing, security, and full-stack workflow problems." }
];

export const certificatePaths = [
  { title: "Frontend Developer", lessons: 72, exam: "90 minutes", skills: ["HTML", "CSS", "JavaScript", "React"] },
  { title: "Backend Go Developer", lessons: 44, exam: "75 minutes", skills: ["Go", "HTTP", "PostgreSQL", "Redis"] },
  { title: "Python Foundations", lessons: 38, exam: "60 minutes", skills: ["Python", "Functions", "Files", "Automation"] }
];

export const plans = [
  { name: "Free", price: "$0", description: "Start learning with tutorials, references, and the browser playground.", highlights: ["Core tutorials", "Reference library", "HTML playground", "Community access"] },
  { name: "Pro", price: "$12", description: "Go deeper with certificates, progress analytics, and AI-assisted learning.", highlights: ["Certificate exams", "AI tutor sessions", "Saved progress", "Project reviews"] },
  { name: "Team", price: "$49", description: "Manage structured learning for schools, bootcamps, and engineering teams.", highlights: ["Admin dashboard", "Learner analytics", "Private cohorts", "Priority support"] }
];

export const adminModules = [
  { title: "Users", metric: "12.4k", status: "Active learners", icon: Users },
  { title: "Courses", metric: "18", status: "Published tracks", icon: BookOpenCheck },
  { title: "Tutorials", metric: "326", status: "SEO lessons", icon: Code2 },
  { title: "Payments", metric: "$42k", status: "Monthly revenue", icon: CreditCard },
  { title: "Analytics", metric: "91%", status: "Completion quality", icon: BarChart3 },
  { title: "Certificates", metric: "2.1k", status: "Issued", icon: FileBadge },
  { title: "Moderation", metric: "14", status: "Open reviews", icon: ShieldCheck },
  { title: "AI Controls", metric: "8", status: "Tutor policies", icon: Bot }
];

export const blogPosts = [
  { category: "Roadmap", title: "How to start learning web development", readTime: "7 min", summary: "A practical order for HTML, CSS, JavaScript, React, projects, and interview preparation." },
  { category: "Career", title: "What junior developers should build first", readTime: "6 min", summary: "Portfolio projects that prove fundamentals, problem solving, and product thinking." },
  { category: "Backend", title: "Why Go is a strong API language", readTime: "5 min", summary: "Simple services, fast builds, clean deployment, and reliable scaling patterns." }
];

export const communityRooms = [
  { title: "Coding Rooms", members: "4.8k", description: "Work through lessons together and compare solutions after submission.", icon: Code2 },
  { title: "Project Reviews", members: "1.7k", description: "Share finished projects and receive structured feedback from mentors.", icon: MessageSquare },
  { title: "Interview Prep", members: "2.2k", description: "Practice technical questions, portfolio walkthroughs, and take-home tasks.", icon: BriefcaseBusiness },
  { title: "Study Cohorts", members: "3.5k", description: "Join weekly groups for HTML, CSS, JavaScript, React, Go, and Python.", icon: GraduationCap }
];
