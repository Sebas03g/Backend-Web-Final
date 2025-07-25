const BASE_URL = 'http://127.0.0.1:5000/notify-acces/';

export async function accesoPermiso(id){
    await axios.get(`${BASE_URL}/${id}`, {
        withCredentials: true
    });
}