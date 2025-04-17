import { login } from "./request.js";
import { validator } from "./utils.js";

// Redirect if user is already logged in
window.addEventListener("load", () => {
  const user = localStorage.getItem("user");
  if (user) {
    try {
      JSON.parse(user);
      window.location.href = "/index.html";
    } catch {
      localStorage.removeItem("user");
    }
  }
});

const loginForm = document.getElementById("form");
const toastSuccess = document.getElementById("toast-success");
const toastDanger = document.getElementById("toast-danger");
const toastWarning = document.getElementById("toast-warning");
const succesText = document.getElementById("succesText");
const warningText = document.getElementById("warningText");
const dangerText = document.getElementById("dangerText");

// Validate DOM elements
if (!loginForm || !toastSuccess || !toastDanger || !toastWarning || !succesText || !warningText || !dangerText) {
  console.error("One or more DOM elements are missing");
  alert("Saytda xato yuz berdi. Iltimos, sahifani qayta yuklang.");
} else {
  const toasts = [toastSuccess, toastDanger, toastWarning];
  let toastTimeout;

  const hideAllToasts = () => {
    toasts.forEach((toast) => toast.classList.add("noShow"));
  };

  const showToast = (toastElement, textElement, message, duration = 2000) => {
    clearTimeout(toastTimeout);
    hideAllToasts();
    toastElement.classList.remove("noShow");
    textElement.innerText = message;
    toastTimeout = setTimeout(() => {
      toastElement.classList.add("noShow");
    }, duration);
  };

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const result = Object.fromEntries(formData);

    const error = validator(result);
    if (error) {
      showToast(toastWarning, warningText, error.message);
      if (error.target) {
        const input = e.target[error.target];
        if (input) {
          input.focus();
        } else {
          console.warn(`Invalid validator target: ${error.target}`);
        }
      }
      return;
    }

    const submitButton = e.target.querySelector('button[type="submit"]');
    e.target.dataset.state = "pending";
    submitButton.disabled = true;

    try {
      const res = await login(result);
      if (!res || typeof res !== "object") {
        throw new Error("Invalid response from server");
      }
      localStorage.setItem("user", JSON.stringify(res));
      showToast(toastSuccess, succesText, "Login successful", 2500);
      setTimeout(() => {
        window.location.href = "/index.html";
      }, 2500);
    } catch (err) {
      showToast(
        toastDanger,
        dangerText,
        err.message.includes("403")
          ? "Tizimga kirishga ruxsatingiz yo‘q"
          : err.message || "Foydalanuvchi nomi yoki parol xato"
      );
    } finally {
      e.target.dataset.state = "normal";
      submitButton.disabled = false;
    }
  });
}