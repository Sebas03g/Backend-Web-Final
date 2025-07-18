import { updateData } from "../fetch/sentenciasFetch.js";

export async function accionBotonContenedorRuta(id, id_usuario){
    const horaInicial = document.getElementById("horaInicialRuta").value;
    const horaFinal = document.getElementById("horaFinalRuta").value;

    if (!horaInicial || !horaFinal) {
        alert("Por favor selecciona ambas horas.");
        return;
    }

    const [h1, m1] = horaInicial.split(":").map(Number);
    const [h2, m2] = horaFinal.split(":").map(Number);

    const hora_inicio = `${h1.toString().padStart(2, '0')}:${m1.toString().padStart(2, '0')}:00`;
    const hora_fin = `${h2.toString().padStart(2, '0')}:${m2.toString().padStart(2, '0')}:00`;

    const dataRuta = {     
        nombre: document.getElementById("nombreRuta").value,
        descripcion: document.getElementById("descripcionRuta").value,
        hora_inicio: hora_inicio,
        hora_fin: hora_fin,
        id_usuario: id_usuario
    }
    try{
        await actualizarRuta(id, dataRuta)
        return true
    }catch(e){
        console.log(e)
    }
}

async function actualizarRuta(id, data){
    await updateData("ruta", data, id);
}

export async function eliminarRuta(id){
    await deleteData("ruta", id);
}