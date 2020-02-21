function count(date) {
  return {
    birth: "29.03.1982",
    numbers: "34, 7, 30, 3",
    fateNumber: 7,
    temperament: 3,
    personality: 1,
    health: 4,
    luck: 7,
    purpose: 3,
    energy: 22,
    logic: 0,
    duty: 8,
    family: 3,
    interes: 3333,
    labour: 0,
    memory: 99,
    habit: 6
  }
}

function fillTable(results) {
  Object.keys(results).forEach(function(field) {
    console.log(field)
    document.getElementById(field).innerHTML = results[field] || "Пусто";
  })
}

function showResult() {
  document.getElementById("page-output").style.display = "";
}

document.getElementById("matrix-form").onsubmit = function(event) {
  event.preventDefault();
  fillTable(count(event.target.elements.date.value));
  showResult();
}