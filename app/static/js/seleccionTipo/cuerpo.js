import { logoutFunctionality } from '../fetch/Credentials.js';

function cerrarSesion(){
    const btn = document.getElementById("btnSalir");
    btn.addEventListener("click", async() => await logoutFunctionality())
}

document.addEventListener("DOMContentLoaded", () => {
    cerrarSesion();
});
