# Costo de una llamada de 90 minutos

Modelo reproducible: `node scripts/estimate-cost.mjs`. Resultado en `docs/evidence/fase-1/cost-scenarios.json`. **Estimaciones de planificación, no llamadas medidas ni cotizaciones completas.** Tarifas y fuentes en provider-matrix.md, consulta2026-09-24.

Supuestos:90min conectados, voz del agente50% del tiempo,750caracteres/min hablado,270turnos, contexto4000tokens/turno, salida200/turno, emoción1000/80 por turno,18resúmenes4000/400tokens y análisis20k/5k con Sol. Sin descuentos de caché. Son presupuestos de uso, no promedios medidos.

| Partida | Voz USD | Video USD |
|---|---:|---:|
| STT a tarifa regular0,0077/min | 0,693 | 0,693 |
| TTS equivalente de créditos Pro,33750caracteres | 1,688 | 1,688 |
| LLM diálogo + emoción + memoria + análisis | 0,274 | 0,274 |
| Worker activo2GB +1vCPU por5400s, salida prevista | 0,093 | 0,093 |
| Transporte2/3participantes + salida | 0,100 | 0,297 |
| Grabación compuesta | 0,450 | 1,800 |
| Almacenamiento30d + reserva de1reproducción | 0,010 | 0,150 |
| Reserva fija mensual80USD /100llamadas | 0,800 | 0,800 |
| Total con20% de contingencia, sin avatar | **4,93** | **6,95** |

Video:2Mbps agregados,1,35GB en90min. Voz:128kbps agregados. Una calidad/bitrate mayor, más suscriptores o reproducciones aumenta el costo. El worker siempre encendido consume también en reposo: medir y distribuir ese tiempo; no asumir que desaparece al colgar.

La reserva fija80USD representa LiveKit Ship50 + Supabase Pro25 + Cartesia Pro5. Se suma conservadoramente a consumo normalizado sin descontar cuotas incluidas; puede duplicar parcialmente TTS/transporte. No es una predicción de factura. La factura mensual correcta es, para cada proveedor, cuota + consumo sobre créditos/minutos incluidos, después distribuir entre llamadas; Railway suma el mayor entre mínimo y uso. Con10llamadas/mes, solo esa reserva pasa de0,80 a8USD/llamada, antes de contingencia. No se compró ninguno de estos planes.

## Sensibilidad del avatar estándar

| Tarifa Simli supuesta, NO confirmada | Total90min con reserva20% |
|---|---:|
| 0,01/min | 8,03USD |
| 0,05/min | 12,35USD |
| 0,10/min | 17,75USD |

Para cumplir15USD en este escenario, la tarifa del render debe ser **≤0,0745USD/min**, sin cuotas adicionales no amortizadas. El costo estándar definitivo queda pendiente del precio de la cuenta Simli, consumo real y prueba90min.

Tavus: sensibilidad0,31–0,37/min con pipeline propio produce **40,43–46,91USD/90min** incluyendo20% de contingencia. La cuota Growth397USD NO está completamente distribuida aquí: el mínimo mensual y minutos incluidos cambian la factura; con pocas llamadas puede costar bastante más. Builder59USD tiene límite15min según tabla nueva y no permite una llamada continua90min. Premium no cumple el objetivo estándar15USD y permanece apagado.

## Otros canales y comparación

- Teléfono: añadir90×tarifa de destino/trunk + LiveKit SIP + alquiler de número y OTP prorrateados. MX móvil SIP0,0433/min suma3,897USD más0,36 de SIP LiveKit, antes de contingencia. AR móvil Programmable Voice0,3528/min sería31,752USD solo ese tramo; NO usarlo como cotización de Elastic SIP.
- Reuniones: Recall base90×0,50/60=0,75USD, más cómputo especial de output media si corresponde, transporte adicional y almacenamiento. Confirmar cuenta/variante antes de presupuesto total.
- Alternativa TTS ElevenLabs0,05/1000car equivale al supuesto Pro de Cartesia usado; diferencias de naturalidad, caracteres por minuto y créditos determinan factura.

## Presupuesto concreto para el primer ensayo

Cuatro ejecuciones: Simli es-AR/es-MX y Tavus es-AR/es-MX,10min cada una, secuenciales. Proponer **10USD de consumo variable máximo para autorizar**, sujeto a tarifa Simli confirmada y límites configurados en las cuentas. Suscripciones y compras no están incluidas ni autorizadas. Tavus gratuito/Starter no alcanza10min continuos; hace falta plan/trial apto. Si requiere contratar Builder59USD, el owner debe resolverlo separadamente.

El parámetro de presupuesto del script deja constancia de autorización; **no reemplaza un hard cap del proveedor**. Hay timeout de sesión y supervisor, pero la tarifa es externa. Reconciliar minutos/unidades con dashboard/factura, registrar monto real y referencias privadas antes de declarar costo medido. No enviar facturas con datos personales a este repo público.
