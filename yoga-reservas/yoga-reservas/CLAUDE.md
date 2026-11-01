# Prana Estudio: reservas y paquetes (estudio de yoga de Andrea)

App web para controlar paquetes de 10 clases, cupos (12) y lista de espera, y avisar cambios por WhatsApp.

## Usuarias (detalle en `specs/000-icp-persona.md`)
- Andrea (administradora, no técnica, usa el celular), 2 instructoras, alumnas (sin instalar nada ni contraseñas).

## Stack y estructura
- Un solo archivo `index.html` (HTML + CSS + JS vanilla, sin build, sin dependencias). Datos en memoria con datos de ejemplo.
- La lógica de negocio vive entre los comentarios `// <logic>` y `// </logic>` y no toca el DOM. Se prueba con `node tests/reglas.test.js`.
- Specs en `specs/`. Marca en `.claude/skills/marca-yoga/`.

## Reglas de negocio (no cambiar sin actualizar la spec)
- Se descuenta 1 clase al quedar inscrita (reserva con lugar o promoción desde espera). La lista de espera no descuenta.
- Cancelación con 12 h o más de anticipación devuelve la clase; con menos, no.
- Sin saldo no se puede reservar ni entrar a lista de espera. Los paquetes no vencen en el MVP.
- Si se cancela una clase, se devuelve 1 clase a cada inscrita y se prepara aviso para inscritas y en espera.
- Nunca puede haber más inscritas que el cupo (12 por defecto).

- "Por renovar" incluye a las alumnas con 2 clases o menos (spec 002).

## Convenciones
- Textos en español simple, oración normal, verbos claros: "Reservar", "Cancelar", "Entrar a lista de espera", "Preparar avisos".
- Mobile-first, una columna de máximo 640 px, botones de mínimo 44 px.
- Todo cambio de saldo pasa por la función `mov()` para quedar en el historial.

## Principios de producto
- Time to value: la primera acción útil en 2 toques, sin registro ni tutorial.
- Diseño intuitivo: una acción principal por tarjeta, mensajes que dicen qué hacer.

## No hacer
- No agregar videos, rutinas, tienda, pagos en línea ni funciones que Andrea no pidió.
- No agregar librerías ni paso de build.
- No hardcodear colores: usar las variables CSS de la skill `marca-yoga`.
