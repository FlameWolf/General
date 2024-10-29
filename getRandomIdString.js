const toBase62String = function (value) {
	const base = 62n;
	const digits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const sign = value < 0n ? "-" : "";
	let [result, quotient] = ["", sign ? 0n - value : value];
	do {
		result = `${digits[Number(quotient % base)]}${result}`;
	} while ((quotient /= base));
	return `${sign}${result}`;
};
const getRandomIdString = function (steps = 4) {
	let value = 0n;
	for (let i = 0; i < steps; i++) {
		value = (value << 53n) + BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
	}
	return toBase62String(value).substring(0, steps * 8);
};