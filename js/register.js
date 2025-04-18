import { register } from "./request.js";
import { validator } from "./utils.js";

const elForm = document.getElementById("form");
const toastSuccess = document.getElementById("toast-success");
const toastDanger = document.getElementById("toast-danger");
const toastWarning = document.getElementById("toast-warning");
const successText = document.getElementById("successText");
const warningText = document.getElementById("warningText");
const dangerText = document.getElementById("dangerText");
const spinner = document.getElementById("spinner");
const buttonText = document.getElementById("button-text");
const hideToast = (toast) => {
    setTimeout(() => {
        toast.classList.add("hidden");
    }, 3000);
};

// Toast yopish tugmalari uchun event listener
document.querySelectorAll('#toast-success button, #toast-danger button, #toast-warning button').forEach(button => {
    button.addEventListener('click', () => {
        button.parentElement.classList.add('hidden');
    });
});

elForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(FormData)
    const formData = new FormData(e.target);
    const result = {};

    for (const [key, value] of formData.entries()) {
        result[key] = value;
    }

    const error = validator(result);

    if (error) {
        toastWarning.classList.remove("hidden");
        warningText.innerText = error.message;
        e.target[error.target].focus();
        hideToast(toastWarning);
        return;
    }

    e.target.dataset.state = "pending";
    spinner.classList.remove("hidden");
    buttonText.classList.add("hidden");
    elForm.querySelector("button").disabled = true;

    try {
        const res = await register(result);
        localStorage.setItem("user", JSON.stringify(res));
        toastSuccess.classList.remove("hidden");
        successText.innerText = "Registration successful";
        hideToast(toastSuccess);
        setTimeout(() => {
            window.location.href = "/index.html";
        }, 1500);
    } catch (err) {
        console.error("Register error:", err);
        toastDanger.classList.remove("hidden");
        dangerText.innerText = err.message || "User already exists";
        hideToast(toastDanger);
        setTimeout(() => {
            window.location.href = "/pages/login.html";
        }, 2000);
    } finally {
        e.target.dataset.state = "normal";
        spinner.classList.add("hidden");
        buttonText.classList.remove("hidden");
        elForm.querySelector("button").disabled = false;
    }
});