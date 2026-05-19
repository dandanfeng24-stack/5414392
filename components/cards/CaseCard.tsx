import Link from "next/link";
import type { CaseStudy } from "@/lib/types";
import { TagPill } from "@/components/ui/TagPill";

const fallbackImage = "/images/textures/dark-paper.png";

export function CaseCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const image = caseStudy.image || fallbackImage;

  return (
    <article
      className="image-card-text quiet-hover surface relative overflow-hidden rounded p-6"
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    >
      <div className="relative z-10 text-sm text-gold">
        {caseStudy.city} · {caseStudy.scene}
      </div>
      <h3 className="relative z-10 mt-3 font-serif text-2xl text-paper">{caseStudy.title}</h3>
      <p className="relative z-10 mt-4 text-sm leading-7 text-linen">{caseStudy.transformationLogic}</p>
      <div className="relative z-10 mt-5 flex flex-wrap gap-2">
        {caseStudy.targetUsers.map((user) => (
          <TagPill key={user}>{user}</TagPill>
        ))}
      </div>
      <Link href={`/cases/${caseStudy.id}`} className="relative z-10 mt-6 inline-block text-sm text-gold hover:text-paper">
        查看案例研究
      </Link>
    </article>
  );
}
