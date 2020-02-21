import Inputmask from "inputmask";
import flatpickr from "flatpickr";

import { calculate } from './js/calculate';

import './index.scss';

const matrixForm = document.getElementById("matrix-form");
const dateField = matrixForm.elements.date;

/**
 * Inserts matrix data into a matrix table
 * @param {Object} results
 */
function fillTable(results) {
  Object.keys(results).forEach(function(field) {
    document.getElementById(field).innerHTML = results[field] || "Пусто";
  })
}

/**
 * Show matrix table
 */
function showResult() {
  document.getElementById("page-output").style.display = "";
}

/**
 * Hide matrix table
 */
function hideResult() {
  document.getElementById("page-output").style.display = "none";
}

function showValidationError(err) {
  matrixForm.querySelector('.invalid-feedback').style.display = "block";
  matrixForm.querySelector('.invalid-feedback').innerHTML = err;
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
flatpickr(dateField, {
  allowInput: true,
  dateFormat: 'd.m.Y'
});


/**
 * Form submit handler
 */
matrixForm.onsubmit = function(event) {
  event.preventDefault();

  if (!mask.isValid()) {
    showValidationError('mask');
  } else {
    let date = new Date(dateField.value);

    if (isNaN(date)) {
      showValidationError(dateField.value);
      return;
    }

    hideValidationError();
    fillTable(calculate(date));
    showResult();
  }
}