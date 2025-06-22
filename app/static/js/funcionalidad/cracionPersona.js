import { eliminarClase } from '../utilidades.js';
import { esPantallaPequena } from '../utilidades.js';
import { funcionPanelMensaje } from '../mensajesUsuario.js';
import { slideDownElementos } from '../utilidades.js';
import * as validar from './validacion.js';

let idDispositivo = null;

let listaDispositivos = [
    {id:"1", nombre: "Sophia", correo: "sophia@gmail.com", telefono:"099000000", nombreDispositivo: "Samsung Sophia" , estado: "Activo",  cedula:" 01020123456", conectado:"Actual", tiempoViaje:"30 min", imagen:"../imagenes/Sophia.png", codigo: "A7F4K9X2M8B6", permisos:[
        {"id":1, "nivel":"1"},{"id":2, "nivel":"1"},{"id":3, "nivel":"1"},
        {"id":4, "nivel":"1"},{"id":5, "nivel":"1"},{"id":6, "nivel":"1"},
        {"id":7, "nivel":"1"},{"id":8, "nivel":"1"},{"id":9, "nivel":"1"}
    ], ubicaciones: [
        {id:"1", idPersona:"1", punto:[-2.859448, -78.963261], nombre:"Casa", tipo:"green", descripcion:"Case de Sophia"},
        {id:"2", idPersona:"1",punto:[-2.8913363513451396, -78.97706831779115], nombre:"Casa ex-novio", tipo:"red", descripcion:"Casa del ex-novia abusivo."},
    ], personasConfianza: [
        { id: "1", idPersona: "1", nombre: "Pedro", telefono: "099000226", descripcion: "Amigo", imagen: "../imagenes/placeholder.png" },
        { id: "3", idPersona: "1", nombre: "Carlos", telefono: "099002233", descripcion: "Primo", imagen: "../imagenes/placeholder.png" },
        { id: "5", idPersona: "1", nombre: "Luis", telefono: "099004455", descripcion: "Compañero de trabajo", imagen: "../imagenes/placeholder.png" },
        { id: "7", idPersona: "1", nombre: "Jorge", telefono: "099006677", descripcion: "Amigo del colegio", imagen: "../imagenes/placeholder.png" },
        { id: "9", idPersona: "1", nombre: "Andrés", telefono: "099008899", descripcion: "Hermano", imagen: "../imagenes/placeholder.png" }

    ]}, 
    {id:"2", nombre:"Kevin", correo: "kevin@gmail.com", telefono:"098000000", nombreDispositivo: "iPhone Kevin" , estado: "Desactivo",  cedula:" 01020123465", conectado:"Hace 30 min", tiempoViaje:"10 min", imagen:"../imagenes/Kevin.png", codigo: "B8G7ASFSDAS", permisos:[
        {"id":1, "nivel":"1"},{"id":2, "nivel":"1"},{"id":9, "nivel":"1"}
    ], ubicaciones: [
        {id:"3", idPersona:"2", punto:[-2.8913363513451396, -78.97706831779115], nombre:"Casa", tipo:"green", descripcion:"Case de Kevin"},
        {id:"4", idPersona:"2",punto:[-2.906395, -79.020527], nombre:"Casa padre", tipo:"red", descripcion:"Casa del padre abusivo."}
    ], personasConfianza: [
        { id: "2", idPersona: "2", nombre: "María", telefono: "099001122", descripcion: "Hermana", imagen: "../imagenes/placeholder.png" },
        { id: "4", idPersona: "2", nombre: "Ana", telefono: "099003344", descripcion: "Vecina", imagen: "../imagenes/placeholder.png" },
        { id: "6", idPersona: "2", nombre: "Diana", telefono: "099005566", descripcion: "Cuñada", imagen: "../imagenes/placeholder.png"},
        { id: "8", idPersona: "2", nombre: "Lucía", telefono: "099007788", descripcion: "Tía", imagen: "../imagenes/placeholder.png" },
        { id: "10", idPersona: "2", nombre: "Paola", telefono: "099009900", descripcion: "Sobrina", imagen: "../imagenes/placeholder.png" }

    ]}
]

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

    document.getElementById("nombreDispositivoModificar").value = persona.nombre;
    document.getElementById("cedulaDispositivoModificar").value = persona.cedula;
    document.getElementById("correoDispositivoModificar").value = persona.correo;
    document.getElementById("telefonoDispositivoModificar").value = persona.telefono;

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
        console.log("Hola Mundo")
        if(validar.validarDatosPersona("Crear")){
            funcionPanelMensaje("Dispositivo Creado", "El dispositivo se creó exitosamente y el usuario ha sido notificado. Solo falta que el usuario agregue al gestor.", "comunicacion", "Aceptar");
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