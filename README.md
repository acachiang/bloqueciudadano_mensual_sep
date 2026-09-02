# Landing — Reforma Electoral de Baja California (Bloque Ciudadano Mexicalense)

Landing de una sola vista para solicitar acceso al evento. HTML5 + CSS3 + JS vanilla, sin build step ni dependencias npm. Funciona abriendo `index.html` directamente (`file://`) y desplegada en Vercel/Cloudflare Pages sin configuración adicional.

## Estructura

```
/
├── index.html
├── styles.css
├── script.js
├── /assets
│   ├── Bloque_septiembre.jpeg   ← flyer oficial
│   ├── ponente.jpg              ← PLACEHOLDER generado, reemplazar
│   ├── logo-bloque.svg          ← PLACEHOLDER (wordmark simple), reemplazar
│   └── og-image.jpg             ← PLACEHOLDER generado, reemplazar (1200×630)
└── README.md
```

## Desplegar en Vercel

1. Sube esta carpeta a un repositorio de Git (GitHub/GitLab/Bitbucket) o usa `vercel` CLI directo desde la carpeta.
2. En Vercel: **New Project → Import** el repo. No se necesita configurar build command ni output directory (es un sitio estático): déjalos en blanco o selecciona framework "Other".
3. Deploy. Vercel serviría `index.html` en la raíz automáticamente.
4. Alternativa sin Git: `npx vercel` dentro de esta carpeta y sigue las instrucciones de la CLI.

## Placeholders y TODOs pendientes (de tu parte)

### Imágenes
- `assets/ponente.jpg` — ✅ ya es la foto real de Octavio Sandoval L. (recortada en el círculo con `object-position: 65% 42%` en `styles.css`; ajusta ese valor si el encuadre no te convence con la foto final).
- `assets/logo-bloque.svg` — logo oficial del Bloque en vector (actualmente es un wordmark simple de reemplazo).
- `assets/og-image.jpg` — imagen para compartir en redes (1200×630 px) con diseño final (actualmente placeholder azul con texto).

### Contenido
- **Sección "Sobre el Bloque Ciudadano Mexicalense"** (`index.html`): se usó el eslogan y descripción breve que sí se pudo extraer del sitio oficial ("Ciudadanos organizados por un Mexicali más próspero, transparente y democrático"). Hay un comentario `<!-- TODO: verificar en bloqueciudadanomxli.org -->` donde puedes ampliar con misión/historia si el sitio la publica más adelante.
- **Datos de contacto del sitio oficial**: al consultar `bloqueciudadanomxli.org` se identificaron un contacto general, una directora y un coordinador con correo, además de un WhatsApp general `+52 686 309 9151`. Las direcciones de correo exactas no se incluyeron en este documento por venir enmascaradas en la herramienta de consulta automática usada; cópialas manualmente del sitio si quieres publicarlas en el footer o en el aviso de privacidad.
- **Aviso de privacidad** (footer y formulario): enlace placeholder (`href="#"`) con comentario TODO. El sitio oficial menciona un documento de "Términos y Condiciones" con política de tratamiento de datos — enlázalo ahí cuando tengas la URL directa.
- **Redes sociales**:
  - Facebook: se usó el link que diste, pero es un video, no la página — comentario TODO en el `<footer>` para reemplazarlo por la URL de la página oficial.
  - Instagram: quedó como `href="#"` con TODO — no se encontraron enlaces a redes sociales en el sitio oficial (solo un grupo de WhatsApp con código QR).

### Formulario de registro — Google Sheets vía Apps Script
El backend de registro ya **no usa Zoho CRM ni Google Forms**. Ahora es un `<form id="formRegistro">` propio (`index.html`, sección `#registro`), reestilizado con las clases del sitio (`.campo`, `.form-grid--2col`) y con `<label>` reales asociadas a cada campo. El envío lo maneja `inicializarFormularioRegistro()` en `script.js`: al hacer submit, arma un JSON con los valores y hace `fetch()` en modo `no-cors` a un Web App de Google Apps Script (que a su vez escribe la fila en una Google Sheet):

```
SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbza0eQNgjqjaYiq9H2-psnrhUHCMQ99LvDikPAlbTPzW4c-Oakvdq5zLB7h2QnjUp4x/exec"
```

Campos y `name` que se envían (deben coincidir con lo que tu script de Apps Script espera leer en `e.postData.contents`): `nombre`, `apellidoPaterno`, `apellidoMaterno`, `correo`, `telefono` (obligatorios) y `empresa` (opcional, "Empresa o Agrupación").

**Importante sobre `mode: "no-cors"`:** el navegador bloquea la lectura de la respuesta real del Apps Script en este modo (es una limitación intencional de `no-cors`, no un bug). Por eso, tal como en el código que diste, el mensaje "¡Registro exitoso!" se muestra **de forma optimista** en cuanto el `fetch` no lanza una excepción de red — no hay forma de confirmar, desde el navegador, que el Apps Script realmente escribió la fila en la hoja (por ejemplo, si el script tiene un error interno o el deployment no es público, el usuario igual vería el mensaje de éxito). Para depurarlo, revisa las respuestas del lado del Apps Script en **Ejecuciones** (Extensions → Apps Script → Executions) o añade tu propio endpoint de verificación si necesitas confirmarlo desde el cliente.

**Requisito del deployment de Apps Script:** para que `fetch` funcione desde cualquier visitante (sin sesión de Google), el Web App debe estar implementado con acceso **"Cualquier usuario"** (Deploy → Manage deployments → Execute as: *Me*, Who has access: *Anyone*). Si está restringido a tu organización o a usuarios específicos, los envíos fallarán silenciosamente (con `no-cors` tampoco verías el error en consola).

**Nota de seguridad:** este patrón no tiene protección anti-spam (sin honeypot ni CAPTCHA) — cualquiera que descubra la URL del Web App puede enviarle datos directamente, sin pasar por el formulario. Si te preocupa el spam en la hoja, considera agregar validación del lado del Apps Script o un CAPTCHA (p. ej. reCAPTCHA v3) más adelante; no se implementó aquí por no estar en el alcance pedido.

## Accesibilidad y SEO implementados
- HTML semántico (`header`, `main`, `section`, `footer`), skip-link, foco visible.
- `<title>`, meta description, Open Graph, Twitter Card, `lang="es-MX"`, `canonical` (con TODO para ajustar dominio real de despliegue) y JSON-LD `schema.org/Event`.
- El formulario embebido de Google (dentro del `<iframe>`) tiene su propia accesibilidad, fuera del control de este HTML.

## Notas de fidelidad al flyer
El flyer (`assets/Bloque_septiembre.jpeg`) se usó como referencia visual primaria. La paleta declarada en `styles.css` corresponde a lo observado en la imagen. Las formas del hero (triángulo verde + franja diagonal azul arriba, olas azules abajo) se reconstruyeron con SVG inline, no como imagen de fondo, para mantener el hero responsivo, seleccionable e indexable — el flyer solo aparece como descarga discreta debajo del hero.
