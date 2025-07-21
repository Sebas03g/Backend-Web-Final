import { createData, updateData } from "../fetch/sentenciasFetch.js";
import { uploadImage } from "../fetch/uploadImages.js";

export async function actualizarImagen(){
    const dataUsuario = JSON.parse(sessionStorage.getItem("usuario"));
    const inputArchivo = document.getElementById("inputImagenUsuario");

    const archivo = inputArchivo.files[0];
    const formData = new FormData();
    formData.append("archivo", archivo);
    
    await uploadImage("user", formData, dataUsuario.id);
    inputArchivo.value = "";
}

export async function actualizarDatosUsuario(){
    const dataUsuario = JSON.parse(sessionStorage.getItem("usuario"));
    const nombre = document.getElementById("nombreUsuario").value;
    const telefono = document.getElementById("telefonoUsuario").value;
    const correo = document.getElementById("correoUsuario").value;

    const data = {
        nombre_completo: nombre,
        correo_electronico: correo,
        telefono: telefono
    }

    await updateData("usuario", data, dataUsuario.id);
}