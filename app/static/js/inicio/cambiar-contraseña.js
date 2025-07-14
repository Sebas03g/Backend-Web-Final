const change_pass = document.getElementById("change-pass");

function validateForm() {
  const current_password = document.getElementById('inputPassword');
  const new_password = document.getElementById('inputNewPassword');
  const passwordRepeat = document.getElementById('inputPasswordConfirm');

  if (!current_password.value.trim() || !new_password.value.trim() || !passwordRepeat.value.trim()) {
    alert('Por favor, complete todos los campos.');
    return false;
  }

  if (new_password.value !== passwordRepeat.value) {
      alert('Las contraseñas no coinciden.');
      return false;
  }

  return true;
}

change_pass.addEventListener("click", function (e) {
  e.preventDefault()
  if(!validateForm()){
    return;
  }
  window.location.href = "cuenta.html";
});