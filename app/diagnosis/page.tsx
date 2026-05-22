import Link from "next/link";
import { DiagnosisForm } from "@/components/diagnosis/DiagnosisForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

const diagnosisChecks = [
  ["非遗资源是否具备产品化潜力", "从技艺门槛、供应条件、消费理解成本和价格接受度判断开发基础。"],
  ["适合开发哪些文创产品、伴手礼或联名产品", "筛选更适合礼品、零售、联名、生活器物或地方伴手礼的方向。"],
  ["是否适合转化为景区体验、街区业态或研学课程", "判断项目能否形成可参与、可讲解、可收费、可复购的体验。"],
  ["适合进入哪些消费场景和文旅空间", "判断项目适合景区、街区、展馆、酒店、营地、市集还是品牌门店。"],
  ["可能形成哪些收入方式", "梳理门票体验、课程收费、产品销售、团体定制和活动服务等路径。"],
  ["落地中需要注意哪些风险和限制", "提示供应、审美、成本、客群、运营、安全和合规边界。"]
];

const projectTypes = [
  ["非遗传承人、工坊、合作社的产品化需求", "适合判断技艺如何进入产品、体验、课程和礼品场景。"],
  ["景区、古镇、历史街区的非遗体验项目需求", "适合补充游客参与内容、街区业态和二次消费节点。"],
  ["地方文旅部门、平台公司的非遗活化项目需求", "适合用于资源梳理、项目筛选、试点方向和汇报材料。"],
  ["文创品牌、设计机构的非遗联名与产品开发需求", "适合寻找联名主题、产品系列、包装表达和销售场景。"],
  ["研学机构、营地、学校的非遗课程需求", "适合开发亲子、学生、团队参与的课程和活动流程。"],
  ["文旅公司、策划公司、运营公司的方案支持需求", "适合前期判断可行性、投入重点、收益路径和风险边界。"]
];

const resultItems = [
  ["项目初步判断", "判断项目更适合产品化、体验化、研学化、空间化还是活动化。"],
  ["转化方向建议", "提出适合开发的文创产品、体验项目、课程或空间内容方向。"],
  ["适合场景判断", "判断项目适合进入景区、街区、展馆、研学、品牌联名还是地方伴手礼体系。"],
  ["风险提醒", "提示可能存在的供应链、审美、成本、客群、运营和落地风险。"],
  ["后续服务建议", "判断是否适合进入完整诊断报告、专项策划或顾问服务。"]
];

export default function DiagnosisPage() {
  return (
    <div className="section-shell py-16">
      <section className="surface rounded p-8 md:p-10">
        <div className="text-sm text-gold">项目诊断</div>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight text-paper md:text-6xl">非遗项目商业化诊断</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-linen md:text-lg">
          提交你的非遗资源、景区街区、文创产品或研学项目资料，获取初步商业化判断，明确产品化、体验化、空间化和收入转化方向。
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="#diagnosis-form" className="rounded bg-gold px-6 py-3 text-sm text-ink hover:bg-paper">
            填写诊断表
          </Link>
          <Link href="/services" className="rounded border border-gold/45 px-6 py-3 text-sm text-gold hover:bg-gold hover:text-ink">
            查看服务与交付
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading title="这个诊断能帮你判断什么？" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {diagnosisChecks.map(([title, description]) => (
            <article key={title} className="surface rounded p-5">
              <h2 className="font-serif text-xl text-paper">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-linen">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading title="适合哪些项目提交？" />
        <div className="grid gap-4 md:grid-cols-2">
          {projectTypes.map(([title, description]) => (
            <article key={title} className="surface rounded p-5">
              <h2 className="font-serif text-xl text-paper">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-linen">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <DiagnosisForm />

      <section className="mt-16">
        <SectionHeading title="提交后你可能获得什么？" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {resultItems.map(([title, description]) => (
            <article key={title} className="surface rounded p-5">
              <h2 className="font-serif text-xl text-paper">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-linen">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 surface rounded p-8 md:p-10">
        <h2 className="font-serif text-3xl leading-tight text-paper md:text-5xl">已有明确项目，想进一步讨论？</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-linen">
          可以先提交诊断表，也可以查看服务与交付内容，了解不同阶段可获得的交付成果。
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="#diagnosis-form" className="rounded bg-gold px-6 py-3 text-sm text-ink hover:bg-paper">
            返回表单填写
          </Link>
          <Link href="/services" className="rounded border border-gold/45 px-6 py-3 text-sm text-gold hover:bg-gold hover:text-ink">
            查看服务与交付
          </Link>
          <Link href="/packages" className="rounded border border-paper/25 px-6 py-3 text-sm text-paper hover:border-gold hover:text-gold">
            查看资料包
          </Link>
        </div>
      </section>
    </div>
  );
}
