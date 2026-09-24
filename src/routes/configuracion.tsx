import { createFileRoute } from "@tanstack/react-router";
import { EmptyState } from "@/components/EmptyState";

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
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-10 px-6 py-12 lg:min-h-screen">
      <h1 className="text-2xl font-semibold text-foreground">Configuración</h1>
      <EmptyState />
    </div>
  );
}
