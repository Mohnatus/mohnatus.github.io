function getDigitsSum(number) {
	let numbersArray = getDigitsArray(number);
	return numbersArray.reduce((sum, digit) => sum + digit, 0);
}

function getFirstDigit(number) {
	if (number < 10) return number;
	return Math.floor(number / 10);
}

function getDigitsArray(number) {
	return ('' + number).split('').map(Number);
}

function getAllDigits(...numbers) {
	return numbers.reduce((acc, number) => {
    return [...acc, ...getDigitsArray(number)]
	}, [])
}

function getTotalSum(number, except = []) {
	while(number >= 10) {
    if (except.indexOf(number) !== -1) return number;
		number = getDigitsSum(number);
	}
	return number;
}

export { getTotalSum, getDigitsSum, getFirstDigit, getDigitsArray, getAllDigits };