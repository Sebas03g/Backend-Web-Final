import { eliminarClase } from '../utilidades.js';
import { slideDownElementos } from '../utilidades.js';
import { funcionPanelMensaje } from '../mensajesUsuario.js';
import * as validar from './validacion.js';

let datosUsuario = {nombre:"Sebastian Garcia", email:"sebastian@gmail.com", telefono:"0999022665"};

function abrirContenedores(opciones){
    let botones = opciones.querySelectorAll(".btn");
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            document.getElementById(boton.dataset.idContenedor).classList.add("abierto");
        });
    });
}

function abrirMenuUsuario(botonIcono){
    botonIcono.addEventListener("click", () => {
        botonIcono.classList.toggle("seleccionado");
        document.getElementById("menuUsuario").classList.toggle("abierto");

        document.getElementById("nombreUsuario").value = datosUsuario.nombre;
        document.getElementById("telefonoUsuario").value = datosUsuario.telefono;
        document.getElementById("correoUsuario").value = datosUsuario.email;

    });
}

function funcionalidadImg(){
    const input = document.getElementById("inputImagenUsuario");
    const imagenUsuario = document.getElementById("agregarIMG").querySelector("img");
    document.getElementById("agregarIMG").addEventListener("click", () => input.click());
    input.addEventListener("change", () => {
        const archivo = input.files[0];
        if (archivo) {
            const reader = new FileReader();
            reader.onload = e => {
                imagenUsuario.src = e.target.result;
            };
            reader.readAsDataURL(archivo);
        }
    });
}

function accionesMenuUsuario(menuUsuario){
    menuUsuario.querySelector(".btn").addEventListener("click", () => {

        if(validar.validarUsuario()){
            document.getElementById("iconoUsuario").querySelector("i").classList.remove("seleccionado");
            document.getElementById("menuUsuario").classList.remove("abierto");
            funcionPanelMensaje("Modificacion Exitosa", "Se han modificado los datos", "informacion", "Aceptar");
        }else{
            funcionPanelMensaje("Modificacion Rechazada", "Los datos ingresados son invalidos.", "informacion", "Aceptar");
        }
        
    });
}

function cerrarContenedor(botonesBajar){
    botonesBajar.forEach(boton => {
        boton.addEventListener("click", () => {
            slideDownElementos(boton.parentElement);
        });
    });
}

function cerrarContenido(){
    document.body.addEventListener("click", function (event) {
        if (event.target !== document.getElementById("iconoUsuario").querySelector("i") && event.target !== document.getElementById("menuUsuario") && !document.getElementById("menuUsuario").contains(event.target)) {
            document.getElementById("iconoUsuario").querySelector("i").classList.remove("seleccionado");
            document.getElementById("menuUsuario").classList.remove("abierto");
        }
    });
}

function accionBotonAlarma(botonAlarma){
    botonAlarma.querySelector("button").addEventListener("click", () => {
        funcionPanelMensaje("¿Estás seguro que deseas activar el modo alarma?", "Esta acción comunicara a las gestores de esta acción y permitira a todos los gestores tener acceso a los permisos de Nivel 3.", "eliminar", "Activar")
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const opciones = document.getElementById("opciones");
    const botonesBajar = document.querySelectorAll(".botonBajar");
    const iconoUsuario = document.getElementById("iconoUsuario").querySelector("i");
    const menuUsuario = document.getElementById("menuUsuario");
    const botonAlarma = document.getElementById("botonEmergencia"); 

    accionBotonAlarma(botonAlarma);
    abrirContenedores(opciones);
    cerrarContenedor(botonesBajar);
    abrirMenuUsuario(iconoUsuario);
    accionesMenuUsuario(menuUsuario);
    funcionalidadImg();
    cerrarContenido();
});