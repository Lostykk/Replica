import { createFileRoute } from "@tanstack/react-router";
import { EmptyState } from "@/components/EmptyState";

export const Route = createFileRoute("/ranking")({
  head: () => ({
    meta: [
      { title: "Ranking — Réplica" },
      { name: "description", content: "Compará tu progreso con el resto." },
      { property: "og:title", content: "Ranking — Réplica" },
      { property: "og:description", content: "Compará tu progreso con el resto." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Ranking,
});

function Ranking() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-10 px-6 py-12 lg:min-h-screen">
      <h1 className="text-2xl font-semibold text-foreground">Ranking</h1>
      <EmptyState />
    </div>
  );
}
