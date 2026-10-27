import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, BadgeCheck } from "lucide-react";
import { BUSINESS, phoneHref } from "@/lib/business";
import { CallButton, QuoteButton, WhatsAppButton } from "@/components/CtaButtons";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Diya Trading Company | Non Woven Bags Jind, Haryana" },
      {
        name: "description",
        content:
          "Contact Diya Trading Company, Amravali Road, Pillu Khera Mandi, Jind, Haryana 126113. Call or WhatsApp +91 97286 59049 for non woven bag rates and bulk orders. GSTIN 06CGGPN9691E1ZZ.",
      },
      { property: "og:title", content: "Contact Diya Trading Company" },
      {
        property: "og:description",
        content: "Address, phone numbers, WhatsApp and GSTIN for Diya Trading Company, Jind, Haryana.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://diya-bag-studio.lovable.app/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://diya-bag-studio.lovable.app/contact" }],
  }),
});

function ContactPage() {
  return (
    <>
      <section className="hero-surface text-primary-foreground">
        <div className="shell py-14 text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base opacity-90">
            Reach Diya Trading Company for rates, samples and bulk non-woven bag orders.
          </p>
        </div>
      </section>

      <section className="section-pad bg-background">
        <div className="shell grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <MapPin className="size-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-base font-bold text-primary">Address</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {BUSINESS.address.line1}
              <br />
              {BUSINESS.address.line2}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Phone className="size-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-base font-bold text-primary">Phone Numbers</h2>
            <ul className="mt-2 space-y-1.5 text-sm font-semibold">
              {BUSINESS.phones.map((p) => (
                <li key={p}>
                  <a href={phoneHref(p)} className="text-foreground/85 hover:text-primary hover:underline">
                    +91 {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <BadgeCheck className="size-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-base font-bold text-primary">GSTIN</h2>
            <p className="mt-2 text-sm font-semibold text-muted-foreground">{BUSINESS.gstin}</p>
            <p className="mt-2 text-sm text-muted-foreground">WhatsApp: +91 {BUSINESS.phones[0]}</p>
          </div>
        </div>

        <div className="shell mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <QuoteButton className="px-6 py-3.5 text-base" />
          <WhatsAppButton className="px-6 py-3.5 text-base" label="WhatsApp Us" />
          <CallButton className="px-6 py-3.5 text-base" />
        </div>
      </section>

      <section className="section-pad bg-secondary/60">
        <div className="shell">
          <SectionHeading
            eyebrow="Find Us"
            title="Pillu Khera Mandi, Jind, Haryana"
            subtitle="Our supply base in Jind district, Haryana — conveniently connected for dispatch across North India."
          />
          <div className="mt-10 overflow-hidden rounded-3xl border border-border shadow-lift">
            <iframe
              title="Map showing Pillu Khera Mandi, Jind, Haryana, India"
              src="https://www.google.com/maps?q=Pillu%20Khera%20Mandi%2C%20Jind%2C%20Haryana%2C%20India&output=embed"
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full border-0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
