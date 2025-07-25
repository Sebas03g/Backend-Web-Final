import { getDataById } from "../fetch/sentenciasFetch.js";

export async function recargarDatos(){
    const dataUsuarioStr = sessionStorage.getItem("usuario");
    if (!dataUsuarioStr) throw new Error("No se encontró el usuario en sessionStorage");

    const dataUsuario = JSON.parse(dataUsuarioStr);

    const idUsuario = dataUsuario.id;

    sessionStorage.removeItem("usuario");
    const usuario = await getDataById("usuario", idUsuario);
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
}