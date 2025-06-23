export function eliminarClase(elementos, clase){
    elementos.forEach(elemento => {
      elemento.classList.remove(clase);
    })
}

export function esPantallaPequena() {
  return window.innerWidth <= 768;
}

export function slideDownElementos(elemento, clase = "abierto") {
    elemento.classList.remove('slide-up');
    elemento.classList.remove('slide-down');
    elemento.classList.add('slide-down');
    setTimeout(() => {
        elemento.classList.remove(clase);
        elemento.classList.remove('slide-down');
        elemento.classList.add('slide-up');
    }, 300);
}

export function slideLeftElementos(elemento) {
    elemento.classList.remove('slide-right');
    elemento.classList.remove('slide-left');
    elemento.classList.add('slide-left');
    setTimeout(() => {
        elemento.classList.remove('mostrar');
        elemento.classList.remove('slide-left');
        elemento.classList.add('slide-right');
    }, 300);
}

export function esEmailValido(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

export function esTelefonoValido(telefono) {
  const regex = /^\+?[0-9\s\-().]{7,20}$/;
  return regex.test(telefono);
}

export function validarVacio(cadena){
    return cadena.length > 0;
}

export function validarCedulaBasica(cedula) {
  return /^\d{10}$/.test(cedula);
}