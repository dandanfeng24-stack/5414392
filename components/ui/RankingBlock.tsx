import Link from "next/link";
import type { Project, Ranking } from "@/lib/types";

export function RankingBlock({ ranking, projects }: { ranking: Ranking; projects: Project[] }) {
  return (
    <div className="surface rounded p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl text-paper">{ranking.title}</h3>
          <p className="mt-2 text-sm leading-6 text-linen">{ranking.description}</p>
        </div>
        <span className="text-xs text-gold">{ranking.updateCycle}</span>
      </div>
      <ol className="mt-6 space-y-3">
        {ranking.items.slice(0, 5).map((id, index) => {
          const project = projects.find((item) => item.id === id);
          if (!project) return null;
          return (
            <li key={id} className="flex items-center justify-between border-b border-paper/10 pb-3 text-sm">
              <Link href={`/projects/${id}`} className="text-paper hover:text-gold">
                {String(index + 1).padStart(2, "0")}　{project.name}
              </Link>
              <span className="text-gold">{project.totalScore}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
