import { funcionPanelMensaje } from '../general/mensajesUsuario.js';
import * as validar from './validacion.js';
import { getAllData } from '../fetch/sentenciasFetch.js';
import { agregarGestor } from './funcionalidadGestor.js';
import { crearContenedorGestores, crearContenedorPC, crearContenedorUbicaciones } from './contenedores.js';
import { agregarPC } from './funcionalidadPC.js';
import { agregarUbicacion } from './funcionalidadUbicacion.js';
import { asignarPermiso, modificarEstadoPU, modificarNivel } from './funcionalidadPermiso.js';

let mapaUbicacion = null;
let marcadorSeleccionado = null;
const dataUsuario = JSON.parse(sessionStorage.getItem("usuario"));

let gestores = dataUsuario.dispositivos_asignados;

let ubicaciones = dataUsuario.ubicaciones_creadas;

let personasConfianza = dataUsuario.personas_confianza;

let permisos;

async function getPermisos(){
    permisos =  await getAllData("permiso");
}

function recargarDatos(){
    const dataUsuario = JSON.parse(sessionStorage.getItem("usuario"));

    gestores = dataUsuario.dispositivos_asignados;

    ubicaciones = dataUsuario.ubicaciones_creadas;

    personasConfianza = dataUsuario.personas_confianza
}

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
        mapaUbicacion.remove();
        mapaUbicacion = null;
    }

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
    document.getElementById("nombreGestor").textContent = gestor.gestor.nombre_completo;
    document.getElementById("mailGestor").textContent = gestor.gestor.correo_electronico;

    document.getElementById("listaPermisosGestor").innerHTML = "";

    gestor.permisos_usuario.forEach(permiso => {
        let permisoCreado = permisos.find(l => l.id == permiso.permiso.id);

        const nuevoElementoLista = document.createElement("li");
        nuevoElementoLista.dataset.idPermiso = permiso.permiso.id;

        const nuevaLabel = document.createElement("label");
        nuevaLabel.textContent = permisoCreado.nombre

        const selectNivel = document.createElement("select");
        selectNivel.classList.add("selectNivel");
        selectNivel.dataset.idPU = permiso.id;
        selectNivel.addEventListener("change", async(e) => await modificarNivelPermisoGestor(gestor.id, e));

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
        checkbox.dataset.idPU = permiso.id;
        checkbox.dataset.idGestor = gestor.id
        checkbox.addEventListener("change", async(e) => await modificarAccesoPermisoGestor(e));
        
        nuevoElementoLista.appendChild(nuevaLabel);
        nuevoElementoLista.appendChild(selectNivel);
        nuevoElementoLista.appendChild(checkbox);

        document.getElementById("listaPermisosGestor").appendChild(nuevoElementoLista);
    });

}

async function modificarNivelPermisoGestor(id, elemento){ 
    funcionPanelMensaje("Gestion Permiso", "Esta accion modificara el nivel del permiso del gestor, ¿Desea continar?", "comunicacion", "Aceptar");
    document.getElementById("btnAccionPanel").onclick = null
    document.getElementById("btnAccionPanel").addEventListener("click", async() => await modificarNivel(id, elemento));  
    recargarDatos();
}

async function modificarAccesoPermisoGestor(e){
    funcionPanelMensaje("Gestion Permiso", "Esta accion modificara el acceso al permiso del gestor, ¿Desea continar?", "comunicacion", "Aceptar");

    if(e.target.checked){
            funcionPanelMensaje("Activar Gestor", "¿Estas seguro que quieres activar el siguiente gestor?, esto le dara acceso a al permiso actual.", "comunicacion", "Activar");  
    }else{
        funcionPanelMensaje("Desactivar Gestor", "¿Estas seguro que quieres desactivar el siguiente gestor?, esto le quitara acceso a el permiso actual.", "comunicacion", "Desactivar");
    }
    document.getElementById("btnAccionPanel").onclick = null
    document.getElementById("btnAccionPanel").addEventListener("click", async() => {
        await modificarEstadoPU(e)
        recargarDatos();
    });
    
    
}

function datoContenedorPermiso(id){
    let permiso = permisos.find(l => l.id == id);
    document.getElementById("nombrePermiso").textContent = permiso.nombre;
    document.getElementById("descripcionPermiso").textContent = permiso.descripcion;
    document.getElementById("btnActivarPermiso").dataset.idPermiso = id;

    crearListaPermisosValidos(id);

}

function crearListaPermisosValidos(id){
    let gestores_validos = gestores.filter(gestor => 
        gestor.permisos_usuario.some(l => l.permiso.id == id)
    );

    let gestores_invalidos = gestores.filter(gestor =>  !gestores_validos.includes(gestor));

    gestores_invalidos.forEach(gestor => {
        let nuevaOpcion = document.createElement("option");
        nuevaOpcion.value = gestor.id;
        nuevaOpcion.textContent = gestor.gestor.nombre_completo;

        document.getElementById("seleccionGestor").appendChild(nuevaOpcion);
    });

    document.getElementById("listaGestoresPermiso").innerHTML = "";

    gestores_validos.forEach(gestor => {
        let permisoGestor = gestor.permisos_usuario.find(l => l.permiso.id == id);
        const nuevoGestor = document.createElement("li");
        nuevoGestor.dataset.estado = permisoGestor.estado;
        nuevoGestor.dataset.pu = permisoGestor.id;
        
        const nombreGestor = document.createElement("label");
        nombreGestor.textContent = gestor.nombre_completo;

        const selectNivel = document.createElement("select");
        selectNivel.classList.add("selectNivel");
        selectNivel.classList.add("form-select");
        selectNivel.dataset.idPU = permisoGestor.id;
        selectNivel.addEventListener("change", async(e) => await modificarNivelPermisoGestor(e));

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

        console.log("ESTADO");
        console.log(permisoGestor);
        console.log(permisoGestor.estado);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = `Gestor${gestor.id}Permiso${id}`;
        checkbox.value = "activo";
        checkbox.checked = permisoGestor.estado;
        checkbox.addEventListener("change", async(e) => await modificarAccesoPermisoGestor(e));
        checkbox.dataset.idPU = permisoGestor.id;
        checkbox.dataset.idGestor = gestor.id;
        


        nuevoGestor.appendChild(nombreGestor);
        nuevoGestor.appendChild(selectNivel);
        nuevoGestor.appendChild(checkbox);

        document.getElementById("listaGestoresPermiso").appendChild(nuevoGestor);
    });
    
    document.getElementById("btnActivarPermiso").addEventListener("click", async() => {
        await funcionBtnActivarPermiso();
    })
}

async function funcionBtnActivarPermiso(){
    if(validar.validarAsignacion()){
        const id_permiso = document.getElementById("btnActivarPermiso").dataset.idPermiso;
        funcionPanelMensaje("Asignacion de Permiso", "Esta accion dara acceso a este permiso al siguiente gestor, ¿Desea continar?", "comunicacion", "Aceptar");
        document.getElementById("btnAccionPanel").onclick = null
        document.getElementById("btnAccionPanel").addEventListener("click", async() => await recargarListaPermisos(id_permiso));    
    }else{
        funcionPanelMensaje("Datos erroneos para la asignacion de Permiso", "Los datos son invalidos para la asignacion de permisos.", "comunicacion", "Aceptar");
    }
}

async function recargarListaPermisos(id_permiso){
    await asignarPermiso(id_permiso)
    recargarDatos();
    crearListaPermisosValidos(id_permiso);
}

function datoContenedorPC(id){
    let persona = personasConfianza.find(l => l.id == id);

    document.getElementById("imgPersona").src = `uploads/${persona.imagen}`;
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
        mapaUbicacion.remove();
        mapaUbicacion = null;
    }

    mapaUbicacion = L.map(document.getElementById("mapaUbicacion"), {
        center: elementoUbicacion.punto.split(",").map(Number),
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
    let area = L.circle(elementoUbicacion.punto.split(",").map(Number), {
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

    document.getElementById("dataPermiso").querySelector("i").addEventListener("click", (e) => {
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
            document.getElementById("btnAccionPanel").onclick = null
            document.getElementById("btnAccionPanel").addEventListener("click", async() => await crearPC());
            
        }else{
            funcionPanelMensaje("Datos erroneos de la Persona de Confianza", "Los datos son invalidos para la creacion de una persona de confianza.", "comunicacion", "Aceptar");
        }    
    });

    document.getElementById("crearNuevoGestor").addEventListener("click", () => {
        if (validar.validarDatosGestor()){
            document.getElementById("crearDatos").classList.remove("abierto");
            document.getElementById("crearDatoGestor").classList.remove("abierto");
            funcionPanelMensaje("Registro de nuevo Gestor", "Esta accion registrara al gestor y podra gestionar permisos para el mismo. ¿Desea continar?", "comunicacion", "Registrar");
            document.getElementById("btnAccionPanel").onclick = null
            document.getElementById("btnAccionPanel").addEventListener("click", async() => await crearGestor());
            
        }else{
            funcionPanelMensaje("Datos erroneos del Gestor", "Los datos son invalidos para el registro de un gestor.", "comunicacion", "Aceptar");
        }
    });

    document.getElementById("crearNuevaUbicacion").addEventListener("click", () => {
        if(validar.validarDatosUbicacion(marcadorSeleccionado)){
            document.getElementById("crearDatos").classList.remove("abierto");
            document.getElementById("crearDatoUbicacion").classList.remove("abierto");
            funcionPanelMensaje("Registro de nueva Ubicacion", "Esta accion registrara Esta accion registrar esta ubicacion al sistema. ¿Desea continar?", "comunicacion", "Crear");
            document.getElementById("btnAccionPanel").onclick = null
            document.getElementById("btnAccionPanel").addEventListener("click", async() => await crearUbicacion());
            
        }else{
            funcionPanelMensaje("Datos erroneos de la Ubicacion", "Los datos son invalidos para el registro de una ubicacion.", "comunicacion", "Aceptar");
        }
    })
}

async function crearPC(){
    await agregarPC();
    crearContenedorPC();
    recargarDatos();
}

async function crearGestor(){
    await agregarGestor();
    crearContenedorGestores();
    recargarDatos();
}

async function crearUbicacion(){
    await agregarUbicacion(marcadorSeleccionado);
    crearContenedorUbicaciones();
    recargarDatos();
}


function agregarFuncionesCheck(){
    document.getElementById("listaPermisosGestor").querySelectorAll('input[type="checkbox"]').forEach(elemento => {
        elemento.addEventListener("change", (e) => {
            if(e.target.checked){
                funcionPanelMensaje("Activar Permiso", "¿Estas seguro que quieres activar el siguiente permiso?, esto le dara acceso a la informacion previamente mencionada.", "comunicacion", "Activar");
            }else{
                funcionPanelMensaje("Desactivar Permiso", "¿Estas seguro que quieres desactivar el siguiente permiso?, esto le quitara acceso a la informacion previamente mencionada.", "comunicacion", "Desactivar");
            }

            document.getElementById("btnAccionPanel").onclick = null
            document.getElementById("btnAccionPanel").addEventListener("click", async() => {
                console.log(e)
                await modificarEstadoPU(e)
                recargarDatos();
            });
        });
    });

    document.getElementById("listaGestoresPermiso").querySelectorAll('input[type="checkbox"]').forEach(elemento => {
        elemento.addEventListener("change", (e) => {
            if(e.target.checked){
                funcionPanelMensaje("Activar Gestor", "¿Estas seguro que quieres activar el siguiente gestor?, esto le dara acceso a al permiso actual.", "comunicacion", "Activar");
                
            }else{
                funcionPanelMensaje("Desactivar Gestor", "¿Estas seguro que quieres desactivar el siguiente gestor?, esto le quitara acceso a el permiso actual.", "comunicacion", "Desactivar");
            }

            document.getElementById("btnAccionPanel").onclick = null
            document.getElementById("btnAccionPanel").addEventListener("click", async() => {
                await modificarEstadoPU(e)
                recargarDatos();
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    recargarDatos();
    await getPermisos();
    crearContenedoresDatos();
    crearDatos();
    cerrarVentanas();
    funcionesMensajes();
    funcionalidadImg();
});