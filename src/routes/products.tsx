import { createFileRoute } from "@tanstack/react-router";
import { SERVICES } from "@/lib/business";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { CallButton, QuoteButton, WhatsAppButton } from "@/components/CtaButtons";
import { Check } from "lucide-react";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
  head: () => ({
    meta: [
      { title: "D-Cut, W-Cut, Box & Loop Non-Woven Bags | Diya Trading Company" },
      {
        name: "description",
        content:
          "Explore D-Cut, W-Cut, Box and Loop non-woven bags from Diya Trading Company, Jind, Haryana. Custom sizes, colours and printing, with bulk orders welcome.",
      },
      { property: "og:title", content: "D-Cut, W-Cut, Box & Loop Non-Woven Bags | Diya Trading Company" },
      {
        property: "og:description",
        content:
          "D-Cut, W-Cut, Box and Loop non-woven bags with custom sizes, colours and printing. Bulk supply from Jind, Haryana.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://diya-bag-studio.lovable.app/products" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://diya-bag-studio.lovable.app/products" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Non-Woven Bags by Diya Trading Company",
          itemListElement: PRODUCTS.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Product",
              name: p.name,
              description: p.description,
              category: "Non-Woven Bags",
              brand: { "@type": "Brand", name: "Diya Trading Company" },
              manufacturer: { "@type": "Organization", name: "Diya Trading Company" },
            },
          })),
        }),
      },
    ],
  }),
});

function ProductsPage() {
  return (
    <>
      <section className="hero-surface text-primary-foreground">
        <div className="shell py-14 text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">Our Non-Woven Bag Products</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base opacity-90">
            Printed and plain non woven bags manufactured in every size and colour — for shops, wholesalers, brands
            and business packaging across India.
          </p>
        </div>
      </section>

      <section className="section-pad bg-background">
        <div className="shell grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="section-pad bg-secondary/60">
        <div className="shell">
          <SectionHeading
            eyebrow="Customization"
            title="Everything can be made to your specification"
            subtitle="Tell us the bag type, dimensions, colour, printing and quantity you need."
          />
          <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <li
                key={s}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 text-sm font-semibold shadow-card"
              >
                <Check className="size-4 shrink-0 text-eco" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <QuoteButton />
            <WhatsAppButton />
            <CallButton />
          </div>
        </div>
      </section>
    </>
  );
}
