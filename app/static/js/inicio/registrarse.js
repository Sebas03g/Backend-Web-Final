function validateForm() {
  const name = document.getElementById('inputName');
  const email = document.getElementById('inputEmail');
  const phone = document.getElementById('inputPhone');
  const birthdate = document.getElementById('inputBirthdate');
  const password = document.getElementById('inputPassword');
  const passwordRepeat = document.getElementById('inputPasswordRepeat');

  if (!name.value.trim() || !email.value.trim() || !phone.value.trim() || !birthdate.value.trim() || !password.value.trim() || !passwordRepeat.value.trim()) {
    alert('Por favor, complete todos los campos.');
    return false;
  }

  if (!email.checkValidity()) {
    alert('Ingrese un correo electrónico válido.');
    return false;
  }

  if (phone.value.replace(/\D/g, '').length < 10) {
    alert('Ingrese un número de teléfono válido.');
    return false;
  }

  if (password.value !== passwordRepeat.value) {
    alert('Las contraseñas no coinciden.');
    return false;
  }

  return true;
}


const sign_up_button = document.getElementById("signup");

sign_up_button.addEventListener("click", function (e) {
    e.preventDefault()

    if (validateForm()) {
        window.location.href = "iniciar-sesion.html";
    }
    
});