function updateTotal() {
  let total = 0;
  document.querySelectorAll('.carrito-compra li').forEach(item => {
    const price = parseFloat(item.getAttribute('data-price')) || 0;
    total += price;
  });
  document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
}


function addOrUpdateCartItem(id, name, description, price, quantity) {
  const cartList = document.querySelector('.carrito-compra');
  let existing = cartList.querySelector(`li[data-id="${id}"]`);

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

    if (checkbox.checked) {
      addOrUpdateCartItem(id, name, description, price,1);
    } else {
      removeFromCart(id);
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
      addOrUpdateCartItem(id, name, description, price, quantity);
    } else {
      removeFromCart(id);
    }
  });
});

function saveCartToSession() {
  const cartItems = [];
  const cartList = document.querySelectorAll('.carrito-compra li');

  cartList.forEach(item => {
    const name = item.querySelector('h6')?.textContent || '';
    const quantityMatch = name.match(/x(\d+)$/);
    const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;
    const cleanName = name.replace(/ x\d+$/, '').trim();

    const description = item.querySelector('small')?.textContent || '';
    const value = parseFloat(item.getAttribute('data-price')) || 0;

    cartItems.push({
      name: cleanName,
      quantity,
      description,
      value
    });
  });

  sessionStorage.setItem('cart', JSON.stringify(cartItems));
  console.log('Cart saved:', cartItems);
}

const checkout_button = document.getElementById("checkout");

checkout_button.addEventListener("click", function () {
    saveCartToSession()
    window.location.href = "escoger-metodo-pago.html";
});



