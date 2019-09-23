const table = document.getElementById("userGuessTable");

document.querySelectorAll(".letterboard td").forEach(e =>
  e.addEventListener("mouseover", function() {
    this.style.background = "green";
  })
);

document.querySelectorAll(".letterboard td").forEach(e =>
  e.addEventListener("mouseleave", function() {
    this.style.background = "white";
  })
);
