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

### Formulario Zoho — campo fuera del prompt original
El HTML original de Zoho que proporcionaste incluye un campo `LEADCF7` ("¿Perteneces a alguna institución o empresa?") marcado como **obligatorio** en el script `checkMandatory` de Zoho, que no estaba listado en la especificación inicial (que solo mencionaba `LEADCF49`). Se conservó y se agregó como campo obligatorio en el formulario reestilizado para no romper el envío al CRM. Revisa que el texto de la etiqueta sea el que quieres mostrar públicamente.

También nota: el `id`/`name` del formulario en el HTML que compartiste es `webform4654888000147097500` / `WebToLeads4654888000147097500` (no el `...493` mencionado en el prompt original) — se usó el valor real que proporcionaste.

### Campos de encuesta pendientes de vincular a Zoho (Ruta A)

La encuesta se envía en el mismo submit que el registro, usando 5 campos ocultos que hoy son placeholders:

| Campo oculto en `index.html` | Pregunta de la encuesta | Acción pendiente |
|---|---|---|
| `LEADCF_TODO_1` | ¿Qué tan informado te consideras sobre la reforma electoral? | Crear campo personalizado en Zoho, regenerar el Web-to-Lead y reemplazar `LEADCF_TODO_1` por el `LEADCF##` real |
| `LEADCF_TODO_2` | ¿Consideras que la propaganda electoral genera contaminación visual? | ídem |
| `LEADCF_TODO_3` | ¿Qué tema te interesa más del evento? | ídem |
| `LEADCF_TODO_4` | ¿Cómo te enteraste del evento? | ídem |
| `LEADCF_TODO_5` | ¿Algo que te gustaría que se abordara? (texto libre) | ídem |

**Cómo obtener los IDs reales:**
1. Zoho CRM → **Setup → Modules and Fields → Leads** → crea un campo personalizado por cada pregunta (tipo texto/picklist según corresponda).
2. Ve a **Setup → Developer Space → Web-to-Lead Forms**, abre el formulario del evento y regenera/edita el código para incluir los nuevos campos.
3. Copia el atributo `name="LEADCF##"` que Zoho genere para cada campo nuevo.
4. Reemplaza cada `LEADCF_TODO_N` en `index.html` (el `name`, el `id` y las referencias en `script.js` dentro de `poblarRespuestasEncuesta()`) por el `LEADCF##` real correspondiente.

**Ruta B (alternativa, no implementada):** si prefieres usar **Zoho Forms** (producto distinto al CRM) para la encuesta en vez de campos personalizados del lead, la encuesta iría en un `<iframe>` aparte apuntando a la URL pública de tu formulario de Zoho Forms, separado del formulario de registro. Esto implica **dos envíos independientes** (uno al Web-to-Lead de registro, otro al formulario de Zoho Forms), por lo que no hay garantía nativa de que ambos se completen juntos ni de vincular automáticamente ambas respuestas a un mismo lead — tendrías que cruzarlos manualmente por correo/nombre. Si decides este camino, quita el `<fieldset>` de encuesta y los `LEADCF_TODO_*` de `index.html`, y en su lugar agrega un `<section>` con el `<iframe>` del formulario de Zoho Forms.

### Redirección tras el envío (`returnURL`)
Actualmente el formulario usa `target="zoho_target"` apuntando a un `<iframe>` oculto, y el JS (`script.js`) oculta el formulario y muestra el bloque de confirmación en el sitio sin salir de la página — **no depende de `returnURL`**.

Alternativa nativa de Zoho: en **Setup → Developer Space → Web-to-Lead Forms**, edita el formulario y define el "Return URL" apuntando a una página propia (por ejemplo `/gracias.html`). Si haces esto, Zoho regenerará el HTML con un nuevo valor en el input oculto `returnURL`; tendrías que volver a copiar ese valor aquí. Con el enfoque actual (iframe oculto + confirmación in-page) no es necesario crear `/gracias.html`, pero queda documentado por si prefieres ese flujo en el futuro.

## Accesibilidad y SEO implementados
- HTML semántico (`header`, `main`, `section`, `footer`), skip-link, foco visible, `aria-live="polite"` en errores del formulario.
- `<title>`, meta description, Open Graph, Twitter Card, `lang="es-MX"`, `canonical` (con TODO para ajustar dominio real de despliegue) y JSON-LD `schema.org/Event`.

## Notas de fidelidad al flyer
El flyer (`assets/Bloque_septiembre.jpeg`) se usó como referencia visual primaria. La paleta declarada en `styles.css` corresponde a lo observado en la imagen. Las formas del hero (triángulo verde + franja diagonal azul arriba, olas azules abajo) se reconstruyeron con SVG inline, no como imagen de fondo, para mantener el hero responsivo, seleccionable e indexable — el flyer solo aparece como descarga discreta debajo del hero.
