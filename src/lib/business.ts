export const BUSINESS = {
  name: "Diya Trading Company",
  tagline: "Premium Non-Woven Bags Manufacturer & Supplier",
  gstin: "06CGGPN9691E1ZZ",
  address: {
    line1: "Amravali Road, Pillu Khera Mandi",
    line2: "Jind, Haryana 126113, India",
  },
  phones: ["97286 59049", "90344 10979", "70158 02022", "92559 13893"],
  primaryPhone: "+919728659049",
  whatsapp: "919728659049",
} as const;

export const telHref = `tel:${BUSINESS.primaryPhone}`;

export function phoneHref(display: string) {
  return `tel:+91${display.replace(/\s/g, "")}`;
}

export function waHref(message: string) {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WA_MESSAGE =
  "Hello Diya Trading Company, I would like an enquiry about non-woven bags.";

export const TRUST_POINTS = [
  { title: "Premium Quality", text: "Consistent GSM, strong stitching and clean finish on every batch." },
  { title: "Sustainable", text: "Eco-conscious non-woven fabric suited to modern retail packaging." },
  { title: "Durable", text: "High load strength that protects goods through daily handling." },
  { title: "Reusable", text: "Long-life bags customers keep using, carrying your brand further." },
  { title: "Eco-Friendly", text: "A responsible alternative to single-use plastic carry bags." },
  { title: "Bulk Supply", text: "Reliable volume production and dispatch for wholesale requirements." },
] as const;

export const SERVICES = [
  "Customized Sizes",
  "Customized Colours",
  "Customized Printing",
  "Bulk Orders",
  "Business / Retail Packaging",
] as const;
