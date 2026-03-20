let orders = [];       // fetched from Firestore
let filtered = [];
let currentPage = 1;
const pageSize = 10;

import { auth } from "./firebase-config.js";
import { sendOrder, cancelOrder, loadOrders } from "./firestore.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


async function fetchOrders(db) {
  orders = await loadOrders();
  filtered = [...orders];
  renderTable();
}

await fetchOrders();

function renderTable() {

  const start = (currentPage - 1) * pageSize;
  const pageData = filtered.slice(start, start + pageSize);

  const table = document.getElementById("ordersTable");
  table.innerHTML = "";

  pageData.forEach(o => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${o.id}</td>
      <td>${o.userEmail}</td>
      <td><span class="badge ${o.status}">${o.status}</span></td>
      <td>${o.createdAt.toDate().toLocaleString()}</td>
      <td>
        <button class="send" data-id="${o.id}">Send</button>
        <button class="delete" data-id="${o.id}">Delete</button>
      </td>
    `;
    table.appendChild(row);
      // attach events AFTER rendering
      document.querySelectorAll(".send").forEach(btn => {
        btn.onclick = async (e) => {
          const id = e.target.dataset.id;
          sendOrder(id);
        };
      });

      document.querySelectorAll(".delete").forEach(btn => {
        btn.onclick = async (e) => {
          const id = e.target.dataset.id;
          cancelOrder(id);
        };
      });
  });
  document.getElementById("pageInfo").innerText =
    `Page ${currentPage} / ${Math.floor(filtered.length / pageSize)+1}`;
}

function applyFilters() {
  const user = document.getElementById("filterUser").value;
  const status = document.getElementById("filterStatus").value;
  filtered = orders.filter(o => {
    return (!user || o.userEmail.includes(user)) &&
           (!status || o.status === status);
  });
  currentPage = 1;
  renderTable();
}

document.getElementById("filterBtn").addEventListener("click", (e) => {
  applyFilters();
});

document.getElementById("refreshBtn").addEventListener("click", (e) => {
    location.reload()
});


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

renderTable();

document.getElementById("logout").onclick = async () => {
  await signOut(auth);
  window.location.href = "index.html";
}

function updateClock() {
  const now = new Date();
  const formatted = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  document.getElementById("currentTime").innerText = formatted;
}

// update every second
setInterval(updateClock, 60000);
updateClock();
