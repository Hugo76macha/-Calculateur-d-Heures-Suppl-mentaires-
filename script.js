const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
const table = document.getElementById("weekTable");

// Création des lignes
days.forEach((day, index) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${day}</td>
    <td><input type="time" id="start-${index}"></td>
    <td><input type="time" id="pause-${index}"></td>
    <td><input type="time" id="resume-${index}"></td>
    <td><input type="time" id="end-${index}"></td>
    <td><span id="work-${index}">0</span> h</td>
  `;
  table.appendChild(row);
});

// Ajouter les listeners
document.querySelectorAll("input[type='time']").forEach(input => {
  input.addEventListener("change", calculateAll);
});

function timeDiff(start, end) {
  const [h1, m1] = start.split(":").map(Number);
  const [h2, m2] = end.split(":").map(Number);
  return ((h2 * 60 + m2) - (h1 * 60 + m1)) / 60;
}

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

  document.getElementById("totalHours").textContent = total.toFixed(2);
  document.getElementById("extraHours").textContent = total > 35 ? (total - 35).toFixed(2) : "0";
  document.getElementById("missingHours").textContent = total < 35 ? (35 - total).toFixed(2) : "0";
}
