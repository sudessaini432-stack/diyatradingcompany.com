export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className="inline-block rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-accent-foreground">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-base text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
