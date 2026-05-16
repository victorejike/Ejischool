import { Bot, GraduationCap, LineChart } from "lucide-react";

export function RightRail() {
  const items = [
    { icon: <Bot size={18} />, title: "AI Tutor", body: "Ask for hints, explanations, and debugging help." },
    { icon: <GraduationCap size={18} />, title: "Certificate", body: "Pass the exam to unlock a verifiable certificate." },
    { icon: <LineChart size={18} />, title: "Progress", body: "Track lessons, exercises, quiz scores, and streaks." }
  ];

  return (
    <aside className="hidden border-l border-white/10 xl:block">
      <div className="sticky top-16 grid h-[calc(100vh-4rem)] content-start gap-4 overflow-y-auto p-5">
        {items.map((item) => (
          <section key={item.title} className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
            <div className="mb-3 text-brand-cyan">{item.icon}</div>
            <h3 className="font-bold">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/64">{item.body}</p>
          </section>
        ))}
      </div>
    </aside>
  );
}
