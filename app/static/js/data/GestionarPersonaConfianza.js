import { createData } from "../fetch/sentenciasFetch";


export async function gestorPersonaConfianza(id=null){

    const id_usuario = localStorage.getItem('idUsuario');
    const nivel = localStorage.getItem('nivel');

    const file = document.getElementById("inputImagenPC").files[0];

    const url = await uploadImage(file);
    
    const data = {
        nombre: toString(document.getElementById("nombrePersona").value),
        telefono: toString(document.getElementById("telefonoPersona").value),
        descripcion: toString(document.getElementById("descripcionPersona").value),
        id_usuario: id_usuario,
        imagen: url 
    }

    id ? await createData("persona_confianza", data) : await updateData("persona_confianza", data, id);
    

}