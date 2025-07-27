const signup_button = document.getElementById("signup");

signup_button.addEventListener("click", function () {

    window.location.href = "../sign-up";
    
});

const signin_button = document.getElementById("signin");

signin_button.addEventListener("click", function () {

    window.location.href = "../";
    
});

const plan_buttons = document.querySelectorAll('.choose-plan');

plan_buttons.forEach(button => {
  button.addEventListener('click', () => {
    window.location.href = "../sign-up";
  });
});