import { addDevice, modificarEstadoDispositivo } from '../fetch/agregarDispositivo.js'

export async function agregarGestor(codigo){
    await addDevice(codigo);
}

export async function estadoGestor(id){
    await modificarEstadoDispositivo(id);
}
