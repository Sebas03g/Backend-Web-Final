import { capturar_orden } from "../fetch/realizarCompra.js";

const ok_button = document.getElementById("ok");
const dataTransaccion = JSON.parse(sessionStorage.getItem("data_transaccion"))

ok_button.addEventListener('click', () => {
    window.location.href = "/account-dashboard";
});

document.addEventListener("DOMContentLoaded", async function() {
    console.log(dataTransaccion);
    await capturar_orden(dataTransaccion);
});