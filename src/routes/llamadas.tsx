import { createFileRoute } from "@tanstack/react-router";
import { PhoneCall } from "lucide-react";

export const Route = createFileRoute("/llamadas")({
  head: () => ({
    meta: [
      { title: "Llamadas — Réplica" },
      { name: "description", content: "Historial y detalle de tus llamadas." },
      { property: "og:title", content: "Llamadas — Réplica" },
      { property: "og:description", content: "Historial y detalle de tus llamadas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Llamadas,
});

function Llamadas() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6">
      <PhoneCall className="size-8 text-muted-foreground/50" />
      <h1 className="font-display text-xl font-semibold">Llamadas</h1>
      <p className="text-sm text-muted-foreground">
        Todavía no hay llamadas. Empezá tu primera desde el Home.
      </p>
    </div>
  );
}
