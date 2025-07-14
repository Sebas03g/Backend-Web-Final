const signup_button = document.getElementById("signup");

signup_button.addEventListener("click", function () {

    window.location.href = "registrarse.html";
    
});

const signin_button = document.getElementById("signin");

signin_button.addEventListener("click", function () {

    window.location.href = "iniciar-sesion.html";
    
});

const plan_buttons = document.querySelectorAll('.choose-plan');

plan_buttons.forEach(button => {
  button.addEventListener('click', () => {
    window.location.href = "registrarse.html";
  });
});