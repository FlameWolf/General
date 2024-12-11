"use strict";

const charMap = new Map([
	["അ", "ക"],
	["ആ", "കാ"],
	["ഇ", "കി"],
	["ഈ", "കീ"],
	["ഉ", "കു"],
	["ഊ", "കൂ"],
	["ഋ", "കൃ"],
	["ൠ", "കൄ"],
	["ഌ", "കൢ"],
	["ൡ", "കൣ"],
	["എ", "കെ"],
	["ഏ", "കേ"],
	["ഐ", "കൈ"],
	["ഒ", "കൊ"],
	["ഓ", "കോ"],
	["ഔ", "കൌ"],
	["അം", "കം"],
	["അഃ", "കഃ"],
	["ഖ", "ഗ"],
	["ഘ", "ങ"],
	["ച", "ട"],
	["ഛ", "ഠ"],
	["ജ", "ഡ"],
	["ഝ", "ഢ"],
	["ഞ", "ണ"],
	["ത", "പ"],
	["ഥ", "ഫ"],
	["ദ", "ബ"],
	["ധ", "ഭ"],
	["ന", "മ"],
	["യ", "ശ"],
	["ര", "ഷ"],
	["ല", "സ"],
	["വ", "ഹ"],
	["ള", "ഩ"],
	["ഴ", "റ"],
	["ക്ഷ", "റ്റ"],
	["ൿ", "ൾ"],
	["ൺ", "ൽ"],
	["ൻ", "ർ"],
	["ക", "അ"],
	["കാ", "ആ"],
	["കി", "ഇ"],
	["കീ", "ഈ"],
	["കു", "ഉ"],
	["കൂ", "ഊ"],
	["കൃ", "ഋ"],
	["കൄ", "ൠ"],
	["കൢ", "ഌ"],
	["കൣ", "ൡ"],
	["കെ", "എ"],
	["കേ", "ഏ"],
	["കൈ", "ഐ"],
	["കൊ", "ഒ"],
	["കോ", "ഓ"],
	["കൗ", "ഔ"],
	["കൌ", "ഔ"],
	["കം", "അം"],
	["കഃ", "അഃ"],
	["ഗ", "ഖ"],
	["ങ", "ഘ"],
	["ട", "ച"],
	["ഠ", "ഛ"],
	["ഡ", "ജ"],
	["ഢ", "ഝ"],
	["ണ", "ഞ"],
	["പ", "ത"],
	["ഫ", "ഥ"],
	["ബ", "ദ"],
	["ഭ", "ധ"],
	["മ", "ന"],
	["ശ", "യ"],
	["ഷ", "ര"],
	["സ", "ല"],
	["ഹ", "വ"],
	["ഩ", "ള"],
	["റ", "ഴ"],
	["റ്റ", "ക്ഷ"],
	["ൾ", "ൿ"],
	["ൽ", "ൺ"],
	["ർ", "ൻ"]
]);
const conjunctsToReplace = ["ക", "കാ", "കി", "കീ", "കു", "കൂ", "കൃ", "കൄ", "കൢ", "കൣ", "കെ", "കേ", "കൈ", "കൊ", "കോ", "കൗ", "കൌ", "കം", "കഃ", "ക്ഷ", "റ്റ"];
/**
 * @param {string} value
 * @returns {string}
 */
const swapChar = value => charMap.get(value) || value;
/**
 * @param {string[]} source
 * @param {number} index
 * @param {string[]} target
 * @returns {boolean}
 */
const hasSubArrayAtIndex = (source, index, target) => {
	const itemCount = target.length;
	for (var loopIndex = 0; loopIndex < itemCount; loopIndex++) {
		if (source[index + loopIndex] !== target[loopIndex]) {
			return false;
		}
	}
	return true;
};
/**
 * @param {string[]} value
 * @param {string} conjunct
 */
const replaceConjuncts = (value, conjunct) => {
	const chars = conjunct.split("");
	const firstChar = chars[0];
	const charCount = chars.length;
	const subArray = chars.slice(1);
	const spliceCount = charCount - 1;
	let index = value.indexOf(firstChar);
	while (index > -1 && index < value.length - charCount) {
		if (hasSubArrayAtIndex(value, index + 1, subArray)) {
			value[index] = conjunct;
			value.splice(index + 1, spliceCount);
		}
		index = value.indexOf(firstChar, ++index);
	}
};
/**
 * @param {string} value
 * @returns {string}
 */
const encDec = value => {
	const chars = value.split("");
	conjunctsToReplace.forEach(conjunct => {
		if (value.indexOf(conjunct) > -1) {
			replaceConjuncts(chars, conjunct);
		}
	});
	return chars.map(swapChar).join("");
};