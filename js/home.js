window.addEventListener("load", () => {
    localStorage.getItem("user") === null ? window.location.href = "/pages/register.html" : "/index.html";
})


const malumotlar = document.querySelector(".malumotlar");

if (malumotlar) {
    fetch("https://json-api.uz/api/project/fn37/cars")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Tarmoqda xato bor: " + response.status);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Kegan narsa:", data);
            data.data.forEach((car) => {
                malumotlar.innerHTML += `
           <div
            class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
          >
             <div class="p-4">
              <h3 class="text-xl font-bold text-gray-800">Nissan</h3>
              <p class="text-gray-600 mt-1">
                Narxi: <span class="font-semibold text-green-600">$${car.price}</span>
              </p>
            <div class="grid grid-cols-2">
             <div>
              <p class="text-sm text-gray-500 mt-2 grid-rows-7">
               ${car.brand}
              </p>
               <p class="text-sm text-gray-500 mt-2">
               ${car.description}
              </p></div>
             <div>
               <p class="text-sm text-gray-500 mt-2">
               ${car.category}
              </p>
               <p class="text-sm text-gray-500 mt-2">
               ${car.name}
              </p>
             </div>
             </div>
            </div>
          </div>
        `;
            });
        })
        .catch((error) => {
            console.error("Xatolik yuz berdi:", error);
        });
};

// document.addEventListener("DOMContentLoaded", () => {
//     // tokenni tekshirish
//     const token = localStorage.getItem("token");
//     if (!token) {
//         window.location.href = "index.html";
//     }

//     const cars = JSON.parse(localStorage.getItem("cars")) || [];
//     const container = document.getElementById("carList");

//     if (cars.length === 0) {
//         container.innerHTML = "<p class='text-gray-500'>Mashinalar yo‘q.</p>";
//         return;
//     }

//     const html = cars.map(car => `
//       <div class="bg-white rounded-lg shadow p-4">
//         <img src="${car.image}" alt="${car.name}" class="w-full h-40 object-cover rounded mb-2" />
//         <h3 class="text-lg font-bold">${car.name}</h3>
//         <p class="text-gray-600">${car.price} USD</p>
//       </div>
//     `).join("");

//     container.innerHTML = html;
// });
