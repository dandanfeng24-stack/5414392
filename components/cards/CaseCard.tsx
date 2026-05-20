import Link from "next/link";
import type { CaseStudy } from "@/lib/types";
import { TagPill } from "@/components/ui/TagPill";

const fallbackImage = "/images/textures/dark-paper.png";

export function CaseCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const image = caseStudy.image || fallbackImage;

  return (
    <article className="quiet-hover surface overflow-hidden rounded">
      <div
        className="aspect-[16/10] border-b border-paper/10"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      />
      <div className="p-6">
        <div className="text-sm text-gold">
          {caseStudy.city} · {caseStudy.scene}
        </div>
        <h3 className="mt-3 font-serif text-2xl text-paper">{caseStudy.title}</h3>
        <p className="mt-4 text-sm leading-7 text-linen">{caseStudy.transformationLogic}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {caseStudy.targetUsers.map((user) => (
            <TagPill key={user}>{user}</TagPill>
          ))}
        </div>
        <Link href={`/cases/${caseStudy.id}`} className="mt-6 inline-block text-sm text-gold hover:text-paper">
          查看案例研究
        </Link>
      </div>
    </article>
  );
}
