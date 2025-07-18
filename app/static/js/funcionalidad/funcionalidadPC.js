
import { createData } from "../fetch/sentenciasFetch.js";
import { updateData } from "../fetch/sentenciasFetch.js";

export async function accionBotonContenedorPC(id, id_usuario){
    const boton = document.getElementById("contenedorPersonas").querySelector(".btnModificar");

    const dataPC = {     
        nombre: document.getElementById("nombrePersona").value,
        telefono: document.getElementById("telefonoPersona").value,
        descripcion: document.getElementById("descripcionPersona").value,
        id_usuario: id_usuario,
    }
    try{
        if(boton.dataset.tipo == "modify"){
            await actualizarPC(id, dataPC)
        }else{
            await crearPC(dataPC)
        }
        return true
    }catch(e){
        console.log(e)
    }
}

async function crearPC(data){
    await createData("persona-confianza", data);

}

async function actualizarPC(id, data){
    await updateData("persona-confianza", data, id);
}

export async function eliminarPC(id){
    await deleteData("persona-confianza", id);
}