import { auth } from "./firebase-config.js";

import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

setPersistence(auth, browserLocalPersistence);

const overlay = document.querySelector('.overlay');
const logo = document.querySelector('.bg-logo');
const loginBox = document.querySelector('.login-box');
const goBtn = document.querySelector('.go-btn');

logo.classList.add('animated');

function openLogin() {
    // remove initial listeners
    window.removeEventListener('click', openLogin);
    window.removeEventListener('keydown', openLogin);

    overlay.classList.add('active');
    loginBox.classList.add('visible');

    // add new listeners
    window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
          handleLogin();
        }
    });

    loginBox.querySelector('input').focus();

}

function closeLogin() {
    overlay.classList.remove('active');
    loginBox.classList.remove('visible');
    window.addEventListener('click', openLogin);
    window.addEventListener('keydown', openLogin);
}


// 👉 Close when clicking outside (overlay)
window.addEventListener('click', openLogin);
window.addEventListener('keydown', openLogin);

// 👉 ENTER key submits
loginBox.addEventListener('click', (e) => {
    e.stopPropagation();
});
loginBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
});

// 👉 Go button click
goBtn.addEventListener('click', handleLogin);

async function handleLogin() {
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const errorMsg = document.querySelector('.error-msg');

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // reset UI
    errorMsg.textContent = "";
    emailInput.classList.remove('input-error');
    passwordInput.classList.remove('input-error');

    // email regex (simple + effective)
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // validation
    if (!email && !password) {
      errorMsg.textContent = "Please enter your email and password";
      emailInput.classList.add('input-error');
      passwordInput.classList.add('input-error');
      return;
    }

    if (!email) {
      errorMsg.textContent = "Email is required";
      emailInput.classList.add('input-error');
      return;
    }

    if (!emailValid) {
      errorMsg.textContent = "Invalid email format";
      emailInput.classList.add('input-error');
      return;
    }

    if (!password) {
      errorMsg.textContent = "Password is required";
      passwordInput.classList.add('input-error');
      return;
    }

    // Optional UX: show success briefly
    try{
        await signInWithEmailAndPassword(auth, email, password);
        errorMsg.style.color = "#16a34a";
        errorMsg.textContent = "Logging in...";
        window.location.href="dashboard.html"
    }catch(e){
        errorMsg.textContent = e.message;
        passwordInput.classList.add('input-error');
    }
}
