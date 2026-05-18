import Link from "next/link";
import type { PackageItem } from "@/lib/types";

export function PackageCard({ item }: { item: PackageItem }) {
  return (
    <article className="quiet-hover surface rounded p-6">
      <div className="text-sm text-gold">{item.status}</div>
      <h3 className="mt-3 font-serif text-2xl leading-snug text-paper">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-linen">{item.subtitle}</p>
      <ul className="mt-5 space-y-2 text-sm text-paper/75">
        {item.contents.slice(0, 3).map((content) => <li key={content}>· {content}</li>)}
      </ul>
      <Link href={`/packages/${item.id}`} className="mt-6 inline-flex rounded border border-gold/45 px-4 py-2 text-sm text-gold hover:bg-gold hover:text-ink">
        {item.cta}
      </Link>
    </article>
  );
}
