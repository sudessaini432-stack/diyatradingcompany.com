import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { DEFAULT_WA_MESSAGE, telHref, waHref } from "@/lib/business";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98]";

export function QuoteButton({ className, label = "Get a Quote" }: { className?: string; label?: string }) {
  return (
    <Link
      to="/quote"
      className={cn(
        base,
        "gold-surface text-gold-foreground shadow-gold hover:-translate-y-0.5 hover:brightness-105",
        className,
      )}
    >
      <FileText className="size-4" aria-hidden="true" />
      {label}
    </Link>
  );
}

export function WhatsAppButton({
  className,
  label = "WhatsApp Order",
  message = DEFAULT_WA_MESSAGE,
}: {
  className?: string;
  label?: string;
  message?: string;
}) {
  return (
    <a
      href={waHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        base,
        "bg-whatsapp text-whatsapp-foreground shadow-card hover:-translate-y-0.5 hover:brightness-105",
        className,
      )}
    >
      <MessageCircle className="size-4" aria-hidden="true" />
      {label}
    </a>
  );
}

export function CallButton({ className, label = "Call Now" }: { className?: string; label?: string }) {
  return (
    <a
      href={telHref}
      className={cn(
        base,
        "border border-border bg-card text-primary shadow-card hover:-translate-y-0.5 hover:bg-secondary",
        className,
      )}
    >
      <Phone className="size-4" aria-hidden="true" />
      {label}
    </a>
  );
}
