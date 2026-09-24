import { Link } from "@tanstack/react-router";

export function ReplicaLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      aria-label="réplica — inicio"
      className="flex h-8 items-center overflow-hidden"
    >
      {compact ? (
        <svg viewBox="0 0 28 32" className="h-8 w-7" role="img" aria-hidden="true">
          <defs>
            <linearGradient id="replica-e-compact" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-primary-end)" />
            </linearGradient>
          </defs>
          <text
            x="5"
            y="25"
            fontFamily="Sora, sans-serif"
            fontWeight="700"
            fontSize="24"
            fill="url(#replica-e-compact)"
          >
            é
          </text>
        </svg>
      ) : (
        <svg viewBox="0 0 120 32" className="h-8 w-[120px]" role="img" aria-hidden="true">
          <defs>
            <linearGradient id="replica-e-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-primary-end)" />
            </linearGradient>
          </defs>
          <text x="1" y="25" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="24" fill="var(--color-text)">
            r
          </text>
          <text x="25" y="25" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="24" fill="var(--color-text)">
            plica
          </text>
          <text x="12" y="25" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="24" fill="url(#replica-e-gradient)">
            é
          </text>
        </svg>
      )}
    </Link>
  );
}