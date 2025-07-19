import { eliminarClase } from '../general/utilidades.js'
import { funcionPanelMensaje } from '../general/mensajesUsuario.js';
import { getAllData } from '../fetch/sentenciasFetch.js';

let gestores;

let ubicaciones;

let personasConfianza;
let permisos;

async function getPermisos(){
    permisos =  await getAllData("permiso");
}

function reloadData(){
    const dataUsuario = JSON.parse(sessionStorage.getItem("usuario"));

    gestores = dataUsuario.dispositivos_asignados;

    ubicaciones = dataUsuario.ubicaciones_creadas;

    personasConfianza = dataUsuario.personas_confianza
}


function crearContenedores(){
    crearContenedorGestores();
    crearContenedorPC();
    crearContenedorPermisos();
    crearContenedorUbicaciones();
}

function crearContenedorGestores(){
    crearListaGestores(gestores);
    document.getElementById("busquedaGestor").addEventListener("keyup", (e) => {
        let listaFiltradaGestores = gestores.filter(l => l.nombre_completo.toUpperCase().includes(e.target.value.toUpperCase()));
        crearListaGestores(listaFiltradaGestores);
    });

}

function crearListaGestores(listaFiltradaGestores){
    let listaGestores = document.getElementById("listaGestores");
    listaGestores.innerHTML = "";
    listaFiltradaGestores.forEach(gestor => {
        const nuevoElementoLista = document.createElement("li");

        const nuevoBoton = document.createElement("button")
        nuevoBoton.classList.add("elementoLista");
        nuevoBoton.textContent = gestor.nombre_completo;
        nuevoBoton.dataset.idGestor = gestor.id;
        
        const nuevoInput = document.createElement("input")
        nuevoInput.type = "checkbox";
        nuevoInput.name = `${gestor.id}GestorCheckBox`
        nuevoInput.checked = gestor.estado;

        nuevoElementoLista.appendChild(nuevoBoton);
        nuevoElementoLista.appendChild(nuevoInput);

        listaGestores.appendChild(nuevoElementoLista);

    });
}

function crearContenedorPC(){
    crearListaPCs(personasConfianza);
    document.getElementById("busquedaPC").addEventListener("keyup", (e) => {
        let listaFiltradaPC = personasConfianza.filter(l => l.nombre.toUpperCase().includes(e.target.value.toUpperCase()));
        crearListaPCs(listaFiltradaPC);
    });
}

function crearListaPCs(listaFiltradaPC){
    let listaPCs = document.getElementById("listaPCs");
    listaPCs.innerHTML = "";
    listaFiltradaPC.forEach(persona => {
        const nuevoElementoLista = document.createElement("li");

        const nuevoBoton = document.createElement("button")
        nuevoBoton.classList.add("elementoLista");
        nuevoBoton.textContent = persona.nombre;
        nuevoBoton.dataset.idPC = persona.id;
        
        nuevoElementoLista.appendChild(nuevoBoton);

        listaPCs.appendChild(nuevoElementoLista);
    });
}

function crearContenedorPermisos(){
    let listaPermisos = document.getElementById("listaPermisos");
    listaPermisos.innerHTML = "";

    permisos.forEach(permiso => {
        const nuevoElementoLista = document.createElement("li");

        const nuevoBoton = document.createElement("button")
        nuevoBoton.classList.add("elementoLista");
        nuevoBoton.textContent = permiso.nombre;
        nuevoBoton.dataset.idPermiso = permiso.id;

        const nuevoInput = document.createElement("input")
        nuevoInput.type = "checkbox";
        nuevoInput.name = `${permiso.id}PermisoCheckBox`
        nuevoInput.checked = permiso.estado;
        
        nuevoElementoLista.appendChild(nuevoBoton);
        nuevoElementoLista.appendChild(nuevoInput);

        listaPermisos.appendChild(nuevoElementoLista);
    });
}

function crearContenedorUbicaciones(){
    
    crearListaUbicaciones(ubicaciones);
    document.getElementById("busquedaUbicacion").addEventListener("keyup", (e) => {
        let listaFiltradaUbicaciones = ubicaciones.filter(l => l.nombre_ubicacion.toUpperCase().includes(e.target.value.toUpperCase()));
        crearListaUbicaciones(listaFiltradaUbicaciones);
    });

}

function crearListaUbicaciones(listaFiltradaUbicaciones){
    let listaUbicaciones = document.getElementById("listaUbicaciones");
    listaUbicaciones.innerHTML = "";

    listaFiltradaUbicaciones.forEach(ubicacion => {
        const nuevoElementoLista = document.createElement("li");

        const nuevoBoton = document.createElement("button")
        nuevoBoton.classList.add("elementoLista");
        nuevoBoton.textContent = ubicacion.nombre_ubicacion;
        nuevoBoton.dataset.idUbicacion = ubicacion.id;
        
        nuevoElementoLista.appendChild(nuevoBoton);

        listaUbicaciones.appendChild(nuevoElementoLista);

    });
}

function agregarFuncionesCheck(){
    document.getElementById("contenedorGestores").querySelectorAll('input[type="checkbox"]').forEach(elemento => {
        elemento.addEventListener("change", (e) => {
            if(e.target.checked){
                funcionPanelMensaje("Activar Gestor", "¿Estas seguro que quieres activar el siguiente gestor?, esto le dara acceso a los permisos previamente registrados.", "comunicacion", "Activar");
            }else{
                funcionPanelMensaje("Desactivar Gestor", "¿Estas seguro que quieres desactivar el siguiente gestor?, esto le quitara acceso a todos los permisos previamente registrados.", "comunicacion", "Desactivar");
            }
        });
    });

    document.getElementById("contenedorPermisos").querySelectorAll('input[type="checkbox"]').forEach(elemento => {
        elemento.addEventListener("change", (e) => {
            if(e.target.checked){
                funcionPanelMensaje("Activar Permiso", "¿Estas seguro que quieres activar el siguiente permiso?, esto les dara permiso a los gestores previamente registrados.", "comunicacion", "Activar");
            }else{
                funcionPanelMensaje("Desactivar Permiso", "¿Estas seguro que quieres desactivar el siguiente permiso?, esto le quitara acceso a todos los gestores previamente registrados.", "comunicacion", "Desactivar");
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", async() => {
    reloadData();
    await getPermisos();
    crearContenedores();
    agregarFuncionesCheck();
    
});