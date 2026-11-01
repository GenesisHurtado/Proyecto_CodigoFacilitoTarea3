# Reservas del estudio de yoga

Abre `index.html` en el navegador (o súbelo a GitHub Pages). Usa las pestañas Alumna, Andrea e Instructora. Los datos de ejemplo se reinician al recargar.

Flujo para probar: en Alumna elige "Camila" → reserva una clase → en "Vinyasa tarde" (llena) entra a lista de espera → cancela con otra alumna → en Andrea abre el aviso de WhatsApp de quien fue promovida.

Pruebas: `node tests/reglas.test.js`

## Decisiones
Se descuenta al quedar inscrita; cancelar con 12 h o más devuelve; sin saldo no se reserva ni se entra a espera; paquetes sin vencimiento; clase cancelada devuelve a todas.

## Mejoras futuras
Guardar datos de forma permanente, recordatorios automáticos, pagos, vencimiento de paquetes, aviso por WhatsApp API.

## Enlaces directos por persona
`index.html#alumna`, `index.html#andrea`, `index.html#instr` abren directo en cada vista (Andrea puede guardar el suyo en el celular).

## Desplegar en GitHub Pages
Sube estos archivos a la **raíz** del repositorio → Settings → Pages → Branch `main` / `(root)` → guardar. La URL aparece arriba en 1 a 2 minutos.

## Publicar en producción (Netlify)
1. Entra a https://app.netlify.com/drop e inicia sesión (cuenta gratis).
2. Arrastra la carpeta del proyecto (con `index.html` en la raíz).
3. Copia la URL `https://....netlify.app`; prueba también `#andrea`.
