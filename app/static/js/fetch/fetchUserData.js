import { getDataById } from "./sentenciasFetch.js";

export async function fetchUserData() {
    const id = localStorage.getItem("idUsuario");
    const response = await getDataById("usuario", id);  
    if (!response.ok) throw new Error("No se pudo obtener el usuario");
    userData = await response.json();

    sessionStorage.setItem('usuario', JSON.stringify(userData));
    //window.location.href = '/otra_pagina.html';

    console.log(userData);
}