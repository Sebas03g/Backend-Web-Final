import { modifyAllState } from "../fetch/estadoPU.js";
import { createData, updateData } from "../fetch/sentenciasFetch.js";
import { modificarPermisos } from "../fetch/socketClient.js";

export async function asignarPermiso(id_permiso){
    const data = {
        id_permiso:id_permiso,
        nivel: document.getElementById("seleccionNivel").value,
        id_dispositivo: document.getElementById("seleccionGestor").value
    }

    await createData("permiso-usuario",data);

}

export async function modificarEstadoPU(e){
    const elemento = e.target;
    const data = {
        estado: elemento.checked
    }

    await updateData("permiso-usuario", data, elemento.dataset.idPU);
    modificarPermisos(elemento.dataset.idGestor, "unico");
}

export async function modificarNivel(id, e){
    const elemento = e.target;
    const data = {
        nivel: elemento.value
    }

    await updateData("permiso-usuario", data, elemento.dataset.idPU);
    modificarPermisos(id, "unico");
}

export async function modificarEstadoTodosPU(e){
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));
    const elemento = e.target;

    const data = {
        id_permiso: elemento.dataset.idPermiso,
        estado: !elemento.dataset.estado
    }

    await modifyAllState(usuario.id, data);

}