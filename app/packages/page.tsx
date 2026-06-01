import { PackageCard } from "@/components/cards/PackageCard";
import { AccessGate } from "@/components/access/AccessGate";
import { LockedContent } from "@/components/access/LockedContent";
import { PackageSampleEntryList } from "@/components/packages/PackageSampleCards";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { packages } from "@/lib/data";

export default function PackagesPage() {
  return (
    <div className="section-shell py-16">
      <SectionHeading title="资料包" description="面向文旅项目、街区运营、研学机构和文创品牌的可复用工具包。" />
      <div className="grid gap-5 md:grid-cols-3">{packages.map((item) => <PackageCard key={item.id} item={item} />)}</div>
      <div className="mt-10">
        <AccessGate
          requiredTier="registered"
          fallback={
            <LockedContent
              requiredTier="registered"
              title="注册后查看资料包样张说明"
              description="游客可以浏览封面、目录和样张预览；结构化样张说明和基础模板用途需要登录后开放。"
              ctaLabel="登录 / 注册后查看"
              ctaHref="/login?next=/packages"
            />
          }
        >
          <section className="surface rounded p-6">
            <div className="text-sm text-gold">注册用户可查看的样张权益</div>
            <h2 className="mt-3 font-serif text-3xl text-paper">资料包样张说明</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-linen">
              登录后可查看当前 3 个资料包的样张说明、用途和适用场景。当前仅提供展示型说明，不生成真实附件或领取记录。
            </p>
            <div className="mt-6">
              <PackageSampleEntryList packages={packages} />
            </div>
          </section>
        </AccessGate>
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <AccessGate
          requiredTier="paid"
          fallback={
            <LockedContent
              requiredTier="paid"
              title="升级后查看完整资料包"
              description="完整资料包、完整模板和可直接使用的工具包属于付费用户内容，当前仅展示前端权限占位。"
              ctaLabel="查看会员权益"
              ctaHref="/account/membership"
            />
          }
        >
          <section className="surface rounded p-6">
            <h2 className="font-serif text-2xl text-paper">完整工具包</h2>
            <p className="mt-4 text-sm leading-7 text-linen">付费用户可查看完整资料包、完整模板和可直接使用的项目工具。</p>
          </section>
        </AccessGate>
      </div>
    </div>
  );
}
