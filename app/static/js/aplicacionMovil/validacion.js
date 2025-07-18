import {esEmailValido} from  '../general/utilidades.js';
import {esTelefonoValido} from  '../general/utilidades.js';
import {validarVacio} from '../general/utilidades.js';

export function validarDatosGestor(){
    const email = document.getElementById("emailGestor").value;
    const codigo = document.getElementById("codigoGestor").value;
    return esEmailValido(email) && validarVacio(codigo);

}

export function validarDatosPC(){
    const nombre = document.getElementById("nombreCrearPC").value;
    const telefono = document.getElementById("telCrearPC").value;
    return validarVacio(nombre) && esTelefonoValido(telefono);
}

export function validarUsuario(){
    const nombre = document.getElementById("nombreUsuario").value;
    const telefono = document.getElementById("telefonoUsuario").value;
    const email = document.getElementById("correoUsuario").value;

    return validarVacio(nombre) && esTelefonoValido(telefono) && esEmailValido(email);

}
