const API_URL = 'https://ton-backend.onrender.com'; // Remplace par ton URL Render

let currentUser = null;

function login() {
  const username = document.getElementById('username').value;
  const role = document.getElementById('role').value;
  currentUser = { username, role };
  document.getElementById('login').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
  renderDashboard();
}

function renderDashboard() {
  const dash = document.getElementById('dashboard');
  dash.innerHTML = `<h3>Bienvenue ${currentUser.username} (${currentUser.role})</h3>`;

  if (currentUser.role === 'admin') {
    dash.innerHTML += `
      <div class="mb-3">
        <input type="text" id="itemName" class="form-control" placeholder="Nom de l'objet" />
        <input type="number" id="itemPrice" class="form-control mt-2" placeholder="Prix" />
        <button class="btn btn-success mt-2" onclick="addItem()">Ajouter l'objet</button>
      </div>
    `;
  }

  if (currentUser.role === 'livreur') {
    dash.innerHTML += `
      <div class="mb-3">
        <input type="text" id="orderId" class="form-control" placeholder="ID de la commande" />
        <select id="orderStatus" class="form-select mt-2">
          <option value="en cours">En cours</option>
          <option value="expédié">Expédié</option>
          <option value="terminé">Terminé</option>
        </select>
        <button class="btn btn-warning mt-2" onclick="updateOrder()">Mettre à jour</button>
      </div>
    `;
  }

  if (currentUser.role === 'prime' || currentUser.role === 'basic') {
    dash.innerHTML += `
      <div class="mb-3">
        <input type="text" id="orderItem" class="form-control" placeholder="Nom de l'objet à commander" />
        <button class="btn btn-primary mt-2" onclick="placeOrder()">Commander (gratuit)</button>
      </div>
    `;
    if (currentUser.role === 'prime') {
      dash.innerHTML += `<p class="text-success">Livraison accélérée activée 🚀</p>`;
    }
  }
}

async function addItem() {
  const name = document.getElementById('itemName').value;
  const price = document.getElementById('itemPrice').value;
  await fetch(`${API_URL}/add-item`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price })
  });
  alert('Objet ajouté !');
}

async function placeOrder() {
  const item = document.getElementById('orderItem').value;
  await fetch(`${API_URL}/place-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: currentUser, item })
  });
  alert('Commande passée !');
}

async function updateOrder() {
  const id = document.getElementById('orderId').value;
  const status = document.getElementById('orderStatus').value;
  await fetch(`${API_URL}/update-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, status })
  });
  alert('Commande mise à jour !');
}
