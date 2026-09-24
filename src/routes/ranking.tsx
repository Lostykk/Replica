import { createFileRoute } from "@tanstack/react-router";
import { Trophy } from "lucide-react";

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
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6">
      <Trophy className="size-8 text-muted-foreground/50" />
      <h1 className="font-display text-xl font-semibold">Ranking</h1>
      <p className="text-sm text-muted-foreground">El ranking se publica pronto.</p>
    </div>
  );
}
