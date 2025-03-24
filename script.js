document.addEventListener("DOMContentLoaded", function () {
  const iniciarChatBtn = document.getElementById("iniciarChat");
  const cargarFichasBtn = document.getElementById("cargarFichasBtn");
  const retirarBtn = document.getElementById("retirarBtn");
  const loginForm = document.getElementById("loginForm");
  const chatInterface = document.getElementById("chatInterface");

  // Guarda cookies por 7 días
  function guardarEnCookies(nombre, valor) {
    document.cookie = `${nombre}=${valor}; path=/; max-age=${60 * 60 * 24 * 7}`;
  }

  // Lee cookies por nombre
  function leerCookie(nombre) {
    const match = document.cookie.match(new RegExp('(^| )' + nombre + '=([^;]+)'));
    return match ? match[2] : null;
  }

  // Enviar mensaje a Kommo API
  async function enviarMensajeAAPI(nombre, mensaje) {
    try {
      const response = await fetch("https://kommo-webchat-api-rh85.vercel.app/api/sendToKommo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: nombre,
          message: mensaje
        })
      });

      const data = await response.json();
      console.log("Respuesta de Kommo:", data);
    } catch (error) {
      console.error("Error al enviar mensaje a Kommo:", error);
    }
  }

  // Iniciar sesión
  iniciarChatBtn?.addEventListener("click", () => {
    const nombre = document.getElementById("usuario").value.trim();
    const clave = document.getElementById("clave").value.trim();

    if (!nombre || !clave) {
      alert("Por favor, completá todos los campos.");
      return;
    }

    guardarEnCookies("usuario", nombre);
    guardarEnCookies("clave", clave);

    loginForm.style.display = "none";
    chatInterface.style.display = "block";
  });

  // Botón: Cargar Fichas
  cargarFichasBtn?.addEventListener("click", () => {
    const nombre = leerCookie("usuario");
    if (!nombre) {
      alert("Por favor, ingresá al chat primero.");
      return;
    }
    enviarMensajeAAPI(nombre, "Cargar Fichas");
  });

  // Botón: Retirar
  retirarBtn?.addEventListener("click", () => {
    const nombre = leerCookie("usuario");
    if (!nombre) {
      alert("Por favor, ingresá al chat primero.");
      return;
    }
    enviarMensajeAAPI(nombre, "Retirar");
  });

  // Si ya hay cookies, mostrar directamente el chat
  if (leerCookie("usuario") && leerCookie("clave")) {
    loginForm.style.display = "none";
    chatInterface.style.display = "block";
  }
});
