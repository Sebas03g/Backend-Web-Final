import { recargarDatos } from "../general/recargarDatos.js";

const BASE_URL = 'https://127.0.0.1:5000';

export async function createData(tipoElemento, data) {
    try {
        const response = await axios.post(`${BASE_URL}/${tipoElemento}`, data, {
            withCredentials: true
        });

        await recargarDatos();

        return response.data.objeto;
    } catch (error) {
        console.error("Error en createData:", error);
        throw error;
    }
}

export async function updateData(tipoElemento, data, id) {
    try {
        const response = await axios.put(`${BASE_URL}/${tipoElemento}/${id}`, data, {
            withCredentials: true
        });

        await recargarDatos();

        return response.data.objeto;

    } catch (error) {
        console.error("Error en updateData:", error);
        throw error;
    }
}


export async function getAllData(tipoElemento) {
    try {
        const response = await axios.get(`${BASE_URL}/${tipoElemento}`, {
            withCredentials: true
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error en getAllData:", error);
        throw error;
    }
}

export async function getDataById(tipoElemento, id) {
    try {
        const response = await axios.get(`${BASE_URL}/${tipoElemento}/${id}`, {
            withCredentials: true
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error en getDataById:", error);
        throw error;
    }
}

export async function deleteData(tipoElemento, id) {
    try {
        const response = await axios.delete(`${BASE_URL}/${tipoElemento}/${id}`, {
            withCredentials: true
        });
        await recargarDatos();
        return response.data;
    } catch (error) {
        console.error("Error en deleteData:", error);
        throw error;
    }
}
