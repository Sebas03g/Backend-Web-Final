import { logoutFunctionality } from '../fetch/Credentials.js';

document.addEventListener("DOMContentLoaded", () => {
    cerrarSesion();
    tipoUsuario();
});

function cerrarSesion() {
    const btn = document.getElementById("btnSalir");
    if (btn) {
        btn.addEventListener("click", async () => {
            await logoutFunctionality();
        });
    } else {
        console.warn("Botón 'btnSalir' no encontrado");
    }
}

function tipoUsuario() {
    const dataUsuarioStr = sessionStorage.getItem("usuario");
    if (!dataUsuarioStr) {
        console.warn("No se encontró información del usuario en sessionStorage");
        return;
    }

    const dataUsuario = JSON.parse(dataUsuarioStr);

    if (dataUsuario.es_monitor) {
        const adminLink = document.getElementById("opcionAdmin");
        if (adminLink) {
            adminLink.href = "/admin-dashboard";
            adminLink.style.display = "block";
        }
    }

    if (dataUsuario.monitoreo) {
        const userLink = document.getElementById("opcionUser");
        if (userLink) {
            userLink.href = "/user-dashboard";
            userLink.style.display = "block";
        }
    }
}
