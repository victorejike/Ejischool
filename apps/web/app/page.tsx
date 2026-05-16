import { BookOpen, Bot, Code2, GraduationCap, LineChart, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { tutorials } from "@/data/tutorials";

const features = [
  { title: "Tutorial Engine", body: "Structured lessons with examples, exercises, quizzes, and references.", icon: <BookOpen size={20} /> },
  { title: "Live Playground", body: "Edit and preview code instantly while preparing for sandboxed execution.", icon: <Code2 size={20} /> },
  { title: "AI Tutor", body: "Guided hints, explanations, code review, bug fixing, and roadmap support.", icon: <Bot size={20} /> },
  { title: "Certificates", body: "Exam flow, auto grading, PDF generation, and profile storage foundation.", icon: <GraduationCap size={20} /> },
  { title: "Analytics", body: "Track progress, drop-offs, completions, difficult lessons, and revenue.", icon: <LineChart size={20} /> },
  { title: "Security", body: "JWT-ready auth, rate limits, validation, RBAC, audit logs, and sandboxing.", icon: <ShieldCheck size={20} /> }
];

export default function HomePage() {
  return (
    <>
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(17,215,245,0.16),transparent_34%),#071115]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-cyan">Learn. Build. Certify.</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-black tracking-normal text-white md:text-6xl">EJISCHOOL</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
              A fast, SEO-ready software learning platform with tutorials, references, exercises, playgrounds, certificates, dashboards, and AI learning tools.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <PrimaryButton href="/tutorials/html">Start Learning</PrimaryButton>
              <Link className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 px-5 py-2 text-sm font-bold text-white hover:bg-white/10" href="/playground">
                Open Playground
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4 shadow-glow">
            <div className="rounded-md border border-white/10 bg-[#071014] p-4">
              <div className="mb-4 flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-300" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <pre className="overflow-x-auto text-sm leading-7 text-white/80">
                <code>{`const roadmap = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Go',
  'Python'
];

roadmap.forEach((skill) => {
  learn(skill);
  practice(skill);
  buildProject(skill);
});`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {tutorials.map((tutorial) => (
            <Link key={tutorial.slug} href={`/tutorials/${tutorial.slug}`} className="focus-ring rounded-lg border border-white/10 bg-white/[0.045] p-4 hover:border-brand-cyan/50">
              <p className="font-bold">{tutorial.language}</p>
              <p className="mt-2 text-sm text-white/58">{tutorial.level}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-black">Platform systems</h2>
            <p className="mt-3 leading-7 text-white/68">The MVP starts with tutorials, SEO, and playgrounds, while keeping the architecture ready for auth, AI, certificates, payments, and scale.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
