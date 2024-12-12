const fromBase62String = function (base62String) {
	const base = 62;
	const digits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const isNegative = base62String[0] === "-";
	let result = 0;
	for (const char of base62String.slice(isNegative ? 1 : 0)) {
		result = result * base + digits.indexOf(char);
	}
	return isNegative ? -result : result;
};