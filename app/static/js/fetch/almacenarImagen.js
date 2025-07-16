export async function uploadImage({file}){

    const formData = new FormData();
    formData.append('archivo', file);

    const res = await fetch('/upload',{
        method: 'POST',
        credentials: 'include',
    });

    const data = await res.json();

    if (data.success) {
      return data.url;
    }
}