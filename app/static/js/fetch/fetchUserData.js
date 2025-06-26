export let userData = null;

export async function fetchUserData() {
    if (!userData) {
        const id = localStorage.getItem("idUsuario");
        const response = await getDataById("usuario", id);  
        if (!response.ok) throw new Error("No se pudo obtener el usuario");
        userData = await response.json();
    }
    return userData;
}