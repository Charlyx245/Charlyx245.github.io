// Guardar cookies
function setCookie(name, value, days) {
  let date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`;
}

// Obtener cookies
function getCookie(name) {
  let cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    let [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return "";
}

// Toggle del chat
function toggleChat() {
  const chat = document.getElementById("chatBox");
  const button = document.querySelector(".chat-button");

  if (chat.style.display === "block") {
    chat.style.display = "none";
    button.innerHTML = "💬";
  } else {
    chat.style.display = "block";
    setTimeout(() => chat.classList.add("open"), 10);
    button.innerHTML = "✖";
  }
}

// Login
function login() {
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();

  if (username === "" || password === "") {
    Swal.fire({
      icon: "error",
      title: "Por favor, complete todos los campos",
      confirmButtonText: "OK",
      confirmButtonColor: "#6C63FF",
      iconColor: "#FF3B00"
    });
    return;
  }

  setCookie("chatUser", username, 30);
  console.log("Enviado a Kommo:", { username, password });

  document.getElementById("loginForm").style.display = "none";
  document.getElementById("chatHeader").style.display = "flex";
  showActionButtons(username);
}

// Mostrar mensaje + botones con estilo naranja en hover
function showActionButtons(username) {
  const chatIframe = document.getElementById("chatIframe");
  chatIframe.style.display = "block";

  const html = `
    <html>
    <head>
      <style>
        body {
          margin: 0;
          padding: 0;
          background: #f3f0eb;
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          color: #111;
        }

        .container {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          height: 100vh;
          box-sizing: border-box;
          justify-content: flex-start;
          align-items: flex-start;
        }

        .message-row {
          display: flex;
          align-items: flex-end;
        }

        .bot-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: contain;
          background: white;
          padding: 2px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          margin-right: 8px;
        }

        .bot-message {
          background: white;
          padding: 12px 16px;
          border-radius: 16px;
          max-width: 240px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
          font-size: 13px;
          line-height: 1.4;
          font-weight: 400;
        }

        .bot-message strong {
          display: block;
          margin-bottom: 4px;
          font-size: 13.5px;
          font-weight: 600;
        }

        .buttons-wrapper {
          margin-left: 44px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .action-button {
          background: white;
          border: none;
          padding: 10px 20px;
          border-radius: 15px;
          font-size: 13px;
          font-weight: 400;
          color: #111;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
          transition: all 0.2s ease-in-out;
          width: 200px;
          text-align: center;
          letter-spacing: 0.3px;
        }

        .action-button:hover {
          background-color: #FF3B00;
          color: #fff;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="message-row">
          <img src="https://gana365.online/images/logo.png" class="bot-avatar" alt="Bot">
          <div class="bot-message">
            <strong>Bienvenido a GANA365</strong>
            ¡ASISTENCIA 24HS POR ESTA CHAT!<br>
            Por favor elegí una opción 👇👇👇
          </div>
        </div>

        <div class="buttons-wrapper">
          <button class="action-button" onclick="parent.handleAction('cargar')">Cargar Fichas</button>
          <button class="action-button" onclick="parent.handleAction('retirar')">Retirar</button>
        </div>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([html], { type: 'text/html' });
  chatIframe.src = URL.createObjectURL(blob);
}

// Acción de botones
function handleAction(action) {
  const username = getCookie("chatUser");
  console.log(`Acción: ${action} por ${username}`);
  alert(`Acción '${action}' enviada para el usuario ${username}`);
}
window.handleAction = handleAction;

// AutoLogin
document.addEventListener("DOMContentLoaded", () => {
  const username = getCookie("chatUser");
  if (username) {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("chatHeader").style.display = "flex";
    showActionButtons(username);
  }
});
