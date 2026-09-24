# Reemplazo visual definitivo de Réplica

## Alcance
- Reemplazar por completo el estilo actual de las cuatro pantallas, sin conservar decisiones visuales anteriores.
- Mantener React 19 y la navegación existente; no agregar datos reales ni lógica de llamadas.

## Implementación
1. **Sistema visual global**
   - Definir en `src/styles.css` todos los tokens oscuros y claros solicitados, más sus equivalentes semánticos para Tailwind.
   - Aplicar Sora a títulos, Manrope a interfaz y texto, y JetBrains Mono a métricas.
   - Incluir transiciones, pulso del CTA, movimiento ambiental y alternativa para `prefers-reduced-motion`.

2. **Fondo y marca**
   - Crear `BackgroundLayers` con ruido SVG inline, grilla técnica solo en desktop y dos luces ambientales animadas.
   - Crear `ReplicaLogo` como SVG inline con la “é” en gradiente verde–azul y coordenadas ajustadas.
   - Renderizar el fondo una sola vez desde el layout raíz.

3. **Navegación adaptable**
   - Reconstruir el shell con sidebar fija de 220/64 px en desktop y contenido sincronizado.
   - Reconstruir la barra inferior mobile de 64 px con safe area, iconos Lucide de trazo 1.5 e indicador activo animado.
   - Usar los controles del sistema de diseño y conservar las cuatro rutas actuales.

4. **Home “Tu marcador”**
   - Implementar marcador vacío, tres estadísticas, desafío del día y CTA circular con pulso.
   - Mantener todo el contenido basado únicamente en tokens CSS y con dimensiones estables en mobile y desktop.

5. **Estados vacíos**
   - Crear un estado vacío reutilizable con ilustración SVG propia.
   - Aplicarlo bajo el título de Llamadas, Ranking y Configuración.

6. **Metadatos y documentación**
   - Conservar metadatos únicos por ruta y actualizar la documentación de progreso y acciones del owner sin marcar una fase completa.

## Verificación
- Validar tipos, lint, pruebas existentes y escaneo de secretos.
- Auditar que no haya colores hardcodeados en los componentes modificados.
- Verificar visualmente las cuatro rutas en 390 px y 1440 px, oscuro y claro, incluyendo navegación y colapso de sidebar.
- Guardar capturas reales en `docs/screenshots/fase-2/` y registrar resultados y limitaciones reales en `docs/PROGRESS.md`.
