import { eliminarClase } from '../general/utilidades.js';
import { esPantallaPequena } from '../general/utilidades.js';
import { funcionPanelMensaje } from '../general/mensajesUsuario.js';
import { slideDownElementos } from '../general/utilidades.js';
import { crearDataDispositivo, editarDataDispositivos, eliminarDataDispositivo } from '../funcionalidad/funcionalidadDispositivos.js'
import { accionListaDispositivos, crearDispositivos as menuDispositivos } from '../funcionalidad/menuDispositivos.js'
import { accionesDispositivos as menuAccionesDispositvos } from '../funcionalidad/contenedores.js'

import * as validar from './validacion.js';

let idDispositivo = null;

let dataGestor;

function recargarDatos(){
    const dataUsuario = JSON.parse(sessionStorage.getItem("usuario"));
    dataGestor = dataUsuario;
}

function accionesDispositivos(dispositivos){
    dispositivos.forEach(dispositivo => {
        dispositivo.querySelector(".editarDispositivos").addEventListener('click',async() => {
            idDispositivo = dispositivo.dataset.idDispositivo;
            cartaDispositivos();
            document.getElementById("modificarPersona").classList.toggle("abierto");
            document.getElementById("contenedor").classList.remove("abierto");
            document.getElementById("creacionPersona").classList.remove("abierto");

            if(esPantallaPequena()){
                document.getElementById('contenedorMenu').classList.remove('mostrar');
                document.getElementById('botonMenu').classList.remove('seleccionado');
            }
        
        });
    });

    document.getElementById("modificarDispositivo").addEventListener('click', () => {
        idDispositivo = document.getElementById("modificarDispositivo").dataset.idDispositivo;;
        cartaDispositivos();
        document.getElementById("modificarPersona").classList.toggle("abierto");
        document.getElementById("contenedor").classList.remove("abierto");
        document.getElementById("creacionPersona").classList.remove("abierto");
    });
}

function cartaDispositivos(){
    const persona = dataGestor.dispositivos_gestionados.find(l => l.id == idDispositivo);

    document.getElementById("nombreDispositivoModificar").value = persona.nombre_completo;
    document.getElementById("cedulaDispositivoModificar").value = persona.cedula;
    document.getElementById("correoDispositivoModificar").value = persona.correo_electronico;
    document.getElementById("telefonoDispositivoModificar").value = persona.telefono;

    document.getElementById("btnModificarDispositivo").addEventListener("click", async(e) => {
        await actualizarListaDispositivos(e, idDispositivo)
    });

}

function crearDispositivo(btn){
    btn.addEventListener("click", () => {
        document.getElementById("creacionPersona").classList.toggle("abierto");
        document.getElementById("contenedor").classList.remove("abierto");
        document.getElementById("modificarPersona").classList.remove("abierto");
    });

    document.getElementById("btnCrearDispositivo").addEventListener("click", async(e) => {
        await actualizarListaDispositivos(e)
    });
}

export async function actualizarListaDispositivos(e, id=null){

    console.log(e)

    const listaDispositivos = document.getElementById("listaDispositivos");

    if(e.target.id == "btnCrearDispositivo"){
        const id_usuario = dataGestor.id;
        await crearDataDispositivo(id_usuario);
    }else if(e.target.id == "btnModificarDispositivo"){
        await editarDataDispositivos(id);
    }else{
        await eliminarDataDispositivo(id);
    }
    recargarDatos();
    menuDispositivos(listaDispositivos);
    accionListaDispositivos(listaDispositivos);
    accionesDispositivos(listaDispositivos.querySelectorAll(".elementoDispositivo"));
    menuAccionesDispositvos(listaDispositivos.querySelectorAll(".elementoDispositivo"));
}

function cerrarDispositivo(botones){
    botones.forEach(boton => {
        boton.querySelector("i").addEventListener('click', () => {
            slideDownElementos(boton.parentElement);
            document.getElementById("btn-creacion").classList.remove("seleccionado");

            if(esPantallaPequena()){
                document.getElementById('contenedorMenu').classList.add('mostrar');
                document.getElementById('botonMenu').classList.add('seleccionado');
            }

        });
    });
}

function agregarDispositvo(){
    document.getElementById("creacionPersona").querySelector(".btn-primary").addEventListener("click", (e) => {
        if(validar.validarDatosPersona("Crear")){
            funcionPanelMensaje("Dispositivo Creado", "El dispositivo se creó exitosamente y el usuario ha sido notificado. Solo falta que el usuario agregue al gestor.", "comunicacion", "Aceptar");
            document.getElementById("btnAccionPanel").onclick = null;
            slideDownElementos(document.getElementById("creacionPersona"));
        }else{
            funcionPanelMensaje("Datos invalidos", "Los datos ingresados son invalidos, ingrese nuevamente.", "comunicacion", "Aceptar");
        }
        
    });
}

function modificarDispositvo(){
    document.getElementById("modificarPersona").querySelector(".btn-primary").addEventListener("click", () => {
        if(validar.validarDatosPersona("Modificar")){
            funcionPanelMensaje("Dispositivo Modificado", "El dispositivo ha sido modificado con exito.", "comunicacion", "Aceptar");
            slideDownElementos(document.getElementById("modificarPersona"));
            document.getElementById("btnAccionPanel").onclick = null;
        }else{
            funcionPanelMensaje("Datos invalidos", "Los datos ingresados son invalidos, ingrese nuevamente.", "comunicacion", "Aceptar");
        }
    });
}

document.addEventListener("DOMContentLoaded", function(){
    const dispositivos = document.getElementById("listaDispositivos").querySelectorAll(".elementoDispositivo");
    const botonCreacion = document.getElementById("btn-creacion")
    const botonesCerrar = document.querySelectorAll(".botonCerrarDispositivo");

    recargarDatos();
    accionesDispositivos(dispositivos)
    crearDispositivo(botonCreacion);
    cerrarDispositivo(botonesCerrar);
    modificarDispositvo();
    agregarDispositvo();
});