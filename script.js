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

  // Ocultar login y mostrar header
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("chatHeader").style.display = "flex";

  // Enviar mensaje inicial al widget
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
