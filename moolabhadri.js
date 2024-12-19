"use strict";

const similarPairs = [
	["ന്‍റ", "ൻ്റ"],
	["ണ്‍", "ൺ"],
	["ന്‍", "ൻ"],
	["ര്‍", "ർ"],
	["ല്‍", "ൽ"],
	["ള്‍", "ൾ"],
	["ക്‍", "ൿ"]
];
const charMap = new Map([
	["അ", "ക"],
	["ആ", "കാ"],
	["ഇ", "കി"],
	["ഈ", "കീ"],
	["ൟ", "കീ"],
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
	["ജ", "ഝ"],
	["ഞ", "ണ"],
	["ഞ്‍", "ൺ"],
	["ഡ", "ഢ"],
	["ത", "പ"],
	["ഥ", "ഫ"],
	["ദ", "ധ"],
	["ബ", "ഭ"],
	["ന", "മ"],
	["ഩ", "മ"],
	["യ", "ശ"],
	["ൕ", "ശ്"],
	["ര", "ഷ"],
	["ല", "സ"],
	["വ", "ഹ"],
	["ള", "ക്ഷ"],
	["ഴ", "റ"],
	["ൖ", "റ്"],
	["ങ്ക", "ഞ്ച"],
	["ണ്ട", "ന്ത"],
	["മ്പ", "ഩ്ഩ"],
	["ൻ്റ", "റ്റ"],
	["ഺ", "റ്റ"],
	["ൻ", "ൽ"],
	["ർ", "ൾ"],
	["ൎ", "ൾ"],
	["൧", "൨"],
	["൩", "൪"],
	["൫", "൬"],
	["൭", "൮"],
	["൯", "൦"],
	["1", "2"],
	["3", "4"],
	["5", "6"],
	["7", "8"],
	["9", "0"],
	["2", "1"],
	["4", "3"],
	["6", "5"],
	["8", "7"],
	["0", "9"],
	["൨", "൧"],
	["൪", "൩"],
	["൬", "൫"],
	["൮", "൭"],
	["൦", "൯"],
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
	["കൌ", "ഔ"],
	["കൗ", "ഔ"],
	["കം", "അം"],
	["കഃ", "അഃ"],
	["ൿ", "അ്‍"],
	["ഗ", "ഖ"],
	["ങ", "ഘ"],
	["ട", "ച"],
	["ഠ", "ഛ"],
	["ഝ", "ജ"],
	["ണ", "ഞ"],
	["ൺ", "ഞ്‍"],
	["ഢ", "ഡ"],
	["പ", "ത"],
	["ഫ", "ഥ"],
	["ധ", "ദ"],
	["ഭ", "ബ"],
	["മ", "ന"],
	["ൔ", "ന്"],
	["ശ", "യ"],
	["ഷ", "ര"],
	["സ", "ല"],
	["ഹ", "വ"],
	["ക്ഷ", "ള"],
	["റ", "ഴ"],
	["ഞ്ച", "ങ്ക"],
	["ന്ത", "ണ്ട"],
	["ഩ്ഩ", "മ്പ"],
	["റ്റ", "ൻ്റ"],
	["ൽ", "ൻ"],
	["ൾ", "ർ"]
]);
const conjunctsToReplace = ["കാ", "കി", "കീ", "കു", "കൂ", "കൃ", "കൄ", "കൢ", "കൣ", "കെ", "കേ", "കൈ", "കൊ", "കോ", "കൗ", "കൌ", "കം", "കഃ", "ക്ഷ", "ങ്ക", "ഞ്ച", "ണ്ട", "ന്ത", "മ്പ", "ഩ്ഩ", "ൻ്റ", "റ്റ"];
/**
 * Swaps a character based on the predefined character map.
 * If the character exists in the map, returns its mapped value;
 * otherwise, returns the original character.
 * @param {string} value The input character to be swapped
 * @returns {string} The mapped character or the original character if no mapping exists
 */
const swapChar = value => charMap.get(value) || value;
/**
 * Checks if a target sub-array exists at a specific index within a source array.
 * @param {string[]} source The source array to search within
 * @param {number} index The starting index to begin the sub-array comparison
 * @param {string[]} target The target sub-array to find
 * @returns {boolean} True if the entire target sub-array matches at the given index, false otherwise
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
 * Replaces Malayalam conjunct characters within an array of characters.
 * Finds and replaces specific conjunct patterns in the input character array.
 * @param {string[]} value The mutable array of characters to modify
 * @param {string} conjunct The conjunct character pattern to replace
 */
const replaceConjuncts = (value, conjunct) => {
	const chars = conjunct.split("");
	const firstChar = chars[0];
	const charCount = chars.length;
	const subArray = chars.slice(1);
	const spliceCount = charCount - 1;
	let index = value.indexOf(firstChar);
	while (index > -1 && index <= value.length - charCount) {
		if (hasSubArrayAtIndex(value, index + 1, subArray)) {
			value[index] = conjunct;
			value.splice(index + 1, spliceCount);
		}
		index = value.indexOf(firstChar, ++index);
	}
};
/**
 * Performs character encoding/decoding transformation for Malayalam characters.
 * Converts each character in the input string using the prefedined character map.
 * @param {string} value The input string to be transformed
 * @returns {string} The transformed string with character mappings applied
 */
const encDec = value => {
	for (const [conjunct, atomic] of similarPairs) {
		value = value.replaceAll(conjunct, atomic);
	}
	const chars = value.split("");
	conjunctsToReplace.forEach(conjunct => {
		if (value.indexOf(conjunct) > -1) {
			replaceConjuncts(chars, conjunct);
		}
	});
	return chars.map(swapChar).join("");
};