import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getCurrentUser } from "@/lib/current-user";
import type { CurrentUser } from "@/lib/auth-types";

const accountLinks = [
  ["用户中心", "/account"],
  ["资料包记录", "/account/orders"],
  ["诊断与服务记录", "/account/services"],
  ["收藏项目", "/account/favorites"],
  ["会员权益", "/account/membership"]
];

export async function requireAccountUser(nextPath: string): Promise<CurrentUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/login?next=${nextPath}`);
  }

  return user;
}

export async function AccountSubPage({
  currentPath,
  eyebrow,
  title,
  description,
  cards,
  action,
  children
}: {
  currentPath: string;
  eyebrow: string;
  title: string;
  description: string;
  cards: Array<[string, string]>;
  action?: { label: string; href: string };
  children?: ReactNode;
}) {
  await requireAccountUser(currentPath);

  return (
    <div className="section-shell py-16">
      <section className="surface rounded p-8 md:p-10">
        <div className="text-sm text-gold">{eyebrow}</div>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-paper md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-linen">{description}</p>
      </section>

      <AccountNav />

      {action ? (
        <div className="mt-8">
          <Link href={action.href} className="inline-flex rounded bg-gold px-5 py-3 text-sm text-ink transition-colors hover:bg-paper">
            {action.label}
          </Link>
        </div>
      ) : null}

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {cards.map(([cardTitle, text]) => (
          <article key={cardTitle} className="surface rounded p-6">
            <h2 className="font-serif text-2xl text-paper">{cardTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-linen">{text}</p>
          </article>
        ))}
      </section>

      {children}
    </div>
  );
}

export function AccountNav() {
  return (
    <nav className="mt-8 flex flex-wrap gap-3">
      {accountLinks.map(([label, href]) => (
        <Link
          key={href}
          href={href}
          className="rounded border border-gold/30 px-4 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
