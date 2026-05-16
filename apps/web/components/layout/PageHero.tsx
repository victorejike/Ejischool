import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

export function PageHero({ eyebrow, title, description, actions }: PageHeroProps) {
  return (
    <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(17,215,245,0.14),transparent_32%),#071115]">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        {eyebrow ? <p className="text-sm font-bold uppercase tracking-widest text-brand-cyan">{eyebrow}</p> : null}
        <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-normal text-white md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-white/70 md:text-lg">{description}</p>
        {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}
