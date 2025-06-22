import { eliminarClase } from '../utilidades.js'
import { funcionPanelMensaje } from '../mensajesUsuario.js';

let gestores = [
    {id:1,nombre:"Diego", estado:true, permisos:[
        {id:1, nivel:"1", estado:true},
        {id:2, nivel:"1", estado:true},
        {id:3, nivel:"1", estado:false},
        {id:4, nivel:"1", estado:true},
        {id:5, nivel:"1", estado:true},
        {id:6, nivel:"1", estado:false},
        {id:7, nivel:"1", estado:true},
        {id:8, nivel:"1", estado:true},
        {id:9, nivel:"1", estado:true},
    ]},
    {id:2, nombre:"Sebastian", estado:false, permisos:[
        {id:1, nivel:"1", estado:true},
        {id:2, nivel:"2", estado:true},
        {id:3, nivel:"3", estado:true},
    ]},
    {id:3, nombre:"Juan", estado:true, permisos:[
        {id:1, nivel:"3", estado:true},
    ]}
]

let ubicaciones = [
    {id:"1", idPersona:"1", punto:[-2.859448, -78.963261], nombre:"Casa", tipo:"green", descripcion:"Case de Sophia"},
    {id:"2", idPersona:"1",punto:[-2.8913363513451396, -78.97706831779115], nombre:"Casa ex-novio", tipo:"red", descripcion:"Casa del ex-novia abusivo."},
]

let personasConfianza = [
        { id: "2", idPersona: "2", nombre: "María", telefono: "099001122", descripcion: "Hermana", imagen: "../imagenes/placeholder.png" },
        { id: "4", idPersona: "2", nombre: "Ana", telefono: "099003344", descripcion: "Vecina", imagen: "../imagenes/placeholder.png" },
        { id: "6", idPersona: "2", nombre: "Diana", telefono: "099005566", descripcion: "Cuñada", imagen: "../imagenes/placeholder.png"},
        { id: "8", idPersona: "2", nombre: "Lucía", telefono: "099007788", descripcion: "Tía", imagen: "../imagenes/placeholder.png" },
        { id: "10", idPersona: "2", nombre: "Paola", telefono: "099009900", descripcion: "Sobrina", imagen: "../imagenes/placeholder.png" }
    ]

let permisos = [
    {
        id: 1,
        estado: true,
        nombre: "Ver Información",
        descripcion: "Este permiso permite al gestor acceder a tu información personal, como tu nombre, datos de contacto, historial y otra información importante. Esto es necesario para realizar un seguimiento efectivo y para que el gestor pueda coordinar acciones rápidamente en caso de que se requiera asistencia o seguimiento."
    },
    {
        id: 2,
        estado: true,
        nombre: "Ver Ubicación en vivo",
        descripcion: "Al otorgar este permiso, el gestor podrá ver tu ubicación en tiempo real. Esto es especialmente útil si estás perdido o necesitas ser localizado rápidamente. El gestor podrá usar esta información para dirigir equipos de rescate o asistencia hacia tu ubicación actual."
    },
    {
        id: 3,
        estado: true,
        nombre: "Ver ruta",
        descripcion: "Con este permiso, el gestor podrá acceder al historial de las rutas que has seguido. Esto puede ser útil para entender tu desplazamiento, identificar posibles áreas de interés o simplemente seguir tu camino en tiempo real. Es especialmente útil si estás perdido y el gestor necesita analizar tus movimientos previos para buscarte de manera más efectiva."
    },
    {
        id: 4,
        estado: true,
        nombre: "Mandar Mensajes",
        descripcion: "Este permiso le da al gestor la capacidad de enviarte mensajes directos a tu dispositivo. Estos mensajes pueden ser de alerta, instrucciones o actualizaciones importantes. Esto facilita la comunicación en caso de que necesiten coordinar acciones contigo mientras trabajas para encontrar una solución a la situación de pérdida."
    },
    {
        id: 5,
        estado: true,
        nombre: "Generar Alarmas",
        descripcion: "Al otorgar este permiso, el gestor podrá generar alarmas o notificaciones que te alertarán sobre situaciones críticas o importantes. Las alarmas pueden ser utilizadas en caso de emergencia, indicándote que tomes una acción inmediata o sigas ciertas instrucciones para garantizar tu seguridad."
    },
    {
        id: 6,
        estado: false,
        nombre: "Escuchar audio en vivo",
        descripcion: "Con este permiso, el gestor podrá escuchar el audio en vivo desde tu dispositivo. Esto puede ser útil en situaciones de emergencia donde se necesita verificar lo que está sucediendo a tu alrededor, o para escuchar información importante que pueda ayudarte a ser localizado o proporcionar detalles de la situación."
    },
    {
        id: 7,
        estado: true,
        nombre: "Registrar Ubicaciones",
        descripcion: "Este permiso permite al gestor registrar las ubicaciones donde te encuentras a lo largo del tiempo. Esto puede ser útil para mantener un historial de tus ubicaciones y ayudar al equipo de rescate a rastrear mejor tu posición y encontrar patrones que ayuden a localizarte más rápidamente."
    },
    {
        id: 8,
        estado: true,
        nombre: "Registrar Personas",
        descripcion: "Este permiso le da al gestor la capacidad de registrar nuevas personas en el sistema, como parte de un proceso de seguimiento o de coordinación. Si otras personas están involucradas en la búsqueda o si el gestor necesita añadir datos de otras personas, este permiso permite mantener todo el equipo de rescate debidamente actualizado."
    },
    {
        id: 9,
        estado: true,
        nombre: "Registrar Usuario",
        descripcion: "Con este permiso, el gestor podrá crear y administrar tu cuenta dentro del sistema. Registrar un usuario es esencial para garantizar que puedas tener acceso a la plataforma y para que el gestor pueda gestionar las interacciones adecuadas durante el proceso de rastreo, y este permiso es el que permitirá la comunicación entre el dispositivo y la aplicación."
    }
]

function crearContenedores(){
    crearContenedorGestores();
    crearContenedorPC();
    crearContenedorPermisos();
    crearContenedorUbicaciones();
}

function crearContenedorGestores(){

    crearListaGestores(gestores);
    document.getElementById("busquedaGestor").addEventListener("keyup", (e) => {
        let listaFiltradaGestores = gestores.filter(l => l.nombre.toUpperCase().includes(e.target.value.toUpperCase()));
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
        nuevoBoton.textContent = gestor.nombre;
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
        let listaFiltradaUbicaciones = ubicaciones.filter(l => l.nombre.toUpperCase().includes(e.target.value.toUpperCase()));
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
        nuevoBoton.textContent = ubicacion.nombre;
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

document.addEventListener("DOMContentLoaded", () => {
    crearContenedores();
    agregarFuncionesCheck();
});