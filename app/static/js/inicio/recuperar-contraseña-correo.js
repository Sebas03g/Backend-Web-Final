function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const send_button = document.getElementById("send");

send_button.addEventListener("click",async function (e) {
    e.preventDefault()
    
    const email = document.getElementById('inputEmail');
    
    if (!email.checkValidity()) {
        alert('Ingrese un correo electrónico válido.');
        return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/usuario'); // Replace with actual endpoint
      if (!response.ok) throw new Error('Failed to fetch users');

      const users = await response.json();
      const matchedUser = users.find(user => user.correo_electronico === email.value);

      if (matchedUser) {
        localStorage.setItem('recoveryUser', JSON.stringify(matchedUser));
        await sendRecoveryCode(email.value);
        window.location.href = "../password-recovery-code";
      } else {
        alert('No existe un usuario para ese correo electrónico.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('No se ha podido completar la petición, intente otra vez.');
    }
});

async function sendRecoveryCode(email) {
  
  // Send POST request
  try {
    const response = await fetch('http://127.0.0.1:5000/send-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correo_electronico: email
      })
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      localStorage.setItem('recoveryCode', result.code);
      alert("Correo enviado con éxito. Revisa tu bandeja de entrada.");
    } else {
      console.error(`Error al enviar correo: ${result.message || result.error}`);
      throw new Error(error);
    }
  } catch (error) {
    console.error("Error al enviar correo:", error);
    throw new Error(error);
  }
}
