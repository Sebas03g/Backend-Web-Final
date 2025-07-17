import { eliminarClase } from '../general/utilidades.js';
import { esPantallaPequena } from '../general/utilidades.js';
import { slideLeftElementos } from '../general/utilidades.js';

var idDipositivo;

const dataUsuario = JSON.parse(sessionStorage.getItem("usuario"));

const dispositivos = dataUsuario.dispositivos_asignados;

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

function crearDispositivos(listaDispositivos){
  listaDispositivos.innerHTML = "";
  eliminarClase(listaDispositivos.querySelectorAll(".elementoDispositivo"), "seleccionado");

  dispositivos.forEach(dispositivo => {

    crearDispositivo(dispositivo, listaDispositivos);

  })
}

function crearDispositivo(dispositivo, listaDispositivos){
  const li = document.createElement('li');

  const div = document.createElement('div');
  div.className = 'elementoDispositivo';
  div.setAttribute('data-id-dispositivo', parseInt(dispositivo.id));

  const btnSettings = document.createElement('button');
  btnSettings.className = 'settingsDispositivo iconos';
  btnSettings.innerHTML = '<i class="bi bi-gear"></i>';

  const label = document.createElement('label');
  label.textContent = dispositivo.nombre_completo;

  const btnEditar = document.createElement('button');
  btnEditar.className = 'editarDispositivos iconos';
  btnEditar.innerHTML = '<i class="bi bi-pencil"></i>';

  div.appendChild(btnSettings);
  div.appendChild(label);
  div.appendChild(btnEditar);

  li.appendChild(div);

  listaDispositivos.appendChild(li);
}

document.addEventListener("DOMContentLoaded", function(){ 
    const btnMenu = document.getElementById('botonMenu');
    const listaDispositivos = document.getElementById("listaDispositivos");
    const btnAgregarDispositivo = document.getElementById("btn-creacion");

    crearDispositivos(listaDispositivos);

    accionMenuBoton(btnMenu);
    accionListaDispositivos(listaDispositivos);
    botonAgregarDispositivo(btnAgregarDispositivo, listaDispositivos);
});