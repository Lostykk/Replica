export function BackgroundLayers() {
  return (
    <div className="background-layers" aria-hidden="true">
      <svg className="background-noise" width="100%" height="100%">
        <filter id="replica-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
        </filter>
        <rect width="100%" height="100%" filter="url(#replica-noise)" />
      </svg>
      <div className="background-grid" />
      <div className="ambient-light ambient-light-primary" />
      <div className="ambient-light ambient-light-ai" />
    </div>
  );
}