export const socket = io("http://127.0.0.1:5000", {
  withCredentials: true,
});

export function enviarUbicacion(lat, lng, id_ubicacion) {
  socket.emit("actualizar_ubicacion", { lat, lng, id_ubicacion });
}

export function activarModoPerdida(id){
  socket.emit("activar_modo_alerta", {id})
}
