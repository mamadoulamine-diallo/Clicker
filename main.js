import { loadGame, saveGame, resetGame, updateCounter } from './modules/storage.js';
import { shopItems, buyItem, updateShopDisplay } from './modules/shop.js';
import { unlocks, checkUnlocks, showLevelBanner } from './modules/unlock.js';
import { setupQuizHandlers } from './modules/quiz.js';

document.addEventListener("DOMContentLoaded", () => {
  const counterDisplay = document.getElementById('counter');
  const unlockBox = document.getElementById('unlocks');

  let counter = loadGame("devScore", 0);
  let unlocked = loadGame("unlockedConcepts", []);
  let clickPower = 1 + shopItems.clavier.quantity * shopItems.clavier.power;
  let idlePower = shopItems.stagiaire.quantity * shopItems.stagiaire.power;

  counterDisplay.textContent = counter;

  // Affichage des unlocks
  unlocked.forEach(msg => {
    const p = document.createElement("p");
    p.textContent = msg;

    if (msg.includes("HTML")) {
      p.style.cursor = "pointer";
      p.style.textDecoration = "underline";
      p.addEventListener("click", () => {
        document.getElementById("conceptModal").style.display = "flex";
      });
    }

    if (msg.includes("CSS")) {
      p.style.cursor = "pointer";
      p.style.textDecoration = "underline";
      p.addEventListener("click", () => {
        document.getElementById("cssModal").style.display = "flex";
      });
    }

    if (msg.includes("DOM")) {
      p.style.cursor = "pointer";
      p.style.textDecoration = "underline";
      p.addEventListener("click", () => {
        document.getElementById("domModal").style.display = "flex";
      });
    }

    unlockBox.appendChild(p);
  });

  // Bubbles (clics)
  function bubbleMaker() {
    const bubble = document.createElement("span");
    bubble.classList.add("bubble");
    document.body.appendChild(bubble);

    const size = Math.random() * 200 + 100 + "px";
    bubble.style.height = size;
    bubble.style.width = size;
    bubble.style.top = Math.random() * 100 + 50 + "%";
    bubble.style.left = Math.random() * 100 + "%";

    const plusMinus = Math.random() > 0.5 ? 1 : -1;
    bubble.style.setProperty("--left", Math.random() * 100 * plusMinus + "%");

    bubble.addEventListener("click", (event) => {
      counter += clickPower;

      const feedback = document.createElement("span");
      feedback.classList.add("feedback");
      feedback.textContent = `+${clickPower}`;
      feedback.style.left = `${event.clientX}px`;
      feedback.style.top = `${event.clientY}px`;
      document.body.appendChild(feedback);
      setTimeout(() => feedback.remove(), 1000);

      counterDisplay.textContent = counter;
      localStorage.setItem("devScore", counter);

      checkUnlocks(counter, unlocked, unlockBox);
      bubble.remove();
    });

    setTimeout(() => bubble.remove(), 5000);
  }

  setInterval(bubbleMaker, 1000);

  // Production auto
  setInterval(() => {
    if (idlePower > 0) {
      counter += idlePower;
      updateCounter(counter);
      saveGame("devScore", counter);
    }
  }, 1000);

  // Setup shop
  document.getElementById("buyClavier").addEventListener("click", () => {
    buyItem("clavier", counter, (newVal) => {
      counter = newVal;
      updateCounter(counter);
      saveGame("devScore", counter);
    });
  });

  document.getElementById("buyStagiaire").addEventListener("click", () => {
    buyItem("stagiaire", counter, (newVal) => {
      counter = newVal;
      updateCounter(counter);
      saveGame("devScore", counter);
    });
  });

  // Reset
  document.getElementById("resetBtn").addEventListener("click", resetGame);

  // Close modals
  document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("conceptModal").style.display = "none";
  });
  document.getElementById("closeCssModal").addEventListener("click", () => {
    document.getElementById("cssModal").style.display = "none";
  });
  document.getElementById("closeDomModal").addEventListener("click", () => {
    document.getElementById("domModal").style.display = "none";
  });

  setupQuizHandlers(counter, counterDisplay);

  updateShopDisplay();
  updateCounter(counter);
  checkUnlocks(counter, unlocked, unlockBox);
});
