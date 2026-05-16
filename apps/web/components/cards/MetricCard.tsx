import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  title: string;
  metric: string;
  status: string;
  icon: LucideIcon;
};

export function MetricCard({ title, metric, status, icon: Icon }: MetricCardProps) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-bold">{title}</h2>
        <span className="grid h-9 w-9 place-items-center rounded-md bg-brand-cyan/10 text-brand-cyan">
          <Icon size={18} aria-hidden />
        </span>
      </div>
      <p className="mt-5 text-3xl font-black text-brand-cyan">{metric}</p>
      <p className="mt-2 text-sm text-white/62">{status}</p>
    </article>
  );
}
