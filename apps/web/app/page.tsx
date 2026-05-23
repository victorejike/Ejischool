import { ArrowRight, BookOpenCheck, Braces, GraduationCap, PlayCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { tutorials } from "@/data/tutorials";

const highlights = [
  { label: "Guided lessons", value: "120+" },
  { label: "Practice paths", value: "18" },
  { label: "Launch-ready projects", value: "40+" }
];

const learningTracks = [
  { title: "Frontend Foundations", body: "HTML, CSS, JavaScript, React, and polished interface habits.", icon: Braces },
  { title: "Backend Thinking", body: "Go, APIs, auth, databases, and deployment-ready service design.", icon: BookOpenCheck },
  { title: "Career Proof", body: "Certificates, projects, dashboards, and practice loops that show progress.", icon: GraduationCap }
];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate flex min-h-[calc(100vh-6rem)] overflow-hidden rounded-b-[2rem] bg-[#0b1a2e] px-4 pb-24 pt-24 text-[#eef2f7] md:px-8 md:pb-28 md:pt-32">
        <div className="absolute inset-0 -z-10">
          <Image src="/assets/ejicode-hero.jpg" alt="Team collaboration" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1a2e40] via-[#0b1a2e91] to-[#0b1a2ee0]" />
        </div>

        <div className="mx-auto flex w-full max-w-7xl items-end">
          <div className="min-w-0 max-w-5xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-white/85">
              <Sparkles size={18} aria-hidden />
              Learn. Practice. Build.
            </p>
            <h1 className="mt-8 max-w-5xl text-5xl font-black leading-[0.94] tracking-normal text-[#eef2f7] max-[420px]:text-[3rem] md:text-8xl">
              <span className="block">Code.</span>
              <span className="block text-[#0ea5a0]">Create.</span>
              <span className="block">Graduate.</span>
            </h1>
            <p className="mt-7 max-w-[340px] text-lg leading-8 text-white/75 sm:max-w-2xl md:text-xl">
              Ejischool turns software development into clear lessons, live practice, and portfolio-ready projects for learners who want real momentum.
            </p>

            <div className="mt-9 grid max-w-[340px] gap-4 sm:flex sm:max-w-none sm:flex-wrap">
              <Link href="/tutorials/html" className="focus-ring inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#0ea5a0] px-7 text-base font-black text-[#071a33] shadow-[0_18px_40px_rgba(14,165,160,0.28)] transition hover:-translate-y-0.5 hover:bg-[#12c7c0] sm:w-auto">
                Start Learning
                <ArrowRight size={20} aria-hidden />
              </Link>
              <Link href="/playground" className="focus-ring inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full border border-white/50 bg-white/10 px-7 text-base font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20 sm:w-auto">
                <PlayCircle size={20} aria-hidden />
                Open Playground
              </Link>
            </div>

            <div className="mt-12 grid max-w-[340px] gap-3 sm:max-w-xl sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="min-w-0 rounded-lg border border-white/20 bg-white/10 px-4 py-4 shadow-[0_12px_32px_rgba(7,26,51,0.18)] backdrop-blur">
                  <p className="text-2xl font-black text-white">{item.value}</p>
                  <p className="mt-1 break-words text-xs font-bold uppercase leading-5 text-white/65">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 text-[#071a33] md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#12bfe4]">Choose your path</p>
              <h2 className="mt-3 text-3xl font-black md:text-4xl">Built for learners who ship</h2>
            </div>
            <Link href="/dashboard" className="focus-ring inline-flex items-center gap-2 text-sm font-black text-[#0878b8] hover:text-[#12bfe4]">
              View dashboard
              <ArrowRight size={18} aria-hidden />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {learningTracks.map((track) => {
              const Icon = track.icon;
              return (
                <Link key={track.title} href="/tutorials/html" className="focus-ring rounded-lg border border-[#e0edf5] bg-[#f8fdff] p-6 shadow-[0_18px_45px_rgba(7,26,51,0.06)] transition hover:-translate-y-1 hover:border-[#12bfe4]">
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-[#12bfe4] text-white shadow-[0_14px_28px_rgba(18,191,228,0.25)]">
                    <Icon size={23} aria-hidden />
                  </span>
                  <h3 className="mt-6 text-xl font-black">{track.title}</h3>
                  <p className="mt-3 leading-7 text-[#5b7191]">{track.body}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#071a33] px-4 py-16 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {tutorials.map((tutorial) => (
              <Link key={tutorial.slug} href={`/tutorials/${tutorial.slug}`} className="focus-ring rounded-lg border border-white/10 bg-white/[0.06] p-5 transition hover:-translate-y-1 hover:border-[#12bfe4] hover:bg-white/[0.1]">
                <p className="text-lg font-black">{tutorial.language}</p>
                <p className="mt-2 text-sm font-semibold text-[#9bb2ca]">{tutorial.level}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
