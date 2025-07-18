import { eliminarClase } from '../general/utilidades.js';
import { funcionPanelMensaje } from '../general/mensajesUsuario.js';

let listaMarkers = [];
let puntosRuta = [];
let areasCreadas = [];


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
  <div id="${dispositivo.id} class="popup">
    <h6>${dispositivo.nombre}</h6>
    <p>${dispositivo.estado}</p>
    <div class="contenedorIconos">
      <div id="microfonoDispositivo_${dispositivo.id}" class="micDispostivo iconosPoup">
        <i class="bi bi-mic"></i>
      </div>
      <div class="iconosPoup">
        ${dispositivo.bateria}
      </div>
    </div>
  </div>
`
  return cadena
}


function crearMarker(mapa, listaDispositivos){

  listaDispositivos.forEach(dispositivo => {

    const marker = L.marker(dispositivo.ubicacion, {icon: crearIcono(dispositivo.nombre), pane: "dispositivo"}).addTo(mapa).bindPopup(crearPopUp(dispositivo), {closeOnClick: false })
    
    marker.customId = dispositivo.id;
    marker.on('click', function () {
      mapa.flyTo(marker.getLatLng(), 18);
      document.getElementById("contenedor").classList.remove("abierto");
      document.getElementById("modificarPersona").classList.remove("abierto");
      document.getElementById("creacionPersona").classList.remove("abierto");
      abrirMenuDispositivos(dispositivo.id);
    });

    marker.on('popupopen', function () {
      iconoMicrofono(dispositivo);
      crearRuta(dispositivo.ruta, mapa);
      crearAreasPersona(dispositivo.ubicaciones, mapa);
    });
    
    listaMarkers.push(marker);
    

  });

}

function crearAreasPersona(areas, mapa){
  let areaCreada;

  areasCreadas.forEach(area => area.remove());
  areasCreadas = []

  areas.forEach(area => {
    areaCreada = L.circle(area.punto,{
      color: "black",
      pane: "zona",
      fillColor: area.tipo,
      fillOpacity: 0.3,
      radius: 100
    }).addTo(mapa)

    areaCreada.bindPopup(area.nombre);

    areasCreadas.push(areaCreada);
  });



}

function crearRuta(ruta, mapa) {
  let puntoCreado;
  puntosRuta.forEach(punto => punto.remove());
  puntosRuta = []

  const iconoPunto = L.divIcon({
    html: '<i class="bi bi-dot" style="color: blue; font-size: 50px;"></i>',
    className: '', // evita clases predeterminadas
    iconSize: [50, 50], // coincide con el tamaño del icono visual
    iconAnchor: [25, 25], // centro del ícono
    popupAnchor: [0, -25]
  });
  ruta.forEach(punto => {
    puntoCreado = L.marker(punto.ubicacion, { icon: iconoPunto, pane: "punto"}).addTo(mapa);
    puntoCreado.bindPopup(punto.hora);
    puntosRuta.push(puntoCreado)
  });
}


function abrirMarker(listaDispositivos, mapa){
  listaDispositivos.forEach(dispositivo => {
    listaMarkers.forEach(m => m.closePopup());
    dispositivo.querySelector("label").addEventListener("click", () => {
      console.log("dispositivo.dataset.idDispositivo")
      console.log(dispositivo.dataset.idDispositivo)
      const marker = listaMarkers.find(m => m.customId == dispositivo.dataset.idDispositivo);
      marker.openPopup();
      mapa.flyTo(marker.getLatLng(), 18);
    })
  });
}

function crearAreas(mapa, areas){
  areas.forEach(area => {
    let areaCirculo = L.circle(area.punto,{
      color: "black",
      pane: "zona",
      fillColor: area.tipo,
      fillOpacity: 0.3,
      radius: 100
    }).addTo(mapa)

    areaCirculo.bindPopup(area.nombre);
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

        if(dispositivo.permisos.find(l => l.id == 6)){
        
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

document.addEventListener("DOMContentLoaded", function(){
    const mapa = creacionMapa();
    const elementosDispositivos = document.querySelectorAll(".elementoDispositivo");

    let listaDispositivos = [
        {id:"1", nombre: "Sophia", ubicacion:[-2.8918931908671124, -79.03600936098859], estado: "Activo", bateria:'<i class="bi bi-battery-full"></i>', ruta : [
          {"hora": "11:20 pm", "ubicacion": [-2.882000, -79.036500]},
          {"hora": "11:25 pm", "ubicacion": [-2.883500, -79.036400]},
          {"hora": "11:30 pm", "ubicacion": [-2.885000, -79.036300]},
          {"hora": "11:35 pm", "ubicacion": [-2.886500, -79.036200]},
          {"hora": "11:40 pm", "ubicacion": [-2.888000, -79.036100]},
          {"hora": "11:45 pm", "ubicacion": [-2.889500, -79.036050]},
          {"hora": "11:50 pm", "ubicacion": [-2.890500, -79.036030]},
          {"hora": "11:55 pm", "ubicacion": [-2.891000, -79.036020]},
          {"hora": "12:00 am", "ubicacion": [-2.891400, -79.036015]},
          {"hora": "12:05 am", "ubicacion": [-2.891700, -79.036012]},
          {"hora": "12:10 am", "ubicacion": [-2.8918931908671124, -79.03600936098859]}
        ], ubicaciones: [
          {id:"1", idPersona:"1", punto:[-2.859448, -78.963261], nombre:"Casa", tipo:"green", descripcion:"Case de Sophia"},
          {id:"2", idPersona:"1",punto:[-2.8913363513451396, -78.97706831779115], nombre:"Casa ex-novio", tipo:"red", descripcion:"Casa del ex-novia abusivo."},
        ],permisos:[
          {"id":1, "nivel":"1"},{"id":2, "nivel":"1"},{"id":3, "nivel":"1"},
          {"id":4, "nivel":"1"},{"id":5, "nivel":"1"},{"id":6, "nivel":"1"},
          {"id":7, "nivel":"1"},{"id":8, "nivel":"1"},{"id":9, "nivel":"1"}
        ]
      }, 
        {id:"2", nombre:"Kevin", ubicacion:[-2.901802569814168, -79.01013786641367], estado: "Desactivo", bateria:'<i class="bi bi-battery"></i>', ruta: [], ubicaciones: [
          {id:"3", idPersona:"2", punto:[-2.8913363513451396, -78.97706831779115], nombre:"Casa", tipo:"green", descripcion:"Case de Kevin"},
          {id:"4", idPersona:"2",punto:[-2.906395, -79.020527], nombre:"Casa padre", tipo:"red", descripcion:"Casa del padre abusivo."}
        ],permisos:[
          {"id":1, "nivel":"1"},{"id":2, "nivel":"1"},{"id":9, "nivel":"1"}
        ]
      }
    ]
    let areas = [
      {punto:[-2.8918931908671124, -79.03600936098859], nombre:"Zona Segura", tipo:"green"},
      {punto:[-2.9221155566716095, -79.0415370113893], nombre:"Zona Insegura", tipo:"red"}
    ]

    crearMarker(mapa, listaDispositivos);
    abrirMarker(elementosDispositivos, mapa); 
    crearAreas(mapa, areas);

});
