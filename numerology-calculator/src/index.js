import Inputmask from "inputmask";

import { calculate } from './js/calculate';

import './index.scss';

const matrixForm = document.getElementById("matrix-form");
const dateField = matrixForm.elements.date;

/**
 * Inserts matrix data into a matrix table
 * @param {Object} results
 */
function fillTable(matrixData) {
  Object.keys(matrixData).forEach(function(field) {
    let elements = [...document.querySelectorAll(`[data-item="${field}"]`)];
    elements.forEach(el => el.innerHTML = matrixData[field] || "Пусто");
  });
}

/**
 * Show matrix table
 */
function showResult() {
  document.getElementById("page-output").style.display = "";
}

/**
 * Show/Hide validation error
 */
function showValidationError() {
  matrixForm.querySelector('.invalid-feedback').style.display = "block";
}
function hideValidationError() {
    matrixForm.querySelector('.invalid-feedback').style.display = "";
}

/**
 * Init input mask
 */
const mask = Inputmask({
  "mask": "99.99.9999",
  "placeholder": "дд.мм.гггг"
}).mask(dateField);

/**
 * Form submit handler
 */
matrixForm.onsubmit = function(event) {
  event.preventDefault();

  if (!mask.isValid()) {
    showValidationError();
  } else {
    let dateString = dateField.value.split(".").reverse().join("-");
    let date = new Date(dateString);

    if (isNaN(date)) {
      showValidationError();
      return;
    }

    hideValidationError();
    let matrixData = calculate(date);
    fillTable(matrixData);
    showResult();
  }
}