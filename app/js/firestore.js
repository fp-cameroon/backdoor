import { db } from "./firebase-config.js";

import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const ordersRef = collection(db, "orders");

async function sendOrder(orderId) {
  alert(`Order ${orderId}: send to factory not implemented yet 🚧`);
}

async function cancelOrder(orderId) {
  alert(`Order ${orderId}: cancel order not implemented yet 🚧`);
}

async function loadOrders(db) {
  const orders = await getDocs(ordersRef);
  return orders.docs.map(d => ({ id: d.id, ...d.data() }));
}

export { sendOrder, cancelOrder, loadOrders }