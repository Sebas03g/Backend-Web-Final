import { addDevice, modificarEstadoDispositivo } from '../fetch/agregarDispositivo.js'

export async function agregarGestor(){

    const codigo = document.getElementById("codigoGestor").value;

    await addDevice(codigo);
}

export async function estadoGestor(id){
    await modificarEstadoDispositivo(id);
}
