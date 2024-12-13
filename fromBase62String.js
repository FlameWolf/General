const fromBase62String = function (value) {
	const base = 62;
	const digits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let [result, isNegative] = [0, false];
	if (value[0] === "-") {
		isNegative = true;
		value = value.slice(1);
	}
	for (const [index, char] of Array.from(value).reverse().entries()) {
		result += digits.indexOf(char) * base ** index;
	}
	return isNegative ? -result : result;
};