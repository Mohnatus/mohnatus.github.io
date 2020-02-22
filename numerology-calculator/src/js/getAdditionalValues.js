export default matrix => {
	const {
		interest,
		logic,
		luck,
		health,
		labour,
		personality,
		energy,
		duty,
		memory
   } = matrix;
	/**
	 * «Темперамент» – считаем количество чисел в «Интересе»/«Логике»/«Удаче» по диагонали матрицы. Их сумма составит коэффициент этого сектора.
	 */

	let temperament = interest + logic + luck;

	/**
	 * «Быт»: считаем количество цифр в «Здоровье»/«Логике»/«Труде». Их сумма равна коэффициенту сектора.
	 */

	let everyday = health + logic + labour;

	/**
	 * «Целеустремленность»: сумма цифр, которые есть в секторах «Характер»/ «Здоровье»/ «Удача».
	 */

	let purpose = personality + health + luck;

	/**
	 * «Семья»: сумма цифр, имеющихся в секторах «Энергия»/«Логика»/ «Долг».
	 */

	let family = energy + logic + duty;

	/**
	 * Сектор «Стабильность»: количество цифр в секторах «Интерес»/«Труд»/«Память».
	 */

	let habits = interest + labour + memory;

	return {
		temperament,
		everyday,
		purpose,
		family,
		habits
	};
};
