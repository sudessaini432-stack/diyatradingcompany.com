import { Link } from "@tanstack/react-router";
import { MapPin, Phone, MessageCircle, BadgeCheck } from "lucide-react";
import logo from "@/assets/logo.png";
import { BUSINESS, DEFAULT_WA_MESSAGE, phoneHref, waHref } from "@/lib/business";
import { PRODUCTS } from "@/lib/products";

export function Footer() {
  return (
    <footer className="mt-auto bg-primary-dark text-primary-foreground">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="Diya Trading Company logo" width={40} height={40} loading="lazy" className="size-10 rounded-lg" />
            <span className="font-display text-lg font-bold">Diya Trading Company</span>
          </div>
          <p className="mt-3 text-sm opacity-80">
            Premium Non-Woven Bags — manufacturer and supplier of D-Cut, W-Cut, Box and Loop bags with customized
            sizes, colours and printing for businesses across India.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] opacity-95">Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/products", label: "Products" },
              { to: "/about", label: "About Us" },
              { to: "/quote", label: "Get a Quote" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="opacity-80 transition-opacity hover:opacity-100">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] opacity-95">Products</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <Link to="/products" className="opacity-80 transition-opacity hover:opacity-100">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] opacity-95">Contact Information</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <span className="opacity-85">
                {BUSINESS.address.line1}
                <br />
                {BUSINESS.address.line2}
              </span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <span className="flex flex-col gap-1">
                {BUSINESS.phones.map((p) => (
                  <a key={p} href={phoneHref(p)} className="opacity-85 transition-opacity hover:opacity-100">
                    +91 {p}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-2.5">
              <MessageCircle className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <a
                href={waHref(DEFAULT_WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-85 transition-opacity hover:opacity-100"
              >
                WhatsApp: +91 {BUSINESS.phones[0]}
              </a>
            </li>
            <li className="flex gap-2.5">
              <BadgeCheck className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <span className="opacity-85">GSTIN: {BUSINESS.gstin}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="shell py-5 text-center text-xs opacity-75">
          © {new Date().getFullYear()} Diya Trading Company. All rights reserved. Premium Non-Woven Bags Manufacturer
          &amp; Supplier, Jind, Haryana.
        </div>
      </div>
    </footer>
  );
}
