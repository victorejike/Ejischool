import { Github, Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";

const columns = [
  { title: "Learn", links: ["HTML", "CSS", "JavaScript", "React", "Python", "Go"] },
  { title: "Practice", links: ["Playground", "Exercises", "Projects", "Certificates"] },
  { title: "Company", links: ["Community", "Blog", "Pricing", "Dashboard"] }
];

function hrefFor(label: string) {
  const map: Record<string, string> = {
    HTML: "/tutorials/html",
    CSS: "/tutorials/css",
    JavaScript: "/tutorials/javascript",
    React: "/tutorials/react",
    Python: "/tutorials/python",
    Go: "/tutorials/go",
    Playground: "/playground",
    Exercises: "/exercises",
    Projects: "/community",
    Certificates: "/certificates",
    Community: "/community",
    Blog: "/blog",
    Pricing: "/pricing",
    Dashboard: "/dashboard"
  };

  return map[label] ?? "/";
}

export function SiteFooter() {
  return (
    <footer className="bg-[#f6fcff] px-4 py-12 text-[#071a33] md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-[#dff0f7] pt-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="focus-ring inline-flex items-center gap-3 rounded-md" aria-label="Ejischool home">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[#12bfe4] text-xl font-black text-white">E</span>
            <span className="text-lg font-black uppercase tracking-[0.12em]">Ejischool</span>
          </Link>
          <p className="mt-5 max-w-sm leading-7 text-[#5b7191]">A modern learning platform for coding lessons, practice, projects, certificates, and career-ready software skills.</p>
          <div className="mt-6 flex gap-3">
            {[Youtube, Linkedin, Github, Instagram].map((Icon, index) => (
              <Link key={index} href="/community" className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-[#dff0f7] bg-white text-[#0878b8] hover:border-[#12bfe4]" aria-label="Ejischool social link">
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-sm font-black uppercase tracking-[0.16em] text-[#0878b8]">{column.title}</h2>
            <div className="mt-5 grid gap-3">
              {column.links.map((link) => (
                <Link key={link} href={hrefFor(link)} className="focus-ring rounded-sm text-sm font-bold text-[#5b7191] hover:text-[#12bfe4]">
                  {link}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-10 max-w-7xl text-xs font-bold text-[#6b7f9f]">Copyright 2026 Ejischool. All Rights Reserved.</p>
    </footer>
  );
}
