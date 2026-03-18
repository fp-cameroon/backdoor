import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

onAuthStateChanged(auth, user => {
  const protectedPage = document.body.dataset.protected;
  if (protectedPage && !user) {
    window.location.href = "/index.html";
  }
  if (user) {
    const userName = document.getElementById("user-name");
    if (userName) userName.textContent = user?.displayName?.trim() || user?.email || "Guest";

  }
});