import { MetricCard } from "@/components/cards/MetricCard";
import { AdminCourseEditor } from "@/components/admin/AdminCourseEditor";
import { adminModules } from "@/data/platform";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Admin Dashboard", "Manage EJISCHOOL users, courses, tutorials, payments, analytics, certificates, moderation, AI controls, and settings.", "/admin");

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-cyan">Admin</p>
      <h1 className="mt-3 text-4xl font-black">Control center</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {adminModules.map((module) => (
          <MetricCard key={module.title} {...module} />
        ))}
      </div>
      <AdminCourseEditor />
    </div>
  );
}
