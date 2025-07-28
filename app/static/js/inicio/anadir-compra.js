import { crear_orden } from "../fetch/realizarCompra.js";

let listaValores = []
const dataUsuario = JSON.parse(sessionStorage.getItem("usuario"));

function updateTotal() {
  let total = 0;
  document.querySelectorAll('.carrito-compra li').forEach(item => {
    const price = parseFloat(item.getAttribute('data-price')) || 0;
    total += price;
  });
  document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
}


function addOrUpdateCartItem(id, name, description, price, quantity, caracteristica) {
  const cartList = document.querySelector('.carrito-compra');
  let existing = cartList.querySelector(`li[data-id="${id}"]`);

  if(!name.includes('Plan') && name != "Dispositivo Extra"){

    listaValores.push({
      valor: quantity,
      id_caracteristica: caracteristica,
    });
  }

  if (!existing) {
    existing = document.createElement('li');
    existing.className = 'list-group-item d-flex justify-content-between lh-condensed';
    existing.setAttribute('data-id', id);
    cartList.appendChild(existing);
  }

  const totalItemPrice = (price * quantity).toFixed(2);
  existing.setAttribute('data-price', totalItemPrice);
  existing.innerHTML = `
    <div>
      <h6 class="my-0">${name} x${quantity}</h6>
      <small class="text-muted">${description}</small>
    </div>
    <span class="text-muted">$${totalItemPrice}</span>
  `;

  updateTotal();
}

function removeFromCart(id) {
  const cartList = document.querySelector('.carrito-compra');
  const item = cartList.querySelector(`li[data-id="${id}"]`);
  if (item) {
    cartList.removeChild(item);
  }
  updateTotal();
}

// Agregar plan a carrito
const plan_code = sessionStorage.getItem('plan');
const plan_price = sessionStorage.getItem('plan_price');
const plan_description = 'Plan escogido';
var plan = ""
switch (plan_code) {
        case "plan1":
            plan = "Plan Básico"
            break;

        case "plan2":
            plan = "Plan Intermedio"
            break;

        case "plan3":
            plan = "Plan Premium"
            break;

        default:
            console.log("Error.");
    }
addOrUpdateCartItem("plan",plan,plan_description,plan_price,1)


document.querySelectorAll('.form-check-input').forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const id = checkbox.dataset.id;
    const name = checkbox.dataset.name;
    const description = checkbox.dataset.description;
    const price = checkbox.dataset.price;
    const quantity = parseInt(checkbox.value) || 0;
    const caracteristica = parseInt(checkbox.dataset.caracteristica);

    if (checkbox.checked) {
      addOrUpdateCartItem(id, name, description, price, quantity, caracteristica);
    } else {
      removeFromCart(id);
      listaValores = listaValores.filter(e => e.id_caracteristica != id);
    }
  });
});

document.querySelectorAll('.form-control').forEach(input => {
  input.addEventListener('input', () => {
    const id = input.dataset.id;
    const name = input.dataset.name;
    const description = input.dataset.description;
    const price = parseFloat(input.dataset.price);
    const quantity = parseInt(input.value) || 0;

    if (quantity > 0) {
      addOrUpdateCartItem(id, name, description, price, quantity, 1);
    } else {
      removeFromCart(id);
    }
  });
});

async function generarDataTransaccion() {
  const total = parseFloat(document.getElementById('total-price').textContent.split("$")[1]);
  const plan = parseInt(sessionStorage.getItem('plan_id'));
  const valor = parseInt(document.getElementById("cantidadDispositivo").value);

  const caracteristicas_usuario = []

  if(valor != 0){
    const dict = {
      id_caracteristica: 1,
      valor: valor
    }
    caracteristicas_usuario.push(dict);
  }

  for(const elemento of listaValores){
    const dict = {
      id_caracteristica: elemento.id_caracteristica,
      valor: elemento.valor
    }
    caracteristicas_usuario.push(dict);
  }

  let data_transaccion;

  if(caracteristicas_usuario.length > 0){
    data_transaccion = {
      id_usuario: dataUsuario.id,
      caracteristicas_usuario: caracteristicas_usuario
    }
  }else{
    data_transaccion = {
      id_usuario: dataUsuario.id
    }
  }

  await crear_orden(total, plan, data_transaccion);

}

const checkout_button = document.getElementById("checkout");

checkout_button.addEventListener("click", async function () {
    await generarDataTransaccion()
});



