export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 max-w-3xl">
      {eyebrow ? <div className="mb-3 text-sm text-gold">{eyebrow}</div> : null}
      <h2 className="font-serif text-3xl leading-tight text-paper md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-linen">{description}</p> : null}
    </div>
  );
}
