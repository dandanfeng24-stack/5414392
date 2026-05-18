import { AiAssessmentPanel } from "@/components/ai/AiAssessmentPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function AiAssessmentPage() {
  return (
    <div className="section-shell py-16">
      <SectionHeading
        title="AI项目初评演示"
        description="东方专业工作台。左侧输入项目条件，右侧生成结构化判断；首版为本地规则模拟，不调用真实 AI API。"
      />
      <AiAssessmentPanel />
    </div>
  );
}
