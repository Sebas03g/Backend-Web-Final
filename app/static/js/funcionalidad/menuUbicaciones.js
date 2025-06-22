import { eliminarClase } from '../utilidades.js'
import { slideDownElementos } from '../utilidades.js'
import { funcionPanelMensaje } from '../mensajesUsuario.js';
import * as validar from './validacion.js';

let mapaUbicacion = null;
let marcadorSeleccionado = null;

let areas = [
    {id:1, punto:[-2.8918931908671124, -79.03600936098859], nombre:"Zona Segura", descripcion:"Zona de bajo riesgo",tipo:"green"},
    {id:2, punto:[-2.9221155566716095, -79.0415370113893], nombre:"Zona Insegura", descripcion:"Zona con alto riesgo de secuestro",tipo:"red"}
]

function abrirVentanaUbicacionesGenerales(){

    const boton = document.getElementById("botonListaUbicaciones");

    boton.addEventListener("click", () => {

        document.getElementById("contenedor").classList.remove("abierto")
        document.getElementById('contenedorMenu').classList.remove('mostrar');
        document.getElementById('botonMenu').classList.remove('seleccionado');

        document.getElementById("contenedorUbicacionesGenerales").classList.toggle("activo");
        boton.classList.toggle("seleccionado");
        agregarFuncionesBusqueda();
        crearContenedorUbicacion();

    });
}

function cerrarMenu(){
    document.getElementById("cerrarMenu").addEventListener("click", () => {
        slideDownElementos(document.getElementById("contenedorUbicacionesGenerales"), 'activo');
        document.getElementById("botonListaUbicaciones").classList.remove("seleccionado");
    });
}

function creacionListaUbicacion(lista){
    const listaBotones = document.getElementById("listaUbicacionesGenerales");
    lista.forEach(area => {
        let nuevoElementoLista = document.createElement("li");

        let nuevoBoton = document.createElement("button");
        nuevoBoton.classList.add("elementoLista");
        nuevoBoton.textContent = area.nombre;
        nuevoBoton.dataset.id = area.id;

        nuevoElementoLista.appendChild(nuevoBoton);

        nuevoElementoLista.addEventListener("click", () => {
            console.log("SI")
            crearCartaUbicacion(listaBotones, nuevoBoton, area);
        });
            
        listaBotones.appendChild(nuevoElementoLista);
    });

}

function crearCartaUbicacion(padre,elemento, elementoUbicacion){

    let mapa = crearMapa(elementoUbicacion);
    eliminarClase(padre.querySelectorAll(".elementoLista"), "seleccionado");
    elemento.classList.add("seleccionado");
    generarPuntos(elementoUbicacion, mapa);

    marcadorSeleccionado = elementoUbicacion.punto;

    document.getElementById("nombreUbicacionGeneral").value = elementoUbicacion.nombre;
    document.getElementById("descripcionUbicacionGeneral").textContent = elementoUbicacion.descripcion;
    document.getElementById("miComboboxSeguridadGeneral").value = elementoUbicacion.tipo;
    document.getElementById("botonEliminarUbicacionGeneral").style.display = "inline";

    document.getElementById("botonEliminarUbicacionGeneral").addEventListener("click",() => {
        funcionPanelMensaje("¿Estás seguro de que deseas eliminar esta ubicacion?", "Esta acción no se puede deshacer. Toda la información relacionada será permanentemente eliminada.", "eliminar", "Eliminar");
    });
    
    mapa.invalidateSize();
}

function generarPuntos(elementoUbicacion, mapa){
    let area = L.circle(elementoUbicacion.punto, {
        color: "black",
        fillColor: elementoUbicacion.tipo,
        fillOpacity: 0.3,
        radius: 100
    }).addTo(mapa);
    area.bindPopup(elementoUbicacion.nombre);
}

function agregarFuncionesBusqueda(){

    document.getElementById("busquedaUbicacionGeneral").addEventListener('keyup', () => {
        let valor = document.getElementById("busquedaUbicacionGeneral").value;
        let lista = areas.filter(l => l.nombre.toLowerCase().includes(valor.toLowerCase()));
        if(valor === ""){
            lista = areas.ubicaciones;
        }
        document.getElementById("listaUbicacionesGenerales").innerHTML = "";
        creacionListaUbicacion(lista);
    });
}

function crearMapa(elementoUbicacion) {

    // Si ya hay un mapa, lo removemos correctamente
    if (mapaUbicacion) {
        mapaUbicacion.remove(); // destruye el mapa anterior
        mapaUbicacion = null;
    }

    // Creamos el nuevo mapa
    mapaUbicacion = L.map(document.getElementById("mapaUbicacionGeneral"), {
        center: elementoUbicacion.punto,
        zoom: 14,
        zoomControl: false
    });

    document.getElementById("mapaUbicacionGeneral")._leafletMap = mapaUbicacion;

    L.control.zoom({
        position: 'bottomright'
    }).addTo(mapaUbicacion);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mapaUbicacion);


    funcionalidadMapa();

    return mapaUbicacion;
}


function crearContenedorUbicacion(){
    let listBotonesUbicaciones = document.getElementById("listaUbicacionesGenerales");
    listBotonesUbicaciones.innerHTML = "";

    document.getElementById("crearUbicacionGeneral").addEventListener("click", () => crearUbicacion(Array.from(listBotonesUbicaciones.querySelectorAll(".elementoLista"))));

    creacionListaUbicacion(areas);

    crearCartaUbicacion(listBotonesUbicaciones, Array.from(listBotonesUbicaciones.querySelectorAll(".elementoLista"))
    .find(l => l.dataset.id = areas[0].id), areas[0]);

    document.getElementById("contenedorUbicacionesGenerales").querySelector(".btnModificar").addEventListener("click", () => {
            if(validar.validarUbicacion(marcadorSeleccionado, "General")){
                 funcionPanelMensaje("¿Estás seguro de que deseas administrar esta Ubicacion?", "Esta informacion sera registrada de forma permamente para todos los usuarios.", "modificar", "Crear");
            }else{
                funcionPanelMensaje("Datos invalidos", "Los datos ingresados son invalidos.", "modificar", "Aceptar");
            }
    });
}

function crearUbicacion(listaBotones){

    document.getElementById("nombreUbicacionGeneral").value = "";
    document.getElementById("descripcionUbicacionGeneral").textContent = "";
    document.getElementById("miComboboxSeguridadGeneral").value = "";
    eliminarClase(listaBotones, "seleccionado");

    if (mapaUbicacion) {
        mapaUbicacion.remove(); // destruye el mapa anterior
        mapaUbicacion = null;
    }

    // Creamos el nuevo mapa
    mapaUbicacion = L.map(document.getElementById("mapaUbicacionGeneral"), {
        center: [-2.8918931908671124, -79.03600936098859],
        zoom: 14,
        zoomControl: false
    });

    document.getElementById("mapaUbicacionGeneral")._leafletMap = mapaUbicacion;
    document.getElementById("botonEliminarUbicacionGeneral").style.display = "none";
    L.control.zoom({
        position: 'bottomright'
    }).addTo(mapaUbicacion);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mapaUbicacion);

    mapaUbicacion.invalidateSize();
    funcionalidadMapa();

}

function funcionalidadMapa(){
    const mapa = document.getElementById("mapaUbicacionGeneral")._leafletMap;

    mapa.on('click', function(e) {
        const { lat, lng } = e.latlng;
        if (marcadorSeleccionado !== null) {
            mapa.removeLayer(marcadorSeleccionado);
            marcadorSeleccionado = null;
        }
        marcadorSeleccionado = L.circle([lat, lng], {
                                    radius: 100,
                                    fillColor: 'lightblue',
                                    fillOpacity: 0.8,
                                    color: 'black'
                                    }).addTo(mapa);
        marcadorSeleccionado.bindPopup("Nueva Area").openPopup();

        mapa.invalidateSize();
    });
}


document.addEventListener("DOMContentLoaded", () => {
    abrirVentanaUbicacionesGenerales();
    cerrarMenu();
});