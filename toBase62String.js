const toBase62String = function (value) {
	const base = 62;
	const digits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const sign = value < 0 ? "-" : "";
	let [result, quotient] = ["", sign ? 0 - value : value];
	do {
		result = `${digits[Math.round(quotient % base)]}${result}`;
	} while ((quotient /= base));
	return `${sign}${result.replace(/^0+/, "")}`;
};