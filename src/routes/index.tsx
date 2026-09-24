import { createFileRoute } from "@tanstack/react-router";
import { Flame, Phone, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="mx-auto flex w-full max-w-[480px] flex-col px-4 pb-12 pt-12 sm:px-6 lg:max-w-[680px] lg:pb-16">
      <section className="text-center" aria-labelledby="score-label">
        <p id="score-label" className="mono text-[11px] tracking-[0.1em] text-tertiary">TU NOTA PROMEDIO</p>
        <p data-mono className="mt-1 font-display text-[clamp(72px,15vw,96px)] font-bold leading-none text-foreground">—</p>
        <p className="mt-2 text-sm text-secondary-foreground">de 100 posibles</p>
      </section>

      <section className="mt-10 grid grid-cols-3 gap-3" aria-label="Estadísticas">
        <article className="stat-card flex min-w-0 flex-col items-center rounded-md border border-border bg-surface p-4 text-center">
          <Flame className="size-5 text-tension" strokeWidth={1.5} aria-hidden="true" />
          <strong data-mono className="mt-2 font-display text-[28px] font-semibold leading-none text-foreground">0</strong>
          <span className="mt-2 text-xs text-secondary-foreground">Racha</span>
        </article>
        <article className="stat-card flex min-w-0 flex-col items-center rounded-md border border-border bg-surface p-4 text-center">
          <Phone className="size-5 text-primary" strokeWidth={1.5} aria-hidden="true" />
          <strong data-mono className="mt-2 font-display text-[28px] font-semibold leading-none text-foreground">0</strong>
          <span className="mt-2 text-xs text-secondary-foreground">Llamadas</span>
        </article>
        <article className="stat-card flex min-w-0 flex-col items-center rounded-md border border-border bg-surface p-4 text-center">
          <Target className="size-5 text-ai" strokeWidth={1.5} aria-hidden="true" />
          <strong data-mono className="mt-2 font-display text-[28px] font-semibold leading-none text-foreground">0%</strong>
          <span className="mt-2 text-xs text-secondary-foreground">Cierre</span>
        </article>
      </section>

      <section className="mt-5 rounded-lg border border-border bg-surface-2 p-5">
        <span className="challenge-chip mono inline-flex rounded-full px-2.5 py-1 text-[10px] tracking-[0.1em] text-tension">DESAFÍO DEL DÍA</span>
        <h1 className="mt-3 text-base font-semibold text-foreground">Manejá la objeción del precio</h1>
        <p className="mt-2 text-sm leading-6 text-secondary-foreground">
          Practicá con el arquetipo &apos;No tengo presupuesto&apos;. Duración: 15 min.
        </p>
        <Button className="gradient-primary mt-5 h-10 rounded-full px-5 font-semibold text-primary-foreground shadow-none transition duration-200 hover:scale-[1.02] hover:opacity-90">
          Aceptar desafío <span aria-hidden="true">→</span>
        </Button>
      </section>

      <div className="mt-8 flex justify-center">
        <Button
          type="button"
          aria-label="Empezar llamada"
          className="call-cta flex size-[140px] flex-col gap-2 rounded-full p-0 text-primary-foreground shadow-none hover:bg-primary"
        >
          <Phone className="size-8" strokeWidth={1.5} aria-hidden="true" />
          <span className="font-display text-[11px] font-bold">Llamar</span>
        </Button>
      </div>
    </div>
  );
}
