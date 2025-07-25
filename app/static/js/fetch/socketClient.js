export const socket = io("http://127.0.0.1:5000", {
  withCredentials: true,
});

export function enviarUbicacion(lat, lng, id_ubicacion) {
  socket.emit("actualizar_ubicacion", { lat, lng, id_ubicacion });
}

export function activarModoPerdida(id_usuario){
  socket.emit("activar_modo_alerta", {id_usuario})
}

export function activarDispositivo(id_dispositivo=null, codigo=null){

  if (codigo !== null && codigo !== undefined) {
    socket.emit("state-user", { codigo });
  } else if (id_dispositivo !== null && id_dispositivo !== undefined) {
    socket.emit("state-user", { id_dispositivo });
  } else {
    console.warn("No se proporcionó ni ID ni código");
  }

  
}

export function modificarPermisos(id_dispositivo, tipo){
  socket.emit("modify-permission", {id_dispositivo, tipo})
}