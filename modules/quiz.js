export function setupQuizHandlers(counter, counterDisplay) {
  document.querySelectorAll(".answer").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const correct = e.target.dataset.correct === "true";
      if (correct) {
        alert("✅ Bonne réponse !");
        counter += 5;
        counterDisplay.textContent = counter;
        localStorage.setItem("devScore", counter);
      } else {
        alert("❌ Mauvaise réponse. Essaie encore !");
      }
      document.getElementById("conceptModal").style.display = "none";
    });
  });

  document.querySelectorAll(".css-answer").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const correct = e.target.dataset.correct === "true";
      if (correct) {
        alert("✅ Bien joué !");
        counter += 5;
        counterDisplay.textContent = counter;
        localStorage.setItem("devScore", counter);
      } else {
        alert("❌ Pas tout à fait... essaie encore !");
      }
      document.getElementById("cssModal").style.display = "none";
    });
  });

  document.querySelectorAll(".dom-answer").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const correct = e.target.dataset.correct === "true";
      if (correct) {
        alert("✅ Exactement !");
        counter += 5;
        counterDisplay.textContent = counter;
        localStorage.setItem("devScore", counter);
      } else {
        alert("❌ Pas la bonne réponse !");
      }
      document.getElementById("domModal").style.display = "none";
    });
  });
}
