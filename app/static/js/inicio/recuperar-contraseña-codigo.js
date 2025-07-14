const validate_button = document.getElementById("validate");

validate_button.addEventListener("click", function (e) {
    e.preventDefault()
    
    const code = document.getElementById('inputCode');
    
    if (!code.value.trim()) {
        alert('Campo no puede estar vacío.');
        return;
    }

    window.location.href = "recuperar-contraseña-nueva.html";
    
});