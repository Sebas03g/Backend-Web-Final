function updateTotal() {
  let total = 0;
  document.querySelectorAll('.carrito-compra li').forEach(item => {
    const price = parseFloat(item.getAttribute('data-price')) || 0;
    total += price;
  });
  document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
}

function loadCartFromSession() {
  const savedCart = JSON.parse(sessionStorage.getItem('cart') || '[]');
  console.log(savedCart)
  const cartList = document.querySelector('.carrito-compra');
  cartList.innerHTML = ''; // Clear any existing items

  savedCart.forEach(item => {
    const { name, quantity, description, value } = item;

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between lh-condensed';
    li.setAttribute('data-id', name.toLowerCase().replace(/\s+/g, '-')); // recreate an id
    li.setAttribute('data-price', value.toFixed(2));

    li.innerHTML = `
      <div>
        <h6 class="my-0">${name} x${quantity}</h6>
        <small class="text-muted">${description}</small>
      </div>
      <span class="text-muted">$${value.toFixed(2)}</span>
    `;

    cartList.appendChild(li);
  });

  updateTotal();
}

loadCartFromSession()

const checkout_button = document.getElementById("buy");


checkout_button.addEventListener("click", function () {
    const plan = sessionStorage.getItem('plan');
    switch (plan) {
        case "plan1":
            window.location.href = "planes-1.html";
            break;

        case "plan2":
            window.location.href = "planes-2.html";
            break;

        case "plan3":
            window.location.href = "planes-3.html";
            break;

        default:
            console.log("Error.");
    }
    
});
