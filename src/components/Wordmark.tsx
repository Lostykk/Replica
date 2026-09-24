import { Link } from "@tanstack/react-router";

/**
 * The réplica wordmark: Sora 700, with the "é" in electric green.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`font-display font-bold tracking-tight select-none ${className}`}
      aria-label="réplica — inicio"
    >
      <span className="text-foreground">r</span>
      <span className="text-primary">é</span>
      <span className="text-foreground">plica</span>
    </Link>
  );
}
