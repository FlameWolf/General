const toBase62String = function (value) {
	const base = 62;
	const digits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const sign = value < 0 ? "-" : "";
	let [result, quotient] = ["", Math.abs(value)];
	do {
		result = digits[Math.floor(quotient % base)] + result;
		quotient = Math.floor(quotient / base);
	} while (quotient);
	return `${sign}${result}`;
};