import { crearPunto } from "./GestionarPunto.js";
import { createData } from "../fetch/sentenciasFetch.js";


export async function gestorUbicacionesGenerales(punto, id=null){

    const id_usuario = localStorage.getItem('idUsuario');

    const punto = await crearPunto(punto);
    
    const data = {
        nombre_ubicacion: toString(document.getElementById("nombreUbicacionGeneral").value),
        descripcion: toString(document.getElementById("descripcionUbicacionGeneral").value),
        tipo: toString(document.getElementById("miComboboxSeguridadGeneral").value),
        nivel: 2,
        id_usuario: id_usuario,
        id_punto: punto.id
    }

    id ? await createData("ubicacion", data) : await updateData("ubicacion", data, id);
    

}