<script>
  document.getElementById("carForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Formani submit qilishni to'xtatadi

    const carName = document.getElementById("carName").value;
    const dailyPrice = document.getElementById("dailyPrice").value;
    const buyPrice = document.getElementById("buyPrice").value;
    const dateTime = document.getElementById("dateTime").value;

    console.log("Mashina nomi:", carName);
    console.log("1 kunlik narxi:", dailyPrice);
    console.log("Sotib olish narxi:", buyPrice);
    console.log("Vaqt va sana:", dateTime);

    // Bu yerda qiymatlarni serverga yuborish yoki boshqa ishlarni qilishingiz mumkin
  });
</script>
