import Link from "next/link";
import { notFound } from "next/navigation";
import { AccessGate } from "@/components/access/AccessGate";
import { LockedContent } from "@/components/access/LockedContent";
import { UpgradeCTA } from "@/components/access/UpgradeCTA";
import { CaseCard } from "@/components/cards/CaseCard";
import { PackageCard } from "@/components/cards/PackageCard";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { ScoreBar } from "@/components/ui/ScoreBar";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagPill } from "@/components/ui/TagPill";
import { cases, getProject, getTheme, packages, projects } from "@/lib/data";
import {
  getProjectContentStatus,
  getProjectGrade,
  getProjectImage,
  getProjectRelatedCases,
  getProjectRelatedPackages,
  getProjectScore,
  getProjectTotalScore,
  getProjectUniqueValue,
  getProjectVerificationStatus
} from "@/lib/project-utils";

const fallbackImage = "/images/textures/dark-paper.png";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();
  const theme = getTheme(project.themeId);
  const relatedCases = cases.filter((item) => getProjectRelatedCases(project).includes(item.id));
  const relatedPackages = packages.filter((item) => getProjectRelatedPackages(project, packages).includes(item.id));
  const image = getProjectImage(project) || fallbackImage;
  const score = getProjectScore(project);
  const scoreEntries = [
    ["商品化", score.commercialization, project.scoreDetails?.commercialization],
    ["体验化", score.experience, project.scoreDetails?.experience],
    ["场景适配", score.sceneFit, project.scoreDetails?.sceneFit],
    ["传播潜力", score.spread, project.scoreDetails?.spread],
    ["礼品属性", score.gift, project.scoreDetails?.gift],
    ["运营友好", score.operation, project.scoreDetails?.operation]
  ] as const;

  return (
    <div className="section-shell py-16">
      <div className="surface rounded p-8">
        <div className="text-sm text-gold">项目研究档案 · {project.theme || theme?.shortName}</div>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-paper">{project.name}</h1>
        <p className="mt-5 max-w-3xl text-xl leading-9 text-linen">{project.positioning}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {[project.region, project.level || project.heritageLevel, project.officialCategory || project.type, ...(project.commercialTags || project.businessTags)].slice(0, 7).map((tag) => <TagPill key={tag}>{tag}</TagPill>)}
        </div>
        <div
          className="mt-8 aspect-[21/9] rounded border border-paper/10"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}
        />
      </div>

      <section className="mt-8 grid gap-5 md:grid-cols-[0.8fr_1.2fr]">
        <div className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">转化等级与总体判断</h2>
          <div className="mt-5 flex items-end gap-5">
            <div className="text-5xl font-serif text-gold">{getProjectGrade(project)}</div>
            <div>
              <div className="text-sm text-paper/60">综合分</div>
              <div className="text-2xl text-paper">{getProjectTotalScore(project)}</div>
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 text-linen">{project.scoreReason || project.scoreExplanation}</p>
        </div>
        <div className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">官方事实与内容状态</h2>
          <dl className="mt-5 space-y-3 text-sm text-linen">
            <Row label="官方门类" value={project.officialCategory || "待核验"} />
            <Row label="保护单位" value={project.officialInfo?.protectionUnit || project.officialInfo?.protectionUnits?.join("、") || project.protectionUnit || "待核验"} />
            <Row label="非遗编号" value={project.officialInfo?.heritageNumber || project.heritageCode || "待核验"} />
            <Row label="名录批次" value={project.officialInfo?.listBatch || "待核验"} />
            <Row label="代表性地区" value={project.officialInfo?.representativeRegion || project.officialInfo?.representativeRegions?.join("、") || project.region || "待核验"} />
            <Row label="核验状态" value={project.officialInfo?.verificationStatus || getProjectVerificationStatus(project)} />
            <Row label="内容状态" value={getProjectContentStatus(project)} />
          </dl>
          {project.officialInfo?.verificationNote ? <p className="mt-5 text-sm leading-7 text-linen">{project.officialInfo.verificationNote}</p> : null}
          {project.officialInfo?.officialSources?.length ? (
            <div className="mt-5 space-y-2 text-sm">
              {project.officialInfo.officialSources.map((source, index) => (
                <a key={source} href={source} target="_blank" rel="noreferrer" className="block text-gold transition hover:text-paper">
                  官方来源 {index + 1}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <div className="mt-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">基础信息</h2>
          <dl className="mt-5 space-y-3 text-sm text-linen">
            <Row label="别名" value={project.alias} />
            <Row label="地区" value={project.region} />
            <Row label="类别" value={project.subCategory || project.category} />
            <Row label="级别" value={project.level || project.heritageLevel} />
            <Row label="可信度" value={project.confidence} />
          </dl>
        </section>
        <section className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">六维评分</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {scoreEntries.map(([label, value]) => <ScoreBar key={label} label={label} value={value} />)}
          </div>
          <p className="mt-5 text-sm leading-7 text-linen">{project.scoreExplanation}</p>
        </section>
      </div>

      <section className="mt-8 surface rounded p-6">
        <h2 className="font-serif text-2xl text-paper">基础转化方向</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <SimpleList title="产品化摘要" items={(project.productDirections || []).slice(0, 2)} />
          <SimpleList title="体验化摘要" items={(project.experienceDirections || []).slice(0, 2)} />
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <UpgradeCTA label="发起智能初评" href="/ai-assessment" variant="secondary" />
          <UpgradeCTA label="提交项目诊断获取定制建议" href="/diagnosis" />
          <UpgradeCTA label="预约咨询获取完整落地方案" href="/services" variant="secondary" />
        </div>
      </section>

      <section className="mt-12 surface rounded p-6">
        <AccessGate
          requiredTier="registered"
          fallback={
            <LockedContent
              requiredTier="registered"
              title="登录后查看完整评分理由"
              description="完整六维评分理由、公开市场证据摘要、主要短板和基础产品化 / 体验化建议将在登录后开放。当前游客可先查看综合分和六维评分概览。"
              ctaLabel="登录 / 注册"
              ctaHref="/login"
            />
          }
        >
          <h2 className="font-serif text-2xl text-paper">六维评分详细理由</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {scoreEntries.map(([label, value, reason]) => (
              <div key={label} className="rounded border border-paper/10 bg-ink/35 p-4">
                <div className="mb-2 flex justify-between text-sm text-paper"><span>{label}</span><span className="text-gold">{value}</span></div>
                <p className="text-sm leading-6 text-linen">{reason || "该维度需后续人工补充详细说明。"}</p>
              </div>
            ))}
          </div>
        </AccessGate>
      </section>

      <section className="mt-12 surface rounded p-6">
        <AccessGate
          requiredTier="registered"
          fallback={
            <LockedContent
              requiredTier="registered"
              title="登录后查看适合转化方向"
              description="项目独特价值、部分公开市场证据摘要、适合转化方向和主要短板将在登录后开放。"
              ctaLabel="登录后查看"
              ctaHref="/login"
            />
          }
        >
          <h2 className="font-serif text-2xl text-paper">项目独特价值</h2>
          <p className="mt-5 text-sm leading-7 text-linen">{getProjectUniqueValue(project)}</p>
          <div className="mt-5 rounded border border-paper/10 bg-ink/35 p-4">
            <h3 className="font-serif text-xl text-paper">公开市场证据摘要</h3>
            <p className="mt-3 text-sm leading-7 text-linen">{project.marketEvidence?.summary || "该项目公开市场证据需后续人工复核。"}</p>
          </div>
        </AccessGate>
      </section>

      <section className="mt-12 surface rounded p-6">
        <AccessGate
          requiredTier="paid"
          fallback={
            <LockedContent
              requiredTier="paid"
              title="升级后查看产品与体验方案"
              description="推荐产品 SKU、价格带、销售场景和体验模型属于深度产品化内容，升级后开放。"
              ctaLabel="查看会员权益"
              ctaHref="/account/membership"
            />
          }
        >
          <h2 className="font-serif text-2xl text-paper">推荐产品 SKU</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {(project.recommendedSkus || []).map((sku) => (
              <div key={sku.name} className="rounded border border-paper/10 bg-ink/35 p-4">
                <h3 className="font-serif text-xl text-paper">{sku.name}</h3>
                <dl className="mt-4 space-y-2 text-sm text-linen">
                  <Row label="价格带" value={sku.priceBand} />
                  <Row label="目标客群" value={sku.targetUser} />
                  <Row label="销售场景" value={sku.salesScene} />
                </dl>
                <p className="mt-4 text-sm leading-7 text-linen">{sku.reason}</p>
              </div>
            ))}
          </div>
        </AccessGate>
      </section>

      <section className="mt-12 surface rounded p-6">
        <AccessGate
          requiredTier="paid"
          fallback={
            <LockedContent
              requiredTier="paid"
              title="升级后查看产品与体验方案"
              description="体验时长、人数、流程、人员配置和带走成果属于深度体验设计内容，升级后开放。"
              ctaLabel="查看会员权益"
              ctaHref="/account/membership"
            />
          }
        >
          <h2 className="font-serif text-2xl text-paper">推荐体验设计</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {(project.recommendedExperiences || []).map((experience) => (
              <div key={experience.title} className="rounded border border-paper/10 bg-ink/35 p-4">
                <h3 className="font-serif text-xl text-paper">{experience.title}</h3>
                <dl className="mt-4 space-y-2 text-sm text-linen">
                  <Row label="时长" value={experience.duration} />
                  <Row label="人数" value={experience.capacity} />
                  <Row label="带走成果" value={experience.takeaway} />
                  <Row label="人员配置" value={experience.staffing} />
                </dl>
                <ol className="mt-4 space-y-2 text-sm leading-6 text-linen">
                  {experience.process.map((step, index) => <li key={step}>{index + 1}. {step}</li>)}
                </ol>
                <p className="mt-4 text-sm leading-7 text-paper/65">风险提示：{experience.riskNotes}</p>
              </div>
            ))}
          </div>
        </AccessGate>
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface rounded p-6">
          <AccessGate
            requiredTier="paid"
            fallback={
              <LockedContent
                requiredTier="paid"
                title="升级后查看产品与体验方案"
                description="落地条件、起步预算、筹备周期和运营要求属于深度落地方案内容，升级后开放。"
                ctaLabel="查看会员权益"
                ctaHref="/account/membership"
              />
            }
          >
            <h2 className="font-serif text-2xl text-paper">落地条件</h2>
            <dl className="mt-5 space-y-3 text-sm text-linen">
              <Row label="场地条件" value={project.implementationConditions?.space || "需结合项目场地继续核验"} />
              <Row label="人员条件" value={project.implementationConditions?.staff || "需配置讲解或运营人员"} />
              <Row label="材料供应" value={project.implementationConditions?.materials || "材料标准化需补充"} />
              <Row label="设备条件" value={project.implementationConditions?.equipment || "设备条件需按场景补充"} />
              <Row label="运营难度" value={project.implementationConditions?.operationDifficulty || "待核验"} />
              <Row label="起步预算" value={project.implementationConditions?.minimumBudget || "需按方案测算"} />
              <Row label="筹备周期" value={project.implementationConditions?.preparationCycle || "需按场地测算"} />
            </dl>
            <p className="mt-5 text-sm leading-7 text-linen">{project.implementationConditions?.notes || "落地备注需在项目沟通后补充。"}</p>
          </AccessGate>
        </div>
        <div className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">官方信息核验状态</h2>
          <div className="mt-4 text-sm text-gold">官方信息：{getProjectVerificationStatus(project)}</div>
          <SimpleList title="已核验字段" items={project.officialVerification?.verifiedFields || ["项目名称", "地区", "类别"]} />
          <SimpleList title="待核验字段" items={project.officialVerification?.pendingFields || ["保护单位", "非遗编号", "名录批次", "官方来源链接"]} />
          <p className="mt-5 text-sm leading-7 text-linen">{project.officialVerification?.notes || "官方信息需后续人工复核。"}</p>
        </div>
      </section>

      <section className="mt-12 surface rounded p-6">
        <AccessGate
          requiredTier="paid"
          fallback={
            <LockedContent
              requiredTier="paid"
              title="升级后查看产品与体验方案"
              description="收益方式、收费路径和运营备注属于深度商业化内容，升级后开放。"
              ctaLabel="查看会员权益"
              ctaHref="/account/membership"
            />
          }
        >
          <h2 className="font-serif text-2xl text-paper">收益方式</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {(project.revenueModels || []).map((model) => (
              <div key={`${model.type}-${model.suitableScene}`} className="rounded border border-paper/10 bg-ink/35 p-4">
                <h3 className="font-serif text-xl text-paper">{model.type}</h3>
                <p className="mt-3 text-sm leading-7 text-linen">{model.description}</p>
                <div className="mt-4 grid gap-2 text-sm text-paper/65">
                  <div>适合场景：<span className="text-paper/85">{model.suitableScene}</span></div>
                  <div>难度：<span className="text-paper/85">{model.difficulty}</span></div>
                  <div>备注：<span className="text-paper/85">{model.notes}</span></div>
                </div>
              </div>
            ))}
          </div>
        </AccessGate>
      </section>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <AccessGate
          requiredTier="registered"
          fallback={
            <LockedContent
              requiredTier="registered"
              title="登录后查看完整评分理由"
              description="完整产品化、体验化、课程化和礼品化路径将在登录后开放。"
              ctaLabel="登录后查看"
              ctaHref="/login"
            />
          }
        >
          <div className="grid gap-5 md:grid-cols-2">
            <ListBlock title="产品化路径" items={project.productDirections} />
            <ListBlock title="体验化路径" items={project.experienceDirections} />
            <ListBlock title="课程化路径" items={project.courseDirections} />
            <ListBlock title="礼品化路径" items={project.giftDirections} />
          </div>
        </AccessGate>
      </div>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        <ListBlock title="最佳场景" items={project.bestScenes || project.suitableScenes} />
        <ListBlock title="可尝试场景" items={project.secondaryScenes || project.scenes} />
        <ListBlock title="慎用场景" items={project.avoidScenes || project.unsuitableScenes} />
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        <AccessGate
          requiredTier="paid"
          fallback={
            <LockedContent
              requiredTier="paid"
              title="升级后查看产品与体验方案"
              description="价格带建议、销售渠道和运营条件属于付费深度字段，升级后开放。"
              ctaLabel="查看会员权益"
              ctaHref="/account/membership"
            />
          }
        >
          <div className="grid gap-5 md:col-span-2 md:grid-cols-2">
            <ListBlock title="价格带建议" items={project.priceBands || []} />
            <ListBlock title="销售渠道" items={project.salesChannels || []} />
          </div>
        </AccessGate>
        <div className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">运营条件</h2>
          <dl className="mt-5 space-y-3 text-sm text-linen">
            <Row label="供应难度" value={project.supplyDifficulty || "待核验"} />
            <Row label="标准化" value={project.standardization || "待补充"} />
          </dl>
          <p className="mt-5 text-sm leading-7 text-linen">{project.operationNotes}</p>
        </div>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
        <div className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">风险分析</h2>
          <div className="mt-3 text-sm text-gold">风险等级：{project.riskLevel || "待核验"}</div>
          <div className="mt-4 flex flex-wrap gap-2">{project.riskTags.map((risk) => <RiskBadge key={risk}>{risk}</RiskBadge>)}</div>
          <p className="mt-5 text-sm leading-7 text-linen">{project.riskExplanation}</p>
        </div>
        <AccessGate
          requiredTier="paid"
          fallback={
            <LockedContent
              requiredTier="paid"
              title="升级后查看产品与体验方案"
              description="完整风险规避建议属于落地方案内容，升级后开放。游客仍可查看基础风险摘要。"
              ctaLabel="查看会员权益"
              ctaHref="/account/membership"
            />
          }
        >
          <ListBlock title="规避建议" items={project.riskControl || project.risks} />
        </AccessGate>
      </section>

      <section className="mt-16">
        <SectionHeading title="案例参考" />
        <div className="grid gap-5 md:grid-cols-2">{relatedCases.map((item) => <CaseCard key={item.id} caseStudy={item} />)}</div>
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-[1fr_1fr]">
        <div className="surface rounded p-6">
          <AccessGate
            requiredTier="paid"
            fallback={
              <LockedContent
                requiredTier="paid"
                title="升级后查看产品与体验方案"
                description="完整公开市场证据和来源链属于深度研究支撑，升级后开放。"
                ctaLabel="查看会员权益"
                ctaHref="/account/membership"
              />
            }
          >
            <h2 className="font-serif text-2xl text-paper">来源链</h2>
            <ul className="mt-5 space-y-2 text-sm leading-6 text-linen">{[...(project.sources || []), ...(project.sourceLinks || [])].map((source) => <li key={source}>· {source}</li>)}</ul>
            <p className="mt-5 text-sm leading-7 text-paper/60">{project.sourceNotes}</p>
          </AccessGate>
        </div>
        <div>
          <AccessGate
            requiredTier="registered"
            fallback={
              <LockedContent
                requiredTier="registered"
                title="登录后查看完整评分理由"
                description="推荐资料包和收藏项目入口将在登录后开放。你也可以先发起智能初评或提交项目诊断。"
                ctaLabel="登录后查看"
                ctaHref="/login"
              />
            }
          >
            <SectionHeading title="相关资料包或智能初评入口" />
            <div className="grid gap-5">{(relatedPackages.length ? relatedPackages : packages.slice(0, 1)).map((item) => <PackageCard key={item.id} item={item} />)}</div>
            <Link href="/ai-assessment" className="mt-5 inline-flex rounded bg-gold px-6 py-3 text-sm text-ink hover:bg-paper">发起智能初评</Link>
          </AccessGate>
        </div>
      </section>

      <section className="mt-12 surface rounded p-6">
        <h2 className="font-serif text-2xl text-paper">服务承接</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-linen">
          如果需要围绕该项目形成具体产品、体验、空间或收入路径，可以提交项目诊断或预约咨询，进入定制化策划沟通。
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <UpgradeCTA label="提交项目诊断获取定制建议" href="/diagnosis" />
          <UpgradeCTA label="预约咨询获取完整落地方案" href="/services" variant="secondary" />
          <UpgradeCTA label="申请该项目商业化策划" href="/diagnosis" variant="secondary" />
        </div>
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between gap-6 border-b border-paper/10 pb-3"><dt className="text-paper/55">{label}</dt><dd className="text-right text-paper">{value}</dd></div>;
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="surface rounded p-6">
      <h2 className="font-serif text-2xl text-paper">{title}</h2>
      <ul className="mt-5 space-y-2 text-sm leading-6 text-linen">{items.map((item) => <li key={item}>· {item}</li>)}</ul>
    </section>
  );
}

function SimpleList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-5">
      <h3 className="font-serif text-xl text-paper">{title}</h3>
      <ul className="mt-3 flex flex-wrap gap-2 text-sm text-linen">
        {items.map((item) => <li key={item} className="rounded border border-paper/10 bg-ink/35 px-3 py-2">{item}</li>)}
      </ul>
    </div>
  );
}
