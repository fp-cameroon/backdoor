let orders = [];       // fetched from Firestore
let filtered = [];
let currentPage = 1;
const pageSize = 5;

import { db, auth } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

async function loadOrders(db) {
  const snap = await getDocs(collection(db, "orders"));
  orders = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  filtered = [...orders];
  renderTable();
}

filtered = [...orders];

function renderTable() {

  const start = (currentPage - 1) * pageSize;
  const pageData = filtered.slice(start, start + pageSize);

  const table = document.getElementById("ordersTable");
  table.innerHTML = "";

  pageData.forEach(o => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${o.id}</td>
      <td>${o.userId}</td>
      <td><span class="badge ${o.status}">${o.status}</span></td>
      <td>${new Date(o.createdAt).toLocaleDateString()}</td>
      <td>
        <button class="send" onclick="send('${o.id}')">Send</button>
        <button class="delete" onclick="remove('${o.id}')">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
  document.getElementById("pageInfo").innerText =
    `Page ${currentPage-1} / ${Math.ceil(filtered.length / pageSize)}`;
}

function applyFilters() {
  const user = document.getElementById("filterUser").value;
  const status = document.getElementById("filterStatus").value;
  filtered = orders.filter(o => {
    return (!user || o.userId.includes(user)) &&
           (!status || o.status === status);
  });
  currentPage = 1;
  renderTable();
}


document.getElementById("nextPage").onclick = async () => {
  if (currentPage * pageSize < filtered.length) {
    currentPage++;
    renderTable();
  }
}

document.getElementById("prevPage").onclick = async () => {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
  }
}


function send(id) {
  console.log("Send to factory:", id);
}

function remove(id) {
  orders = orders.filter(o => o.id !== id);
  applyFilters();
}

renderTable();

document.getElementById("logout").onclick = async () => {
  await signOut(auth);
  window.location.href = "index.html";
}

function updateTime() {
  const now = new Date();

  const formatted = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  document.getElementById("currentTime").innerText = formatted;
}

// update every second
setInterval(updateTime, 60000);
updateTime();