import Link from "next/link";
import {
  Bell,
  BookOpen,
  BookText,
  CalendarDays,
  ChevronRight,
  Globe,
  MessageCircle,
  Search,
  Star,
  Users,
} from "lucide-react";

const infoCards = [
  {
    title: "Announcements",
    description:
      "Stay updated with the latest news and important updates from the Patrona community.",
    icon: Bell,
  },
  {
    title: "Events",
    description: "Live sessions and community events happening across regions.",
    icon: CalendarDays,
  },
  {
    title: "Knowledge Base",
    description: "Guides, tutorials, and best practices curated by the team.",
    icon: BookOpen,
  },
  {
    title: "Handbook",
    description: "Tips and tricks shared by community champions.",
    icon: BookText,
  },
] as const;

const communityCards = [
  {
    title: "Discussions",
    description: "Join conversations, ask questions, and brainstorm together.",
    icon: MessageCircle,
  },
  {
    title: "Showcase",
    description: "Share what you shipped and get feedback from the community.",
    icon: Star,
  },
  {
    title: "Open Source",
    description: "Collaborate on open source projects and resources.",
    icon: Users,
  },
] as const;

export default function CommunityHome() {
  return (
    <div className="container-fluid space-y-8">
      <section className="text-center space-y-2">
        <h1>Join the Patrona Community</h1>
        <p>Connect with builders, get support, and share your work.</p>
        <div className="flex justify-center">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search"
              className="custom-input pl-10"
              aria-label="Search community"
            />
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="border border-red-300 text-red-600 rounded-lg px-4 py-3 text-center">
          <span className="font-semibold">Dubai region (dxb1)</span> is unavailable and traffic is being re-routed
        </div>
        <div className="border border-border rounded-lg px-4 py-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Globe size={16} />
            <span>
              Join our upcoming <Link href="/community/events" className="underline">Community Live Sessions</Link>
            </span>
          </div>
          <button className="button-secondary w-fit">Learn more</button>
        </div>
      </section>

      <section className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Categories</span>
          <ChevronRight size={14} />
          <span className="text-muted-foreground">Tags</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button className="button-secondary">Latest</button>
          <button className="button-secondary">Hot</button>
          <Link className="button-primary" href="/community/leaderboard">
            Leaderboard
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3>Info</h3>
          <span className="badge">Updated weekly</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {infoCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="card space-y-3">
                <div className="icon-box">
                  <Icon size={16} />
                </div>
                <div>
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3>Community</h3>
          <button className="button-secondary">Explore all</button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {communityCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="card space-y-3">
                <div className="icon-box">
                  <Icon size={16} />
                </div>
                <div>
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
