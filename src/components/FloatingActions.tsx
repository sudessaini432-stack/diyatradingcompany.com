import { Phone, MessageCircle } from "lucide-react";
import { DEFAULT_WA_MESSAGE, telHref, waHref } from "@/lib/business";

export function FloatingActions() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      <a
        href={waHref(DEFAULT_WA_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Diya Trading Company on WhatsApp"
        className="flex size-13 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <MessageCircle className="size-6" aria-hidden="true" />
      </a>
      <a
        href={telHref}
        aria-label="Call Diya Trading Company"
        className="flex size-13 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lift transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <Phone className="size-6" aria-hidden="true" />
      </a>
    </div>
  );
}
