import { funcionPanelMensaje } from '../general/mensajesUsuario.js';
import * as validar from './validacion.js';

let mapaUbicacion = null;
let marcadorSeleccionado = null;

let gestores = [
    {id:1,nombre:"Diego", mail:"diego@gmail", estado:true, permisos:[
        {id:1, nivel:1, estado:true},
        {id:2, nivel:1, estado:true},
        {id:3, nivel:1, estado:false},
        {id:4, nivel:1, estado:true},
        {id:5, nivel:1, estado:true},
        {id:6, nivel:1, estado:false},
        {id:7, nivel:1, estado:true},
        {id:8, nivel:1, estado:true},
        {id:9, nivel:1, estado:true},
    ]},
    {id:2, nombre:"Sebastian", mail:"sebastian@gmail", estado:false, permisos:[
        {id:1, nivel:1, estado:true},
        {id:2, nivel:2, estado:true},
        {id:3, nivel:3, estado:true},
    ]},
    {id:3, nombre:"Juan", mail:"juan@gmail", estado:true, permisos:[
        {id:1, nivel:3, estado:true},
    ]}
]

let ubicaciones = [
    {id:"1", idPersona:"1", punto:[-2.859448, -78.963261], nombre:"Casa", tipo:"green", descripcion:"Case de Sophia"},
    {id:"2", idPersona:"1",punto:[-2.8913363513451396, -78.97706831779115], nombre:"Casa ex-novio", tipo:"red", descripcion:"Casa del ex-novia abusivo."},
]

let personasConfianza = [
        { id: 2, idPersona: 2, nombre: "María", telefono: "099001122", descripcion: "Hermana", imagen: "../imagenes/placeholder.png" },
        { id: 4, idPersona: 2, nombre: "Ana", telefono: "099003344", descripcion: "Vecina", imagen: "../imagenes/placeholder.png" },
        { id: 6, idPersona: 2, nombre: "Diana", telefono: "099005566", descripcion: "Cuñada", imagen: "../imagenes/placeholder.png"},
        { id: 8, idPersona: 2, nombre: "Lucía", telefono: "099007788", descripcion: "Tía", imagen: "../imagenes/placeholder.png" },
        { id: 10, idPersona: 2, nombre: "Paola", telefono: "099009900", descripcion: "Sobrina", imagen: "../imagenes/placeholder.png" }
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


function crearContenedoresDatos(){

    agregarAccionesElementos("listaGestores", "dataGestor", datoContenedorGestor, "idGestor", agregarFuncionesCheck);
    agregarAccionesElementos("listaPCs", "dataPC", datoContenedorPC, "idPC");
    agregarAccionesElementos("listaUbicaciones", "dataUbicacion", datoContenedorUbicacion, "idUbicacion");
    agregarAccionesElementos("listaPermisos", "dataPermiso", datoContenedorPermiso, "idPermiso", agregarFuncionesCheck);

    funcionalidadBusquedaDatos();
}

function funcionalidadBusquedaDatos(){
    document.getElementById("busquedaUbicacion").addEventListener("keyup", (e) => {
        agregarAccionesElementos("listaUbicaciones", "dataUbicacion", datoContenedorUbicacion, "idUbicacion");
    });

    document.getElementById("busquedaPC").addEventListener("keyup", (e) => {
        agregarAccionesElementos("listaPCs", "dataPC", datoContenedorPC, "idPC");
    });
    document.getElementById("busquedaGestor").addEventListener("keyup", (e) => {
        agregarAccionesElementos("listaGestores", "dataGestor", datoContenedorGestor, "idGestor", agregarFuncionesCheck);
    });
}

function agregarAccionesElementos(nombreLista, data, funcion, nombreID, funcionExta = null){
    document.getElementById(nombreLista).querySelectorAll(".elementoLista").forEach(elemento => {
        elemento.addEventListener("click", () => {
            funcion(elemento.dataset[nombreID]);
            document.getElementById("datosContenedor").classList.add("abierto")
            document.getElementById(data).classList.add("abierto");
            if (typeof funcionExta === "function") {
                funcionExta();
            }
        });
    });
}


function funcionalidadImg(){
    const input = document.getElementById("inputImagenPC");
    const imagenUsuario = document.getElementById("imgPC");
    document.getElementById("agregarIMGPC").addEventListener("click", () => input.click());
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

function funcionalidadCrearMapa(){
    if (mapaUbicacion) {
        mapaUbicacion.remove(); // destruye el mapa anterior
        mapaUbicacion = null;
    }

    // Creamos el nuevo mapa
    mapaUbicacion = L.map(document.getElementById("mapaCrearUbicacion"), {
        center: [-2.8918931908671124, -79.03600936098859],
        zoom: 14,
        zoomControl: false
    });

    document.getElementById("mapaCrearUbicacion")._leafletMap = mapaUbicacion;

    L.control.zoom({
        position: 'bottomright'
    }).addTo(mapaUbicacion);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mapaUbicacion);

    funcionalidadMapa(document.getElementById("mapaCrearUbicacion")._leafletMap);

    setTimeout(() => {
        mapaUbicacion.invalidateSize();
    }, 200);

}

function datoContenedorGestor(id){
    let gestor = gestores.find(l => l.id == id);
    document.getElementById("nombreGestor").textContent = gestor.nombre;
    document.getElementById("mailGestor").textContent = gestor.mail;

    document.getElementById("listaPermisosGestor").innerHTML = "";

    gestor.permisos.forEach(permiso => {
        let permisoCreado = permisos.find(l => l.id == permiso.id);

        const nuevoElementoLista = document.createElement("li");

        const nuevaLabel = document.createElement("label");
        nuevaLabel.textContent = permisoCreado.nombre

        const selectNivel = document.createElement("select");
        selectNivel.classList.add("selectNivel");

        const nivel1 = document.createElement("option");
        nivel1.value=1;
        nivel1.textContent="Nivel 1";
        selectNivel.appendChild(nivel1);

        const nivel2 = document.createElement("option");
        nivel2.value=2;
        nivel2.textContent="Nivel 2";
        selectNivel.appendChild(nivel2);

        const nivel3 = document.createElement("option");
        nivel3.value=3;
        nivel3.textContent="Nivel 3";
        selectNivel.appendChild(nivel3);

        selectNivel.value = permiso.nivel;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = `${permisoCreado.nombre}Permiso${gestor.nombre}`;
        checkbox.value = "activo";
        checkbox.checked = permiso.estado;

        nuevoElementoLista.appendChild(nuevaLabel);
        nuevoElementoLista.appendChild(selectNivel);
        nuevoElementoLista.appendChild(checkbox);

        document.getElementById("listaPermisosGestor").appendChild(nuevoElementoLista);
    });

}

function datoContenedorPermiso(id){
    let permiso = permisos.find(l => l.id == id);
    document.getElementById("nombrePermiso").textContent = permiso.nombre;
    document.getElementById("descripcionPermiso").textContent = permiso.descripcion;

    let gestores_validos = gestores.filter(gestor => 
        gestor.permisos.some(l => l.id == id)
    );

    let gestores_invalidos = gestores.filter(gestor => gestor !== gestores_validos);

    gestores_invalidos.forEach(gestor => {
        let nuevaOpcion = document.createElement("option");
        nuevaOpcion.value = gestor.id;
        nuevaOpcion.textContent = gestor.nombre;

        document.getElementById("seleccionGestor").appendChild(nuevaOpcion);
    });

    document.getElementById("listaGestoresPermiso").innerHTML = "";

    gestores_validos.forEach(gestor => {
        let permisoGestor = gestor.permisos.find(l => l.id == id);

        const nuevoGestor = document.createElement("li");
        
        const nombreGestor = document.createElement("label");
        nombreGestor.textContent = gestor.nombre;

        const selectNivel = document.createElement("select");
        selectNivel.classList.add("selectNivel");
        selectNivel.classList.add("form-select");

        const nivel1 = document.createElement("option");
        nivel1.value=1;
        nivel1.textContent="Nivel 1";
        selectNivel.appendChild(nivel1);

        const nivel2 = document.createElement("option");
        nivel2.value=2;
        nivel2.textContent="Nivel 2";
        selectNivel.appendChild(nivel2);

        const nivel3 = document.createElement("option");
        nivel3.value=3;
        nivel3.textContent="Nivel 3";
        selectNivel.appendChild(nivel3);

        selectNivel.value = permisoGestor.nivel;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = `Gestor${gestor.id}Permiso${id}`;
        checkbox.value = "activo";
        checkbox.checked = permisoGestor.estado;


        nuevoGestor.appendChild(nombreGestor);
        nuevoGestor.appendChild(selectNivel);
        nuevoGestor.appendChild(checkbox);

        document.getElementById("listaGestoresPermiso").appendChild(nuevoGestor);
    });
    
}

function datoContenedorPC(id){
    let persona = personasConfianza.find(l => l.id == id);

    document.getElementById("nombrePC").textContent = persona.nombre;
    document.getElementById("descripcionPC").textContent = persona.descripcion;

}

function datoContenedorUbicacion(id){
    let ubicacion = ubicaciones.find(l => l.id == id);
    let mapa = crearMapa(ubicacion);
    generarPuntos(ubicacion, mapa);

    document.getElementById("nombreUbicacion").textContent = ubicacion.nombre;
    document.getElementById("descripcionUbicacion").textContent = ubicacion.descripcion;
    document.getElementById("miComboboxSeguridad").value = ubicacion.tipo;
}

function crearMapa(elementoUbicacion){
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

    setTimeout(() => {
        mapaUbicacion.invalidateSize();
    }, 200);

    return mapaUbicacion;
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

function funcionalidadMapa(mapa){

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

        setTimeout(() => {
            mapa.invalidateSize();
        }, 200);
    });
}

function crearDatos(){
    document.getElementById("crearGestor").addEventListener("click", () => {
        document.getElementById("crearDatos").classList.add("abierto");
        document.getElementById("crearDatoGestor").classList.add("abierto");
    });

    document.getElementById("crearPC").addEventListener("click", () => {
        document.getElementById("crearDatos").classList.add("abierto");
        document.getElementById("crearDatoPC").classList.add("abierto");
    });

    document.getElementById("crearUbicacion").addEventListener("click", () => {
        document.getElementById("crearDatos").classList.add("abierto");
        document.getElementById("crearDatoUbicacion").classList.add("abierto");
        funcionalidadCrearMapa();
    });
}

function cerrarVentanas(){
    document.getElementById("dataPC").querySelector("i").addEventListener("click", () => {
        document.getElementById("dataPC").classList.remove("abierto");
        document.getElementById("datosContenedor").classList.remove("abierto");
    });

    document.getElementById("dataPermiso").querySelector("i").addEventListener("click", () => {
        document.getElementById("dataPermiso").classList.remove("abierto");
        document.getElementById("datosContenedor").classList.remove("abierto");
    });

    document.getElementById("dataUbicacion").querySelector("i").addEventListener("click", () => {
        document.getElementById("dataUbicacion").classList.remove("abierto");
        document.getElementById("datosContenedor").classList.remove("abierto");
    });

    document.getElementById("dataGestor").querySelector("i").addEventListener("click", () => {
        document.getElementById("dataGestor").classList.remove("abierto");
        document.getElementById("datosContenedor").classList.remove("abierto");
    });

    document.getElementById("crearDatoGestor").querySelector("i").addEventListener("click", () => {
        document.getElementById("crearDatos").classList.remove("abierto");
        document.getElementById("crearDatoGestor").classList.remove("abierto");
    });
    document.getElementById("crearDatoPC").querySelector("i").addEventListener("click", () => {
        document.getElementById("crearDatos").classList.remove("abierto");
        document.getElementById("crearDatoPC").classList.remove("abierto");
    });
    document.getElementById("crearDatoUbicacion").querySelector("i").addEventListener("click", () => {
        document.getElementById("crearDatos").classList.remove("abierto");
        document.getElementById("crearDatoUbicacion").classList.remove("abierto");
    });
}

function funcionesMensajes(){
    document.getElementById("crearNuevoPC").addEventListener("click", () => {
        document.getElementById("crearDatos").classList.remove("abierto");
        document.getElementById("crearDatoPC").classList.remove("abierto");

        if (validar.validarDatosPC()){
            document.getElementById("crearDatos").classList.remove("abierto");
            document.getElementById("crearDatoPC").classList.remove("abierto");
            funcionPanelMensaje("Creacion de la Persona de Confianza", "Esta accion registrar esta persona de confianza al sistema. ¿Desea continar?", "comunicacion", "Crear");
        }else{
            funcionPanelMensaje("Datos erroneos de la Persona de Confianza", "Los datos son invalidos para la creacion de una persona de confianza.", "comunicacion", "Aceptar");
        }    
    });

    document.getElementById("crearNuevoGestor").addEventListener("click", () => {
        if (validar.validarDatosGestor()){
            document.getElementById("crearDatos").classList.remove("abierto");
            document.getElementById("crearDatoGestor").classList.remove("abierto");
            funcionPanelMensaje("Registro de nuevo Gestor", "Esta accion registrara al gestor y podra gestionar permisos para el mismo. ¿Desea continar?", "comunicacion", "Registrar");
            
        }else{
            funcionPanelMensaje("Datos erroneos del Gestor", "Los datos son invalidos para el registro de un gestor.", "comunicacion", "Aceptar");
        }
    });
}

function agregarFuncionesCheck(){
    document.getElementById("listaPermisosGestor").querySelectorAll('input[type="checkbox"]').forEach(elemento => {
        elemento.addEventListener("change", (e) => {
            if(e.target.checked){
                funcionPanelMensaje("Activar Permiso", "¿Estas seguro que quieres activar el siguiente permiso?, esto le dara acceso a la informacion previamente mencionada.", "comunicacion", "Activar");
            }else{
                funcionPanelMensaje("Desactivar Permiso", "¿Estas seguro que quieres desactivar el siguiente permiso?, esto le quitara acceso a la informacion previamente mencionada.", "comunicacion", "Desactivar");
            }
        });
    });

    document.getElementById("listaGestoresPermiso").querySelectorAll('input[type="checkbox"]').forEach(elemento => {
        elemento.addEventListener("change", (e) => {
            if(e.target.checked){
                funcionPanelMensaje("Activar Gestor", "¿Estas seguro que quieres activar el siguiente gestor?, esto le dara acceso a al permiso actual.", "comunicacion", "Activar");
            }else{
                funcionPanelMensaje("Desactivar Gestor", "¿Estas seguro que quieres desactivar el siguiente gestor?, esto le quitara acceso a el permiso actual.", "comunicacion", "Desactivar");
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    crearContenedoresDatos();
    crearDatos();
    cerrarVentanas();
    funcionesMensajes();
    funcionalidadImg();
});