/* ============================================================
   BLOQUE CIUDADANO MEXICALENSE — Landing "Reforma Electoral BC"
   JavaScript vanilla, sin dependencias.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  inicializarHeaderSticky();
  inicializarAnioDinamico();
  inicializarFormulario();
});

/* ---------- Header con sombra al hacer scroll ---------- */
function inicializarHeaderSticky() {
  var header = document.getElementById("header");
  if (!header) return;

  function actualizarSombra() {
    if (window.scrollY > 8) {
      header.classList.add("header--con-sombra");
    } else {
      header.classList.remove("header--con-sombra");
    }
  }

  actualizarSombra();
  window.addEventListener("scroll", actualizarSombra, { passive: true });
}

/* ---------- Año dinámico en el footer ---------- */
function inicializarAnioDinamico() {
  var elAnio = document.getElementById("anio");
  if (elAnio) {
    elAnio.textContent = new Date().getFullYear();
  }
}

/* ---------- Formulario Zoho: validación inline + envío sin salir del sitio ---------- */
function inicializarFormulario() {
  var form = document.getElementById("webform4654888000147097500");
  if (!form) return;

  var botonEnviar = document.getElementById("formsubmit");
  var confirmacion = document.getElementById("confirmacion");

  var camposObligatorios = [
    { id: "First_Name", nombre: "First Name", errorId: "error-first-name", mensaje: "Ingresa tu nombre." },
    { id: "Last_Name", nombre: "Last Name", errorId: "error-last-name", mensaje: "Ingresa tus apellidos." },
    { id: "Email", nombre: "Email", errorId: "error-email", mensaje: "Ingresa un correo electrónico." },
    { id: "Mobile", nombre: "Mobile", errorId: "error-mobile", mensaje: "Ingresa tu número de WhatsApp." },
    { id: "LEADCF7", nombre: "LEADCF7", errorId: "error-leadcf7", mensaje: "Este campo es obligatorio." }
  ];

  function limpiarError(campo) {
    var input = document.getElementById(campo.id);
    var error = document.getElementById(campo.errorId);
    if (input) {
      input.removeAttribute("aria-invalid");
      var contenedor = input.closest(".campo");
      if (contenedor) contenedor.removeAttribute("data-invalido");
    }
    if (error) error.textContent = "";
  }

  function marcarError(campo, mensaje) {
    var input = document.getElementById(campo.id);
    var error = document.getElementById(campo.errorId);
    if (input) {
      input.setAttribute("aria-invalid", "true");
      var contenedor = input.closest(".campo");
      if (contenedor) contenedor.setAttribute("data-invalido", "true");
    }
    if (error) error.textContent = mensaje;
    return input;
  }

  function esEmailValido(valor) {
    var arroba = valor.indexOf("@");
    var punto = valor.lastIndexOf(".");
    return arroba > 0 && punto > arroba + 1 && punto + 2 < valor.length;
  }

  function validarFormulario() {
    var primerInvalido = null;
    var esValido = true;

    camposObligatorios.forEach(function (campo) {
      limpiarError(campo);
      var input = document.getElementById(campo.id);
      var valor = input ? input.value.trim() : "";

      if (valor.length === 0) {
        var el = marcarError(campo, campo.mensaje);
        esValido = false;
        if (!primerInvalido) primerInvalido = el;
        return;
      }

      if (campo.id === "Email" && !esEmailValido(valor)) {
        var elEmail = marcarError(campo, "Ingresa un correo electrónico válido.");
        esValido = false;
        if (!primerInvalido) primerInvalido = elEmail;
      }
    });

    if (!esValido && primerInvalido) {
      primerInvalido.focus();
    }

    return esValido;
  }

  form.addEventListener("submit", function (evento) {
    // Honeypot: si el campo trampa viene lleno, se trata como envío de bot y se bloquea.
    var honeypot = form.querySelector('input[name="aG9uZXlwb3Q"]');
    if (honeypot && honeypot.value.trim() !== "") {
      evento.preventDefault();
      return;
    }

    if (!validarFormulario()) {
      evento.preventDefault();
      return;
    }

    botonEnviar.disabled = true;
    botonEnviar.textContent = "Enviando…";

    // El formulario se envía de forma nativa al iframe oculto "zoho_target"
    // (Zoho no permite leer la respuesta cross-origin), así que mostramos
    // la confirmación tras un breve margen para asegurar que la petición salió.
    window.setTimeout(function () {
      form.hidden = true;
      confirmacion.hidden = false;
      confirmacion.setAttribute("tabindex", "-1");
      confirmacion.focus();
    }, 600);
  });
}
