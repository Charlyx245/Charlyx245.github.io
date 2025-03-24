
// CONFIGURACIÓN DE KOMMO
const KOMMO_CONFIG = {
  access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjE0NzMxOTFhZGY2MGQyZmMwMDU2MjljYTRlN2ZkNmM0OTMzMmMwMjhkMWEzYWUxOWUzY2IxMzYxYzM0MTYxMDFhYmZjMjE4OTE4MGNjYTM5In0.eyJhdWQiOiI1NTNjNmYwYy1iNmIyLTRjMDUtOGM1Yi01YTZhNTVlMDFkOTEiLCJqdGkiOiIxNDczMTkxYWRmNjBkMmZjMDA1NjI5Y2E0ZTdmZDZjNDkzMzJjMDI4ZDFhM2FlMTllM2NiMTM2MWMzNDE2MTAxYWJmYzIxODkxODBjY2EzOSIsImlhdCI6MTc0Mjc4MTk2MCwibmJmIjoxNzQyNzgxOTYwLCJleHAiOjE3ODI3Nzc2MDAsInN1YiI6IjEyOTE0Mjg3IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjM0MzQ1MjMxLCJiYXNlX2RvbWFpbiI6ImtvbW1vLmNvbSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiMTE5MzJjMTQtMjYzNS00Mzc4LWFhY2MtOGJjYzZkZjI4MTgwIiwiYXBpX2RvbWFpbiI6ImFwaS1jLmtvbW1vLmNvbSJ9.H7bhNCjapRQ7x5AEFWYRPgzAC7vIbX_1xbJ3ehls45eC61TjiFlZSZm1IhZyGhmC9Lny2glPNpeaP6v0yK1n0W28iwaHD-XdeaVBFZXoevJX7_CJRjfmC7DsWu31hjyN-aXu_0uqTnLT0-b73dSuPWq7VupivmLiOUm6P9jKHO04YuDPcMPx4u4GrhVNHoWwhJnPAFrXXi6fyYqZcqy1Hs6DOx4iA6PnyUziVRUWigmEKUO9L0EaW60k3GWDZWSpdZqk_QVe1zLfxlxSus8UEOmQA5KFQ9xK7VnkQ607EBaEbV6ZgTVZC4KoRXjIRXvIeM6gxslfhUaNiiYTkO3S8Q", // 🔁 Pegá acá tu token de larga duración
  base_url: "https://sinocaydiseno.kommo.com"
};

// GUARDAR COOKIE
function setCookie(name, value, days) {
  let date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`;
}

// LEER COOKIE
function getCookie(name) {
  let cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    let [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return "";
}

// MOSTRAR/OCULTAR CHAT
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

// LOGIN
function login() {
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Por favor completá usuario y contraseña");
    return;
  }

  setCookie("chatUser", username, 30);
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("chatHeader").style.display = "flex";
  showActionButtons(username);
}

// MOSTRAR MENSAJE Y BOTONES
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

  const blob = new Blob([html], { type: 'text/html' });
  chatIframe.src = URL.createObjectURL(blob);
}

// MANEJAR ACCIONES Y ENVIAR A KOMMO
async function handleAction(action) {
  const username = getCookie("chatUser");
  let leadId = getCookie("leadId");

  if (!leadId) {
    const leadResponse = await fetch(`${KOMMO_CONFIG.base_url}/api/v4/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${KOMMO_CONFIG.access_token}`
      },
      body: JSON.stringify({
        name: `Lead Webchat - ${username}`,
        _embedded: {
          contacts: [{
            first_name: username
          }]
        }
      })
    });

    const leadData = await leadResponse.json();
    leadId = leadData.id || (leadData._embedded?.leads?.[0]?.id);
    if (leadId) {
      setCookie("leadId", leadId, 30);
    } else {
      alert("Error al crear el lead en Kommo.");
      return;
    }
  }

  // Enviar mensaje al Salesbot
  await fetch(`${KOMMO_CONFIG.base_url}/api/v4/leads/${leadId}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${KOMMO_CONFIG.access_token}`
    },
    body: JSON.stringify({
      note_type: "common",
      params: { text: action }
    })
  });

  // Reemplazar iframe por widget real de Kommo
  const chatIframe = document.getElementById("chatIframe");
  chatIframe.style.display = "none";

  const script = document.createElement("script");
  script.innerHTML = `(function(a,m,o,c,r,m){a[m]={id:"1036503",hash:"418cb7e2728464ae9d979e2620ffd41197c85e21ea581346a2c53efc3333381c",locale:"es",setMeta:function(p){this.params=(this.params||[]).concat([p])}};a[o]=a[o]||function(){(a[o].q=a[o].q||[]).push(arguments)};var d=a.document,s=d.createElement('script');s.async=true;s.id=m+'_script';s.src='https://gso.kommo.com/js/button.js';d.head&&d.head.appendChild(s)}(window,0,'crmPlugin',0,0,'crm_plugin'));`;
  document.body.appendChild(script);
}
window.handleAction = handleAction;

// AUTOLOGIN
document.addEventListener("DOMContentLoaded", () => {
  const username = getCookie("chatUser");
  if (username) {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("chatHeader").style.display = "flex";
    showActionButtons(username);
  }
});
