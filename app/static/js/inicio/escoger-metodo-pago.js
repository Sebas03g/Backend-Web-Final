const buttons = document.querySelectorAll('.choose-payment');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    window.location.href = "checkout.html";
  });
});
