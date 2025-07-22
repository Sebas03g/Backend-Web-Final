import { eliminarClase } from '../general/utilidades.js'
import { slideDownElementos } from '../general/utilidades.js'
import { funcionPanelMensaje } from '../general/mensajesUsuario.js';
import * as validar from './validacion.js';
import { accionBotonContenedorUbicacionGeneral } from './funcionalidadUbicaciones.js'
import { eliminarUbicacion } from './funcionalidadUbicaciones.js';

let mapaUbicacion = null;
let marcadorSeleccionado = null;
let idUbicacion = null;
let areas = null;
let dataUsuario = null;

function recargarDatos(){
    dataUsuario = JSON.parse(sessionStorage.getItem("usuario"));
    areas = dataUsuario.ubicaciones_creadas
    
}

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
    idUbicacion = lista[0].id;
    lista.forEach(area => {
        let nuevoElementoLista = document.createElement("li");

        let nuevoBoton = document.createElement("button");
        nuevoBoton.classList.add("elementoLista");
        nuevoBoton.textContent = area.nombre_ubicacion;
        nuevoBoton.dataset.id = area.id;

        nuevoElementoLista.appendChild(nuevoBoton);

        nuevoElementoLista.addEventListener("click", () => {
            crearCartaUbicacion(listaBotones, nuevoBoton, area);
            idUbicacion = area.id;
        });
            
        listaBotones.appendChild(nuevoElementoLista);
    });

}

function crearCartaUbicacion(padre,elemento, elementoUbicacion){

    let mapa = crearMapa(elementoUbicacion);
    eliminarClase(padre.querySelectorAll(".elementoLista"), "seleccionado");
    elemento.classList.add("seleccionado");
    generarPuntos(elementoUbicacion, mapa);

    marcadorSeleccionado = elementoUbicacion.punto.split(",").map(Number);

    document.getElementById("nombreUbicacionGeneral").value = elementoUbicacion.nombre_ubicacion;
    document.getElementById("descripcionUbicacionGeneral").textContent = elementoUbicacion.descripcion;
    document.getElementById("miComboboxSeguridadGeneral").value = elementoUbicacion.tipo;
    document.getElementById("botonEliminarUbicacionGeneral").style.display = "inline";
    document.getElementById("botonAccionUbicacionGeneral").dataset.tipo = "modify";

    document.getElementById("botonEliminarUbicacionGeneral").addEventListener("click",() => {
        funcionPanelMensaje("¿Estás seguro de que deseas eliminar esta ubicacion?", "Esta acción no se puede deshacer. Toda la información relacionada será permanentemente eliminada.", "eliminar", "Eliminar");
        document.getElementById("btnAccionPanel").onclick = null
        document.getElementById("btnAccionPanel").addEventListener("click", async(e) => await recargarPaginaUbicacion(e));
    });
    
    mapa.invalidateSize();
}

function generarPuntos(elementoUbicacion, mapa){

    let area = L.circle(elementoUbicacion.punto.split(",").map(Number), {
        color: "black",
        fillColor: elementoUbicacion.tipo,
        fillOpacity: 0.3,
        radius: 100
    }).addTo(mapa);
    area.bindPopup(elementoUbicacion.nombre_ubicacion);
}

async function recargarPaginaUbicacion(e){
    const boton = e.target;

    if(boton.classList.contains("modificar")){
        console.log(marcadorSeleccionado);
        await accionBotonContenedorUbicacionGeneral(idUbicacion, dataUsuario.id, marcadorSeleccionado);
    }else{
        await eliminarUbicacion(idUbicacion)
    }

    recargarDatos();
    crearContenedorUbicacion();
}

function agregarFuncionesBusqueda(){

    document.getElementById("busquedaUbicacionGeneral").addEventListener('keyup', () => {
        let valor = document.getElementById("busquedaUbicacionGeneral").value;
        let lista = areas.filter(l => l.nombre_ubicacion.toLowerCase().includes(valor.toLowerCase()));
        if(valor === ""){
            lista = areas;
        }
        document.getElementById("listaUbicacionesGenerales").innerHTML = "";
        creacionListaUbicacion(lista);
    });
}

function crearMapa(elementoUbicacion) {

    if (mapaUbicacion) {
        mapaUbicacion.remove();
        mapaUbicacion = null;
    }

    console.log(elementoUbicacion);

    mapaUbicacion = L.map(document.getElementById("mapaUbicacionGeneral"), {
        center: elementoUbicacion.punto.split(",").map(Number),
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
                 document.getElementById("btnAccionPanel").onclick = null;
                 document.getElementById("btnAccionPanel").addEventListener("click", async(e) => await recargarPaginaUbicacion(e));
            }else{
                funcionPanelMensaje("Datos invalidos", "Los datos ingresados son invalidos.", "modificar", "Aceptar");
            }
    });
}

function crearUbicacion(listaBotones){

    document.getElementById("nombreUbicacionGeneral").value = "";
    document.getElementById("descripcionUbicacionGeneral").textContent = "";
    document.getElementById("miComboboxSeguridadGeneral").value = "";
    document.getElementById("botonAccionUbicacionGeneral").dataset.tipo = "create";
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
    console.log(mapa);
    mapa.on('click', function(e) {
        const { lat, lng } = e.latlng;
        console.log(marcadorSeleccionado);
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
    recargarDatos();
    abrirVentanaUbicacionesGenerales();
    cerrarMenu();
});