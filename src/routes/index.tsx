import { createFileRoute } from "@tanstack/react-router";
import { PhoneCall } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Réplica — Home" },
      {
        name: "description",
        content: "Empezá una llamada y practicá con tu réplica de voz.",
      },
      { property: "og:title", content: "Réplica — Home" },
      {
        property: "og:description",
        content: "Empezá una llamada y practicá con tu réplica de voz.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6">
      {/* Ambient glow behind the button */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="relative">
        {/* Pulse rings */}
        <span
          aria-hidden="true"
          className="ring-pulse pointer-events-none absolute inset-0 rounded-full border border-primary/40"
        />
        <span
          aria-hidden="true"
          className="ring-pulse-delayed pointer-events-none absolute inset-0 rounded-full border border-primary/40"
        />

        <button
          type="button"
          className="group relative flex size-48 flex-col items-center justify-center gap-3 rounded-full border border-primary/30 bg-card text-foreground shadow-[0_0_80px_-20px_var(--primary)] transition-transform duration-300 hover:scale-[1.03] active:scale-95 sm:size-56"
        >
          <span className="flex size-14 items-center justify-center rounded-full bg-primary/15 transition-colors group-hover:bg-primary/25">
            <PhoneCall className="size-7 text-primary" />
          </span>
          <span className="font-display text-base font-semibold tracking-tight sm:text-lg">
            Empezar llamada
          </span>
        </button>
      </div>

      <p className="mt-10 text-sm text-muted-foreground">Tu réplica está lista para hablar.</p>
    </div>
  );
}
