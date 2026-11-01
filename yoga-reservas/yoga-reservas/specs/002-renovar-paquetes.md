# Spec 002: Por renovar (recordatorio de renovación de paquete)

## Usuaria
Andrea, dueña del estudio (ver `000-icp-persona.md`).

## Problema
Los ingresos de Andrea dependen de que las alumnas renueven su paquete de 10 clases. Hoy se entera de que una alumna se quedó sin clases cuando ya dejó de venir, y recordar a cada una por WhatsApp le toma minutos y se le olvida.

## Diseño de la solución
- En la pestaña Andrea aparece la sección "Por renovar": alumnas con 2 clases o menos, ordenadas de menos a más clases (primero las que tienen 0).
- Cada fila muestra el nombre, cuántas clases le quedan y el botón "Recordar por WhatsApp", que abre un chat con el mensaje ya escrito (nombre y saldo incluidos).
- Al tocar el botón la alumna queda marcada como "Recordada hoy" y el botón desaparece, para no insistir.
- Al registrar un paquete nuevo, la alumna sale de la lista sola. Si ya había sido recordada, cuenta como renovación.
- Debajo se ve el resultado: recordatorios enviados y alumnas que renovaron.
- Fuera de alcance: envío automático, pagos en línea, recordatorios programados.

## Criterios de aceptación
1. La lista "Por renovar" muestra solo alumnas con saldo de 2 o menos, ordenadas por saldo de menor a mayor.
2. Cada fila tiene un enlace de WhatsApp al teléfono de la alumna con un mensaje que incluye su nombre y cuántas clases le quedan.
3. Tras tocar "Recordar por WhatsApp", la fila muestra "Recordada hoy" y el contador de enviados sube exactamente 1 (una alumna cuenta una sola vez).
4. Al vender un paquete de 10 a una alumna de la lista, sale de "Por renovar"; si había sido recordada, "Renovaron" sube 1.
5. Si nadie tiene 2 clases o menos, se muestra "Todas tienen clases. Nada por renovar."

## Métricas de éxito
| Métrica | Hoy (supuesto) | Meta a 30 días | Cómo se mide |
|---|---|---|---|
| Renovación a 7 días de las alumnas recordadas | 25 % | 50 % o más | Renovaron ÷ Enviados (contadores de la pantalla) |
| Alumnas que se quedan sin clases y no vuelven | 1 de cada 3 | 1 de cada 5 | Alumnas con saldo 0 sin reserva en 14 días |
| Tiempo de Andrea para recordar a una alumna | 2 min | 10 s o menos | Toques desde abrir `#andrea`: máximo 2 |

## Verificación
`node tests/reglas.test.js` cubre los criterios 1 a 5. Las métricas se leen en la pantalla de Andrea y se revisan cada semana.
