import { GraduationCap } from "lucide-react";
import { certificatePaths } from "@/data/platform";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Certificates", "Earn EJISCHOOL certificates through exams, auto grading, and verified learner profiles.", "/certificates");

export default function CertificatesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="rounded-lg border border-white/10 bg-white/[0.045] p-8">
        <GraduationCap className="text-brand-cyan" size={40} />
        <h1 className="mt-5 text-4xl font-black">Certificates</h1>
        <p className="mt-4 max-w-2xl leading-8 text-white/70">Earn skill-based credentials through structured exams, automatic scoring, and verifiable certificate records.</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {certificatePaths.map((path) => (
          <article key={path.title} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <h2 className="text-xl font-bold">{path.title}</h2>
            <p className="mt-3 text-sm text-white/62">{path.lessons} lessons · {path.exam} exam</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {path.skills.map((skill) => (
                <span key={skill} className="rounded-md border border-brand-cyan/25 px-2 py-1 text-xs font-bold text-brand-cyan">{skill}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
