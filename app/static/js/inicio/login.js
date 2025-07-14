const signup_button = document.getElementById("signup");

signup_button.addEventListener("click", function () {

    window.location.href = "registrarse.html";
    
});

const login_button = document.getElementById("login");

login_button.addEventListener("click", function (e) {
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
    window.location.href = "cuenta.html";
});