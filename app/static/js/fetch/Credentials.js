import { recargarDatos } from "../general/recargarDatos.js";
import { getDataById } from "./sentenciasFetch.js";
import { socket, enviarUbicacion, activarModoPerdida } from "./socketClient.js";

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
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    await iniciarMonitoreo(result.usuario.ubicacion.id);

                    const usuario = await getDataById("usuario", result.usuario.id);
                    sessionStorage.setItem("usuario", JSON.stringify(usuario));
                    window.location.href = '/user-type';
                },
                (error) => {
                    console.error("El usuario denegó el permiso de ubicación:", error.message);
                    alert("Se necesita acceso a tu ubicación para continuar.");
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        } else {
            alert(result.message || "Error en el login");
        }

    } catch (err) {
        console.error("Error al iniciar sesión:", err);
    }
};

export const logoutFunctionality = async() => {
    const response = await fetch('http://127.0.0.1:5000/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json' 
        },      
    });  
    
    if (response.ok) {
        sessionStorage.removeItem("usuario");
         window.location.href = '/';
     } else {
        alert(result.message || "Error en el logout");
    }
};

export const stateLostMode = async (id) => {
    try {
        activarModoPerdida(id);
        await recargarDatos();
        return true;
    } catch (error) {
        console.error("Error de red en stateLostMode:", error);
        return false;
    }
};

async function iniciarMonitoreo(id_ubicacion) {
    if ("geolocation" in navigator) {
        console.log("Iniciando monitoreo de ubicación");
        navigator.geolocation.watchPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                enviarUbicacion(lat, lng, id_ubicacion);
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
    } else {
        alert("Geolocalización no disponible.");
    }
}



