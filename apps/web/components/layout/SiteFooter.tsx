export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#081317]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm text-white/68 md:grid-cols-4">
        <div>
          <p className="font-bold text-white">EJISCHOOL</p>
          <p className="mt-2">Modern tutorials, playgrounds, certificates, and AI learning tools.</p>
        </div>
        <div>
          <p className="font-semibold text-white">Learn</p>
          <p className="mt-2">HTML, CSS, JavaScript, React, Go, Python</p>
        </div>
        <div>
          <p className="font-semibold text-white">Platform</p>
          <p className="mt-2">Exercises, playgrounds, references, certificates</p>
        </div>
        <div>
          <p className="font-semibold text-white">Enterprise</p>
          <p className="mt-2">Go services, PostgreSQL, Redis, Docker, Kubernetes, observability</p>
        </div>
      </div>
    </footer>
  );
}
