import { createData } from "../fetch/sentenciasFetch";

export async function crearPunto(punto){
    const punto = await createData(punto) 
    return punto;
}