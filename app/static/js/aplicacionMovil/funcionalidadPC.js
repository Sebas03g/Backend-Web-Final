import { createData, deleteData, updateData } from "../fetch/sentenciasFetch.js";
import { uploadImage } from "../fetch/uploadImages.js";

export async function agregarPC() {
    const dataUsuario = JSON.parse(sessionStorage.getItem("usuario"));

    const nombre = document.getElementById("nombreCrearPC").value.trim();
    const telefono = document.getElementById("telCrearPC").value.trim();
    const descripcion = document.getElementById("descripcionCrearPC").value.trim();
    const inputArchivo = document.getElementById("inputImagenPC");

    if (!nombre || !telefono) {
        alert("Por favor completa al menos el nombre y el teléfono.");
        return;
    }

    const data = {
        nombre,
        telefono,
        descripcion,
        id_usuario: dataUsuario.id,
    };

    try {
        const pc = await createData("persona-confianza", data);

        if (inputArchivo.files.length > 0) {
            const archivo = inputArchivo.files[0];
            const formData = new FormData();
            formData.append("archivo", archivo);

            await uploadImage("persona-confianza", formData, pc.id);
        }

        document.getElementById("nombreCrearPC").value = "";
        document.getElementById("telCrearPC").value = "";
        document.getElementById("descripcionCrearPC").value = "";
        inputArchivo.value = "";


    } catch (error) {
        console.error("Error al agregar persona de confianza:", error);
    }
}
