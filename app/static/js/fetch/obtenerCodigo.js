export async function getCodigo(){
    const res = await fetch('/code', {
        method: 'GET'
    });

    const data = await res.json();

    return data.codigo;
}