import { eliminarClase } from '../general/utilidades.js'
import { esPantallaPequena } from '../general/utilidades.js'
import { funcionPanelMensaje } from '../general/mensajesUsuario.js';
import { slideDownElementos } from '../general/utilidades.js';
import * as validar from './validacion.js';
import {getAllData, getDataById} from '../fetch/sentenciasFetch.js'

import { fetchUserData } from '../fetch/fetchUserData.js';

let idDispositivo = null;
let mapaUbicacion = null;
let mapaRuta = null;
let marcadorSeleccionado = null;

async function obtenerPermisos(){
    const data = await getAllData('permiso');
    return data;
}

let listaDispositivos = [
    {id:"1", nombre: "Sophia", correo: "sophia@gmail.com", telefono:"099000000", nombreDispositivo: "Samsung Sophia" , estado: "Activo",  cedula:" 01020123456", conectado:"Actual", tiempoViaje:"30 min", imagen:"../static/images/Sophia.png", codigo: "A7F4K9X2M8B6", permisos:[
        {"id":1, "nivel":"1"},{"id":2, "nivel":"1"},{"id":3, "nivel":"1"},
        {"id":4, "nivel":"1"},{"id":5, "nivel":"1"},{"id":6, "nivel":"1"},
        {"id":7, "nivel":"1"},{"id":8, "nivel":"1"},{"id":9, "nivel":"1"}
    ], ubicaciones: [
        {id:"1", idPersona:"1", punto:[-2.859448, -78.963261], nombre:"Casa", tipo:"green", descripcion:"Case de Sophia"},
        {id:"2", idPersona:"1",punto:[-2.8913363513451396, -78.97706831779115], nombre:"Casa ex-novio", tipo:"red", descripcion:"Casa del ex-novia abusivo."},
    ], personasConfianza: [
        { id: "1", idPersona: "1", nombre: "Pedro", telefono: "099000226", descripcion: "Amigo", imagen: "../static/images/placeholder.png" },
        { id: "3", idPersona: "1", nombre: "Carlos", telefono: "099002233", descripcion: "Primo", imagen: "../static/images/placeholder.png" },
        { id: "5", idPersona: "1", nombre: "Luis", telefono: "099004455", descripcion: "Compañero de trabajo", imagen: "../static/images/placeholder.png" },
        { id: "7", idPersona: "1", nombre: "Jorge", telefono: "099006677", descripcion: "Amigo del colegio", imagen: "../static/images/placeholder.png" },
        { id: "9", idPersona: "1", nombre: "Andrés", telefono: "099008899", descripcion: "Hermano", imagen: "../static/images/placeholder.png" }

    ], ruta: [
        {id: "1", nombre: "Camino a Universidad", puntos: [
            {"hora": "09:00 am", "ubicacion": [-2.859448, -78.963261]},
            {"hora": "09:10 am", "ubicacion": [-2.862557, -78.974168]},
            {"hora": "09:20 am", "ubicacion": [-2.865666, -78.985074]},
            {"hora": "09:30 am", "ubicacion": [-2.868775, -78.995981]},
            {"hora": "09:40 am", "ubicacion": [-2.871884, -79.006887]},
            {"hora": "09:50 am", "ubicacion": [-2.874993, -79.017794]},
            {"hora": "10:00 am", "ubicacion": [-2.878102, -79.028700]},
            {"hora": "10:10 am", "ubicacion": [-2.880210, -79.031336]},
            {"hora": "10:20 am", "ubicacion": [-2.882319, -79.033242]},
            {"hora": "10:30 am", "ubicacion": [-2.884428, -79.034486]},
            {"hora": "10:40 am", "ubicacion": [-2.886537, -79.035229]},
            {"hora": "10:50 am", "ubicacion": [-2.888646, -79.035619]},
            {"hora": "11:00 am", "ubicacion": [-2.8918931908671124, -79.03600936098859]}
        ]},
    ]},
    {id:"2", nombre:"Kevin", correo: "kevin@gmail.com", telefono:"098000000", nombreDispositivo: "iPhone Kevin" , estado: "Desactivo",  cedula:" 01020123465", conectado:"Hace 30 min", tiempoViaje:"10 min", imagen:"../static/images/Kevin.png", codigo: "B8G7ASFSDAS", permisos:[
        {"id":1, "nivel":"1"},{"id":2, "nivel":"1"},{"id":9, "nivel":"1"}
    ], ubicaciones: [
        {id:"3", idPersona:"2", punto:[-2.8913363513451396, -78.97706831779115], nombre:"Casa", tipo:"green", descripcion:"Case de Kevin"},
        {id:"4", idPersona:"2",punto:[-2.906395, -79.020527], nombre:"Casa padre", tipo:"red", descripcion:"Casa del padre abusivo."}
    ], personasConfianza: [
        { id: "2", idPersona: "2", nombre: "María", telefono: "099001122", descripcion: "Hermana", imagen: "../static/images/placeholder.png" },
        { id: "4", idPersona: "2", nombre: "Ana", telefono: "099003344", descripcion: "Vecina", imagen: "../static/images/placeholder.png" },
        { id: "6", idPersona: "2", nombre: "Diana", telefono: "099005566", descripcion: "Cuñada", imagen: "../static/images/placeholder.png"},
        { id: "8", idPersona: "2", nombre: "Lucía", telefono: "099007788", descripcion: "Tía", imagen: "../static/images/placeholder.png" },
        { id: "10", idPersona: "2", nombre: "Paola", telefono: "099009900", descripcion: "Sobrina", imagen: "../static/images/placeholder.png" }

    ], ruta: [
        {id: "2", nombre: "Camino a Trabajo", puntos: [
            {"hora": "09:00 am", "ubicacion": [-2.891336, -78.977068]},
            {"hora": "09:05 am", "ubicacion": [-2.891359, -78.979426]},
            {"hora": "09:10 am", "ubicacion": [-2.891382, -78.981785]},
            {"hora": "09:15 am", "ubicacion": [-2.891405, -78.984143]},
            {"hora": "09:20 am", "ubicacion": [-2.891428, -78.986501]},
            {"hora": "09:25 am", "ubicacion": [-2.891451, -78.988859]},
            {"hora": "09:30 am", "ubicacion": [-2.891474, -78.991217]},
            {"hora": "09:35 am", "ubicacion": [-2.891497, -78.993575]},
            {"hora": "09:40 am", "ubicacion": [-2.891520, -78.995933]},
            {"hora": "09:45 am", "ubicacion": [-2.891543, -78.998291]},
            {"hora": "09:50 am", "ubicacion": [-2.891566, -79.000649]},
            {"hora": "09:55 am", "ubicacion": [-2.891589, -79.003008]},
            {"hora": "10:00 am", "ubicacion": [-2.891612, -79.005366]},
            {"hora": "10:05 am", "ubicacion": [-2.891635, -79.007724]},
            {"hora": "10:10 am", "ubicacion": [-2.891658, -79.010082]},
            {"hora": "10:15 am", "ubicacion": [-2.891681, -79.012440]},
            {"hora": "10:20 am", "ubicacion": [-2.891704, -79.014798]},
            {"hora": "10:25 am", "ubicacion": [-2.891727, -79.017156]},
            {"hora": "10:30 am", "ubicacion": [-2.891750, -79.019514]},
            {"hora": "10:35 am", "ubicacion": [-2.891773, -79.021872]},
            {"hora": "10:40 am", "ubicacion": [-2.891796, -79.024231]},
            {"hora": "10:45 am", "ubicacion": [-2.891819, -79.026589]},
            {"hora": "10:50 am", "ubicacion": [-2.891842, -79.028947]},
            {"hora": "10:55 am", "ubicacion": [-2.891865, -79.031305]},
            {"hora": "11:00 am", "ubicacion": [-2.8918931908671124, -79.03600936098859]}
            ]
        },
    ]}
]


let permisos = [
    {
        id: 1,
        nombre: "Ver Información",
        descripcion: "Este permiso permite al gestor acceder a tu información personal, como tu nombre, datos de contacto, historial y otra información importante. Esto es necesario para realizar un seguimiento efectivo y para que el gestor pueda coordinar acciones rápidamente en caso de que se requiera asistencia o seguimiento."
    },
    {
        "id": 2,
        "nombre": "Ver Ubicación en vivo",
        "descripcion": "Al otorgar este permiso, el gestor podrá ver tu ubicación en tiempo real. Esto es especialmente útil si estás perdido o necesitas ser localizado rápidamente. El gestor podrá usar esta información para dirigir equipos de rescate o asistencia hacia tu ubicación actual."
    },
    {
        "id": 3,
        "nombre": "Ver ruta",
        "descripcion": "Con este permiso, el gestor podrá acceder al historial de las rutas que has seguido. Esto puede ser útil para entender tu desplazamiento, identificar posibles áreas de interés o simplemente seguir tu camino en tiempo real. Es especialmente útil si estás perdido y el gestor necesita analizar tus movimientos previos para buscarte de manera más efectiva."
    },
    {
        "id": 4,
        "nombre": "Mandar Mensajes",
        "descripcion": "Este permiso le da al gestor la capacidad de enviarte mensajes directos a tu dispositivo. Estos mensajes pueden ser de alerta, instrucciones o actualizaciones importantes. Esto facilita la comunicación en caso de que necesiten coordinar acciones contigo mientras trabajas para encontrar una solución a la situación de pérdida."
    },
    {
        "id": 5,
        "nombre": "Generar Alarmas",
        "descripcion": "Al otorgar este permiso, el gestor podrá generar alarmas o notificaciones que te alertarán sobre situaciones críticas o importantes. Las alarmas pueden ser utilizadas en caso de emergencia, indicándote que tomes una acción inmediata o sigas ciertas instrucciones para garantizar tu seguridad."
    },
    {
        "id": 6,
        "nombre": "Escuchar audio en vivo",
        "descripcion": "Con este permiso, el gestor podrá escuchar el audio en vivo desde tu dispositivo. Esto puede ser útil en situaciones de emergencia donde se necesita verificar lo que está sucediendo a tu alrededor, o para escuchar información importante que pueda ayudarte a ser localizado o proporcionar detalles de la situación."
    },
    {
        "id": 7,
        "nombre": "Registrar Ubicaciones",
        "descripcion": "Este permiso permite al gestor registrar las ubicaciones donde te encuentras a lo largo del tiempo. Esto puede ser útil para mantener un historial de tus ubicaciones y ayudar al equipo de rescate a rastrear mejor tu posición y encontrar patrones que ayuden a localizarte más rápidamente."
    },
    {
        "id": 8,
        "nombre": "Registrar Personas",
        "descripcion": "Este permiso le da al gestor la capacidad de registrar nuevas personas en el sistema, como parte de un proceso de seguimiento o de coordinación. Si otras personas están involucradas en la búsqueda o si el gestor necesita añadir datos de otras personas, este permiso permite mantener todo el equipo de rescate debidamente actualizado."
    },
    {
        "id": 9,
        "nombre": "Registrar Usuario",
        "descripcion": "Con este permiso, el gestor podrá crear y administrar tu cuenta dentro del sistema. Registrar un usuario es esencial para garantizar que puedas tener acceso a la plataforma y para que el gestor pueda gestionar las interacciones adecuadas durante el proceso de rastreo, y este permiso es el que permitirá la comunicación entre el dispositivo y la aplicación."
    }
]


function accionesNavBar(elementosNav){
    elementosNav.forEach(elementoIt => {
        const boton = elementoIt.querySelector("a");

        boton.addEventListener("click",() => {
            let elementos = document.getElementById("listaNavDispositivo").querySelectorAll(".icono-navbar");
            eliminarClase(elementos, "seleccionado");
            elementos = document.getElementById("contenedores").querySelectorAll(".hijo");
            eliminarClase(elementos, "activo");
            boton.querySelector(".icono-navbar").classList.add("seleccionado");
            document.getElementById(boton.dataset.nombreContenedor).classList.add("activo");
            if(boton.dataset.nombreContenedor === "contenedorUbicacion"){
                let mapa = document.getElementById("mapaUbicacion")._leafletMap;
                mapa.invalidateSize();
            }
        });
    });

}

function accionBotonMenu(botonMenu){
    botonMenu.addEventListener("click", () => {
        slideDownElementos(document.getElementById("contenedor"));
        document.getElementById("menuNavMobil").querySelector(".iconoMobil").classList.remove("seleccionado")
        document.getElementById("menuNavMobil").querySelector(".linksNavMobil").classList.remove("mostrar");

        if(esPantallaPequena()){
            document.getElementById('contenedorMenu').classList.add('mostrar');
            document.getElementById('botonMenu').classList.add('seleccionado');
        }
    })
}

function funcionalidadBusquedaLista(lista, funcion, listaBotones){
    lista.forEach(elemento => {
        let nuevoElementoLista = document.createElement("li");

        let nuevoBoton = document.createElement("button");
        nuevoBoton.classList.add("elementoLista");
        nuevoBoton.textContent = elemento.nombre;
        nuevoBoton.dataset.id = elemento.id;

        nuevoElementoLista.appendChild(nuevoBoton);

        nuevoElementoLista.addEventListener("click", () => {
            funcion(listaBotones, nuevoBoton, elemento);
        });
            
        listaBotones.appendChild(nuevoElementoLista);
    });

}

function agregarFuncionesBusqueda(){
    document.getElementById("busquedaUbicacion").addEventListener('keyup', () => {
        const persona = listaDispositivos.find(l => l.id == idDispositivo);
        let valor = document.getElementById("busquedaUbicacion").value;
        let lista = persona.ubicaciones.filter(l => l.nombre.toLowerCase().includes(valor.toLowerCase()));
        if(valor === ""){
            lista = persona.ubicaciones;
        }
        document.getElementById("listaUbicaciones").innerHTML = "";
        let listaBotones = document.getElementById(document.getElementById("busquedaUbicacion").dataset.idLista)
        funcionalidadBusquedaLista(lista, crearCartaUbicacion, listaBotones);
    });

    document.getElementById("busquedaPC").addEventListener('keyup', () => {
        const persona = listaDispositivos.find(l => l.id == idDispositivo);
        let valor = document.getElementById("busquedaPC").value;
        let lista = persona.personasConfianza.filter(l => l.nombre.toLowerCase().includes(valor.toLowerCase()));
        if(valor === ""){
            lista = persona.personasConfianza;
        }

        document.getElementById("listaPersonas").innerHTML =""
        let listaBotones = document.getElementById(document.getElementById("busquedaPC").dataset.idLista)
        funcionalidadBusquedaLista(lista, crearCartaPC, listaBotones);
    });
}

function accionesDispositivos(dispositivos){
    dispositivos.forEach(dispositivo => {
        dispositivo.querySelector(".settingsDispositivo").addEventListener('click',() => {
            idDispositivo = dispositivo.dataset.idDispositivo;
            crearContenedores();
            agregarFuncionesBusqueda();

            document.getElementById("contenedor").classList.toggle("abierto");
            document.getElementById('contenedorMenu').classList.remove("mostrar");
            document.getElementById('botonMenu').classList.remove('seleccionado');
            document.getElementById("modificarPersona").classList.remove("abierto");
            document.getElementById("creacionPersona").classList.remove("abierto");
            
            document.getElementById("botonPerdida").addEventListener("click", () => {
                funcionPanelMensaje("Modo Alarma", "Al activar el modo alarma se notificara al usuario, y podra utilizar permisos de nivel 3.",  "eliminar", "Activar");
            });

            if(esPantallaPequena()){
                document.getElementById('contenedorMenu').classList.remove('mostrar');
                document.getElementById('botonMenu').classList.remove('seleccionado');
            }

        });
    });
}

function crearContenedorInformacion(){

    const persona = listaDispositivos.find(l => l.id == idDispositivo);

    document.getElementById("nombreDispositivo").textContent = `Nombre Dispositivo: ${persona.nombreDispositivo}`;
    document.getElementById("nombrePersonaDispositivo").textContent = `Nombre Persona: ${persona.nombre}`;
    document.getElementById("cedulaDispositivo").textContent = `Cedula Persona: ${persona.cedula}`;
    document.getElementById("correoDispositivo").textContent = `Correo: ${persona.correo}`;
    document.getElementById("telefonoDispositivo").textContent = `Telefono: ${persona.telefono}`;
    document.getElementById("estadoDispositivo").textContent = `Estado: ${persona.estado}`;
    document.getElementById("conectadoDispositivo").textContent = `Ultima vez conectado: ${persona.conectado}`;
    document.getElementById("timpoViajeDispositivo").textContent = `Tiempo de ultimo viaje: ${persona.tiempoViaje}`;
    document.getElementById("codigoUsuario").textContent = persona.codigo;
    document.getElementById("imagenPersona").src = persona.imagen;

    document.getElementById("modificarDispositivo").dataset.idDispositivo = idDispositivo;

}

function modificarIMG(){
    const input = document.getElementById("inputImagenPC");
    const imagenPC = document.getElementById("imgConfianza");

    imagenPC.addEventListener("click", () => input.click());

    input.addEventListener("change", () => {
        const archivo = input.files[0];
        if (archivo) {
            const reader = new FileReader();
            reader.onload = e => {
                imagenPC.src = e.target.result;
            };
            reader.readAsDataURL(archivo);
        }
    });
}

function crearContenedorPermisos() {
    const persona = listaDispositivos.find(l => l.id == idDispositivo);
    let listaBotonesPermisos = document.getElementById("listaPermisos");
    
    let listaPermisos = permisos.filter(permiso =>
        persona.permisos.some(p => p.id === permiso.id)
    );

    listaBotonesPermisos.innerHTML = "";
    persona.permisos.sort((a, b) => a.id - b.id);

    listaPermisos.forEach(permiso => {
        let nuevoElementoLista = document.createElement("li");

        let nuevoBoton = document.createElement("button");
        nuevoBoton.classList.add("elementoLista");
        nuevoBoton.textContent = permiso.nombre;
        nuevoBoton.dataset.id = permiso.id;

        nuevoElementoLista.appendChild(nuevoBoton);

        nuevoElementoLista.addEventListener("click", () => {
            crearCartaPermiso(
                listaBotonesPermisos,
                nuevoBoton,
                permiso,
                persona.permisos.find(p => p.id == permiso.id).nivel
            );
            eliminarClase(listaBotonesPermisos.querySelectorAll("li"), "seleccionado");
            nuevoElementoLista.classList.add("seleccionado");
        });

        listaBotonesPermisos.appendChild(nuevoElementoLista);
    });

    const primerPermiso = persona.permisos[0];
    const permisoData = permisos.find(p => p.id === primerPermiso.id);
    const botonElemento = Array.from(listaBotonesPermisos.querySelectorAll(".elementoLista"))
        .find(el => parseInt(el.dataset.id) === primerPermiso.id);

    if (botonElemento && permisoData) {
        crearCartaPermiso(listaBotonesPermisos, botonElemento, permisoData, primerPermiso.nivel);
    }
}

function crearCartaPermiso(padre, elemento, permiso, nivel) {
    eliminarClase(padre.querySelectorAll(".elementoLista"), "seleccionado");
    elemento.classList.add("seleccionado");

    document.getElementById("nombrePermiso").textContent = permiso.nombre;
    document.getElementById("nivelPermiso").textContent = `Nivel ${nivel}`;
    document.getElementById("descripcionPermiso").textContent = permiso.descripcion;
    document.getElementById("contenedorPermisos").querySelectorAll(".bi-info-circle-fill").forEach(elemento => elemento.addEventListener("click", () => {
        funcionPanelMensaje("Niveles", `Existen tres niveles, que afectan como interacciona el gestionador con el sistema:<br>
                            Nivel 1:<br>
                            Permite al gestionador interactuar todo el tiempo con el permiso, sin notificación.<br>
                            Nivel 2:<br>
                            Permite al gestionador interactuar todo el tiempo con el permiso pero notifica al usuario cada vez que lo hace.<br>
                            Nivel 3:<br>
                            Permite al gestionador interactuar con el permiso unicamente si el dispositivo esta en modo perdida.`, "comunicacion", "Aceptar"
                            )
    }));

}

function crearContenedorUbicacion(){
    const persona = listaDispositivos.find(l => l.id == idDispositivo);
    let listaUbicaciones = persona.ubicaciones;
    let listBotonesUbicaciones = document.getElementById("listaUbicaciones");
    listBotonesUbicaciones.innerHTML = "";

    document.getElementById("crearUbicacion").addEventListener("click", () => crearUbicacion(Array.from(listBotonesUbicaciones.querySelectorAll(".elementoLista"))));

    funcionalidadBusquedaLista(listaUbicaciones, crearCartaUbicacion, listBotonesUbicaciones);

    crearCartaUbicacion(listBotonesUbicaciones, Array.from(listBotonesUbicaciones.querySelectorAll(".elementoLista"))
    .find(l => l.dataset.id = listaUbicaciones[0].id), listaUbicaciones[0]);
}

function crearUbicacion(listaBotones){

    document.getElementById("nombreUbicacion").value = "";
    document.getElementById("descripcionUbicacion").textContent = "";
    document.getElementById("miComboboxSeguridad").value = "";
    eliminarClase(listaBotones, "seleccionado");

    document.getElementById("botonEliminarUbicacion").style.display = "none";

    if (mapaUbicacion) {
        mapaUbicacion.remove();
        mapaUbicacion = null;
    }

    mapaUbicacion = L.map(document.getElementById("mapaUbicacion"), {
        center: [-2.8918931908671124, -79.03600936098859],
        zoom: 14,
        zoomControl: false
    });

    document.getElementById("mapaUbicacion")._leafletMap = mapaUbicacion;

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
    const mapa = document.getElementById("mapaUbicacion")._leafletMap;

    mapa.on('click', function(e) {
        const { lat, lng } = e.latlng;
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

function crearCartaUbicacion(padre,elemento, elementoUbicacion){

    let mapa = crearMapa(elementoUbicacion);
    eliminarClase(padre.querySelectorAll(".elementoLista"), "seleccionado");
    elemento.classList.add("seleccionado");
    generarPuntos(elementoUbicacion, mapa);

    marcadorSeleccionado = elementoUbicacion.punto;

    document.getElementById("nombreUbicacion").value = elementoUbicacion.nombre;
    document.getElementById("descripcionUbicacion").textContent = elementoUbicacion.descripcion;
    document.getElementById("miComboboxSeguridad").value = elementoUbicacion.tipo;

    document.getElementById("botonEliminarUbicacion").style.display = "inline";

    document.getElementById("botonEliminarUbicacion").addEventListener("click",() => {
        funcionPanelMensaje("¿Estás seguro de que deseas eliminar esta ubicacion?", "Esta acción no se puede deshacer. Toda la información relacionada será permanentemente eliminada.", "eliminar", "Eliminar");
    });
    
    
    mapa.invalidateSize();
}

function generarPuntos(elementoUbicacion, mapa){
    let area = L.circle(elementoUbicacion.punto, {
        color: "black",
        fillColor: elementoUbicacion.tipo,
        fillOpacity: 0.3,
        radius: 100
    }).addTo(mapa);
    area.bindPopup(elementoUbicacion.nombre);
}

function eliminarDispositivo(){
    document.getElementById("navEliminar").addEventListener("click", () => {
        document.getElementById("btnEliminarDispositivo").addEventListener("click", () => {
            funcionPanelMensaje("¿Estás seguro de que deseas eliminar a esta persona?", "Esta acción no se puede deshacer. Toda la información relacionada será permanentemente eliminada.", "eliminar", "Eliminar");
        });
    });

    document.getElementById("navEliminarMobil").addEventListener("click", () => {
        document.getElementById("btnEliminarDispositivo").addEventListener("click", () => {
            funcionPanelMensaje("¿Estás seguro de que deseas eliminar a esta persona?", "Esta acción no se puede deshacer. Toda la información relacionada será permanentemente eliminada.", "eliminar", "Eliminar");
        });
    });
}


function crearMapa(elementoUbicacion) {

    // Si ya hay un mapa, lo removemos correctamente
    if (mapaUbicacion) {
        mapaUbicacion.remove(); // destruye el mapa anterior
        mapaUbicacion = null;
    }

    // Creamos el nuevo mapa
    mapaUbicacion = L.map(document.getElementById("mapaUbicacion"), {
        center: elementoUbicacion.punto,
        zoom: 14,
        zoomControl: false
    });

    document.getElementById("mapaUbicacion")._leafletMap = mapaUbicacion;

    L.control.zoom({
        position: 'bottomright'
    }).addTo(mapaUbicacion);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mapaUbicacion);

    funcionalidadMapa();

    return mapaUbicacion;
}

function crearContenedorRuta(){
    const persona = listaDispositivos.find(l => l.id == idDispositivo);
    let listaRutas = persona.ruta;
    let listaBotonesRutas = document.getElementById("listaRutas");
    listaBotonesRutas.innerHTML = "";

    //document.getElementById("crearRuta").addEventListener("click", () => )

    funcionalidadBusquedaLista(listaRutas, crearCartaRuta, listaBotonesRutas);

    crearCartaRuta(listaBotonesRutas, Array.from(listaBotonesRutas.querySelectorAll(".elementoLista")).find(l => l.dataset.id = listaRutas[0].id), listaRutas[0]);

}

function crearCartaRuta(padre,elemento, elementoRuta){
    let mapa = crearRuta(elementoRuta);
    eliminarClase(padre.querySelectorAll(".elementoLista"), "seleccionado");
    elemento.classList.add("seleccionado");

    document.getElementById("nombreRuta").value = elementoRuta.nombre;
    document.getElementById("puntoInicialRuta").value = elementoRuta.puntos[0].hora;
    document.getElementById("puntoFinalRuta").value = elementoRuta.puntos[elementoRuta.puntos.length - 1].hora;

    document.getElementById("botonEliminarRuta").style.display = "inline";

    document.getElementById("botonEliminarRuta").addEventListener("click",() => {
        funcionPanelMensaje("¿Estás seguro de que deseas eliminar esta ruta?", "Esta acción no se puede deshacer. Toda la información relacionada será permanentemente eliminada.", "eliminar", "Eliminar");
    });
    
    
    setTimeout(() => {
        mapa.invalidateSize();
    }, 200);

}

function crearRuta(elementoRuta) {

    let puntoRuta;
    let puntosRuta = [];

    if (mapaRuta) {
        mapaRuta.remove();
        mapaRuta = null;
    }
    console.log(elementoRuta.puntos[0].ubicacion);
    mapaRuta = L.map(document.getElementById("mapaRuta"), {
        center: elementoRuta.puntos[0].ubicacion,
        zoom: 14,
        zoomControl: false
    });

    mapaRuta.createPane("punto");

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors"
    }).addTo(mapaRuta);

    const iconoPunto = L.divIcon({
        html: '<i class="bi bi-dot" style="color: blue; font-size: 50px;"></i>',
        className: '', // evita clases predeterminadas
        iconSize: [50, 50], // coincide con el tamaño del icono visual
        iconAnchor: [25, 25], // centro del ícono
        popupAnchor: [0, -25]
    });

    const iconoMeta = L.divIcon({
        html: '<i class="bi bi-flag-fill" style="color: darkgreen; font-size: 20px;"></i>',
        className: '',
        iconSize: [20, 20],
        iconAnchor: [5, 10],
    });

    elementoRuta.puntos.slice(1, -1).forEach(punto => {
        console.log(punto.ubicacion)
        puntoRuta = L.marker(punto.ubicacion, { icon: iconoPunto, pane: "punto"}).addTo(mapaRuta);
        puntoRuta.bindPopup(punto.hora);
        puntosRuta.push(puntoRuta);
    });

    L.marker(elementoRuta.puntos[0].ubicacion, { icon: iconoMeta, pane: "punto"}).addTo(mapaRuta);
    L.marker(elementoRuta.puntos[elementoRuta.puntos.length - 1].ubicacion).addTo(mapaRuta);


    L.control.zoom({
        position: 'bottomright'
    }).addTo(mapaRuta);

    setTimeout(() => {
        mapaRuta.invalidateSize();
    }, 200);


    return mapaRuta;
}


function crearContenedorPersonas(){
    const persona = listaDispositivos.find(l => l.id == idDispositivo);
    let listaPersonasConfianza = persona.personasConfianza;
    let listBotonesPersonas = document.getElementById("listaPersonas");
    listBotonesPersonas.innerHTML = "";

    document.getElementById("crearPC").addEventListener("click", () => crearPC( Array.from(listBotonesPersonas.querySelectorAll(".elementoLista"))));

    funcionalidadBusquedaLista(listaPersonasConfianza, crearCartaPC, listBotonesPersonas);

    crearCartaPC(listBotonesPersonas, Array.from(listBotonesPersonas.querySelectorAll(".elementoLista"))
    .find(l => l.dataset.id = listaPersonasConfianza[0].id), listaPersonasConfianza[0]);
}

function crearPC(listaBotones){
    document.getElementById("nombrePersona").value = "";
    document.getElementById("telefonoPersona").value = "";
    document.getElementById("descripcionPersona").value = "";

    document.getElementById("botonEliminarPC").style.display = "none";

    eliminarClase(listaBotones, "seleccionado");
}

function crearCartaPC(padre,elemento, elementoPersonaConfianza){
    eliminarClase(padre.querySelectorAll(".elementoLista"), "seleccionado");
    elemento.classList.add("seleccionado");
    document.getElementById("nombrePersona").value = elementoPersonaConfianza.nombre;
    document.getElementById("telefonoPersona").value = elementoPersonaConfianza.telefono;
    document.getElementById("descripcionPersona").value = elementoPersonaConfianza.descripcion;
    document.getElementById("imgConfianza").src = elementoPersonaConfianza.imagen;

    document.getElementById("botonEliminarPC").style.display = "inline";

    document.getElementById("botonEliminarPC").addEventListener("click",() => {
        funcionPanelMensaje("¿Estás seguro de que deseas eliminar esta Persona?", "Esta acción no se puede deshacer. Toda la información relacionada será permanentemente eliminada.", "eliminar", "Eliminar");
    });
}

function crearContenedores(){
    crearContenedorInformacion();
    crearContenedorPermisos();
    crearContenedorUbicacion();
    crearContenedorRuta();
    crearContenedorPersonas();
    eliminarDispositivo();

    document.getElementById("contenedorUbicacion").querySelector(".btnModificar").addEventListener("click", () => {
        if(validar.validarUbicacion(marcadorSeleccionado)){
             funcionPanelMensaje("¿Estás seguro de que deseas administrar esta Ubicacion?", "Esta informacion sera registrada y se le informara al usuario de la creacion de estos datos.", "modificar", "Crear");
        }else{
            funcionPanelMensaje("Datos invalidos", "Los datos ingresados son invalidos.", "modificar", "Aceptar");
        }
    });

    document.getElementById("contenedorPersonas").querySelector(".btnModificar").addEventListener("click", () => {
        if(validar.validarDatosPC()){
             funcionPanelMensaje("¿Estás seguro de que deseas administrar esta Persona?", "Esta informacion sera registrada y se le informara al usuario de la creacion de estos datos.", "modificar", "Crear");
        }else{
            funcionPanelMensaje("Datos invalidos", "Los datos ingresados son invalidos.", "modificar", "Aceptar");
        }
    });
    
}

document.addEventListener("DOMContentLoaded", function() {
    const elementosNav = document.getElementById("listaNavDispositivo").querySelectorAll(".nav-item");
    const botonMenu = document.getElementById("contenedor").querySelector(".botonBajar");
    const dispositivos = document.getElementById("listaDispositivos").querySelectorAll(".elementoDispositivo");   

    accionesNavBar(elementosNav);
    accionBotonMenu(botonMenu);
    accionesDispositivos(dispositivos);
    modificarIMG();
});
