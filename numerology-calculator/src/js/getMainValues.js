import order from './order';

export default digits => {
	const matrix = Object.create(null);
	order.forEach(key => {
		matrix[key] = 0;
	});

	/**
	 * Все полученные «1» ставите в «Характер»
	 * 2 - в «Энергию»
	 * 3 – в «Интерес»
	 * 4 – в «Здоровье»
	 * 5 - в «Логику»
	 * 6 – в «Труд»
	 * 7 – в «Удачу»
	 * 8 – в «Долг»
	 * 9 – в «Память»
	 */

	digits.forEach(digit => {
		if (digit === 0) return;
		let key = order[digit - 1];
		matrix[key] = matrix[key] + 1;
	});

	return matrix;
};
