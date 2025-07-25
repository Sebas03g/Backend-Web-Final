import { accesoPermiso } from "../fetch/notificarUsuario.js";
import { funcionPanelMensaje } from '../general/mensajesUsuario.js';

export async function ValidarPermiso(dispositivo, nombre){
    const elemento = dispositivo.permisos_usuario.find(pu => pu.permiso.nombre == nombre);

    if (elemento == undefined){
        funcionPanelMensaje("Permiso Denegado", `El usuario no le ha dado acceso a este permiso: ${nombre}.`,  "informacion", "Aceptar");
        return false;
    }

    if(dispositivo.usuario_asignado.modo_perdida) return true;

    if(elemento.nivel == 2){
        funcionPanelMensaje("Notificacion Usuario", "Se notificara al usuario si se decide acceder a esta informacion.",  "informacion", "Aceptar");
        document.getElementById("btnAccionPanel").onclick = null;
        document.getElementById("btnAccionPanel").addEventListener("click", async(e) => {
            await accesoPermiso(elemento.permiso.id);
            return true;
        });

        document.getElementById("cerrarPanelMensajes").onclick = null;
        document.getElementById("cerrarPanelMensajes").addEventListener("click", async(e) => {
            return false;
        });

    }else if(elemento.nivel == 3){
        funcionPanelMensaje("Permiso Denegado", "Se necesita tener encendido el modo perdida para poder acceder a esta informacion.",  "informacion", "Aceptar");
        return false;
    }

    return true;

}