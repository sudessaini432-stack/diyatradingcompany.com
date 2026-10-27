import { Check } from "lucide-react";
import type { Product } from "@/lib/products";
import { QuoteButton, WhatsAppButton } from "./CtaButtons";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.alt}
          width={912}
          height={912}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-primary">{product.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.14em] text-eco">Available Customization</p>
        <ul className="mt-2 grid gap-1.5">
          {product.custom.map((c) => (
            <li key={c} className="flex items-center gap-2 text-sm text-foreground/80">
              <Check className="size-3.5 shrink-0 text-eco" aria-hidden="true" />
              {c}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-col gap-2 pt-1 sm:flex-row">
          <QuoteButton className="flex-1" label="Get Quote" />
          <WhatsAppButton
            className="flex-1"
            label="WhatsApp"
            message={`Hello Diya Trading Company, I am interested in ${product.name}. Please share rates and customization details.`}
          />
        </div>
      </div>
    </article>
  );
}
