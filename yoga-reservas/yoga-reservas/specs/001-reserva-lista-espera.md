# Spec 001: Reservar con cupo, lista de espera y promoción automática

## Usuaria
Andrea (administradora), Camila (alumna) y Marina (instructora). Ver `000-icp-persona.md`.

## Problema
Andrea controla cupos y paquetes con tarjetas de papel. Las clases de la tarde se llenan (12), quien llega sin lugar se va molesta y no hay lista de espera. Las alumnas discuten cuántas clases les quedan y no se puede comprobar.

## Diseño de la solución
- Reservar: si hay cupo y saldo ≥ 1, la alumna queda inscrita y se descuenta 1 clase (se registra −1 en el historial).
- Clase llena: el botón pasa a "Entrar a lista de espera". En espera no se descuenta nada; se exige saldo ≥ 1 para entrar.
- Cancelar: con 12 h o más de anticipación se devuelve la clase (+1); con menos, no. Salir de la lista de espera no cuesta nada.
- Promoción: al liberarse un lugar, la primera en espera con saldo pasa a inscrita, se descuenta 1 y se crea un aviso de WhatsApp listo para ella. Si no tiene saldo, se salta a la siguiente.
- Clase cancelada: se devuelve 1 clase a cada inscrita y se crea un aviso por inscrita y por cada alumna en espera.
- Fuera de alcance: pagos, vencimiento de paquetes, recordatorios automáticos.

## Time to value
- La primera acción útil ocurre en 2 toques: alumna elige su nombre y toca "Reservar"; Andrea abre su enlace `#andrea` y vende un paquete con 1 toque.
- Sin registro, contraseña ni tutorial: la app abre directo en la lista de próximas clases.
- Cada pestaña se puede guardar como enlace (`#alumna`, `#andrea`, `#instr`) para abrir directo en la vista de cada persona.

## Diseño intuitivo
- Una pantalla, una acción principal por clase. El botón cambia según el estado: "Reservar", "Entrar a lista de espera", "Cancelar".
- Siempre se ve el saldo y, si tiene reserva, "Tu próxima clase" arriba de la lista.
- Estados con texto, nunca solo color. Los errores dicen qué pasó y qué hacer ("No tienes clases disponibles. Pide tu paquete a Andrea.").
- Cancelar pide confirmación y explica la regla de 12 horas antes de actuar.
- Botones de 44 px o más, una columna, uso con una mano.

## Criterios de aceptación
1. Con una clase de 12 inscritas, 20 intentos de reserva más dejan inscritas = 12 y las demás en espera en orden, sin cambiar su saldo.
2. Reservar con lugar descuenta exactamente 1 y agrega un movimiento −1; con saldo 0 no reserva y muestra "No tienes clases disponibles".
3. Cancelar con 12 h o más devuelve 1 clase (+1 en historial); con menos de 12 h no devuelve nada.
4. Al cancelar una inscrita de una clase llena, la primera en espera con saldo queda inscrita, se le descuenta 1 y se crea 1 aviso suyo con enlace de WhatsApp; inscritas nunca supera 12.
5. Cancelar una clase devuelve 1 clase a cada inscrita y crea un aviso por cada inscrita y en espera.
6. (Time to value) Una alumna reserva su primera clase en 2 toques como máximo desde que abre el enlace, sin registro; Andrea vende un paquete en 1 toque abriendo `#andrea`.
7. (Diseño intuitivo) Con saldo 0 se muestra bajo el saldo el mensaje "Pide tu paquete a Andrea"; si la alumna tiene reserva, "Tu próxima clase" aparece arriba de la lista.

## Verificación
`node tests/reglas.test.js` cubre los criterios 1 a 5. Los criterios 6 y 7 se verifican a mano abriendo `index.html` en el celular.
