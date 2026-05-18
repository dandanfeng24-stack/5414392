import { RankingBlock } from "@/components/ui/RankingBlock";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Project, Ranking } from "@/lib/types";

export function RankingPreviewSection({ rankings, projects }: { rankings: Ranking[]; projects: Project[] }) {
  return (
    <section className="py-20">
      <div className="section-shell">
        <SectionHeading title="产品化榜单" description="用商品化、体验化、场景适配、传播和运营维度观察非遗方向。" />
        <div className="grid gap-5 md:grid-cols-2">
          {rankings.map((ranking) => <RankingBlock key={ranking.id} ranking={ranking} projects={projects} />)}
        </div>
      </div>
    </section>
  );
}
