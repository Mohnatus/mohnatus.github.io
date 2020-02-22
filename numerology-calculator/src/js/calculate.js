/**
 * Calculates matrix parts
 */
const transforms = {
	numbers: date => {
		return [34, 7, 30, 3];
	},
	fateNumber: date => {
		return 7;
	},
	temperament: date => {
		return 3;
	},
	personality: date => {
		return 3;
	},
	health: date => {
		return 3;
	},
	luck: date => {
		return 3;
	},
	purpose: date => {
		return 3;
	},
	energy: date => {
		return 3;
	},
	logic: date => {
		return 3;
	},
	duty: date => {
		return 3;
	},
	family: date => {
		return 3;
	},
	interes: date => {
		return 3;
	},
	labour: date => {
		return 3;
	},
	memory: date => {
		return 3;
	},
	habit: date => {
		return 3;
	}
};

const months = [
  'января',
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря"
];

/**
 * Сalculates a matrix data based on the birth date
 * @param {Date} date Date string from input (dd.mm.yyyy)
 */
function calculate(date) {
	let data = {
		birth: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
	};
	Object.keys(transforms).forEach(key => {
		data[key] = transforms[key](date);
	});
	return data;
}

export { calculate };
