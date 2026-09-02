/* ============================================================
   BLOQUE CIUDADANO MEXICALENSE — Landing "Reforma Electoral BC"
   JavaScript vanilla, sin dependencias.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  inicializarHeaderSticky();
  inicializarAnioDinamico();
  inicializarFormularioRegistro();
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

/* ---------- Formulario de registro: envío a Google Sheets vía Apps Script ---------- */
var SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxwfSallpfBwb4ivTmXSd-iNR2E9dyzacSmK4q4jvdkVj1B5vbp1Sk5kzX7l5sHI2ie/exec";

function inicializarFormularioRegistro() {
  var form = document.getElementById("formRegistro");
  if (!form) return;

  form.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    var boton = form.querySelector("button[type=submit]");
    var mensaje = document.getElementById("mensajeEstado");

    var data = {
      nombre: form.nombre.value.trim(),
      apellidoPaterno: form.apellidoPaterno.value.trim(),
      apellidoMaterno: form.apellidoMaterno.value.trim(),
      correo: form.correo.value.trim(),
      telefono: form.telefono.value.trim(),
      empresa: form.empresa.value.trim()
    };

    boton.disabled = true;
    boton.textContent = "Enviando...";

    try {
      await fetch(SHEET_WEBAPP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(data)
      });

      // Con no-cors no podemos leer la respuesta real del Apps Script, así que asumimos éxito.
      mensaje.textContent = "¡Registro exitoso! Te esperamos el 9 de septiembre.";
      mensaje.style.color = "#2E7D32";
      form.reset();
    } catch (error) {
      mensaje.textContent = "Hubo un error al enviar tu registro. Intenta de nuevo.";
      mensaje.style.color = "#C0392B";
      console.error(error);
    } finally {
      boton.disabled = false;
      boton.textContent = "Registrarme";
    }
  });
}
