export let shopItems = {
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

export function buyItem(itemKey, counter, updateCallback) {
  const item = shopItems[itemKey];
  if (counter >= item.cost) {
    counter -= item.cost;
    item.quantity++;
    item.cost = Math.floor(item.baseCost * Math.pow(1.15, item.quantity));

    updateShopDisplay();
    updateCallback(counter);
  } else {
    alert("Pas assez de points !");
  }
}

export function updateShopDisplay() {
  document.getElementById("itemClavier").textContent =
    `🧠 ${shopItems.clavier.name} x${shopItems.clavier.quantity} (+${shopItems.clavier.power}/clic) — ${shopItems.clavier.cost} pts`;

  document.getElementById("itemStagiaire").textContent =
    `⏳ ${shopItems.stagiaire.name} x${shopItems.stagiaire.quantity} (+${shopItems.stagiaire.power}/sec) — ${shopItems.stagiaire.cost} pts`;
}
