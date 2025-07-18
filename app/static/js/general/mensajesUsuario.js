function crearMensaje(titulo, mensaje, clase, txtBtn, funcion=null, id=null, data=null) {
    let contenedor = document.getElementById("mensajes");
    contenedor.classList.add("mostrar");
    contenedor.innerHTML = `
        <div class="mensaje zoom-in">
            <i class="bi bi-x-circle-fill"></i>
            <h4>${titulo}</h4>
            <p>${mensaje}</p>
            <button class="btn" id="btnAccionPanel" style="background-color: ${clase} !important'">${txtBtn}</button>

        </div>
    `;
    const boton = contenedor.querySelector("#btnAccionPanel");
    boton.classList.add(clase);

    if (typeof funcion === "function") {
        boton.onclick = () => funcion(id);
    } else {
        boton.onclick = () => contenedor.classList.remove("mostrar");
    }
}

function agregarAcciones(clase, elemento) {
    elemento.querySelector(`button`).addEventListener("click", () => {
        elemento.classList.remove("mostrar");
    });
    elemento.querySelector("i").addEventListener("click", () => {
        elemento.classList.remove("mostrar");
    });
}

export function funcionPanelMensaje(titulo, mensaje, clase, txtBtn) {
    crearMensaje(titulo, mensaje, clase, txtBtn);
    agregarAcciones(clase, document.getElementById("mensajes"));
}



