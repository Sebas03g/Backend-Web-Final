function isValidCardNumber(cardNumber) {
  const cleaned = cardNumber.replace(/\s+/g, ''); // remove spaces
  return /^\d{16}$/.test(cleaned);
}

function isValidCVV(cvv) {
  return /^\d{3,4}$/.test(cvv);
}

function isValidExpiryDate(expiry) {
  const match = expiry.match(/^(\d{2})\/(\d{2}|\d{4})$/);
  if (!match) return false;

  let [_, monthStr, yearStr] = match;
  const month = parseInt(monthStr, 10);
  let year = parseInt(yearStr, 10);

  if (month < 1 || month > 12) return false;

  // Normalize 2-digit year to full year
  if (yearStr.length === 2) {
    const currentYear = new Date().getFullYear() % 100;
    const century = Math.floor(new Date().getFullYear() / 100) * 100;
    year += year < currentYear ? century + 100 : century;
  }

  const expiryDate = new Date(year, month);
  const now = new Date();

  return expiryDate > now;
}





const submit_button = document.getElementById("submit");

submit_button.addEventListener("click", function () {

    const name = document.getElementById('inputName').value;
    const cardNumber = document.getElementById('inputCardNumber').value;
    const cvv = document.getElementById('inputcvv').value;
    const expiry = document.getElementById('inputExpiration').value;
    if (!name.trim() || !cardNumber.trim() || !cvv.trim() || !expiry.trim()) {
        alert('Por favor, complete todos los campos.');
        return false;
    }
    if (!isValidCardNumber(cardNumber)) {
        alert('Número inválido');
    } else if (!isValidCVV(cvv)) {
        alert('CVV inválido');
    } else if (!isValidExpiryDate(expiry)) {
        alert('Fecha de expiración inválida');
    } else {
        window.location.href = "metodos-pago.html";
    }
    
});