// protect.js
export function protectRoute() {
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "../pages/login.html";
    }
  }