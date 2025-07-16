export const loginFunctionality = async (form) => {
    const data = {
        correo_electronico: form.mail.value,
        password: form.password.value
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data)            
        });

        const result = await response.json();

        if (response.ok) {
            sessionStorage.setItem("usuario", JSON.stringify(result.usuario));
            window.location.href = '/user-type';
        } else {
            alert(result.message || "Error en el login");
        }

    } catch (err) {
        console.error("Error al iniciar sesión:", err);
    }
};
