import Image from "next/image";
import { ChevronDown, Info } from "lucide-react";

const topMembers = [
  {
    name: "BestCodes",
    score: "2,222",
    image: "/avatars/leader-1.svg",
  },
  {
    name: "Avik Creator",
    score: "1,393",
    image: "/avatars/leader-2.svg",
  },
  {
    name: "Riza",
    score: "1,376",
    image: "/avatars/leader-3.svg",
  },
] as const;

const tableRows = [
  { rank: 4, name: "Sean", score: "1,352" },
  { rank: 5, name: "Tulio Portela", score: "1,284" },
  { rank: 6, name: "Eric Torres", score: "982" },
  { rank: 7, name: "Amelia Dawn", score: "911" },
  { rank: 8, name: "Maya Lin", score: "873" },
  { rank: 9, name: "Jon R.", score: "840" },
] as const;

export default function CommunityLeaderboard() {
  return (
    <div className="container-fluid space-y-8">
      <section className="border border-red-300 text-red-600 rounded-lg px-4 py-3 text-center">
        <span className="font-semibold">Dubai region (dxb1)</span> is unavailable and traffic is being re-routed
      </section>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2>Community Leaderboard</h2>
          <button className="button-secondary flex items-center gap-2">
            <Info size={16} />
            How does this work?
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <button className="button-secondary flex items-center gap-2">
            All time <ChevronDown size={14} />
          </button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {topMembers.map((member) => (
          <div key={member.name} className="card text-center space-y-3">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full border border-border overflow-hidden flex items-center justify-center bg-white">
                <Image src={member.image} alt={member.name} width={96} height={96} />
              </div>
            </div>
            <div>
              <h4>{member.name}</h4>
              <h2>{member.score}</h2>
            </div>
          </div>
        ))}
      </section>

      <section className="card">
        <div className="grid grid-cols-[80px_1fr_120px] gap-4 pb-3 border-b border-border text-sm">
          <div className="text-muted-foreground">Rank</div>
          <div className="text-muted-foreground">Member</div>
          <div className="text-muted-foreground text-right">Cheers</div>
        </div>
        <div className="divide-y divide-border">
          {tableRows.map((row) => (
            <div
              key={row.rank}
              className="grid grid-cols-[80px_1fr_120px] gap-4 py-4 items-center"
            >
              <div className="text-lg font-semibold">{row.rank}</div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold">
                  {row.name.slice(0, 1)}
                </div>
                <span>{row.name}</span>
              </div>
              <div className="text-right font-semibold">{row.score}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
