export function EmptyState() {
  return (
    <div className="flex max-w-sm flex-col items-center text-center">
      <svg viewBox="0 0 80 42" className="mb-6 h-[42px] w-20 text-tertiary/40" aria-hidden="true">
        <rect x="0" y="0" width="80" height="4" rx="2" fill="currentColor" />
        <rect x="12.5" y="19" width="55" height="4" rx="2" fill="currentColor" />
        <rect x="22.5" y="38" width="35" height="4" rx="2" fill="currentColor" />
      </svg>
      <p className="text-sm text-secondary-foreground">Todavía no hay datos aquí</p>
      <p className="mt-2 text-[13px] leading-5 text-tertiary">
        Hacé tu primera llamada para ver tus estadísticas.
      </p>
    </div>
  );
}