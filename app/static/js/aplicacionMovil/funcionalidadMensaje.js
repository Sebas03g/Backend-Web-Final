import { enviarMensaje } from "../fetch/enviarMensaje.js";

export async function mandarMensaje(){
    const dataUsuario = JSON.parse(sessionStorage.getItem("usuario"));
    const data = {
        mensaje: document.getElementById("mensajeEnviar").value
    }

    await enviarMensaje(dataUsuario.id, data, "user");
}