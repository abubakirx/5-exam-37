// add.js
document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("token")) {
    window.location.href = "../index.html";
  }

  const form = document.getElementById("carForm");
  const resetBtn = document.getElementById("resetBtn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const image = document.getElementById("image").value.trim();
    const description = document.getElementById("description").value.trim();

    if (!name || !image || !description) {
      alert("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    const car = { name, image, description };

    const cars = JSON.parse(localStorage.getItem("cars")) || [];
    cars.push(car);
    localStorage.setItem("cars", JSON.stringify(cars));

    alert("Mashina muvaffaqiyatli qo‘shildi!");
    window.location.href = "main.html";
  });

  resetBtn.addEventListener("click", () => {
    form.reset();
  });
});
