const change_pass_button = document.getElementById("change-pass");

change_pass_button.addEventListener("click", function (e) {
    e.preventDefault()
    
    const password = document.getElementById('inputPassword');
    const passwordRepeat = document.getElementById('inputPasswordConfirm');
    if (!password.value.trim() || !passwordRepeat.value.trim()) {
        alert('Por favor, complete todos los campos.');
        return false;
    }

    if (password.value !== passwordRepeat.value) {
        alert('Las contraseñas no coinciden.');
       return
    }

    window.location.href = "iniciar-sesion.html";
    
});