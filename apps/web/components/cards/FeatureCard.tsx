import type { ReactNode } from "react";

type FeatureCardProps = {
  title: string;
  body: string;
  icon: ReactNode;
};

export function FeatureCard({ title, body, icon }: FeatureCardProps) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-glow">
      <div className="mb-4 grid h-10 w-10 place-items-center rounded-md bg-brand-cyan/10 text-brand-cyan">{icon}</div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/68">{body}</p>
    </article>
  );
}
