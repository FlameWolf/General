const ENCODING_CHARS = Array.from({ length: 95 }, (_, index) => String.fromCharCode(index + 32));
const END_MARKER = String.fromCharCode(160);
/**
 * Converts a byte array to a base-95 encoded string
 * @param {number[]} input Array of integers between 0 and 255
 * @returns {string} Base-95 encoded string with zero preservation
 */
const base95Encode = input => {
	if (!(Array.isArray(input) || ArrayBuffer.isView(input)) || input.some(x => !Number.isInteger(x) || x < 0 || x > 255)) {
		throw new Error("Input must be an array of integers between 0 and 255");
	}
	let lastNonZeroIndex = input.length - 1;
	while (lastNonZeroIndex >= 0 && input[lastNonZeroIndex] === 0) {
		lastNonZeroIndex--;
	}
	const significantInput = input.slice(0, lastNonZeroIndex + 1);
	const trailingZeros = input.length - significantInput.length;
	const result = [];
	for (let loopIndex = 0; loopIndex < significantInput.length; loopIndex += 3) {
		const chunk = [significantInput[loopIndex], significantInput[loopIndex + 1], significantInput[loopIndex + 2]];
		let combined = 0;
		chunk.forEach((byte, index) => {
			combined |= byte << (16 - index * 8);
		});
		for (let offset = 0; offset < 4; offset++) {
			const index = (combined >> (18 - offset * 6)) & 0b111111;
			result.push(ENCODING_CHARS[index]);
		}
	}
	result.push(END_MARKER, ENCODING_CHARS[Math.floor(trailingZeros / 95)], ENCODING_CHARS[trailingZeros % 95]);
	return result.join("");
};
/**
 * Converts a base-95 encoded string to a byte array
 * @param {string} encoded Base-95 encoded string
 * @returns {number[]} Decoded array of bytes
 */
const base95Decode = encoded => {
	if (typeof encoded !== "string") {
		throw new Error("Invalid encoded string");
	}
	const endMarkerIndex = encoded.indexOf(END_MARKER);
	if (endMarkerIndex === -1) {
		throw new Error("Invalid encoded string: no end marker found");
	}
	const mainContent = encoded.slice(0, endMarkerIndex);
	const trailingZeroInfo = encoded.slice(endMarkerIndex + 1);
	if (trailingZeroInfo.length !== 2) {
		throw new Error("Invalid trailing zero information");
	}
	const trailingZeroCount = ENCODING_CHARS.indexOf(trailingZeroInfo[0]) * 95 + ENCODING_CHARS.indexOf(trailingZeroInfo[1]);
	const result = [];
	for (let loopIndex = 0; loopIndex < mainContent.length; loopIndex += 4) {
		const chunk = mainContent.slice(loopIndex, loopIndex + 4);
		const indices = chunk.split("").map(char => {
			const index = ENCODING_CHARS.indexOf(char);
			if (index === -1) {
				throw new Error("Invalid character in encoded string");
			}
			return index;
		});
		let combined = 0;
		indices.forEach((value, offset) => {
			combined |= value << (18 - offset * 6);
		});
		const bytes = [(combined >> 16) & 0xff, (combined >> 8) & 0xff, combined & 0xff];
		result.push(...bytes);
	}
	while (result[result.length - 1] === 0) {
		result.pop();
	}
	result.push(...Array(trailingZeroCount).fill(0));
	return result;
};