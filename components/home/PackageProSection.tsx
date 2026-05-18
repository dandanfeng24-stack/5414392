import { PackageCard } from "@/components/cards/PackageCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PackageItem } from "@/lib/types";

export function PackageProSection({ packages }: { packages: PackageItem[] }) {
  return (
    <section className="py-20">
      <div className="section-shell">
        <SectionHeading title="资料包与PRO入口" description="先用样张和工具包承接真实项目需求，后续扩展为 PRO 研究服务。" />
        <div className="grid gap-5 md:grid-cols-3">
          {packages.map((item) => <PackageCard key={item.id} item={item} />)}
        </div>
      </div>
    </section>
  );
}
