import dcut from "@/assets/bag-dcut.jpg";
import wcut from "@/assets/bag-wcut.jpg";
import box from "@/assets/bag-box.jpg";
import loop from "@/assets/bag-loop.jpg";

export type Product = {
  slug: string;
  name: string;
  image: string;
  alt: string;
  description: string;
  custom: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "d-cut",
    name: "D-Cut Non-Woven Bags",
    image: dcut,
    alt: "Blue D-cut non-woven bag with die-cut handle by Diya Trading Company, Jind Haryana",
    description:
      "The most popular everyday carry bag. Die-cut handles, neat gusset and a smooth printable surface — ideal for shops, garments and grocery counters.",
    custom: ["Any size", "Any colour", "1 to 4 colour printing", "Bulk packing"],
  },
  {
    slug: "w-cut",
    name: "W-Cut Non-Woven Bags",
    image: wcut,
    alt: "Green W-cut non-woven bag with U-cut handles for retail packaging",
    description:
      "Lightweight U-cut / W-cut bags that carry good weight at an economical rate. A strong choice for daily retail billing and fast-moving counters.",
    custom: ["Any size", "Any colour", "Logo printing", "Bulk orders"],
  },
  {
    slug: "box-bag",
    name: "Box Bags",
    image: box,
    alt: "Cream box-style non-woven bag with flat bottom for boutique and brand packaging",
    description:
      "Flat-bottom box bags with wide gusset that stand upright and hold shape — perfect for boutiques, sweets, gifting and premium brand packaging.",
    custom: ["Custom width & gusset", "Any colour", "Multi-colour printing", "Bulk orders"],
  },
  {
    slug: "loop-bag",
    name: "Loop Bags",
    image: loop,
    alt: "Navy blue loop handle non-woven bag for premium brand and shopping packaging",
    description:
      "Stitched loop-handle bags with a premium hand-feel and comfortable grip. Best suited to showrooms, apparel brands and heavier loads.",
    custom: ["Any size", "Any colour", "Brand printing", "Bulk supply"],
  },
];
