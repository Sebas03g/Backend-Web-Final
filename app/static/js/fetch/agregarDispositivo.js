import { recargarDatos } from "../general/recargarDatos.js";
import { getDataById } from "./sentenciasFetch.js";
import { activarDispositivo } from "./socketClient.js";

const BASE_URL = 'https://127.0.0.1:5000/dispositivo';

export async function addDevice(codigo) {
    try {
        await recargarDatos();
        activarDispositivo(null, codigo);

    } catch (error) {
        console.error("Error en updateData:", error);
        throw error;
    }
}

export async function modificarEstadoDispositivo(id){
    try {

        await recargarDatos();
        activarDispositivo(id_dispositivo, null);

    } catch (error) {
        console.error("Error en updateData:", error);
        throw error;
    }
}