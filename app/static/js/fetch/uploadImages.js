import { getDataById } from "./sentenciasFetch.js";

const BASE_URL = 'http://127.0.0.1:5000';

export async function uploadImage(tipoElemento, data, id) {
    try {
        await axios.put(`${BASE_URL}/upload-image/${tipoElemento}/${id}`, data, {
            withCredentials: true
        });

        const dataUsuario = JSON.parse(sessionStorage.getItem("usuario"));
        const idUsuario = dataUsuario.id;
        sessionStorage.removeItem("usuario");
        const usuario = await getDataById("usuario", idUsuario);
        sessionStorage.setItem("usuario", JSON.stringify(usuario));
    } catch (error) {
        console.error("Error en createData:", error);
        throw error;
    }
}