import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";

export const Route = createFileRoute("/configuracion")({
  head: () => ({
    meta: [
      { title: "Configuración — Réplica" },
      { name: "description", content: "Ajustes de tu cuenta y tu réplica." },
      { property: "og:title", content: "Configuración — Réplica" },
      {
        property: "og:description",
        content: "Ajustes de tu cuenta y tu réplica.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Configuracion,
});

function Configuracion() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6">
      <Settings className="size-8 text-muted-foreground/50" />
      <h1 className="font-display text-xl font-semibold">Configuración</h1>
      <p className="text-sm text-muted-foreground">Los ajustes llegan muy pronto.</p>
    </div>
  );
}
