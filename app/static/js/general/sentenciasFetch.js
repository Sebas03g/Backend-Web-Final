export async function createElement(elementClass, data){
    const response = await fetch(`/${elementClass}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`(${response.status}) ${errorText}`);
    }
    return await response.json();
}

export async function getAllElement(elementClass){
    const response = await fetch(`/${elementClass}`);
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`(${response.status}) ${errorText}`);
    }
    return await response.json();
}

export async function getElementByID(elementClass, id){
    const response = await fetch(`/${elementClass}/${id}`);
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`(${response.status}) ${errorText}`);
    }
    return await response.json();
}

export async function updateElement(elementClass, id, data){
    const response = await fetch(`/${elementClass}/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`(${response.status}) ${errorText}`);
    }
    return await response.json();
}

export async function deleteElement(elementClass, id){
    const response = await fetch(`/${elementClass}/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`(${response.status}) ${errorText}`);
    }
    return await response.json();
}