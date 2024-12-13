const fromBase62String = function (value) {
	const base = 62;
	const digits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const isNegative = value[0] === "-";
	let result = 0;
	for (const char of value.slice(isNegative ? 1 : 0)) {
		result = result * base + digits.indexOf(char);
	}
	return isNegative ? -result : result;
};