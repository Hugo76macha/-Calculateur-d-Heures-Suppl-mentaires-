const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
const table = document.getElementById("weekTable");

// Création des lignes avec valeur initiale 00:00
days.forEach((day, index) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${day}</td>
    <td><input type="time" id="start-${index}" class="time-input" value="00:00"></td>
    <td><input type="time" id="pause-${index}" class="time-input" value="00:00"></td>
    <td><input type="time" id="resume-${index}" class="time-input" value="00:00"></td>
    <td><input type="time" id="end-${index}" class="time-input" value="00:00"></td>
    <td><span id="work-${index}">0</span> h</td>
  `;
  table.appendChild(row);
});

// Fonction de calcul de durée
function timeDiff(start, end) {
  const [h1, m1] = start.split(":").map(Number);
  const [h2, m2] = end.split(":").map(Number);
  return ((h2 * 60 + m2) - (h1 * 60 + m1)) / 60;
}

// Calcul global
function calculateAll() {
  let total = 0;

  days.forEach((_, i) => {
    const start = document.getElementById(`start-${i}`).value;
    const pause = document.getElementById(`pause-${i}`).value;
    const resume = document.getElementById(`resume-${i}`).value;
    const end = document.getElementById(`end-${i}`).value;

    let work = 0;
    if (start && pause) work += timeDiff(start, pause);
    if (resume && end) work += timeDiff(resume, end);

    document.getElementById(`work-${i}`).textContent = isNaN(work) ? "0" : work.toFixed(2);
    total += isNaN(work) ? 0 : work;
  });

  const targetHours = parseFloat(document.getElementById("targetHours").value) || 0;
  document.getElementById("totalHours").textContent = total.toFixed(2);
  document.getElementById("extraHours").textContent = total > targetHours ? (total - targetHours).toFixed(2) : "0";
  document.getElementById("missingHours").textContent = total < targetHours ? (targetHours - total).toFixed(2) : "0";
}

// Écoute tous les champs
document.querySelectorAll('.time-input').forEach(input => {
  input.addEventListener("input", calculateAll);
});

document.getElementById("targetHours").addEventListener("input", calculateAll);

// 👇 Nouvelle ligne importante
window.addEventListener("load", calculateAll);
