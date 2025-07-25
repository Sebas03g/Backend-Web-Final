import { eliminarClase } from '../general/utilidades.js';
import { slideDownElementos } from '../general/utilidades.js';
import { funcionPanelMensaje } from '../general/mensajesUsuario.js';
import * as validar from './validacion.js';
import { actualizarDatosUsuario, actualizarImagen } from './funcionalidadUsuario.js';
import { logoutFunctionality, stateLostMode } from '../fetch/Credentials.js';
import { socket } from '../fetch/socketClient.js'
import { recargarDatos as recargarTodosDatos } from '../general/recargarDatos.js';


let datosUsuario = JSON.parse(sessionStorage.getItem("usuario"));

const imgUsuario = document.getElementById("agregarIMG").querySelector("img");
imgUsuario.src = `uploads/${datosUsuario.imagen}`;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../../sw.js')
    .then(reg => console.log("✅ Service Worker registrado", reg))
    .catch(err => console.error("❌ Error al registrar SW", err));
}

socket.on('modo_perdida', async(data) => {
    if(datosUsuario.id == data.id){
        await recargarTodosDatos();
        datosUsuario = JSON.parse(sessionStorage.getItem("usuario"));
        
        const boton = document.getElementById("botonEmergencia").querySelector("button");
        if(datosUsuario.modo_perdida){
            funcionPanelMensaje("Modo Perdida", "Se activo el modo de perdida", "informacion", "Aceptar");
            boton.textContent = "Desactivar";
        }else{
            funcionPanelMensaje("Modo Perdida", "Se desactivo el modo de perdida", "informacion", "Aceptar");
            boton.textContent = "Activar";
        }

        console.log("DATOS");
        console.log(datosUsuario);
    }
});

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
        funcionPanelMensaje("¿Estás seguro que deseas modificar el modo alarma?", "Esta acción comunicara a las gestores de esta acción y permitira a todos los gestores tener o perder acceso a los permisos de Nivel 3.", "eliminar", datosUsuario.modo_perdida ? "Desactivar" : "Activar")
        document.getElementById("btnAccionPanel").onclick = null
        document.getElementById("btnAccionPanel").addEventListener("click", async() => {
            await activarModoPerdida();
        });
    });
}

async function activarModoPerdida(){
    const idUsuario = datosUsuario.id;
    const boton = document.getElementById("botonEmergencia").querySelector("button");
    await stateLostMode(idUsuario);
    datosUsuario = JSON.parse(sessionStorage.getItem("usuario"));
}

document.addEventListener("DOMContentLoaded", () => {

    const botonAlarma = document.getElementById("botonEmergencia");
    botonAlarma.querySelector("button").textContent = datosUsuario.modo_perdida ? "Desactivar" : "Activar";

    const opciones = document.getElementById("opciones");
    const botonesBajar = document.querySelectorAll(".botonBajar");
    const iconoUsuario = document.getElementById("iconoUsuario").querySelector("i");
    const menuUsuario = document.getElementById("menuUsuario");

    

    accionBotonAlarma(botonAlarma);
    abrirContenedores(opciones);
    cerrarContenedor(botonesBajar);
    abrirMenuUsuario(iconoUsuario);
    accionesMenuUsuario(menuUsuario);
    funcionalidadImg();
    cerrarContenido();
    cerrarSesion()
});
