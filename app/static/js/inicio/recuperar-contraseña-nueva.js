const change_pass_button = document.getElementById("change-pass");

change_pass_button.addEventListener("click", async function (e) {
    e.preventDefault()
    
    const password = document.getElementById('inputPassword');
    const passwordRepeat = document.getElementById('inputPasswordConfirm');
    if (!password.value.trim() || !passwordRepeat.value.trim()) {
        alert('Por favor, complete todos los campos.');
        return false;
    }

    if (password.value !== passwordRepeat.value) {
        alert('Las contraseñas no coinciden.');
       return
    }

    await updatePassword()
    
});

async function updatePassword() {
  const pass1 = document.getElementById('inputPassword').value.trim();

  const userData = JSON.parse(localStorage.getItem('recoveryUser'));

  if (!userData) {
    alert("No se encuentra información de usuario. Reinicie el proceso de recuperación");
    return;
  }

  // Update user object with new password
  const updatedUser = { ...userData, contrasena_hash: pass1 };
  const user_id = userData.id

  delete updatedUser.id;
  delete updatedUser.caracteristicas_usuario;
  delete updatedUser.dispositivos_asignados;
  delete updatedUser.dispositivos_gestionados;
  delete updatedUser.personas_confianza;
  delete updatedUser.plan;
  delete updatedUser.ubicaciones_creadas;
  delete updatedUser.rutas;
  delete updatedUser.ruta_activa;
  delete updatedUser.ubicacion;
  delete updatedUser.transacciones;
  delete updatedUser.modo_perdida;

  console.log(JSON.stringify(updatedUser))

  try {
    const response = await fetch(`http://127.0.0.1:5000/usuario/${user_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Add auth if needed: 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedUser)
    });

    const result = await response.json();

    if (response.ok) {
      alert("Contraseña actualizada exitosamente.");
      // Optionally clear stored recovery info
      localStorage.removeItem('recoveryUser');
      localStorage.removeItem('recoveryCode');
      window.location.href = "../";
    } else {
      alert(`Error: ${result.message || result.error}`);
    }
  } catch (error) {
    console.error("Error updating password:", error);
    alert("Error inesperado.");
  }
}
