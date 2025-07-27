const BASE_URL = 'https://127.0.0.1:5000';

export async function enviarMensaje(id, data, tipo) {
    try {
        await axios.post(`${BASE_URL}/message/${tipo}/${id}`, data, {
            withCredentials: true
        });
    } catch (error) {
        console.error("Error en createData:", error);
        throw error;
    }
}

