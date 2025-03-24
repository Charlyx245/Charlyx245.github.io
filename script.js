// === CONFIGURACIÓN ===
const VERCEL_ENDPOINT = "https://kommo-webchat-api-rh85.vercel.app/api/sendToKommo";

// === COOKIES ===
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : "";
}

// === TOGGLE CHAT ===
function toggleChat() {
  const chat = document.getElementById("chatBox");
  const button = document.querySelector(".chat-button");

  if (chat.style.display === "block") {
    chat.classList.remove("open");
    setTimeout(() => {
      chat.style.display = "none";
      button.innerHTML = "💬";
    }, 300);
  } else {
    chat.style.display = "block";
    setTimeout(() => chat.classList.add("open"), 10);
    button.innerHTML = "✖";
  }
}
window.toggleChat = toggleChat;

// === LOGIN ===
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Por favor completá usuario y contraseña");
    return;
  }

  setCookie("chatUser", username, 30);
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("chatHeader").style.display = "flex";
  showActionButtons(username);
}
window.login = login;

// === MOSTRAR BOTONES ===
function showActionButtons(username) {
  const chatIframe = document.getElementById("chatIframe");
  chatIframe.style.display = "block";

  const html = `
  <html>
  <head><style>
    body { font-family: Poppins, sans-serif; background: #f3f0eb; margin: 0; padding: 20px; font-size: 13px; }
    .msg { background: #fff; padding: 12px 16px; border-radius: 16px; max-width: 240px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
    .msg strong { display: block; margin-bottom: 6px; font-size: 14px; }
    .row { display: flex; align-items: flex-end; margin-bottom: 10px; }
    .logo { width: 36px; height: 36px; margin-right: 8px; border-radius: 50%; background: #fff; padding: 2px; }
    .buttons-wrapper { margin-left: 44px; display: flex; flex-direction: column; gap: 10px; }
    .action-button {
      background: white; border: none; padding: 10px 20px; border-radius: 15px;
      font-size: 13px; font-weight: 400; letter-spacing: 0.3px; color: #111;
      cursor: pointer; width: 200px; text-align: center; transition: all 0.2s ease-in-out;
      box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    }
    .action-button:hover { background-color: #FF3B00; color: white; }
  </style></head>
  <body>
    <div class="row">
      <img src="https://gana365.online/images/logo.png" class="logo">
      <div class="msg">
        <strong>Bienvenido a GANA365</strong>
        ¡ASISTENCIA 24HS POR ESTA CHAT!<br>
        Por favor elegí una opción 👇👇👇
      </div>
    </div>
    <div class="buttons-wrapper">
      <button class="action-button" onclick="parent.handleAction('Cargar Fichas')">Cargar Fichas</button>
      <button class="action-button" onclick="parent.handleAction('Retirar')">Retirar</button>
    </div>
  </body>
  </html>`;

  const blob = new Blob([html], { type: "text/html" });
  chatIframe.src = URL.createObjectURL(blob);
}

// === ACCIÓN: Cargar Fichas / Retirar ===
async function handleAction(action) {
  const username = getCookie("chatUser");
  if (!username) {
    alert("Por favor iniciá sesión primero.");
    return;
  }

  try {
    const response = await fetch(VERCEL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        message: action,
      }),
    });

    const data = await response.json();
    console.log("Respuesta de Kommo (via Vercel):", data);

    alert(`Mensaje "${action}" enviado correctamente.`);

    // Cambiar iframe al chat de Kommo
    const chatIframe = document.getElementById("chatIframe");
    chatIframe.src = "https://gso.kommo.com/index.html?widget_id=1036503";
  } catch (error) {
    console.error("Error al enviar a Kommo:", error);
    alert("Hubo un problema al enviar el mensaje.");
  }
}
window.handleAction = handleAction;

// === AUTOLOGIN SI YA TIENE COOKIE ===
document.addEventListener("DOMContentLoaded", () => {
  const username = getCookie("chatUser");
  if (username) {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("chatHeader").style.display = "flex";
    showActionButtons(username);
  }
});
