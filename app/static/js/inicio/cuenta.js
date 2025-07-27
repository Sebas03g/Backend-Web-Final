import { loginFunctionality, logoutFunctionality } from "../fetch/Credentials.js";
import { updateData } from "../fetch/sentenciasFetch.js";

const logout_button = document.getElementById("logout");

const dataUsuario = JSON.parse(sessionStorage.getItem("usuario"));

logout_button.addEventListener("click", function () {
  logoutFunctionality();
})


const ids = ["name", "email", "phone"];
const edit_button = document.getElementById("edit");
const save_button = document.getElementById("save");
const change_pass = document.getElementById("change-pass");

edit_button.addEventListener("click", function () {

    ids.forEach(function(id) {
        const span = document.getElementById(id);
          const input = document.createElement("input");
          input.type = "text";
          input.value = span.textContent;
          input.id = span.id;
  
          span.replaceWith(input);
    });

    edit_button.style.display = "none";
    save_button.style.display = "";
    change_pass.style.display = "none";

    
});

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validateForm() {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');

  if (!name.value.trim() || !email.value.trim() || !phone.value.trim()) {
    alert('Por favor, complete todos los campos.');
    return false;
  }

  if (!isValidEmail(email.value)) {
    alert('Ingrese un correo electrónico válido.');
    return false;
  }

  if (phone.value.replace(/\D/g, '').length < 10) {
    alert('Ingrese un número de teléfono válido.');
    return false;
  }

  return true;
}

function UpdateUserData(){
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');

  console.log("BIEN");
  console.log(dataUsuario);

  name.textContent  = dataUsuario.nombre_completo;
  email.textContent  = dataUsuario.correo_electronico;
  phone.textContent  = dataUsuario.telefono;
}

save_button.addEventListener("click", async function () {
    
    if (!validateForm()) {
        return;
    }

    ids.forEach(function(id) {
        const input = document.getElementById(id);
          const span = document.createElement("span");
          span.type = "text";
          span.textContent = input.value;
          span.id = input.id;
  
          input.replaceWith(span);
    });

    actualizarDatos();

    edit_button.style.display = "";
    save_button.style.display = "none";
    change_pass.style.display = "";

});

const actualizarDatos = async() => {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');

    const data = {
      nombre_completo: name.textContent,
      correo_electronico: email.textContent,
      telefono: phone.textContent
    }

    await updateData("usuario", data, dataUsuario.id);
}

change_pass.addEventListener("click", function () {
    window.location.href = "../password-recovery-email";
});

document.addEventListener("DOMContentLoaded", function() {
  UpdateUserData();
  console.log("HOLA");
});

