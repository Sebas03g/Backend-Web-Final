import {esEmailValido} from  '../general/utilidades.js';
import {esTelefonoValido} from  '../general/utilidades.js';
import {validarVacio} from '../general/utilidades.js';

export function validarDatosGestor(){
    const codigo = document.getElementById("codigoGestor").value;
    return validarVacio(codigo);

}

export function validarDatosPC(){
    const nombre = document.getElementById("nombreCrearPC").value;
    const telefono = document.getElementById("telCrearPC").value;
    return validarVacio(nombre) && esTelefonoValido(telefono);
}

export function validarDatosUbicacion(punto){
    const nombre = document.getElementById("nombreCrearUbicacion").value;
    const descripcion = document.getElementById("descripcionCrearUbicacion").value;
    const tipo = document.getElementById("miComboboxCrearSeguridad").value;

    return validarVacio(nombre) && validarVacio(descripcion) && validarVacio(tipo) && punto != null; 
}

export function validarUsuario(){
    const nombre = document.getElementById("nombreUsuario").value;
    const telefono = document.getElementById("telefonoUsuario").value;
    const email = document.getElementById("correoUsuario").value;

    return validarVacio(nombre) && esTelefonoValido(telefono) && esEmailValido(email);

}

export function validarAsignacion(){
    const nivel = document.getElementById("seleccionNivel").value;
    const id_dispositivo = document.getElementById("seleccionGestor").value

    return validarVacio(nivel) && validarVacio(id_dispositivo)
}
