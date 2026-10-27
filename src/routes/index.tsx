import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Leaf, Layers, Recycle, Sprout, Boxes, ArrowRight, Check } from "lucide-react";
import hero from "@/assets/hero-bags.jpg";
import factory from "@/assets/factory.jpg";
import { BUSINESS, SERVICES, TRUST_POINTS } from "@/lib/business";
import { PRODUCTS } from "@/lib/products";
import { CallButton, QuoteButton, WhatsAppButton } from "@/components/CtaButtons";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Diya Trading Company | Non-Woven Bags Manufacturer in Haryana" },
      {
        name: "description",
        content:
          "Diya Trading Company makes and supplies D-Cut, W-Cut, Box and Loop non-woven bags in Jind, Haryana, with custom sizes, colours, printing and bulk orders.",
      },
      { property: "og:title", content: "Diya Trading Company | Non-Woven Bags Manufacturer in Haryana" },
      {
        property: "og:description",
        content:
          "Diya Trading Company makes and supplies D-Cut, W-Cut, Box and Loop non-woven bags in Jind, Haryana, with custom sizes, colours, printing and bulk orders.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://diya-bag-studio.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://diya-bag-studio.lovable.app/" }],
  }),
});

const TRUST_ICONS = [ShieldCheck, Leaf, Layers, Recycle, Sprout, Boxes];

function Home() {
  return (
    <>
      <section className="hero-surface relative overflow-hidden text-primary-foreground">
        <div
          className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, var(--gold), transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="shell grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div className="rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em]">
              <Leaf className="size-3.5" aria-hidden="true" />
              Manufacturer &amp; Supplier · Jind, Haryana
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-[3.4rem]">
              Premium Quality Non-Woven Bags
            </h1>
            <p className="mt-4 text-lg font-semibold text-gold">
              Customized Sizes • Colours • Printing
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed opacity-90">
              Diya Trading Company supplies D-Cut, W-Cut, Box and Loop non-woven bags to retailers, wholesalers,
              shops and brands across India — built for strength, reuse and clean brand printing.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <QuoteButton className="px-6 py-3.5 text-base" />
              <WhatsAppButton className="px-6 py-3.5 text-base" />
              <CallButton className="px-6 py-3.5 text-base" label={`Call Now · +91 ${BUSINESS.phones[0]}`} />
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-90">
              {["Bulk order ready", "Any colour, any size", "Custom brand printing"].map((t) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <Check className="size-4 text-gold" aria-hidden="true" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rise relative">
            <div className="overflow-hidden rounded-3xl border border-primary-foreground/15 shadow-lift">
              <img
                src={hero}
                alt="Stack of premium blue, green and white non-woven bags from Diya Trading Company"
                width={1600}
                height={1104}
                className="w-full object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[
                { k: "4", v: "Bag Types" },
                { k: "100%", v: "Customizable" },
                { k: "Bulk", v: "Supply Ready" },
              ].map((s) => (
                <div
                  key={s.v}
                  className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 px-3 py-3 backdrop-blur-sm"
                >
                  <div className="font-display text-xl font-bold text-gold">{s.k}</div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.1em] opacity-85">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-background">
        <div className="shell">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Bags your customers trust, batch after batch"
            subtitle="Every order is produced to your specification and checked before dispatch."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TRUST_POINTS.map((point, i) => {
              const Icon = TRUST_ICONS[i]!;
              return (
                <div
                  key={point.title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-eco/40 hover:shadow-lift"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-primary">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{point.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-secondary/60">
        <div className="shell">
          <SectionHeading
            eyebrow="Our Products"
            title="D-Cut, W-Cut, Box & Loop Non-Woven Bags"
            subtitle="Pick a style, tell us your size, colour and printing — we handle the rest."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary underline-offset-4 hover:underline"
            >
              View all product details
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-background">
        <div className="shell grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl shadow-lift">
            <img
              src={factory}
              alt="Non-woven fabric rolls and finished printed bags ready for bulk supply"
              width={1408}
              height={912}
              loading="lazy"
              className="w-full object-cover"
            />
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our Services"
              title="Complete customization for your packaging"
              subtitle="From a single retail counter to a multi-store brand rollout, your requirement is produced to order."
            />
            <ul className="mt-7 grid gap-3">
              {SERVICES.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground/85 shadow-card transition-transform duration-200 hover:translate-x-1"
                >
                  <Check className="size-4 shrink-0 text-eco" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <QuoteButton />
              <WhatsAppButton label="WhatsApp Us" />
            </div>
          </div>
        </div>
      </section>

      <section className="hero-surface text-primary-foreground">
        <div className="shell flex flex-col items-center gap-6 py-14 text-center">
          <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">
            Ready to order your customized non-woven bags?
          </h2>
          <p className="max-w-xl text-base opacity-90">
            Share your size, colour, printing and quantity — you will get a clear rate for your bulk requirement.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <QuoteButton className="px-6 py-3.5 text-base" />
            <WhatsAppButton className="px-6 py-3.5 text-base" />
            <CallButton className="px-6 py-3.5 text-base" />
          </div>
        </div>
      </section>
    </>
  );
}
