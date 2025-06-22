import { validarCedulaBasica } from "../utilidades.js"
import {esEmailValido} from  '../utilidades.js';
import {esTelefonoValido} from  '../utilidades.js';
import {validarVacio} from '../utilidades.js';

export function validarDatosPersona(tipo){

    const nombre = document.getElementById(`nombreDispositivo${tipo}`).value;
    const cedula = document.getElementById(`cedulaDispositivo${tipo}`).value;
    const correo = document.getElementById(`correoDispositivo${tipo}`).value;
    const telefono = document.getElementById(`telefonoDispositivo${tipo}`).value;

    return validarVacio(nombre) && validarCedulaBasica(cedula) && esEmailValido(correo) && esTelefonoValido(telefono);
}

export function validarUbicacion(punto, nivel=""){
    const nombre = document.getElementById(`nombreUbicacion${nivel}`).value;
    const tipo =  document.getElementById(`miComboboxSeguridad${nivel}`).value;

    console.log(punto)
    console.log(nombre)
    console.log(tipo);

    return validarVacio(nombre) && validarVacio(tipo) && punto != null;
}

export function validarDatosPC(){
    const nombre = document.getElementById("nombrePersona").value;
    const telefono = document.getElementById("telefonoPersona").value;
    const descripcion = document.getElementById("descripcionPersona").value;
    return validarVacio(nombre) && esTelefonoValido(telefono) && validarVacio(descripcion);
}