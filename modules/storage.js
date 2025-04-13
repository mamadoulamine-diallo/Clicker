export function loadGame(key, defaultValue) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
}

export function saveGame(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function updateCounter(value) {
  document.getElementById('counter').textContent = Math.floor(value);
  localStorage.setItem("devScore", value);
}

export function resetGame() {
  if (confirm("⚠️ Es-tu sûr de vouloir tout recommencer ?")) {
    localStorage.clear();
    location.reload();
  }
}
