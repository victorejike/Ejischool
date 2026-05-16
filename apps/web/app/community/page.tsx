import { communityRooms } from "@/data/platform";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Community", "Join EJISCHOOL community learning rooms, projects, discussions, and coding support.", "/community");

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-black">Community</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {communityRooms.map((room) => {
          const Icon = room.icon;
          return (
          <article key={room.title} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <Icon className="text-brand-cyan" size={24} aria-hidden />
            <h2 className="mt-4 text-xl font-bold">{room.title}</h2>
            <p className="mt-2 text-sm font-bold text-brand-cyan">{room.members} members</p>
            <p className="mt-3 text-sm leading-6 text-white/65">{room.description}</p>
          </article>
        );
        })}
      </div>
    </div>
  );
}
