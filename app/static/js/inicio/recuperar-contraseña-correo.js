function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const send_button = document.getElementById("send");

send_button.addEventListener("click", function (e) {
    e.preventDefault()
    
    const email = document.getElementById('inputEmail');
    
    if (!email.checkValidity()) {
        alert('Ingrese un correo electrónico válido.');
        return;
    }

    window.location.href = "recuperar-contraseña-codigo.html";
    
});