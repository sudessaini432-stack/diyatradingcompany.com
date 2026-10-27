import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, MessageCircle, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { BUSINESS, DEFAULT_WA_MESSAGE, telHref, waHref } from "@/lib/business";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/quote", label: "Get Quote" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="bg-primary-dark text-primary-foreground">
        <div className="shell flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-1.5 text-[11px] sm:text-xs">
          <span className="opacity-90">GSTIN: {BUSINESS.gstin}</span>
          <a href={telHref} className="font-semibold opacity-95 transition-opacity hover:opacity-100">
            +91 {BUSINESS.phones[0]}
          </a>
        </div>
      </div>

      <div className="shell flex items-center justify-between gap-3 py-3">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={logo} alt="Diya Trading Company logo" width={40} height={40} className="size-10 rounded-lg" />
          <span className="leading-tight">
            <span className="block font-display text-base font-bold text-primary sm:text-lg">
              Diya Trading Company
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-eco sm:text-[11px]">
              Premium Non-Woven Bags
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-secondary hover:text-primary data-[status=active]:bg-secondary data-[status=active]:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={waHref(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-2 rounded-xl bg-whatsapp px-4 py-2.5 text-sm font-semibold text-whatsapp-foreground shadow-card transition-transform duration-200 hover:-translate-y-0.5"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp
          </a>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={telHref}
            aria-label="Call Diya Trading Company"
            className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"
          >
            <Phone className="size-5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-10 items-center justify-center rounded-xl border border-border bg-card text-primary"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="border-t border-border bg-background lg:hidden">
          <div className="shell flex flex-col gap-1 py-3">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-semibold text-foreground/85 transition-colors hover:bg-secondary data-[status=active]:bg-secondary data-[status=active]:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={waHref(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-3 text-base font-semibold text-whatsapp-foreground"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              WhatsApp Us
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
