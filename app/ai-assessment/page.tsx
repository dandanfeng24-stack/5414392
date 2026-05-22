import { AiAssessmentPanel } from "@/components/ai/AiAssessmentPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function AiAssessmentPage() {
  return (
    <div className="section-shell py-16">
      <SectionHeading
        title="非遗项目智能初评"
        description="基于非遗产品化、体验化、研学化、礼品化和文旅场景转化规则，对项目进行快速方向判断。"
      />
      <div className="mb-8 rounded border border-gold/[0.18] bg-gold/[0.06] p-5 text-sm leading-7 text-linen">
        当前智能初评基于非遗转化规则模型进行快速判断，结果用于方向参考，不等同于完整项目诊断或商业策划。如需针对具体项目获得更深入建议，请提交项目诊断。
      </div>
      <AiAssessmentPanel />
    </div>
  );
}
