"use strict";

const charMap = new Map([
	["ഇ", "ഉ"],
	["ഈ", "ഊ"],
	["ൟ", "ഊ"],
	["ഋ", "ഌ"],
	["ൠ", "ൡ"],
	["എ", "ഒ"],
	["ഏ", "ഓ"],
	["ഐ", "ഔ"],
	["ി", "ു"],
	["ീ", "ൂ"],
	["ൃ", "ൢ"],
	["ൄ", "ൣ"],
	["െ", "ൊ"],
	["േ", "ോ"],
	["ൈ", "ൌ"],
	["ക", "പ"],
	["ഖ", "ഫ"],
	["ഗ", "ബ"],
	["ഘ", "ഭ"],
	["ങ", "മ"],
	["ച", "ത"],
	["ഛ", "ഥ"],
	["ജ", "ദ"],
	["ഝ", "ധ"],
	["ഞ", "ന"],
	["ട", "റ"],
	["ഠ", "ഴ"],
	["ഡ", "ഷ"],
	["ഢ", "ഹ"],
	["ണ", "ള"],
	["യ", "വ"],
	["ൕ", "വ്"],
	["ര", "ശ"],
	["ല", "സ"],
	["ഺ", "ഩ"],
	["ൿ", "ൺ"],
	["ക്‍", "ൺ"],
	["ൾ", "ർ"],
	["ള്‍", "ർ"],
	["ൽ", "ൻ"],
	["ല്‍", "ൻ"],
	["ന്‍റ", "ൽ്ട"],
	["൦", "൯"],
	["൧", "൮"],
	["൨", "൭"],
	["൩", "൬"],
	["൪", "൫"],
	["0", "9"],
	["1", "8"],
	["2", "7"],
	["3", "6"],
	["4", "5"],
	["5", "4"],
	["6", "3"],
	["7", "2"],
	["8", "1"],
	["9", "0"],
	["൫", "൪"],
	["൬", "൩"],
	["൭", "൨"],
	["൮", "൧"],
	["൯", "൦"],
	["ഉ", "ഇ"],
	["ഊ", "ഈ"],
	["ഌ", "ഋ"],
	["ൡ", "ൠ"],
	["ഒ", "എ"],
	["ഓ", "ഏ"],
	["ഔ", "ഐ"],
	["ു", "ി"],
	["ൂ", "ീ"],
	["ൢ", "ൃ"],
	["ൣ", "ൄ"],
	["ൊ", "െ"],
	["ോ", "േ"],
	["ൌ", "ൈ"],
	["ൗ", "ൈ"],
	["പ", "ക"],
	["ഫ", "ഖ"],
	["ബ", "ഗ"],
	["ഭ", "ഘ"],
	["മ", "ങ"],
	["ൔ", "ങ്"],
	["ത", "ച"],
	["ഥ", "ഛ"],
	["ദ", "ജ"],
	["ധ", "ഝ"],
	["ന", "ഞ"],
	["റ", "ട"],
	["ഴ", "ഠ"],
	["ൖ", "ഠ്"],
	["ഷ", "ഡ"],
	["ഹ", "ഢ"],
	["ള", "ണ"],
	["വ", "യ"],
	["ശ", "ര"],
	["സ", "ല"],
	["ഩ", "ഺ"],
	["ൺ", "ൿ"],
	["ണ്‍", "ൿ"],
	["ർ", "ൾ"],
	["ര്‍", "ൾ"],
	["ൎ", "ൾ"],
	["ൻ", "ൽ"],
	["ന്‍", "ൽ"]
]);
const conjunctsToReplace = ["ക്‍", "ള്‍", "ല്‍", "ണ്‍", "ര്‍", "ന്‍റ", "ന്‍"];
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
	while (index > -1 && index < value.length - charCount) {
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
	const chars = value.split("");
	conjunctsToReplace.forEach(conjunct => {
		if (value.indexOf(conjunct) > -1) {
			replaceConjuncts(chars, conjunct);
		}
	});
	return chars.map(swapChar).join("");
};