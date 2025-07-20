import { createData } from "../fetch/sentenciasFetch";

export async function asignarPermiso(id_permiso){
    data = {
        id_permiso:id_permiso,
        nievl: document.getElementById("seleccionNivel").value,
        id_dispositivo: document.getElementById("seleccionGestor").value
    }

    await createData("permiso_usuario",data);

}