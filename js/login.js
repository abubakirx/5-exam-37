loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const result = Object.fromEntries(formData);

  // Saqlash: login localStorage, password sessionStorage
  if (result.login) {
    localStorage.setItem("login", result.login);
  }
  if (result.password) {
    sessionStorage.setItem("password", result.password);
  }

  // Validator va login funksiyasi shu yerda qoladi
  const error = validator(result);
  if (error) {
    showToast(toastWarning, warningText, error.message);
    if (error.target) {
      const input = e.target[error.target];
      if (input) {
        input.focus();
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
    localStorage.setItem("isLoggedIn", true);

    showToast(toastSuccess, succesText, "Login successful", 2500);
    setTimeout(() => {
      window.location.href = "../index.html";
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
