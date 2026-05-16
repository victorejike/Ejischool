import { Github, Mail } from "lucide-react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Sign In", "Sign in to EJISCHOOL to track progress, save playground work, and earn certificates.", "/login");

export default function LoginPage() {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-6xl items-center gap-8 px-4 py-12 lg:grid-cols-[1fr_28rem]">
      <section>
        <p className="text-sm font-bold uppercase tracking-widest text-brand-cyan">Learner Account</p>
        <h1 className="mt-3 text-4xl font-black md:text-5xl">Continue your learning path</h1>
        <p className="mt-4 max-w-2xl leading-8 text-white/70">
          Save lesson progress, submit exercises, unlock certificates, and keep your roadmap synchronized across devices.
        </p>
        <div className="mt-6 grid gap-3 text-sm text-white/72">
          {["JWT-ready session flow", "OAuth provider surface", "MFA and magic-link ready", "Role-based admin protection"].map((item) => (
            <div key={item} className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-3">{item}</div>
          ))}
        </div>
      </section>
      <section className="rounded-lg border border-white/10 bg-white/[0.055] p-6 shadow-glow">
        <h2 className="text-2xl font-black">Sign in</h2>
        <form className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold text-white/80">
            Email
            <input className="focus-ring rounded-md border border-white/10 bg-black/20 px-3 py-3 text-white" type="email" placeholder="you@example.com" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-white/80">
            Password
            <input className="focus-ring rounded-md border border-white/10 bg-black/20 px-3 py-3 text-white" type="password" placeholder="••••••••" />
          </label>
          <button className="focus-ring rounded-md bg-brand-cyan px-4 py-3 text-sm font-black text-brand-ink" type="button">Sign In</button>
        </form>
        <div className="mt-5 grid gap-3">
          <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-white/10 px-4 py-3 text-sm font-bold" type="button">
            <Github size={18} aria-hidden />
            Continue with GitHub
          </button>
          <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-white/10 px-4 py-3 text-sm font-bold" type="button">
            <Mail size={18} aria-hidden />
            Send Magic Link
          </button>
        </div>
      </section>
    </div>
  );
}
