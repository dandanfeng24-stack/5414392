import { CaseCard } from "@/components/cards/CaseCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CaseStudy } from "@/lib/types";

export function CasePreviewSection({ cases }: { cases: CaseStudy[] }) {
  return (
    <section className="py-20">
      <div className="section-shell">
        <SectionHeading title="精选案例研究" description="关注可复制逻辑、风险问题与对其他项目的启发。" />
        <div className="grid gap-5 md:grid-cols-3">
          {cases.slice(0, 3).map((caseStudy) => <CaseCard key={caseStudy.id} caseStudy={caseStudy} />)}
        </div>
      </div>
    </section>
  );
}
