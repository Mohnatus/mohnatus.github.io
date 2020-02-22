import { getDigitsSum, getFirstDigit } from './utils';

export default (date) => {
  const { day, month, year } = date;

	/**
	 * Первое дополнительное число
	 * Сложите все числа даты рождения
	 * 18.08.1984
	 * 1 + 8 + 0 + 8 + 1 + 9 + 8 + 4 = 39
	 */
	let first = getDigitsSum(day) + getDigitsSum(month) + getDigitsSum(year);

	/**
	 * Второе дополнительное число
	 * Сложите цифры первого дополнительного числа между собой
	 * 3 + 9 = 12
	 */

	let second = getDigitsSum(first);

	/**
	 * Третье дополнительное число
	 * Вычтите из первого дополнительно числа (2 × на первую цифру даты рождения)
	 * 39 – (2 × 1) = 37
	 * Если первая цифра в дате рождения 0 (например, 05),
	 * в этом случае умножаете на число после нуля, в данном примере – на 5
	 */

	let firstBirthDigit = getFirstDigit(day);
	let third = first - 2 * firstBirthDigit;

	/**
	 * Четвертое дополнительное число
	 * Сложите третье дополнительное число между собой
	 * 3 + 7 = 10
	 */

	let forth = getDigitsSum(third);

  return [first, second, third, forth];
}