import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { LogIn, UserPlus, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BUSINESS } from "@/lib/business";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign In or Create Account | Diya Trading Company" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content: "Sign in to your Diya Trading Company account to place and track your non-woven bag orders online.",
      },
    ],
  }),
  component: AuthPage,
});

function safeRedirect(path: string | undefined): string {
  if (!path || !path.startsWith("/") || path.startsWith("//")) return "/";
  return path;
}

const FIELD =
  "mt-1.5 w-full rounded-xl border border-input bg-card px-4 py-3 text-base text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary";

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) void navigate({ to: safeRedirect(redirect), replace: true });
    });
  }, [navigate, redirect]);

  async function afterAuth() {
    router.invalidate();
    void navigate({ to: safeRedirect(redirect), replace: true });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setNotice("");
    setBusy(true);
    try {
      if (mode === "signin") {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setError(error.message === "Invalid login credentials" ? "Wrong email or password." : error.message);
          return;
        }
        if (data.session) await afterAuth();
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
          setError(error.message);
          return;
        }
        if (data.session) {
          await afterAuth();
        } else {
          setNotice("Account created. Please check your email inbox for a confirmation link, then sign in here.");
          setMode("signin");
        }
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="section-pad bg-secondary/50">
      <div className="shell max-w-md">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
          <h1 className="text-2xl font-extrabold text-primary">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Sign in to place and track your non-woven bag orders online."
              : "Create a free account to order and track your bags online."}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-1 rounded-xl bg-secondary p-1" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "signin"}
              onClick={() => {
                setMode("signin");
                setError("");
                setNotice("");
              }}
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
                mode === "signin" ? "bg-card text-primary shadow-card" : "text-muted-foreground"
              }`}
            >
              <LogIn className="size-4" aria-hidden="true" />
              Sign In
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "signup"}
              onClick={() => {
                setMode("signup");
                setError("");
                setNotice("");
              }}
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
                mode === "signup" ? "bg-card text-primary shadow-card" : "text-muted-foreground"
              }`}
            >
              <UserPlus className="size-4" aria-hidden="true" />
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block text-sm font-semibold">
              Email
              <input
                required
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={FIELD}
                placeholder="you@example.com"
              />
            </label>
            <label className="block text-sm font-semibold">
              Password
              <input
                required
                type="password"
                minLength={8}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={FIELD}
                placeholder={mode === "signup" ? "At least 8 characters" : "Your password"}
              />
            </label>

            <button
              type="submit"
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 disabled:opacity-60"
            >
              {busy ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
            </button>

            <p aria-live="polite" className="min-h-5 text-sm font-semibold text-red-600">
              {error}
            </p>
            <p aria-live="polite" className="min-h-5 text-sm font-semibold text-eco">
              {notice}
            </p>
          </form>

          <div className="mt-5 border-t border-border pt-4 text-center text-sm text-muted-foreground">
            Just want a quick rate?{" "}
            <Link to="/quote" className="font-bold text-primary hover:underline">
              Send a WhatsApp enquiry
            </Link>{" "}
            — no account needed.
          </div>
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-eco" aria-hidden="true" />
          Passwords are stored securely encrypted. {BUSINESS.name} · GSTIN {BUSINESS.gstin}
        </p>
      </div>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const __routeRegenTouch = true;
