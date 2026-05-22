import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";

const services = [
  {
    title: "非遗项目商业化诊断",
    audience: "非遗传承人、工坊、地方文旅公司、文化馆、非遗保护中心",
    problem: "判断一个非遗资源是否具备产品化、体验化和文旅转化价值。",
    deliverables: "资源价值判断、适合场景建议、产品化方向、体验化方向、风险提示、下一步行动建议"
  },
  {
    title: "非遗文创产品策划",
    audience: "文创品牌、设计机构、地方平台公司、非遗工坊",
    problem: "把传统技艺转化为适合现代消费的伴手礼、礼品、联名产品和生活器物。",
    deliverables: "产品方向清单、价格带建议、用户定位、包装建议、销售场景建议"
  },
  {
    title: "景区非遗体验项目设计",
    audience: "景区、古镇、历史街区、文旅综合体、夜游项目",
    problem: "为景区和街区增加可参与、可传播、可收费的非遗体验内容。",
    deliverables: "体验项目清单、游客参与流程、收费模式建议、运营注意事项、二消转化建议"
  },
  {
    title: "非遗研学课程开发",
    audience: "研学机构、营地、学校、景区教育部门、非遗体验馆",
    problem: "把非遗内容转化为适合亲子、学生和团队参与的课程产品。",
    deliverables: "课程主题、课程目标、活动流程、材料清单、师资要求、课程延展产品建议"
  },
  {
    title: "历史街区非遗内容植入",
    audience: "历史街区、古城古镇、城市更新项目、文旅运营公司",
    problem: "解决街区内容同质化、业态缺乏文化识别度、游客停留时间不足的问题。",
    deliverables: "非遗业态建议、空间点位建议、互动内容建议、招商方向、运营风险提示"
  },
  {
    title: "非遗互动打卡装置策划",
    audience: "景区、历史街区、夜游项目、文旅活动、城市公共空间",
    problem: "把非遗元素转化为游客愿意拍照、互动、分享的空间装置和体验节点。",
    deliverables: "装置概念、互动机制、游客动线、传播场景、基础技术逻辑、落地注意事项"
  }
];

const deliverables = [
  ["非遗项目商业化诊断报告", "判断资源是否适合进入产品、体验、课程和文旅消费场景。"],
  ["产品化方向清单", "梳理可开发的伴手礼、礼品、生活器物和联名产品方向。"],
  ["体验项目设计方案", "说明游客如何参与、如何收费、如何形成二次消费。"],
  ["研学课程大纲", "明确课程目标、活动流程、材料准备和师资要求。"],
  ["历史街区非遗植入建议", "给出业态组合、空间点位、互动内容和招商方向。"],
  ["文旅活动与互动装置概念方案", "形成可拍照、可互动、可传播的节点概念。"],
  ["项目汇报材料优化建议", "帮助项目方把资源价值、落地路径和风险边界讲清楚。"],
  ["后续落地风险提示", "提前识别供应、审美、运营、合规和体验安全问题。"]
];

const processSteps = [
  ["提交项目资料", "提供资源背景、现有产品、场地条件和目标客群。"],
  ["初步判断资源价值", "从商品化、体验化、场景适配和运营难度判断转化潜力。"],
  ["明确产品化与场景化方向", "筛选适合开发的产品、课程、体验和空间节点。"],
  ["输出诊断或专项方案", "形成可用于内部讨论、汇报和试点推进的轻量方案。"],
  ["进入深度策划或顾问服务", "根据项目需要继续细化产品、动线、招商和运营计划。"]
];

const customers = [
  ["政府文旅部门与平台公司", "适合用于区域非遗资源梳理、项目筛选和专项汇报。"],
  ["景区、古镇与历史街区", "适合设计非遗体验、街区业态和游客停留内容。"],
  ["非遗传承人、工坊与合作社", "适合判断技艺如何进入产品、课程和体验消费。"],
  ["文创品牌、设计机构与广告公司", "适合寻找联名产品、礼品开发和内容策划方向。"],
  ["研学机构、营地与教育旅行公司", "适合把非遗资源转化为亲子、学生和团队课程。"],
  ["文旅策划公司、运营公司与项目投资方", "适合前期判断项目可行性、投入重点和风险边界。"]
];

const primaryCta = { label: "提交项目诊断", href: "/diagnosis" };
// TODO: replace with real consultation entry later
const consultationCta = { label: "预约项目咨询", href: "/ai-assessment" };

export default function ServicesPage() {
  return (
    <div className="section-shell py-16">
      <section className="surface rounded p-8 md:p-10">
        <div className="text-sm text-gold">服务与交付</div>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-paper md:text-6xl">服务与交付</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-linen md:text-lg">
          围绕非遗产品化、文旅场景化、研学课程、互动体验和商业转化，提供从项目诊断、方向策划到落地方案的轻量化咨询服务。
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href={primaryCta.href} className="rounded bg-gold px-6 py-3 text-sm text-ink hover:bg-paper">
            {primaryCta.label}
          </Link>
          <Link href={consultationCta.href} className="rounded border border-gold/45 px-6 py-3 text-sm text-gold hover:bg-gold hover:text-ink">
            {consultationCta.label}
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          title="我们提供的服务"
          description="不是简单展示非遗，而是帮助项目方判断非遗资源如何转化为产品、体验、空间、课程、活动和收入。"
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="surface rounded p-6">
              <h2 className="font-serif text-2xl leading-snug text-paper">{service.title}</h2>
              <ServiceField label="适合对象" text={service.audience} />
              <ServiceField label="解决问题" text={service.problem} />
              <ServiceField label="主要交付物" text={service.deliverables} />
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading title="你最终能获得什么" />
        <div className="grid gap-4 md:grid-cols-2">
          {deliverables.map(([title, description]) => (
            <div key={title} className="surface rounded p-5">
              <h3 className="font-serif text-xl text-paper">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-linen">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading title="服务流程" />
        <div className="grid gap-4 md:grid-cols-5">
          {processSteps.map(([title, description], index) => (
            <div key={title} className="surface rounded p-5">
              <div className="font-serif text-3xl text-gold">{String(index + 1).padStart(2, "0")}</div>
              <h3 className="mt-4 font-serif text-xl text-paper">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-linen">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading title="适合哪些客户" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {customers.map(([title, description]) => (
            <div key={title} className="surface rounded p-5">
              <h3 className="font-serif text-xl text-paper">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-linen">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 surface rounded p-8 md:p-10">
        <h2 className="font-serif text-3xl leading-tight text-paper md:text-5xl">有非遗资源或文旅项目需要转化？</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-linen">
          提交项目资料，获取初步商业化判断；也可以进一步讨论产品化、体验化、空间化和收入路径。
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href={primaryCta.href} className="rounded bg-gold px-6 py-3 text-sm text-ink hover:bg-paper">
            {primaryCta.label}
          </Link>
          <Link href={consultationCta.href} className="rounded border border-gold/45 px-6 py-3 text-sm text-gold hover:bg-gold hover:text-ink">
            {consultationCta.label}
          </Link>
        </div>
      </section>
    </div>
  );
}

function ServiceField({ label, text }: { label: string; text: string }) {
  return (
    <div className="mt-5 border-t border-paper/10 pt-4">
      <div className="text-sm text-gold">{label}</div>
      <p className="mt-2 text-sm leading-7 text-linen">{text}</p>
    </div>
  );
}
