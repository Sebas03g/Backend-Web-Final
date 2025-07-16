import { eliminarClase } from '../general/utilidades.js';
import { esPantallaPequena } from '../general/utilidades.js';
import { funcionPanelMensaje } from '../general/mensajesUsuario.js';
import { slideDownElementos } from '../general/utilidades.js';
import * as validar from './validacion.js';

let idDispositivo = null;

const dataUsuario = JSON.parse(sessionStorage.getItem("usuario"));

let listaDispositivos = dataUsuario.dispositivos_gestionados

function accionesDispositivos(dispositivos){
    dispositivos.forEach(dispositivo => {
        dispositivo.querySelector(".editarDispositivos").addEventListener('click',() => {
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
    const persona = listaDispositivos.find(l => l.id == idDispositivo);

    document.getElementById("nombreDispositivoModificar").value = persona.usuario_asignado.nombre_completo;
    document.getElementById("cedulaDispositivoModificar").value = persona.usuario_asignado.cedula;
    document.getElementById("correoDispositivoModificar").value = persona.usuario_asignado.correo_electronico;
    document.getElementById("telefonoDispositivoModificar").value = persona.usuario_asignado.telefono;

}

function crearDispositivo(btn){
    btn.addEventListener("click", () => {
        document.getElementById("creacionPersona").classList.toggle("abierto");
        document.getElementById("contenedor").classList.remove("abierto");
        document.getElementById("modificarPersona").classList.remove("abierto");
    });
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
    document.getElementById("creacionPersona").querySelector(".btn-primary").addEventListener("click", () => {
        if(validar.validarDatosPersona("Crear")){
            document.getElementById("btnAccionPanel").onclick = null;
            funcionPanelMensaje("Dispositivo Creado", "El dispositivo se creó exitosamente y el usuario ha sido notificado. Solo falta que el usuario agregue al gestor.", "comunicacion", "Aceptar");
            slideDownElementos(document.getElementById("creacionPersona"));
            document.getElementById("btnAccionPanel").onclick = gestionDispositivo();
        }else{
            funcionPanelMensaje("Datos invalidos", "Los datos ingresados son invalidos, ingrese nuevamente.", "comunicacion", "Aceptar");
        }
        
    });
}

function modificarDispositvo(){
    document.getElementById("modificarPersona").querySelector(".btn-primary").addEventListener("click", () => {
        if(validar.validarDatosPersona("Modificar")){
            document.getElementById("btnAccionPanel").onclick = null;
            funcionPanelMensaje("Dispositivo Modificado", "El dispositivo ha sido modificado con exito.", "comunicacion", "Aceptar");
            slideDownElementos(document.getElementById("modificarPersona"));
            document.getElementById("btnAccionPanel").onclick = gestionDispositivo(idDispositivo);
        }else{
            funcionPanelMensaje("Datos invalidos", "Los datos ingresados son invalidos, ingrese nuevamente.", "comunicacion", "Aceptar");
        }
    });
}

document.addEventListener("DOMContentLoaded", function(){
    const dispositivos = document.getElementById("listaDispositivos").querySelectorAll(".elementoDispositivo");
    const botonCreacion = document.getElementById("btn-creacion")
    const botonesCerrar = document.querySelectorAll(".botonCerrarDispositivo");

    accionesDispositivos(dispositivos)
    crearDispositivo(botonCreacion);
    cerrarDispositivo(botonesCerrar);
    modificarDispositvo();
    agregarDispositvo();
});