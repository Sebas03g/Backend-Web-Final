import { createData, deleteData } from "../fetch/sentenciasFetch.js";
import { updateData } from "../fetch/sentenciasFetch.js";
import { enviarMensaje as sendMessage } from "../fetch/enviarMensaje.js";

export async function crearDataDispositivo(id_gestor){
    const dataDispositivo = {
        nombre_completo: document.getElementById("nombreDispositivoCrear").value,
        cedula: document.getElementById("cedulaDispositivoCrear").value,
        correo_electronico: document.getElementById("correoDispositivoCrear").value,
        telefono: document.getElementById("telefonoDispositivoCrear").value,
        id_gestor: id_gestor,
    }

    await createData("dispositivo", dataDispositivo);
}

export async function editarDataDispositivos(id){

    const dataDispositivo = {
        nombre_completo: document.getElementById("nombreDispositivoModificar").value,
        cedula: document.getElementById("cedulaDispositivoModificar").value,
        correo_electronico: document.getElementById("correoDispositivoModificar").value,
        telefono: document.getElementById("telefonoDispositivoModificar").value,
    }

    await updateData("dispositivo", dataDispositivo, id);
}

export async function enviarMensaje(id){
    const texto = document.getElementById("mensajeUsuario").value;
    console.log(texto);
    document.getElementById("mensajeUsuario").value = "";
    await sendMessage(id, {'mensaje':texto}, "admin");
}

export async function eliminarDataDispositivo(id){
    await deleteData("dispositivo", id)
}