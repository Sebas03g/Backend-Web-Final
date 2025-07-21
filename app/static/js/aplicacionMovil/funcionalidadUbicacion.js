import { createData } from "../fetch/sentenciasFetch.js"; 

export async function agregarUbicacion(marcadorSeleccionado){

    let coordenadas;
    const dataUsuario = JSON.parse(sessionStorage.getItem("usuario"));
    const id_usuario = dataUsuario.id;

    if(Array.isArray(marcadorSeleccionado)){
        coordenadas = {
            lat: marcadorSeleccionado[0],
            lng: marcadorSeleccionado[1]
        }
    }else{
        coordenadas = marcadorSeleccionado.getLatLng();
    }

    const dataUbicacion = {
        nombre_ubicacion: document.getElementById("nombreCrearUbicacion").value,
        descripcion: document.getElementById("descripcionCrearUbicacion").value,
        tipo: document.getElementById('miComboboxCrearSeguridad').value,
        id_usuario: id_usuario,
        lat: coordenadas.lat,
        lng: coordenadas.lng
    }

    await createData("ubicacion", dataUbicacion);
}