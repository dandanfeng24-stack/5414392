import Link from "next/link";

export function UpgradeCTA({
  label,
  href,
  variant = "primary"
}: {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}) {
  const className =
    variant === "primary"
      ? "inline-flex rounded bg-gold px-5 py-3 text-sm text-ink transition-colors hover:bg-paper"
      : "inline-flex rounded border border-gold/45 px-5 py-3 text-sm text-gold transition-colors hover:bg-gold hover:text-ink";

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}
