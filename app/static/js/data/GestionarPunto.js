import { createData } from "../fetch/sentenciasFetch.js";

export async function crearPunto(punto){
    const punto = await createData(punto) 
    return punto;
}