import { getCodigo } from "../fetch/obtenerCodigo.js";

export async function gestionDispositivo(id=null){

    id ? await modificacionDispositivo(id) : creacionDispositivo();
}


async function creacionDispositivo(){
    const codigo = getCodigo();
    data = {
        nombre_completo: toString(document.getElementById("nombreDispositivoCrear").value),
        cedula: toString(cedulaDispositivoCrear),
        correo_electronico: toString(document.getElementById("correoDispositivoCrear").value),
        telefono: toString(document.getElementById("telefonoDispositivoCrear").value),
        codigo: codigo,
    }

}

async function modificacionDispositivo(id){


}