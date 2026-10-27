import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { BUSINESS, waHref } from "@/lib/business";
import { PRODUCTS } from "@/lib/products";
import { CallButton } from "@/components/CtaButtons";

export const Route = createFileRoute("/quote")({
  component: QuotePage,
  head: () => ({
    meta: [
      { title: "Get a Quote for Customized Non Woven Bags | Diya Trading Company" },
      {
        name: "description",
        content:
          "Send your non woven bag enquiry to Diya Trading Company — choose bag type, quantity, size, colour and printing. Your details open directly in WhatsApp for a fast quote.",
      },
      { property: "og:title", content: "Get a Quote | Diya Trading Company" },
      {
        property: "og:description",
        content:
          "Request a rate for D Cut, W Cut, Box or Loop non woven bags with your own size, colour, printing and quantity.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://diya-bag-studio.lovable.app/quote" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://diya-bag-studio.lovable.app/quote" }],
  }),
});

const FIELD =
  "mt-1.5 w-full rounded-xl border border-input bg-card px-4 py-3 text-base text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary";

type Form = {
  name: string;
  phone: string;
  bagType: string;
  quantity: string;
  size: string;
  colour: string;
  printing: string;
  location: string;
  message: string;
};

const EMPTY: Form = {
  name: "",
  phone: "",
  bagType: PRODUCTS[0]!.name,
  quantity: "",
  size: "",
  colour: "",
  printing: "",
  location: "",
  message: "",
};

function QuotePage() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [sent, setSent] = useState(false);

  const set = (key: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const lines = [
      "New Enquiry — Diya Trading Company",
      "",
      `Name: ${form.name}`,
      `Phone Number: ${form.phone}`,
      `Bag Type: ${form.bagType}`,
      `Quantity: ${form.quantity}`,
      `Size: ${form.size || "-"}`,
      `Colour: ${form.colour || "-"}`,
      `Printing Requirement: ${form.printing || "-"}`,
      `Delivery Location: ${form.location || "-"}`,
      `Additional Message: ${form.message || "-"}`,
    ];
    window.open(waHref(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <>
      <section className="hero-surface text-primary-foreground">
        <div className="shell py-14 text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">Get a Custom Quote</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base opacity-90">
            Fill in your requirement and it opens in WhatsApp as a ready enquiry — no waiting, no forms lost.
          </p>
        </div>
      </section>

      <section className="section-pad bg-secondary/50">
        <div className="shell grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
          >
            <h2 className="text-xl font-bold text-primary">Enquiry / Order Details</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">Fields marked * are required.</p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold">
                Name *
                <input required value={form.name} onChange={set("name")} className={FIELD} maxLength={100} placeholder="Your full name" />
              </label>

              <label className="block text-sm font-semibold">
                Phone Number *
                <input
                  required
                  type="tel"
                  inputMode="tel"
                  pattern="[0-9+\s-]{10,15}"
                  value={form.phone}
                  onChange={set("phone")}
                  className={FIELD}
                  maxLength={15} placeholder="10-digit mobile number"
                />
              </label>

              <label className="block text-sm font-semibold">
                Bag Type *
                <select required value={form.bagType} onChange={set("bagType")} className={FIELD}>
                  {PRODUCTS.map((p) => (
                    <option key={p.slug} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                  <option value="Mixed / Other">Mixed / Other</option>
                </select>
              </label>

              <label className="block text-sm font-semibold">
                Quantity *
                <input
                  required
                  value={form.quantity}
                  onChange={set("quantity")}
                  className={FIELD}
                  maxLength={40} placeholder="e.g. 5000 pcs"
                />
              </label>

              <label className="block text-sm font-semibold">
                Size
                <input
                  value={form.size}
                  onChange={set("size")}
                  className={FIELD}
                  maxLength={60} placeholder="e.g. 12 x 16 inch"
                />
              </label>

              <label className="block text-sm font-semibold">
                Colour
                <input value={form.colour} onChange={set("colour")} className={FIELD} maxLength={60} placeholder="e.g. Royal blue" />
              </label>

              <label className="block text-sm font-semibold">
                Printing Requirement
                <input
                  value={form.printing}
                  onChange={set("printing")}
                  className={FIELD}
                  maxLength={120} placeholder="e.g. Shop name, 2 colour"
                />
              </label>

              <label className="block text-sm font-semibold">
                Delivery Location
                <input
                  value={form.location}
                  onChange={set("location")}
                  className={FIELD}
                  maxLength={100} placeholder="City / State"
                />
              </label>

              <label className="block text-sm font-semibold sm:col-span-2">
                Additional Message
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={set("message")}
                  className={FIELD}
                  maxLength={800} placeholder="Anything else we should know about your order"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-6 py-4 text-base font-bold text-whatsapp-foreground shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 active:scale-[0.99]"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              Send Enquiry on WhatsApp
            </button>

            <p aria-live="polite" className="mt-3 min-h-5 text-center text-sm font-semibold text-eco">
              {sent ? "WhatsApp opened with your enquiry. Press send there to reach us." : ""}
            </p>
          </form>

          <aside className="space-y-5">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
              <h2 className="text-lg font-bold text-primary">Prefer to talk directly?</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Call us on any of our numbers for rates, samples and bulk order timelines.
              </p>
              <ul className="mt-4 space-y-2 text-sm font-semibold">
                {BUSINESS.phones.map((p) => (
                  <li key={p}>
                    <a href={`tel:+91${p.replace(/\s/g, "")}`} className="text-primary hover:underline">
                      +91 {p}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <CallButton className="w-full" />
              </div>
            </div>

            <div className="rounded-3xl bg-primary p-6 text-primary-foreground shadow-lift">
              <ShieldCheck className="size-6 text-gold" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-bold">Bulk order friendly</h2>
              <p className="mt-2 text-sm opacity-90">
                Customized sizes, colours and printing on every bag type. Larger quantities get better rates.
              </p>
              <p className="mt-4 text-xs opacity-75">GSTIN: {BUSINESS.gstin}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
