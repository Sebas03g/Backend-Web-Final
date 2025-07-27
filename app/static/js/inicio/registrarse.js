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
      const userData = {
        cedula: "1105661902",
        nombre_completo: document.getElementById("inputName").value,
        correo_electronico: document.getElementById("inputEmail").value,
        telefono: document.getElementById("inputPhone").value,
        fecha_nacimiento: document.getElementById("inputBirthdate").value + "T00:00:00",
        contrasena_hash: document.getElementById("inputPassword").value,
        monitoreo: true,
        es_monitor: false,
        imagen: "default.jpg",
        eliminado: false,
        id_plan: 1
      };
      if (signupUser(userData)) {
        window.location.href = "../";
      }
    }
    
});

function signupUser(userData) {
  fetch("https://127.0.0.1:5000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
    .then(response => {
      if (!response.ok) {
        console.log(response.json())
        throw new Error(`Error: ${response.status}`);
      }
    })
    .then(data => {
      console.log("Signup successful:", data);
      alert("Registro exitoso!");
      return true;
    })
    .catch(error => {
      console.error("Signup failed:", error);
      alert("Error en el registro.");
      return false;
    });
}