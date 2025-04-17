document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".sun");
  const imgNav = document.querySelector(".delails__wrap__img_light");
  const img = document.querySelector(".delails__wrap__img");
  const root = document.documentElement;

  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      root.classList.toggle("light-mode");

      if (root.classList.contains("light-mode")) {
        toggleButton.src = "./img/moon.svg";
        toggleButton.alt = "moon";
      } else {
        toggleButton.src = "./img/Dark mode.svg";
        toggleButton.alt = "sun";
      }
    });
  }
});
