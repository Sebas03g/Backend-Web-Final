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
            console.log(result.usuario);
            iniciarMonitoreo(result.usuario.ubicacion.id);
            window.location.href = '/user-type';
        } else {
            alert(result.message || "Error en el login");
        }

    } catch (err) {
        console.error("Error al iniciar sesión:", err);
    }
};


async function iniciarMonitoreo(id_ubicacion) {
    if ("geolocation" in navigator) {
        const watchId = navigator.geolocation.watchPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                try {
                    const response = await fetch(`http://127.0.0.1:5000/ubicacion-usuario/update-point/${id_ubicacion}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            lat: lat,
                            lng: lng
                        })
                    });
                    const data = await response.json();
                } catch (error) {
                    console.error("Error al enviar ubicación:", error);
                }
            },
            (error) => {
                console.error("Error al obtener la ubicación:", error.message);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
        return watchId;
    } else {
        alert("Geolocalización no disponible.");
    }
}

