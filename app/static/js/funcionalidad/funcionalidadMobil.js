import { eliminarClase } from '../utilidades.js'

function agregarFuncionalidadNav(){
    const elemento = document.getElementById("menuNavMobil").querySelector("i");
    const listaElementos = document.getElementById("menuNavMobil").querySelector(".linksNavMobil");
    elemento.addEventListener("click", () => {
        elemento.classList.add("seleccionado")
        listaElementos.classList.add("mostrar");
        agregarFuncionalidadLinkNav(listaElementos.querySelectorAll("li"));
    });
    document.addEventListener("click", (e) => {
        if(document.getElementById("menuNavMobil").querySelector("i") != e.target){
            elemento.classList.remove("seleccionado")
            listaElementos.classList.remove("mostrar");
        }
    });
}

function agregarFuncionalidadLinkNav(listaElementos){
    listaElementos.forEach(elemento => {
        elemento.addEventListener("click", () => {
            eliminarClase(listaElementos, "seleccionado");
            let elementos = document.getElementById("contenedores").querySelectorAll(".hijo");
            eliminarClase(elementos, "activo");
            elemento.classList.add("seleccionado");
            document.getElementById(elemento.querySelector("a").dataset.nombreContenedor).classList.add("activo");
        });
    });
} 

function agregarFuncionalidadContenedor(dispositivos){
    dispositivos.forEach(dispositivo => {
            dispositivo.querySelector(".settingsDispositivo").addEventListener('click',() => {
                agregarFuncionalidadNav();
                agregarFuncionalidadIconos();
            });
        });
}

function iconoInformacion(){
    document.getElementById("iconoDispositivoMobil").addEventListener("click", () => {
        document.getElementById("contenedorInformacion").querySelector(".dispositivo").classList.add("mostrar");
    });
    document.addEventListener("click", (e) => {
        if(document.getElementById("iconoDispositivoMobil") != e.target){
            document.getElementById("contenedorInformacion").querySelector(".dispositivo").classList.remove("mostrar");
        }
    });
}

function iconosPermisos(){
    document.getElementById("iconoMobilBusquedaPermisos").addEventListener("click", () => {
        document.getElementById("contenedorPermisos").querySelector(".busqueda").classList.add("mostrar");
    });
    document.addEventListener("click", (e) => {
        if(document.getElementById("iconoMobilBusquedaPermisos") != e.target){
            document.getElementById("contenedorPermisos").querySelector(".busqueda").classList.remove("mostrar");
        }
    });
}

function iconosUbicacion(){
    document.getElementById("iconoMobilBusquedaUbicacion").addEventListener("click", () => {
        document.getElementById("contenedorUbicacion").querySelector(".busqueda").classList.add("mostrar");
        document.getElementById("mapaUbicacion").classList.remove("mostrar");
    });
    document.getElementById("iconoMobilUbicacion").addEventListener("click", () => {
        document.getElementById("mapaUbicacion").classList.add("mostrar");
        const mapa = document.getElementById("mapaUbicacion")._leafletMap;
        mapa.invalidateSize();
        document.getElementById("contenedorUbicacion").querySelector(".busqueda").classList.remove("mostrar");
    });

    document.addEventListener("click", (e) => {
        if(document.getElementById("iconoMobilBusquedaUbicacion") != e.target && document.getElementById("iconoMobilUbicacion") != e.target &&  
        document.getElementById("busquedaUbicacion") != e.target && document.getElementById("mapaUbicacion") != e.target){
            document.getElementById("contenedorUbicacion").querySelector(".busqueda").classList.remove("mostrar");
            document.getElementById("mapaUbicacion").classList.remove("mostrar");
        }
    });
}

function iconosUbicacionGeneral(){
    document.getElementById("iconoMobilBusquedaUbicacionGeneral").addEventListener("click", () => {
        document.getElementById("contenedorUbicacionesGenerales").querySelector(".busqueda").classList.add("mostrar");
        document.getElementById("mapaUbicacionGeneral").classList.remove("mostrar");
    });
    document.getElementById("iconoMobilUbicacionGeneral").addEventListener("click", () => {
        console.log("SI")
        document.getElementById("mapaUbicacionGeneral").classList.add("mostrar");
        const mapa = document.getElementById("mapaUbicacionGeneral")._leafletMap;
        mapa.invalidateSize();
        document.getElementById("contenedorUbicacionesGenerales").querySelector(".busqueda").classList.remove("mostrar");
    });

    document.addEventListener("click", (e) => {
        if(document.getElementById("iconoMobilBusquedaUbicacionGeneral") != e.target && document.getElementById("iconoMobilUbicacionGeneral") != e.target &&  
        document.getElementById("busquedaUbicacionGeneral") != e.target && document.getElementById("mapaUbicacionGeneral") != e.target){
            document.getElementById("contenedorUbicacionesGenerales").querySelector(".busqueda").classList.remove("mostrar");
            document.getElementById("mapaUbicacionGeneral").classList.remove("mostrar");
        }
    });
}

function iconosPersonas(){
    document.getElementById("iconoMobilBusquedaPersona").addEventListener("click", () => {
        document.getElementById("contenedorPersonas").querySelector(".busqueda").classList.add("mostrar");
        document.getElementById("imgConfianza").classList.remove("mostrar");
    });
    document.getElementById("iconoMobilPersona").addEventListener("click", () => {
        document.getElementById("imgConfianza").classList.add("mostrar");
        document.getElementById("contenedorPersonas").querySelector(".busqueda").classList.remove("mostrar");
    });
    document.addEventListener("click", (e) => {
        if(document.getElementById("iconoMobilBusquedaPersona") != e.target && document.getElementById("iconoMobilPersona") != e.target &&  
        document.getElementById("busquedaPC") != e.target && document.getElementById("imgConfianza") != e.target){
            document.getElementById("contenedorPersonas").querySelector(".busqueda").classList.remove("mostrar");
            document.getElementById("imgConfianza").classList.remove("mostrar");
        }
    });
}

function agregarFuncionalidadIconos(){
    iconoInformacion();
    iconosPermisos();
    iconosUbicacion();
    iconosPersonas();

}

document.addEventListener("DOMContentLoaded", () => {
    const dispositivos = document.getElementById("listaDispositivos").querySelectorAll(".elementoDispositivo");   
    agregarFuncionalidadContenedor(dispositivos);
    iconosUbicacionGeneral();
});