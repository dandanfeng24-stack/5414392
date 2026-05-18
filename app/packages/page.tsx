import { PackageCard } from "@/components/cards/PackageCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { packages } from "@/lib/data";

export default function PackagesPage() {
  return (
    <div className="section-shell py-16">
      <SectionHeading title="资料包" description="面向文旅项目、街区运营、研学机构和文创品牌的可复用工具包。" />
      <div className="grid gap-5 md:grid-cols-3">{packages.map((item) => <PackageCard key={item.id} item={item} />)}</div>
    </div>
  );
}
