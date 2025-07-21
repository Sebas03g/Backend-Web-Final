const BASE_URL = 'http://127.0.0.1:5000/permiso-usuario/modify-state/';

export async function modifyAllState(id, data){
    try {
        const response = await axios.post(`${BASE_URL}/${id}`, data, {
            withCredentials: true
        });
    
        const dataUsuario = JSON.parse(sessionStorage.getItem("usuario"));
        const idUsuario = dataUsuario.id;
        sessionStorage.removeItem("usuario");
        const usuario = await getDataById("usuario", idUsuario);
        sessionStorage.setItem("usuario", JSON.stringify(usuario));
    
        return response.data.objeto;
    } catch (error) {
        console.error("Error en createData:", error);
        throw error;
    }
}