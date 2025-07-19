import { eliminarClase } from '../general/utilidades.js';
import { esPantallaPequena } from '../general/utilidades.js';
import { slideLeftElementos } from '../general/utilidades.js';

var idDipositivo;

let dispositivos;

function recargarDatos(){
    const dataUsuario = JSON.parse(sessionStorage.getItem("usuario"));
    dispositivos = dataUsuario.dispositivos_gestionados;
}

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

export function accionListaDispositivos(listaDispositivos){
  recargarDatos();

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

export function crearDispositivos(listaDispositivos){
  recargarDatos()
  listaDispositivos.innerHTML = "";
  
  eliminarClase(listaDispositivos.querySelectorAll(".elementoDispositivo"), "seleccionado");

  dispositivos.forEach(dispositivo => {

    crearDispositivo(dispositivo, listaDispositivos);

  })
}

function crearDispositivo(dispositivo, listaDispositivos){
  const li = document.createElement('li');

  const div = document.createElement('div');

  if(dispositivo.usuario_asignado){
    div.className = 'elementoDispositivo';
    div.setAttribute('data-id-dispositivo', parseInt(dispositivo.id));
    div.setAttribute('data-id-asignado', parseInt(dispositivo.usuario_asignado.id));
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
  }else{
    div.className = 'elementoDispositivoDesactivo';
    const label = document.createElement('label');
    label.innerHTML = `${dispositivo.nombre_completo}<br>`
    const subTitulo = document.createElement('label');
    subTitulo.classList.add("subTema");
    subTitulo.textContent = "Falta Activacion"
    div.appendChild(label);
    div.appendChild(subTitulo);
    li.appendChild(div);

    listaDispositivos.appendChild(li);
  }
  
}

document.addEventListener("DOMContentLoaded", function(){ 
    const btnMenu = document.getElementById('botonMenu');
    const listaDispositivos = document.getElementById("listaDispositivos");
    const btnAgregarDispositivo = document.getElementById("btn-creacion");

    recargarDatos();

    crearDispositivos(listaDispositivos);

    accionMenuBoton(btnMenu);
    accionListaDispositivos(listaDispositivos);
    botonAgregarDispositivo(btnAgregarDispositivo, listaDispositivos);
});