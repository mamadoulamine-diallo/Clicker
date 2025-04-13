export const unlocks = [
  { score: 5, message: "💡 Tu as découvert HTML" },
  { score: 10, message: "🎨 Tu maîtrises les bases du CSS" },
  { score: 20, message: "🧠 Tu comprends maintenant le DOM" },
  { score: 30, message: "🛠️ Tu sais utiliser JavaScript pour modifier la page" },
  { score: 50, message: "🐙 Git est ton ami pour versionner ton code" },
  { score: 75, message: "🌐 Tu connais la différence entre frontend et backend" },
  { score: 100, message: "🚀 Tu es prêt pour les frameworks comme React !" }
];

export function checkUnlocks(counter, unlocked, unlockBox) {
  unlocks.forEach(unlock => {
    if (counter >= unlock.score && !unlocked.includes(unlock.message)) {
      const p = document.createElement("p");
      p.textContent = unlock.message;

      // Styles et events
      p.style.cursor = "pointer";
      p.style.textDecoration = "underline";

      if (unlock.message.includes("HTML")) {
        p.addEventListener("click", () => {
          document.getElementById("conceptModal").style.display = "flex";
        });
      } else if (unlock.message.includes("CSS")) {
        p.addEventListener("click", () => {
          document.getElementById("cssModal").style.display = "flex";
        });
      } else if (unlock.message.includes("DOM")) {
        p.addEventListener("click", () => {
          document.getElementById("domModal").style.display = "flex";
        });
        const shop = document.getElementById("shop");
        if (shop) {
          shop.style.display = "block";
          shop.classList.add("js-visible");
        }
      }

      unlockBox.appendChild(p);
      unlocked.push(unlock.message);
      localStorage.setItem("unlockedConcepts", JSON.stringify(unlocked));
    }
  });
}

export function showLevelBanner(message) {
  const banner = document.getElementById("levelBanner");
  banner.textContent = `🎉 ${message}`;
  banner.classList.remove("hidden");
  setTimeout(() => banner.classList.add("show"), 100);
  setTimeout(() => {
    banner.classList.remove("show");
    setTimeout(() => banner.classList.add("hidden"), 500);
  }, 3000);
}
