const BASE_URL = 'https://127.0.0.1:5000/';

export const crear_orden = async(total, plan, data) => {
    const data_trans = {amount: total, currency: "USD", id_plan: plan}
    console.log(data_trans);
    try {
        const response = await axios.post(`${BASE_URL}create-order`, data_trans, {
            withCredentials: true
        });
    
        const objeto = response.data;

        const orderId = objeto.order_id;

        data["order_id"] = orderId;
        data["id_plan"] = plan;

        sessionStorage.setItem("data_transaccion", JSON.stringify(data));

        const approveLink = objeto.links.find(link => link.rel === "approve")?.href;

        if (approveLink) {
            window.location.href = approveLink;
        } else {
            console.error("No se encontró el enlace de aprobación.");
        }

    } catch (error) {
        console.error("Error en createData:", error);
        throw error;
    }
}

export const capturar_orden = async(data) => {
    try {
        await axios.post(`${BASE_URL}capture-order`, data, {
            withCredentials: true
        });

    } catch (error) {
        console.error("Error en createData:", error);
        throw error;
    }
}