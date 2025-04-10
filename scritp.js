
document.addEventListener("DOMContentLoaded", () => {
    let clickPower = 1;
    let idlePower = 0;

    let shopItems = {
      clavier: {
        name: "Clavier de codeur",
        type: "click",
        power: 1,
        baseCost: 10,
        cost: 10,
        quantity: 0
      },
      stagiaire: {
        name: "Stagiaire",
        type: "idle",
        power: 0.5,
        baseCost: 50,
        cost: 50,
        quantity: 0
      }
    };

    // Chargement des données sauvegardées
    if (localStorage.getItem("shopItems")) {
      shopItems = JSON.parse(localStorage.getItem("shopItems"));
      clickPower = 1 + shopItems.clavier.quantity * shopItems.clavier.power;
      idlePower = shopItems.stagiaire.quantity * shopItems.stagiaire.power;
      updateShopDisplay();
    }


    // Fonction d'achat
    function buyItem(itemKey) {
      const item = shopItems[itemKey];

      if (counter >= item.cost) {
        counter -= item.cost;
        item.quantity++;

        // Augmenter le prix de manière exponentielle
        item.cost = Math.floor(item.baseCost * Math.pow(1.15, item.quantity));

        if (item.type === "click") {
          clickPower += item.power;
        } else if (item.type === "idle") {
          idlePower += item.power;
        }

        updateShopDisplay();
        updateCounter();
        saveGame();
      } else {
        alert("Pas assez de points !");
      }
    }


    const counterDisplay = document.getElementById('counter');
    const unlockBox = document.getElementById('unlocks');

    // Récupération du score et des connaissances débloquées
    let counter = parseInt(localStorage.getItem("devScore")) || 0;
    let unlocked = JSON.parse(localStorage.getItem("unlockedConcepts")) || [];

    counterDisplay.textContent = counter;

    const unlocks = [
      { score: 5, message: "💡 Tu as découvert HTML" },
      { score: 10, message: "🎨 Tu maîtrises les bases du CSS" },
      { score: 20, message: "🧠 Tu comprends maintenant le DOM" },
      { score: 30, message: "🛠️ Tu sais utiliser JavaScript pour modifier la page" },
      { score: 50, message: "🐙 Git est ton ami pour versionner ton code" },
      { score: 75, message: "🌐 Tu connais la différence entre frontend et backend" },
      { score: 100, message: "🚀 Tu es prêt pour les frameworks comme React !" }
    ];

    // Afficher les concepts déjà débloqués
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

    function checkUnlocks() {
      unlocks.forEach(unlock => {
        if (counter >= unlock.score && !unlocked.includes(unlock.message)) {
          const p = document.createElement("p");
          p.textContent = unlock.message;

          // 🔓 Palier HTML (5 points)
          if (unlock.score === 5) {
            // showLevelBanner("Niveau HTML débloqué !");

            document.body.classList.add("html-level");
            p.style.cursor = "pointer";
            p.style.textDecoration = "underline";
            p.addEventListener("click", () => {
              document.getElementById("conceptModal").style.display = "flex";
            });
          }

          // 🔓 Palier CSS (10 points)
          if (unlock.score === 10) {
            document.body.classList.remove("html-level");
            document.body.classList.add("css-level");
            p.style.cursor = "pointer";
            p.style.textDecoration = "underline";
            p.addEventListener("click", () => {
              document.getElementById("cssModal").style.display = "flex";
            });
          }

          // 🔓 Palier DOM (20 points)
          if (unlock.score === 20) {
            document.body.classList.remove("css-level");
            document.body.classList.add("dom-level");

            const shop = document.getElementById("shop");
            if (shop) {
              shop.style.display = "block"; 
              shop.classList.add("js-visible");
            }

            p.style.cursor = "pointer";
            p.style.textDecoration = "underline";
            p.addEventListener("click", () => {
              document.getElementById("domModal").style.display = "flex";
            });
          }

          unlockBox.appendChild(p);
          unlocked.push(unlock.message);
          localStorage.setItem("unlockedConcepts", JSON.stringify(unlocked));
        }
      });

      if (counter >= 20) {
        document.body.classList.add("dom-level");
        const shop = document.getElementById("shop");
        if (shop) {
          shop.style.display = "block";
          shop.classList.add("js-visible");
        }
      }



    }


    // Production automatique
    setInterval(() => {
      if (idlePower > 0) {
        counter += idlePower;
        updateCounter();
        saveGame();
      }
    }, 1000); 



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

      bubble.addEventListener("click", () => {
        counter++;
        // Ajout du feedback visuel
        const feedback = document.createElement("span");
        feedback.classList.add("feedback");
        feedback.textContent = `+${clickPower}`;
        feedback.style.left = `${event.clientX}px`;
        feedback.style.top = `${event.clientY}px`;
        document.body.appendChild(feedback);

        // Nettoyage après animation
        setTimeout(() => feedback.remove(), 1000);

        counterDisplay.textContent = counter;
        localStorage.setItem("devScore", counter);

        checkUnlocks();
        bubble.remove();
      });

      setTimeout(() => {
        bubble.remove();
      }, 5000);
    }

    setInterval(bubbleMaker, 1000);

    function updateCounter() {
      counterDisplay.textContent = Math.floor(counter);
      localStorage.setItem("devScore", counter);
    }

    function updateShopDisplay() {
      document.getElementById("itemClavier").textContent =
        `🧠 ${shopItems.clavier.name} x${shopItems.clavier.quantity} (+${shopItems.clavier.power}/clic) — ${shopItems.clavier.cost} pts`;

      document.getElementById("itemStagiaire").textContent =
        `⏳ ${shopItems.stagiaire.name} x${shopItems.stagiaire.quantity} (+${shopItems.stagiaire.power}/sec) — ${shopItems.stagiaire.cost} pts`;
    }

    function saveGame() {
      localStorage.setItem("devScore", counter);
      localStorage.setItem("unlockedConcepts", JSON.stringify(unlocked));
      localStorage.setItem("shopItems", JSON.stringify(shopItems));
      localStorage.setItem("clickPower", clickPower);
      localStorage.setItem("idlePower", idlePower);
    }

    function resetGame() {
      if (confirm("⚠️ Es-tu sûr de vouloir tout recommencer ?")) {
        localStorage.removeItem("devScore");
        localStorage.removeItem("unlockedConcepts");
        localStorage.removeItem("shopItems");
        localStorage.removeItem("clickPower");
        localStorage.removeItem("idlePower");
        location.reload();
      }
    }
    
    


    // *******************Store btn***************
    document.getElementById("buyClavier").addEventListener("click", () => {
      buyItem("clavier");
    });

    document.getElementById("buyStagiaire").addEventListener("click", () => {
      buyItem("stagiaire");
    });

    document.getElementById("resetBtn").addEventListener("click", resetGame);



    // Fermeture de la fiche
    document.getElementById("closeModal").addEventListener("click", () => {
      document.getElementById("conceptModal").style.display = "none";
    });
    document.getElementById("closeCssModal").addEventListener("click", () => {
      document.getElementById("cssModal").style.display = "none";
    });
    document.getElementById("closeDomModal").addEventListener("click", () => {
      document.getElementById("domModal").style.display = "none";
    });


    // Gestion des réponses au quiz

    // ********************HTML********************
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

    // ********************CSS***********************
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

    // ******************DOM***********************
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
        checkUnlocks();
      });
    });

    updateShopDisplay();
    updateCounter();
    checkUnlocks();

});





