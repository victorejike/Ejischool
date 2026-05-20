import { GraduationCap, LineChart } from "lucide-react";
import type { Tutorial } from "@/data/tutorials";
import { AITutorPanel } from "@/components/ai/AITutorPanel";

type RightRailProps = {
  tutorial: Tutorial;
};

export function RightRail({ tutorial }: RightRailProps) {
  const items = [
    { icon: <GraduationCap size={18} />, title: "Certificate", body: "Pass the exam to unlock a verifiable certificate." },
    { icon: <LineChart size={18} />, title: "Progress", body: "Track lessons, exercises, quiz scores, and streaks." }
  ];

  return (
    <aside className="hidden border-l border-white/10 xl:block">
      <div className="grid h-[calc(100vh-7.5rem)] content-start gap-3 overflow-y-auto p-3">
        <AITutorPanel compact courseSlug={tutorial.slug} courseTitle={tutorial.title} currentTopic={tutorial.sections[0]?.title} topics={tutorial.sections.map((section) => section.title)} />
        {items.map((item) => (
          <section key={item.title} className="rounded-md border border-white/10 bg-white/[0.045] p-3">
            <div className="mb-2 text-brand-cyan">{item.icon}</div>
            <h3 className="font-bold">{item.title}</h3>
            <p className="mt-2 text-xs leading-5 text-white/64">{item.body}</p>
          </section>
        ))}
      </div>
    </aside>
  );
}
