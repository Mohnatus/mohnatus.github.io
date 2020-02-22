import getAdditionalDigits from "./getAdditionalDigits";
import getMainValues from "./getMainValues";
import { getAllDigits } from './utils';
import getAdditionalValues from "./getAdditionalValues";
import getFateNumber from "./getFateNumber";
import order from "./order";

const months = [
	'января',
	'февраля',
	'марта',
	'апреля',
	'мая',
	'июня',
	'июля',
	'августа',
	'сентября',
	'октября',
	'ноября',
	'декабря'
];

/**
 * Сalculates a matrix data based on the birth date
 * @param {Date} date Date string from input (dd.mm.yyyy)
 */
function calculate(date) {
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	date = {
		day, month, year
	};

	/**
	 * Рассчитываем дополнительные числа
	 */
	const additionalDigits = getAdditionalDigits(date);

	/**
	 * Теперь, используя все дополнительные числа, а также цифры даты рождения,
	 * заполняем секторы матрицы с соответствующими значениями.
	 */

	let digits = getAllDigits(...additionalDigits, day, month, year);

	let mainValues = getMainValues(digits);

	/**
	 * Кроме того, необходимо заполнить оставшиеся значения
	 */

	let additionalValues = getAdditionalValues(mainValues);

	let fateNumber = getFateNumber(additionalDigits[0]);

  const mainValuesFormatted = {};
	Object.keys(mainValues).forEach(key => {
		let index = order.indexOf(key) + 1;
		mainValuesFormatted[key] = new Array(mainValues[key] + 1).join(index);
	});

	return {
		birth: `${day} ${months[month - 1]} ${year}`,
		numbers: additionalDigits.join(', '),
		fateNumber,
		...mainValuesFormatted,
		...additionalValues
	};
}

export { calculate };
