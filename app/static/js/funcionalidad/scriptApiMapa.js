import { eliminarClase } from '../general/utilidades.js';
import { funcionPanelMensaje } from '../general/mensajesUsuario.js';
import { socket, enviarUbicacion } from '../fetch/socketClient.js'
import { recargarDatos as recargarTodosDatos } from '../general/recargarDatos.js';
import { ValidarPermiso } from './controlPermisos.js';

let puntosRuta = [];
let areasCreadas = [];
let dataGestor;
let marcadores = {}

let listaDispositivos;
const mapa = creacionMapa();

function recargarDatos(){
    const dataUsuario = JSON.parse(sessionStorage.getItem("usuario"));
    listaDispositivos = dataUsuario.dispositivos_gestionados;
    listaDispositivos = listaDispositivos.filter(l => l.estado)
    dataGestor = dataUsuario;
}

socket.on('ubicacion_actualizada', (data) => {
  const marker = marcadores[data.id];
  if (marker) {
    marker.setLatLng([data.lat, data.lng]);
    marker.bindPopup(data.nombre || "Sin nombre").openPopup();
  }
});

function crearIcono(nombre){
  const icono = L.divIcon({
    html:  `<img src='../static/images/imagenCelular.png' alt='${nombre}' width="20" height="40" style="filter: brightness(50%);">`,
    className: '',
    iconSize: [30, 30],
    iconAnchor: [15, 30],  // punto que toca el suelo
    popupAnchor: [0, -30]
  });

  return icono
}

function crearPopUp(dispositivo){
  const cadena = `
  <div id="${dispositivo.id}" class="popup">
    <h6>${dispositivo.nombre_completo}</h6>
    <p>${dispositivo.estado ? "Activo":"Desactivo"}</p>
    <div class="contenedorIconos">
      <div id="microfonoDispositivo_${dispositivo.id}" class="micDispostivo iconosPoup">
        <i class="bi bi-mic"></i>
      </div>
    </div>
  </div>
`
  return cadena
}


function crearMarker(mapa){

  listaDispositivos.forEach(async(dispositivo) => {

    const permisoUbicacion = await ValidarPermiso(dispositivo, "Ver Ubicación en vivo")

    if(permisoUbicacion){
      const punto = dispositivo.usuario_asignado.ubicacion.punto.split(",").map(Number);

      const marker = L.marker(punto, {icon: crearIcono(dispositivo.nombre), pane: "dispositivo"}).addTo(mapa).bindPopup(crearPopUp(dispositivo), {closeOnClick: false })
      
      marker.customId = dispositivo.id;
      marker.on('click', function () {
        mapa.flyTo(marker.getLatLng(), 18);
        document.getElementById("contenedor").classList.remove("abierto");
        document.getElementById("modificarPersona").classList.remove("abierto");
        document.getElementById("creacionPersona").classList.remove("abierto");
        abrirMenuDispositivos(dispositivo.id);
      });

      marker.on('popupopen', async function () {
        iconoMicrofono(dispositivo);
        const permisoRuta = await ValidarPermiso(dispositivo, "Ver ruta");
        if(permisoRuta){
          crearRuta(dispositivo.usuario_asignado.ruta_activa, mapa);
        }
        crearAreasPersona(dispositivo.usuario_asignado.ubicaciones_creadas, mapa);
      });
      marcadores[dispositivo.id] = marker;
    }

  });

}

function crearAreasPersona(areas, mapa){
  let areaCreada;

  areasCreadas.forEach(area => area.remove());
  areasCreadas = []

  areas.forEach(area => {
    areaCreada = L.circle(area.punto.split(",").map(Number),{
      color: "black",
      pane: "zona",
      fillColor: area.tipo,
      fillOpacity: 0.3,
      radius: 100
    }).addTo(mapa)

    areaCreada.bindPopup(area.nombre_ubicacion);

    areasCreadas.push(areaCreada);
  });

}



function crearRuta(ruta, mapa) {
  let puntoCreado;
  puntosRuta.forEach(punto => punto.remove());
  puntosRuta = []

  const iconoPunto = L.divIcon({
    html: '<i class="bi bi-dot" style="color: blue; font-size: 50px;"></i>',
    className: '',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0, -25]
  });
  if(ruta){
    ruta.puntos.forEach(punto => {
      nuevoPunto = [punto.punto.lat, punto.punto.lng]
      puntoCreado = L.marker(nuevoPunto, { icon: iconoPunto, pane: "punto"}).addTo(mapa);
      puntoCreado.bindPopup(punto.fecha);
      puntosRuta.push(puntoCreado)
    });
  }
  
}


function abrirMarker(elementoDispositivo, mapa) {
  elementoDispositivo.forEach(dispositivo => {
    dispositivo.querySelector("label").addEventListener("click", () => {
      Object.values(marcadores).forEach(m => m.closePopup());
      const marker = marcadores[dispositivo.dataset.idDispositivo];
      if (marker) {
        marker.openPopup();
        mapa.flyTo(marker.getLatLng(), 18);
      } else {
        console.warn("No se encontró el marcador para el dispositivo con ID:", dispositivo.dataset.idDispositivo);
      }
    });
  });
}


export function crearAreas(){
  recargarDatos();
  let areas = dataGestor.ubicaciones_creadas
  mapa.eachLayer(function (layer) {
    if (layer instanceof L.Circle) {
      mapa.removeLayer(layer);
    }
  });

  areas.forEach(area => {
    let areaCirculo = L.circle(area.punto.split(","),{
      color: "black",
      pane: "zona",
      fillColor: area.tipo,
      fillOpacity: 0.3,
      radius: 100
    }).addTo(mapa)

    areaCirculo.bindPopup(area.nombre_ubicacion);
  });
}


function creacionMapa() {
  var map = L.map('mapa',{
    center: [-2.8918931908671124, -79.03600936098859],
    zoom: 20,
    zoomControl: false 
  });

  map.createPane("punto");
  map.getPane('punto').style.zIndex = 640;

  map.createPane("zona");
  map.getPane('zona').style.zIndex = 630;

  map.createPane("dispositivo");
  map.getPane('dispositivo').style.zIndex = 650;

  L.control.zoom({
    position: 'topright' 
  }).addTo(map);

  // Añade el mapa base (OpenStreetMap gratuito)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  document.getElementById("btn-creacion").addEventListener("click", () => {map.closePopup();});
  return map;

}

function abrirMenuDispositivos(id) {
  eliminarClase(document.querySelectorAll(".elementoDispositivo"), "seleccionado");

  for (const elemento of document.querySelectorAll(".elementoDispositivo")) {
    if (elemento.dataset.idDispositivo == id) {
      elemento.classList.add("seleccionado");
      break;
    }
  }
  document.getElementById("contenedorMenu").classList.add("mostrar");
  document.getElementById('botonMenu').classList.add('seleccionado');
}

function iconoMicrofono(dispositivo){
    document.querySelectorAll(".micDispostivo").forEach(icono => {
      icono.addEventListener("click", () => {
        if(ValidarPermiso(dispositivo, "Escuchar audio en vivo")){
          if (icono.innerHTML === '<i class="bi bi-mic-fill"></i>'){
            icono.innerHTML = '<i class="bi bi-mic"></i>';
          }else{
            icono.innerHTML = '<i class="bi bi-mic-fill"></i>';
          }
        }else{
          funcionPanelMensaje("No tiene permiso", "Esta acción requiere permisos que el gestor aún no tiene. Pide al usuario que te otorgue acceso para continuar.", "comunicacion", "Solicitar");
        }
      });
    });
}

document.addEventListener("DOMContentLoaded", async function(){
    const elementosDispositivos = document.querySelectorAll(".elementoDispositivo");

    recargarDatos();
    crearMarker(mapa);
    abrirMarker(elementosDispositivos, mapa); 
    crearAreas(mapa);

});
