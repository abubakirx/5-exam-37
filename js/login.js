import { login } from "./request.js";
import { validator } from "./utils.js";

window.addEventListener("load", () => {
  localStorage.getItem("user")
    ? (window.location.href = "/index.html")
    : "/pages/login.html";
});

const loginForm = document.getElementById("form");
const toastSuccess = document.getElementById("toast-success");
const toastDanger = document.getElementById("toast-danger");
const toastWarning = document.getElementById("toast-warning");
const succesText = document.getElementById("succesText");
const warningText = document.getElementById("warningText");
const dangerText = document.getElementById("dangerText");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const result = {};

  for (const [key, value] of formData.entries()) {
    result[key] = value;
  }

  const error = validator(result);

  if (error) {
    toastWarning.classList.remove("noShow");
    warningText.innerText = error.message;
    e.target[error.target].focus();
  } else {
    e.target.dataset.state = "pending";
    login(result)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res));
        toastSuccess.classList.remove("noShow");
        succesText.innerText = "Login successful";

        setInterval(() => {
          window.location.href = "/index.html";
        }, 1500);
      })
      .catch((err) => {
        toastDanger.classList.remove("noShow");
        dangerText.innerText = "User not found";
        setInterval(() => {
          window.location.href = "/pages/register.html";
        }, 2000);
      })
      .finally(() => {
        e.target.dataset.state = "normal";
      });
  }
});
