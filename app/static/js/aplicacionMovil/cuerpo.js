import { eliminarClase } from '../general/utilidades.js';
import { slideDownElementos } from '../general/utilidades.js';
import { funcionPanelMensaje } from '../general/mensajesUsuario.js';
import * as validar from './validacion.js';
import { actualizarDatosUsuario, actualizarImagen } from './funcionalidadUsuario.js';
import { logoutFunctionality } from '../fetch/Credentials.js';

let datosUsuario = JSON.parse(sessionStorage.getItem("usuario"));

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

        document.getElementById("nombreUsuario").value = datosUsuario.nombre_completo;
        document.getElementById("telefonoUsuario").value = datosUsuario.telefono;
        document.getElementById("correoUsuario").value = datosUsuario.correo_electronico;

    });
}

function funcionalidadImg(){
    const input = document.getElementById("inputImagenUsuario");
    const imagenUsuario = document.getElementById("agregarIMG").querySelector("img");
    document.getElementById("agregarIMG").addEventListener("click", () => {
        funcionPanelMensaje("Modifcar Imagen", "¿Estas seguro que quieres modificar la imagen de su cuenta? ", "comunicacion", "Aceptar");
        document.getElementById("btnAccionPanel").onclick = null
        document.getElementById("btnAccionPanel").addEventListener("click", () => input.click());  
        
    });
    input.addEventListener("change", async() => {
        const archivo = input.files[0];
        if (archivo) {
            const reader = new FileReader();
            reader.onload = e => {
                imagenUsuario.src = e.target.result;
            };
            reader.readAsDataURL(archivo);
        }
        await actualizarImagen();
    });
}



function accionesMenuUsuario(menuUsuario){
    menuUsuario.querySelector(".btn").addEventListener("click", () => {

        if(validar.validarUsuario()){
            document.getElementById("iconoUsuario").querySelector("i").classList.remove("seleccionado");
            document.getElementById("menuUsuario").classList.remove("abierto");
            funcionPanelMensaje("Modificar datos Usuario", "¿Estas seguro que quieres modificar los datos de su cuenta? ", "comunicacion", "Aceptar");
            document.getElementById("btnAccionPanel").onclick = null
            document.getElementById("btnAccionPanel").addEventListener("click", async() => {
                await actualizarDatosUsuario();
                datosUsuario = JSON.parse(sessionStorage.getItem("usuario"));
            });  
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

function cerrarSesion(){
    const btn = document.getElementById("btnSalir");
    btn.addEventListener("click", async() => await logoutFunctionality())
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
    const imgUsuario = document.getElementById("agregarIMG").querySelector("img");

    imgUsuario.src = `uploads/${datosUsuario.imagen}`;
    const opciones = document.getElementById("opciones");
    const botonesBajar = document.querySelectorAll(".botonBajar");
    const iconoUsuario = document.getElementById("iconoUsuario").querySelector("i");
    const menuUsuario = document.getElementById("menuUsuario");
    const botonAlarma = document.getElementById("botonEmergencia"); 

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../../sw.js')
        .then(reg => console.log("✅ Service Worker registrado", reg))
        .catch(err => console.error("❌ Error al registrar SW", err));
    }

    accionBotonAlarma(botonAlarma);
    abrirContenedores(opciones);
    cerrarContenedor(botonesBajar);
    abrirMenuUsuario(iconoUsuario);
    accionesMenuUsuario(menuUsuario);
    funcionalidadImg();
    cerrarContenido();
    cerrarSesion()
});