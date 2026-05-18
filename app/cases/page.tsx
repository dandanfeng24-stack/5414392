import { CaseCard } from "@/components/cards/CaseCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cases } from "@/lib/data";

export default function CasesPage() {
  return (
    <div className="section-shell py-16">
      <SectionHeading title="案例研究" description="从城市、场景、客群、转化逻辑和可复制性观察非遗项目落地。" />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cases.map((caseStudy) => <CaseCard key={caseStudy.id} caseStudy={caseStudy} />)}
      </div>
    </div>
  );
}
