# PROMPT PARA CLAUDE CODE (VS Code)

> Copia todo lo que está debajo de la línea y pégalo en Claude Code.
> Antes de pegarlo: revisa los bloques marcados `[EDITAR]` y `TODO`.

---

## ROL Y OBJETIVO

Actúa como desarrollador front-end senior. Construye una **landing page de una sola vista (one-page)** para el evento del **Bloque Ciudadano Mexicalense**. El objetivo único de la página es que el visitante **solicite su acceso al evento** llenando un formulario que envía los datos a Zoho CRM.

Prioridad: **claridad y conversión sobre decoración**. Debe verse profesional, institucional y sobria. Nada de animaciones excesivas, sliders, ni secciones de relleno.

---

## STACK Y ESTRUCTURA DE ARCHIVOS

- HTML5 + CSS3 + JavaScript vanilla. **Sin frameworks, sin build step, sin dependencias npm.**
- No uses Tailwind CDN ni librerías de UI. CSS propio con variables.
- Tipografía: Google Fonts (`Inter` o `Montserrat`), cargada con `preconnect` y `display=swap`.
- Estructura:

```
/
├── index.html
├── styles.css
├── script.js
├── /assets
│   ├── Bloque_septiembre.jpeg   ← FLYER OFICIAL, ya está en la carpeta
│   ├── ponente.jpg              (placeholder — lo reemplazo yo)
│   ├── logo-bloque.svg          (placeholder — lo reemplazo yo)
│   └── og-image.jpg             (placeholder — lo reemplazo yo)
└── README.md
```

- Debe funcionar abriendo `index.html` directamente en el navegador (`file://`) y también desplegado en Vercel / Cloudflare Pages sin configuración adicional.
- **Mobile-first.** Breakpoints en 640px, 900px y 1200px.

---

## SISTEMA DE DISEÑO

**Primer paso obligatorio: abre y observa el archivo `assets/Bloque_septiembre.jpeg`.** Es el flyer oficial del evento y es la referencia visual primaria de toda la landing. Lee de ahí la composición, la geometría, la jerarquía tipográfica y la distribución de color.

Las especificaciones de abajo son mi lectura de ese flyer. **Si detectas una diferencia entre lo que ves en la imagen y lo que digo aquí, sigue la imagen** y anótalo en el `README.md`.

### Paleta (declarar como variables CSS en `:root`)

```css
--azul-profundo:  #1B4FD8;   /* franja diagonal izquierda superior */
--azul-medio:     #2E9BE8;   /* olas inferiores */
--azul-claro:     #8FCEF2;   /* ola secundaria */
--verde-lima:     #8CC63E;   /* triángulo superior, anillo del retrato */
--verde-claro:    #A8D45E;   /* botón ACCESO */
--negro:          #111111;   /* titulares */
--gris-texto:     #4A4A4A;   /* párrafos */
--blanco:         #FFFFFF;   /* fondo dominante */
```

### Reglas visuales

- **El blanco domina.** El azul y el verde son acentos geométricos, no fondos completos.
- Formas: **triángulos y diagonales** en la parte superior (verde sobre azul), **olas curvas** en la parte inferior. Genéralas con SVG inline o `clip-path`, nunca con imágenes.
- Titulares en **mayúsculas, peso 800, tracking cerrado (-0.02em)**.
- Subtítulos en peso regular, sin mayúsculas.
- Botón primario: fondo `--verde-claro`, texto blanco, `border-radius: 999px`, padding generoso, sombra suave. Es el único botón verde de la página.
- Retrato del ponente: **circular, con anillo verde lima de 8–10px**.
- Ancho máximo de contenido: `1120px`, centrado.
- Escala tipográfica fluida con `clamp()`.

---

## CONTENIDO (usar literalmente, no parafrasear)

### Datos del evento

| Campo | Valor |
|---|---|
| Organiza | Bloque Ciudadano Mexicalense |
| Título | REFORMA ELECTORAL DE BAJA CALIFORNIA |
| Subtítulo | Generación de Contaminación Visual y Basura |
| Ponente | Octavio Sandoval L. |
| Cargo | CCE Mexicali |
| Fecha | 09 de septiembre de 2026 |
| Horario | 6:00 a 8:00 pm |
| Sede | Auditorio Gustavo Vildósola, CETYS Universidad |
| Ciudad | Mexicali, Baja California |
| Sitio | bloqueciudadanomxli.org |
| CTA | Solicita tu acceso |

### Biografía del ponente (texto literal)

> Octavio Sandoval López es un contador público, empresario y consultor mexicalense con más de 35 años de experiencia profesional, especializado en auditoría de estados financieros, gobierno corporativo, valuación de empresas y sucesión de empresas familiares.
>
> Fue presidente de COPARMEX Mexicali durante tres periodos (2021–2023) y posteriormente fue elegido presidente del Consejo Coordinador Empresarial (CCE) de Mexicali para el periodo 2025–2026. También fue consejero presidente del Instituto de Transparencia de Baja California.
>
> Actualmente, además de encabezar el CCE Mexicali, fue designado en marzo de 2026 para coordinar los CCE de Baja California, dándole un papel como uno de los principales interlocutores del sector empresarial del estado ante los gobiernos. Sus principales temas de interés han sido desarrollo económico, competitividad, seguridad, transparencia y fortalecimiento institucional.

### Sobre la organización

Consulta `https://bloqueciudadanomxli.org` para extraer: descripción del Bloque Ciudadano Mexicalense (2–3 oraciones), datos de contacto y redes oficiales.

**Regla estricta:** si no puedes acceder al sitio o el dato no existe ahí, **inserta un placeholder visible** con el comentario `<!-- TODO: verificar en bloqueciudadanomxli.org -->`. **No inventes** misión, cifras, historia ni nombres.

### Redes sociales

- Facebook: `https://www.facebook.com/share/v/1BJmmP5SBE/?mibextid=wwXIfr`
  `<!-- TODO: reemplazar por la URL de la página oficial, este link es de un video -->`
- Instagram: `TODO: pendiente de URL`
- Íconos: SVG inline monocromáticos (sin librerías de íconos), color `--azul-profundo`, hover a `--verde-lima`. Cada uno con `aria-label` y `rel="noopener noreferrer"`.

---

## SECCIONES (en este orden exacto)

1. **Header** — logo del Bloque a la izquierda, botón "Solicita tu acceso" a la derecha (ancla a `#registro`). Sticky con sombra suave al hacer scroll.

2. **Hero** — replica la composición de `assets/Bloque_septiembre.jpeg`: geometría diagonal verde/azul arriba, ola azul abajo, eyebrow "BLOQUE CIUDADANO MEXICALENSE", título grande, subtítulo, y una fila de tres datos con íconos (fecha · horario · sede). Botón primario "Solicita tu acceso".

   **No uses el flyer como imagen de fondo ni lo insertes como `<img>` en el hero.** Es referencia de diseño: reconstruye las formas en SVG/CSS y el texto como HTML real, para que sea responsivo, seleccionable e indexable. El flyer sí puede aparecer más abajo, en un bloque discreto "Descarga el flyer" con enlace a la imagen.

3. **De qué trata** — 2 o 3 párrafos cortos sobre el tema de la conferencia: la reforma electoral de Baja California y la propaganda electoral como generadora de contaminación visual y residuos. Redacción **informativa y neutral**, sin lenguaje partidista ni llamados a votar por nadie.

4. **El ponente** — retrato circular con anillo verde + biografía completa. Añade una fila de "chips" con: COPARMEX Mexicali (2021–2023) · CCE Mexicali (2025–2026) · Coordinador CCE Baja California (2026) · Instituto de Transparencia de BC.

5. **Ubicación** — Auditorio Gustavo Vildósola, CETYS Universidad, Mexicali. Incluye un `<iframe>` de Google Maps con `loading="lazy"` y un botón secundario "Cómo llegar" que abra Google Maps en pestaña nueva.

6. **Registro + Encuesta** (`id="registro"`) — ver especificación técnica abajo.

7. **Footer** — logo, redes, `bloqueciudadanomxli.org`, aviso de privacidad (enlace placeholder), año dinámico con JS.

---

## FORMULARIO ZOHO CRM (Web-to-Lead) — CRÍTICO

El formulario original de Zoho se anexa al final de este prompt. **Debes reestilizarlo por completo**, pero conservando su funcionamiento.

### Obligatorio conservar sin modificar

- `action="https://crm.zoho.com/crm/WebToLeadForm"`, `method="POST"`, `accept-charset="UTF-8"`
- `id="webform4654888000147097493"` y `name="WebToLeads4654888000147097493"`
- Los cuatro `input` ocultos: `xnQsjsdp`, `xmIwtLD`, `actionType`, `returnURL`
- El input oculto `zc_gad`
- El honeypot `aG9uZXlwb3Q`
- El `<script>` de Analytics de Zoho (`id="wf_anal"`)
- Los `name` exactos de los campos: `First Name`, `Last Name`, `Email`, `Mobile`, `LEADCF49`

### Qué sí debes cambiar

- **Elimina por completo el CSS de Zoho** (`.zcwf_*`). Reescribe el layout con clases propias: etiqueta arriba, campo abajo, ancho completo, en grid de 2 columnas en desktop.
- Reemplaza los `alert()` de validación por **mensajes de error inline** debajo de cada campo, con `aria-live="polite"` y `aria-invalid`.
- Usa `type="email"` y `type="tel"` en los campos correspondientes.
- Elimina el botón "Restablecer".
- El botón de envío debe usar `--verde-claro` y mostrar estado `Enviando…` con `disabled` al hacer submit.
- Añade `<label>` reales asociados con `for`/`id` a todos los campos.

### Manejo del envío

Zoho redirige fuera del sitio al enviar. Para evitarlo:

1. Agrega un `<iframe name="zoho_target" style="display:none"></iframe>` y pon `target="zoho_target"` en el `<form>`.
2. Al hacer submit y pasar la validación, oculta el formulario y muestra un bloque de confirmación: **"Registro recibido. Te enviaremos los detalles de acceso por WhatsApp y correo."**
3. Documenta en el `README.md` la alternativa: configurar `returnURL` en Zoho apuntando a `/gracias.html`.

---

## ENCUESTA

`[EDITAR]` — Estas preguntas son una propuesta alineada al tema del evento. Sustitúyelas por las tuyas antes de correr el prompt.

Colócala **dentro del mismo formulario**, en un `<fieldset>` con leyenda "Antes de terminar (opcional)". Las preguntas de la encuesta **no son obligatorias**; el registro debe poder enviarse sin contestarlas.

1. ¿Qué tan informado te consideras sobre la reforma electoral de Baja California?
   → *Nada / Poco / Algo / Bastante / Muy informado* (radio)
2. ¿Consideras que la propaganda electoral genera contaminación visual en Mexicali?
   → *Sí / No / Parcialmente* (radio)
3. ¿Qué tema te interesa más del evento?
   → *Marco legal de la reforma / Impacto ambiental y residuos / Costo de las campañas / Participación ciudadana* (select)
4. ¿Cómo te enteraste del evento?
   → *Facebook / Instagram / WhatsApp / Invitación directa / Otro* (select)
5. ¿Hay algo que te gustaría que se abordara en la sesión?
   → textarea, máximo 500 caracteres, con contador visible.

### Ruteo de respuestas a Zoho — dos rutas, implementa la A

**Ruta A (recomendada, todo en un solo envío al CRM):**
Cada respuesta se manda como campo personalizado del lead, usando el patrón `LEADCF##`. Ya sabemos que `LEADCF49` = "Fue referido por".

- Crea los 5 campos como `<input type="hidden">` con `name="LEADCF_TODO_1"` … `name="LEADCF_TODO_5"`, poblados por JS al hacer submit desde los controles visibles de la encuesta.
- Deja en el `README.md` una tabla con las instrucciones para que yo obtenga los IDs reales: en Zoho CRM → Setup → Modules → Leads → crear el campo → regenerar el Web-to-Lead Form → copiar el `LEADCF##` que aparezca.
- Marca cada uno con `<!-- TODO: reemplazar por el LEADCF## real de Zoho -->`.

**Ruta B (documentar en el README, no implementar):**
Si prefiero usar **Zoho Forms** (producto distinto al CRM), la encuesta iría en un `<iframe>` aparte con la URL pública del formulario. Explica en el README cómo cambiar a esta ruta y por qué implica dos envíos separados.

---

## CALIDAD

- **Accesibilidad:** HTML semántico (`header`, `main`, `section`, `footer`), contraste AA mínimo, foco visible en todos los interactivos, skip-link al contenido, todas las imágenes con `alt` descriptivo.
- **SEO:** `<title>`, meta description, Open Graph y Twitter Card completos, `lang="es-MX"`, canonical, y JSON-LD `schema.org/Event` con fecha, hora, ubicación y `performer`.
- **Rendimiento:** sin dependencias externas salvo la fuente y el mapa; imágenes con `loading="lazy"` y `width`/`height` explícitos.
- **Código:** comentado en español, indentación de 2 espacios, CSS organizado por secciones con comentarios de bloque.
- `README.md` con: cómo desplegar en Vercel, qué placeholders reemplazar, y la tabla de campos de Zoho pendientes.

---

## RESTRICCIONES

- No inventes datos que no estén en este prompt ni en el sitio oficial.
- No agregues testimonios, patrocinadores, contadores regresivos, ni secciones de "preguntas frecuentes" no solicitadas.
- No uses `localStorage` ni `sessionStorage`.
- No incluyas lenguaje partidista, llamados al voto, ni posicionamientos a favor o en contra de partidos o candidatos. La página es informativa y de registro.
- No modifiques ningún valor de los campos ocultos de Zoho.

---

## ENTREGA

1. Crea los archivos completos.
2. Al final, lista en un bloque los **placeholders y TODOs** que quedaron pendientes de mi parte.

---

## ANEXO — FORMULARIO ZOHO ORIGINAL

```html
[PEGAR AQUÍ EL HTML COMPLETO DEL FORMULARIO WEB-TO-LEAD DE ZOHO]
```
