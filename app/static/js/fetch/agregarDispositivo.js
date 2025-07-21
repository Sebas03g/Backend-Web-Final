import { getDataById } from "./sentenciasFetch.js";

const BASE_URL = 'http://127.0.0.1:5000/dispositivo';

export async function addDevice(codigo) {
    try {
        const response = await axios.put(`${BASE_URL}/add-device/${codigo}`, {
            withCredentials: true
        });

        const dataUsuarioStr = sessionStorage.getItem("usuario");
        if (!dataUsuarioStr) throw new Error("No se encontró el usuario en sessionStorage");

        const dataUsuario = JSON.parse(dataUsuarioStr);
        const idUsuario = dataUsuario.id;
        sessionStorage.removeItem("usuario");
        const usuario = await getDataById("usuario", idUsuario);
        sessionStorage.setItem("usuario", JSON.stringify(usuario));

        return response.data.objeto;

    } catch (error) {
        console.error("Error en updateData:", error);
        throw error;
    }
}

export async function modificarEstadoDispositivo(id){
        try {
        const response = await axios.put(`${BASE_URL}/modify-state/${id}`, {
            withCredentials: true
        });

        const dataUsuarioStr = sessionStorage.getItem("usuario");
        if (!dataUsuarioStr) throw new Error("No se encontró el usuario en sessionStorage");

        const dataUsuario = JSON.parse(dataUsuarioStr);
        const idUsuario = dataUsuario.id;

        sessionStorage.removeItem("usuario");
        const usuario = await getDataById("usuario", idUsuario);
        sessionStorage.setItem("usuario", JSON.stringify(usuario));

        return response.data.objeto;

    } catch (error) {
        console.error("Error en updateData:", error);
        throw error;
    }
}