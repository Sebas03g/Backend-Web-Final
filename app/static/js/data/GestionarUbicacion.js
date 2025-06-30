import { crearPunto } from "./GestionarPunto";
import { createData } from "../fetch/sentenciasFetch";


export async function gestorUbicacion(punto, id=null){

    const id_usuario = localStorage.getItem('idUsuario');

    const punto = await crearPunto(punto);
    
    const data = {
        nombre_ubicacion: toString(document.getElementById("nombreUbicacion").value),
        descripcion: toString(document.getElementById("descripcionUbicacion").value),
        tipo: toString(document.getElementById("descripcionUbicacion").value),
        nivel: 1,
        id_usuario: id,
        id_punto: punto.id
    }

    id ? await createData("ubicacion", data) : await updateData("ubicacion", data, id);
    

}