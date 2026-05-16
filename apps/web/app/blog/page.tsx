import { blogPosts } from "@/data/platform";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Blog", "EJISCHOOL articles for software learning, roadmaps, interviews, and project guides.", "/blog");

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-4xl font-black">Blog</h1>
      <div className="mt-6 grid gap-4">
        {blogPosts.map((post) => (
          <article key={post.title} className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-cyan">{post.category} · {post.readTime}</p>
            <h2 className="mt-3 text-2xl font-bold">{post.title}</h2>
            <p className="mt-3 leading-7 text-white/68">{post.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
