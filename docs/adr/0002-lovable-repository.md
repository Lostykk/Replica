# ADR-0002: repositorio único conectado con Lovable
El owner confirmó que Lostykk/Replica es simultáneamente el repositorio de Lovable y del monorepo.
Se conserva el frontend en src/public y la configuración Vite en la raíz; servicios en apps y contratos en packages. Esta es la alternativa limpia permitida por la sección 3.2.
Se integran ambas historias mediante merge sin rebase ni force push; no se crea un submódulo del mismo repositorio.
apps/web contiene una referencia documental a esa ubicación, sin duplicar código ni generar una segunda aplicación.
Los comandos dev/build originales de Lovable siguen en la raíz; pnpm controla el workspace y bun.lock se actualiza para el instalador de Lovable.
Decisión aprobada por el owner: mantener React 19; su indicación posterior reemplaza el requisito React 18 del prompt maestro, que se conserva íntegro como fuente histórica.
Se conserva TanStack Start/Router con Vite, tal como lo genera Lovable, para mantener el editor, SSR y navegación funcionando; no se migra a React Router.
