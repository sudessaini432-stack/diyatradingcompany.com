import { createFileRoute } from "@tanstack/react-router";
import { Check, Palette, Printer, Ruler, Truck, Handshake } from "lucide-react";
import factory from "@/assets/factory.jpg";
import hero from "@/assets/hero-bags.jpg";
import { BUSINESS } from "@/lib/business";
import { SectionHeading } from "@/components/SectionHeading";
import { CallButton, QuoteButton, WhatsAppButton } from "@/components/CtaButtons";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Diya Trading Company | Non Woven Bags Supplier in Haryana" },
      {
        name: "description",
        content:
          "Diya Trading Company supplies premium non woven bags to retailers, wholesalers, shops, brands and businesses — quality products, customized sizes, colours, printing and reliable bulk supply from Jind, Haryana.",
      },
      { property: "og:title", content: "About Diya Trading Company" },
      {
        property: "og:description",
        content:
          "A quality-focused non woven bags supplier from Jind, Haryana offering customized sizes, colours, printing and dependable bulk supply.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://diya-bag-studio.lovable.app/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://diya-bag-studio.lovable.app/about" }],
  }),
});

const PILLARS = [
  { icon: Check, title: "Quality-Focused Products", text: "Consistent fabric quality, strong seams and a clean finish on every bag we dispatch." },
  { icon: Ruler, title: "Customized Sizes", text: "Bags made to your exact dimensions, from small billing bags to large shopping sizes." },
  { icon: Palette, title: "Customized Colours", text: "Choose the shade that matches your shop or brand identity." },
  { icon: Printer, title: "Customized Printing", text: "Logo, shop name, contact details and multi-colour brand printing." },
  { icon: Truck, title: "Bulk Orders", text: "Volume production and timely dispatch for wholesale and chain requirements." },
  { icon: Handshake, title: "Reliable Business Supply", text: "A dependable long-term supply partner for repeat packaging needs." },
];

function AboutPage() {
  return (
    <>
      <section className="hero-surface text-primary-foreground">
        <div className="shell py-14 text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">About Diya Trading Company</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base opacity-90">
            Premium non-woven bags for retailers, wholesalers, shops, brands and businesses.
          </p>
        </div>
      </section>

      <section className="section-pad bg-background">
        <div className="shell grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title="A quality-first non-woven bag supply partner"
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Diya Trading Company supplies premium non-woven bags for retailers, wholesalers, shops, brands and
                businesses. Working from {BUSINESS.address.line1}, {BUSINESS.address.line2}, we serve customers who
                need packaging that looks good, lasts longer and can be reused.
              </p>
              <p>
                Our range covers D-Cut, W-Cut, Box and Loop bags. Every order is produced to your requirement —
                customized sizes, customized colours and customized printing — so your packaging carries your own
                identity instead of a generic look.
              </p>
              <p>
                We focus on bulk orders and reliable business supply, with clear communication on specification,
                rate and dispatch so that repeat requirements are simple to place.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <QuoteButton />
              <WhatsAppButton label="WhatsApp Us" />
              <CallButton />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="overflow-hidden rounded-3xl shadow-lift">
              <img
                src={factory}
                alt="Non-woven fabric rolls and finished bags at Diya Trading Company"
                width={1408}
                height={912}
                loading="lazy"
                className="w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-3xl shadow-card">
              <img
                src={hero}
                alt="Blue, green and white premium non-woven carry bags"
                width={1600}
                height={1104}
                loading="lazy"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-secondary/60">
        <div className="shell">
          <SectionHeading eyebrow="What We Offer" title="Built around what B2B buyers actually need" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <p.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-bold text-primary">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm font-semibold text-muted-foreground">
            GSTIN: {BUSINESS.gstin}
          </p>
        </div>
      </section>
    </>
  );
}
