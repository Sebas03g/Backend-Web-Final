const plan_buttons = document.querySelectorAll('.choose-plan');

plan_buttons.forEach(button => {
  button.addEventListener('click', () => {
    plan_value = button.getAttribute("value");
    sessionStorage.setItem('plan', plan_value);
    switch (plan_value) {
        case "plan1":
            sessionStorage.setItem('plan_price', '0.00');
            break;

        case "plan2":
            sessionStorage.setItem('plan_price', '15.00');
            break;

        case "plan3":
            sessionStorage.setItem('plan_price', '30.00');
            break;

        default:
            console.log("Error.");
    }
    window.location.href = "anadir-compra.html";
  });
});
