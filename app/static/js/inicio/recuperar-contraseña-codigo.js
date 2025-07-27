const validate_button = document.getElementById("validate");

validate_button.addEventListener("click", function (e) {
    e.preventDefault()
    
    const code = document.getElementById('inputCode');
    
    if (!code.value.trim()) {
        alert('Campo no puede estar vacío.');
        return;
    }
    verifyCode()
});

function verifyCode() {
  const enteredCode = document.getElementById('inputCode').value.trim();
  const storedCode = localStorage.getItem('recoveryCode');

  if (!storedCode) {
    alert("No existe código registrado.");
    return;
  }

  if (enteredCode === storedCode) {
    alert("Código verificado correctamente.");
    window.location.href = "../password-recovery-new";
  } else {
    alert("Código incorrecto.");
  }
}