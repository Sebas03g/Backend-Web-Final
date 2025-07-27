import { loginFunctionality } from "../fetch/Credentials.js";

const signup_button = document.getElementById("signup");

signup_button.addEventListener("click", function () {

    window.location.href = "../sign-up";
    
});

const login_button = document.getElementById("login");

login_button.addEventListener("click", async function (e) {
    e.preventDefault()

    const emailInput = document.getElementById('inputEmail');
    const passwordInput = document.getElementById('inputPassword');

    if (!emailInput.checkValidity()) {
        alert('Ingrese una dirección de correo válida.');
        return;
    }
    if (passwordInput.value.trim() === '') {
        alert('Campos no pueden estar vacíos.');
        return;
    }

    const form = document.querySelector(".form-signin");

    await loginFunctionality(form);
});