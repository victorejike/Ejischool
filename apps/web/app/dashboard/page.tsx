import { AITutorPanel } from "@/components/ai/AITutorPanel";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Learner Dashboard", "Track EJISCHOOL learning progress, streaks, certificates, and AI tutor activity.", "/dashboard");

const stats = [
  ["Lessons completed", "18"],
  ["Exercise score", "82%"],
  ["Certificates", "1"],
  ["Current streak", "7 days"]
];

export default function DashboardPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-[1fr_24rem]">
      <section>
        <p className="text-sm font-bold uppercase tracking-widest text-brand-cyan">Dashboard</p>
        <h1 className="mt-3 text-4xl font-black">Learning progress</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {stats.map(([label, value]) => (
            <article key={label} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
              <p className="text-3xl font-black text-brand-cyan">{value}</p>
              <p className="mt-2 text-sm text-white/62">{label}</p>
            </article>
          ))}
        </div>
        <section className="mt-6 rounded-lg border border-white/10 bg-white/[0.045] p-5">
          <h2 className="text-xl font-bold">Recommended roadmap</h2>
          <div className="mt-4 grid gap-3">
            {["Finish JavaScript functions", "Build a React component", "Try the Go HTTP exercise", "Take the HTML certificate exam"].map((item) => (
              <div key={item} className="rounded-md border border-white/10 bg-black/15 px-4 py-3 text-sm text-white/75">{item}</div>
            ))}
          </div>
        </section>
      </section>
      <AITutorPanel />
    </div>
  );
}
