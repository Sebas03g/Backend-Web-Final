import { recargarDatos } from "../general/recargarDatos.js";
import { modificarPermisos } from "./socketClient.js";

const BASE_URL = 'http://127.0.0.1:5000/permiso-usuario/modify-state/';

export async function modifyAllState(id, data){
    try {
        const response = await axios.post(`${BASE_URL}/${id}`, data, {
            withCredentials: true
        });
    
        await recargarDatos();
        modificarPermisos(id, "todos");

        return response.data.objeto;
    } catch (error) {
        console.error("Error en createData:", error);
        throw error;
    }
}