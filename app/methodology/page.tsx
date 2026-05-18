import { SectionHeading } from "@/components/ui/SectionHeading";

const sections = [
  {
    title: "平台定位",
    body: "非遗造物是中国非遗产品化与文旅转化研究平台，服务文旅项目方、历史街区运营方、景区、研学机构、文创品牌和国风创业者。"
  },
  {
    title: "为什么做非遗造物",
    body: "很多非遗项目并不缺文化价值，缺的是进入产品、空间、体验、研学和消费场景时的判断工具。本站用数据库、标签、评分、案例和资料包降低前期判断成本。"
  },
  {
    title: "IHPM非遗产品化评分模型说明",
    body: "IHPM 从商品化、体验化、场景适配、传播潜力、礼品属性和运营友好六个维度进行初评。评分用于研究筛选，不代表商业结果保证。"
  },
  {
    title: "AI辅助内容声明",
    body: "本站部分内容使用AI工具辅助进行公开资料检索、归纳、结构化整理与初稿生成，发布内容需经过人工审核。"
  },
  {
    title: "数据来源与版权说明",
    body: "本站示例内容主要基于公开资料、非遗名录信息、地方文旅资料和行业观察进行结构化整理。本站尊重知识产权。若内容涉及版权问题，请联系处理。"
  },
  {
    title: "合规声明",
    body: "本站内容主要用于非遗产品化、文旅转化与商业场景研究参考，不构成投资、法律、财务或商业保证建议。"
  },
  {
    title: "联系方式",
    body: "联系邮箱：contact@example.com。MVP 阶段可用于预约样张、提交项目线索和反馈数据修正。"
  }
];

export default function MethodologyPage() {
  return (
    <div className="section-shell py-16">
      <SectionHeading title="关于与方法论" description="说明平台边界、评分模型、AI 辅助内容方式、数据来源和合规声明。" />
      <div className="grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <section key={section.title} className="surface rounded p-6">
            <h2 className="font-serif text-2xl text-paper">{section.title}</h2>
            <p className="mt-4 text-sm leading-7 text-linen">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
