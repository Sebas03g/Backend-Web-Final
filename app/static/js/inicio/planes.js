import { loginFunctionality, logoutFunctionality } from "../fetch/Credentials.js";
const logout_button = document.getElementById("logout");
const dataUsuario = JSON.parse(sessionStorage.getItem("usuario"));
logout_button.addEventListener("click", function () {
  logoutFunctionality();
})
const plan_buttons = document.querySelectorAll('.choose-plan');
plan_buttons.forEach(button => {
  button.addEventListener('click', () => {
    const plan_value = button.getAttribute("value");
    sessionStorage.setItem('plan', plan_value);
    switch (plan_value) {
        case "plan1":
            sessionStorage.setItem('plan_price', '0.00');
            sessionStorage.setItem('plan_id', 1);
            
            break;

        case "plan2":
            sessionStorage.setItem('plan_price', '15.00');
            sessionStorage.setItem('plan_id', 2);
            if(dataUsuario.id_plan == 2){
              button.disabled = true;
            }
            break;

        case "plan3":
            sessionStorage.setItem('plan_price', '30.00');
            sessionStorage.setItem('plan_id', 3);
            if(dataUsuario.id_plan == 3){
              button.disabled = true;
            }
            break;

        default:
            console.log("Error.");
    }

    if(dataUsuario.id_plan != sessionStorage.getItem("plan_id")){
      window.location.href = "/add-purchase";
    }
    
  });
});
