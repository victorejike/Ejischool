import { ArrowRight, BookOpenCheck, Braces, GraduationCap, PlayCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { EjischoolHeroScene } from "@/components/home/EjischoolHeroScene";
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
      <section className="relative isolate min-h-[calc(100vh-6rem)] overflow-hidden bg-[#f6fcff] text-[#071a33]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_30%,rgba(17,199,232,0.2),transparent_32%),radial-gradient(circle_at_22%_78%,rgba(4,117,217,0.14),transparent_34%)]" />
        <div className="absolute left-8 top-28 -z-10 grid grid-cols-6 gap-3 opacity-50">
          {Array.from({ length: 30 }).map((_, index) => (
            <span key={index} className="h-1.5 w-1.5 rounded-full bg-[#11c7e8]" />
          ))}
        </div>
        <div className="absolute right-16 top-36 -z-10 grid grid-cols-4 gap-3 opacity-45">
          {Array.from({ length: 16 }).map((_, index) => (
            <span key={index} className="h-2 w-2 rounded-full bg-[#11c7e8]" />
          ))}
        </div>

        <div className="mx-auto grid max-w-full items-center gap-10 px-4 pb-28 pt-16 md:max-w-7xl md:grid-cols-[0.92fr_1.08fr] md:px-8 md:pt-20">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-[#10bfe2]">
              <Sparkles size={18} aria-hidden />
              Learn. Practice. Build.
            </p>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.98] tracking-normal text-[#06183a] max-[420px]:text-[3.2rem] md:text-7xl">
              <span className="block sm:inline">Code.</span> <span className="block sm:inline">Create.</span> <span className="block text-[#12bfe4]">Graduate.</span>
            </h1>
            <p className="mt-7 max-w-[340px] text-lg leading-8 text-[#536b8d] sm:max-w-2xl md:text-xl">
              Ejischool turns software development into clear lessons, live practice, and portfolio-ready projects for learners who want real momentum.
            </p>

            <div className="mt-9 grid max-w-[340px] gap-4 sm:flex sm:max-w-none sm:flex-wrap">
              <Link href="/tutorials/html" className="focus-ring inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#12bfe4] px-7 text-base font-black text-white shadow-[0_18px_40px_rgba(18,191,228,0.28)] transition hover:-translate-y-0.5 hover:bg-[#08aacf] sm:w-auto">
                Start Learning
                <ArrowRight size={20} aria-hidden />
              </Link>
              <Link href="/playground" className="focus-ring inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full border border-[#d7e6f1] bg-white px-7 text-base font-black text-[#071a33] shadow-[0_14px_35px_rgba(7,26,51,0.08)] transition hover:-translate-y-0.5 hover:border-[#12bfe4] sm:w-auto">
                <PlayCircle size={20} aria-hidden />
                Open Playground
              </Link>
            </div>

            <div className="mt-12 grid max-w-[340px] gap-3 sm:max-w-xl sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="min-w-0 rounded-lg border border-[#dff0f7] bg-white/80 px-4 py-4 shadow-[0_12px_32px_rgba(16,80,120,0.08)] backdrop-blur">
                  <p className="text-2xl font-black text-[#071a33]">{item.value}</p>
                  <p className="mt-1 break-words text-xs font-bold uppercase leading-5 text-[#5d7597]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-w-0 overflow-hidden min-h-[420px] md:min-h-[620px]">
            <div className="absolute inset-0 rounded-full border border-[#cceff8]" />
            <div className="absolute inset-10 rounded-full border border-[#d9f5fb]" />
            <div className="absolute inset-20 rounded-full border border-[#e4f8fc]" />
            <EjischoolHeroScene />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-[#bbf2fb] opacity-80 [clip-path:polygon(0_68%,15%_58%,31%_34%,47%_53%,62%_62%,78%_45%,100%_18%,100%_100%,0_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-36 bg-[#63dbef] opacity-35 [clip-path:polygon(0_80%,20%_72%,43%_58%,60%_76%,78%_52%,100%_28%,100%_100%,0_100%)]" />
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
