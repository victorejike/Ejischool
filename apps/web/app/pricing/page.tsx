import { Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { plans } from "@/data/platform";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Pricing", "EJISCHOOL subscriptions, certificates, premium courses, AI features, and developer tools.", "/pricing");

export default function PricingPage() {
  return (
    <>
      <PageHero eyebrow="Pricing" title="Plans for learners, schools, and teams" description="Start free, upgrade when you need certificates, AI support, analytics, and private learning operations." />
      <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.name} className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
            <h2 className="text-2xl font-bold">{plan.name}</h2>
            <p className="mt-4 text-4xl font-black text-brand-cyan">{plan.price}<span className="text-sm font-semibold text-white/55"> / month</span></p>
            <p className="mt-3 text-sm leading-6 text-white/65">{plan.description}</p>
            <div className="mt-5 grid gap-3">
              {plan.highlights.map((highlight) => (
                <span key={highlight} className="inline-flex items-center gap-2 text-sm text-white/75"><Check size={16} className="text-brand-cyan" />{highlight}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
      </div>
    </>
  );
}
