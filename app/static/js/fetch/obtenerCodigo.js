export async function getCodigo(){
    const res = await fetch('/code', {
        method: 'GET',
        credentials: 'include'
    });

    const data = await res.json();

    return data.codigo;
}