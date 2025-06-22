import { eliminarClase } from '../utilidades.js';
import { esPantallaPequena } from '../utilidades.js';
import { slideLeftElementos } from '../utilidades.js';

var idDipositivo;

function accionMenuBoton(btn){
  const menu = document.getElementById('contenedorMenu');
  btn.addEventListener('click', () => {
    if(menu.classList.contains("mostrar")){
      slideLeftElementos(menu);
    }else{
      menu.classList.add('mostrar');
    }
    
    btn.classList.toggle('seleccionado');
    document.getElementById("contenedorUbicacionesGenerales").classList.remove("activo");

    if(esPantallaPequena()){
      document.getElementById("contenedor").classList.remove("abierto");
    }

  });
}

function accionListaDispositivos(listaDispositivos){
  listaDispositivos.querySelectorAll(".elementoDispositivo").forEach(elemento => {
    elemento.querySelector('label').addEventListener("click", ()=>{
      eliminarClase(listaDispositivos.querySelectorAll(".elementoDispositivo"), "seleccionado");
      elemento.classList.add("seleccionado")
      document.getElementById("contenedor").classList.remove("abierto");
      document.getElementById("modificarPersona").classList.remove("abierto");
      document.getElementById("creacionPersona").classList.remove("abierto");
      document.getElementById("btn-creacion").classList.remove("seleccionado");
      idDipositivo = elemento.dataset.idDispositivo;

    });
  });
}

function botonAgregarDispositivo(btn, listaDispositivos){
  btn.addEventListener("click", () => {
    eliminarClase(listaDispositivos.querySelectorAll(".elementoDispositivo"), "seleccionado");
    btn.classList.toggle("seleccionado")

    if(esPantallaPequena()){
        document.getElementById('contenedorMenu').classList.remove('mostrar');
        document.getElementById('botonMenu').classList.remove('seleccionado');
    }

  });
}

document.addEventListener("DOMContentLoaded", function(){ 
    const btnMenu = document.getElementById('botonMenu');
    const listaDispositivos = document.getElementById("listaDispositivos");
    const btnAgregarDispositivo = document.getElementById("btn-creacion");

    accionMenuBoton(btnMenu);
    accionListaDispositivos(listaDispositivos);
    botonAgregarDispositivo(btnAgregarDispositivo, listaDispositivos);
});