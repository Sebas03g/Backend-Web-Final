import { createData, deleteData } from "../fetch/sentenciasFetch.js";
import { updateData } from "../fetch/sentenciasFetch.js";

export async function accionBotonContenedorUbicacion(id, id_usuario, marcadorSeleccionado){
    const boton = document.getElementById("contenedorUbicacion").querySelector(".btnModificar");

    const dataUbicacion = {
        nombre_ubicacion: document.getElementById("nombreUbicacion").value,
        descripcion: document.getElementById("descripcionUbicacion").value,
        tipo: document.getElementById('miComboboxSeguridad').value,
        nivel: document.getElementById("nombreUbicacion").value,
        id_usuario: id_usuario,
        lat: marcadorSeleccionado[0],
        lng: marcadorSeleccionado[1]
    }
    try{
        if(boton.dataset.tipo == "modify"){
            await actualizarUbicacion(id, dataUbicacion)
        }else{
            await crearUbicacion(dataUbicacion)
        }

        return true
    }catch(e){
        console.log(e)
    }

    

}

async function crearUbicacion(data){
    await createData("ubicacion", data);

}

async function actualizarUbicacion(id, data){
    await updateData("ubicacion", data, id);
}

export async function eliminarUbicacion(id){
    await deleteData("ubicacion", id);
}