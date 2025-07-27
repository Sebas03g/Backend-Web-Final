import { loginFunctionality, logoutFunctionality } from "../fetch/Credentials.js";
const logout_button = document.getElementById("logout");
logout_button.addEventListener("click", function () {
  logoutFunctionality();
})
const change_payment = document.getElementById("agregar-metodo-pago");

change_payment.addEventListener("click", function () {

    window.location.href = "agregar-metodo-pago.html";
    
});