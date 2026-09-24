import { createFileRoute } from "@tanstack/react-router";
import { EmptyState } from "@/components/EmptyState";

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
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-10 px-6 py-12 lg:min-h-screen">
      <h1 className="text-2xl font-semibold text-foreground">Llamadas</h1>
      <EmptyState />
    </div>
  );
}
