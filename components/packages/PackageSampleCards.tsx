import Link from "next/link";
import type { PackageItem } from "@/lib/types";

const sampleStatus = "注册用户可查看样张说明，真实下载功能后续开放。";

export function getPackageSamples(item: PackageItem) {
  const names = (item.previewSections.length ? item.previewSections : item.contents).slice(0, 4);
  const targetUsers = item.targetUsers.length ? item.targetUsers : ["项目团队"];
  const relatedTags = item.relatedTags.length ? item.relatedTags : ["资料包样张"];

  return names.map((name, index) => ({
    name,
    purpose: item.contents[index]
      ? `用于说明「${item.contents[index]}」的结构和使用方法。`
      : `用于理解${item.title}的基础样张结构。`,
    scenario: [targetUsers[index % targetUsers.length], relatedTags[index % relatedTags.length]]
      .filter(Boolean)
      .join(" / "),
    status: sampleStatus
  }));
}

export function PackageSampleCards({ item }: { item: PackageItem }) {
  const samples = getPackageSamples(item);

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {samples.map((sample) => (
        <article key={sample.name} className="rounded border border-paper/10 bg-ink/45 p-5">
          <div className="text-xs text-gold">样张说明</div>
          <h3 className="mt-3 font-serif text-2xl text-paper">{sample.name}</h3>
          <p className="mt-4 text-sm leading-7 text-linen">{sample.purpose}</p>
          <div className="mt-4 rounded border border-paper/10 bg-ink/45 p-3 text-xs leading-6 text-paper/68">
            适用场景：<span className="text-paper/85">{sample.scenario || "项目内部讨论"}</span>
          </div>
          <p className="mt-4 text-xs leading-6 text-paper/62">{sample.status}</p>
          <div className="mt-4 text-sm text-gold">了解样张用途</div>
        </article>
      ))}
    </div>
  );
}

export function PackageSampleEntryList({ packages }: { packages: PackageItem[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {packages.map((item) => {
        const samples = getPackageSamples(item);

        return (
          <article key={item.id} className="surface rounded p-6">
            <div className="text-sm text-gold">{samples.length} 个样张说明</div>
            <h3 className="mt-3 font-serif text-2xl leading-snug text-paper">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-linen">{item.subtitle}</p>
            <div className="mt-4 text-xs leading-6 text-paper/65">
              适合对象：<span className="text-paper/85">{item.targetUsers.join(" / ")}</span>
            </div>
            <div className="mt-3 text-xs leading-6 text-paper/65">
              可查看内容：<span className="text-paper/85">{samples.map((sample) => sample.name).join("、")}</span>
            </div>
            <Link
              href={`/packages/${item.id}`}
              className="mt-5 inline-flex rounded border border-gold/45 px-4 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              查看样张说明
            </Link>
          </article>
        );
      })}
    </div>
  );
}
