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
	["ഇ", "എ"],
	["ഈ", "ഏ"],
	["ഋ", "ഌ"],
	["ൠ", "ൡ"],
	["ഉ", "ഒ"],
	["ഊ", "ഓ"],
	["ഐ", "ഔ"],
	["ി", "െ"],
	["ീ", "േ"],
	["ൃ", "ൢ"],
	["ൄ", "ൣ"],
	["ു", "ൊ"],
	["ൂ", "ോ"],
	["ൈ", "ൌ"],
	["ക", "മ"],
	["ഖ", "ഭ"],
	["ഗ", "ബ"],
	["ച", "ന"],
	["ഛ", "ധ"],
	["ജ", "ദ"],
	["ട", "ണ"],
	["ഠ", "ഢ"],
	["ഡ", "സ"],
	["ത", "ഞ"],
	["ഥ", "ഝ"],
	["പ", "ങ"],
	["ഫ", "ഘ"],
	["യ", "ള"],
	["ര", "ഴ"],
	["ല", "റ"],
	["വ", "ശ"],
	["ഷ", "ഹ"],
	["ൿ", "ൔ"],
	["ൾ", "ൕ"],
	["ൺ", "ട്‍"],
	["ൽ", "റ്‍"],
	["ർ", "ൖ"],
	["ൻ", "ച്‍"],
	["ഩ", "ഺ"],
	["൦", "൪"],
	["൧", "൩"],
	["൨", "൭"],
	["൩", "൧"],
	["൪", "൦"],
	["൫", "൯"],
	["൬", "൮"],
	["൭", "൨"],
	["൮", "൬"],
	["൯", "൫"],
	["0", "4"],
	["1", "3"],
	["2", "7"],
	["3", "1"],
	["4", "0"],
	["5", "9"],
	["6", "8"],
	["7", "2"],
	["8", "6"],
	["9", "5"],
	["4", "0"],
	["3", "1"],
	["7", "2"],
	["1", "3"],
	["0", "4"],
	["9", "5"],
	["8", "6"],
	["2", "7"],
	["6", "8"],
	["5", "9"],
	["൪", "൦"],
	["൩", "൧"],
	["൭", "൨"],
	["൧", "൩"],
	["൦", "൪"],
	["൯", "൫"],
	["൮", "൬"],
	["൨", "൭"],
	["൬", "൮"],
	["൫", "൯"],
	["എ", "ഇ"],
	["ഏ", "ഈ"],
	["ഌ", "ഋ"],
	["ൡ", "ൠ"],
	["ഒ", "ഉ"],
	["ഓ", "ഊ"],
	["ഔ", "ഐ"],
	["െ", "ി"],
	["േ", "ീ"],
	["ൢ", "ൃ"],
	["ൣ", "ൄ"],
	["ൊ", "ു"],
	["ോ", "ൂ"],
	["ൌ", "ൈ"],
	["ൗ", "ൈ"],
	["മ", "ക"],
	["ഭ", "ഖ"],
	["ബ", "ഗ"],
	["ന", "ച"],
	["ധ", "ഛ"],
	["ദ", "ജ"],
	["ണ", "ട"],
	["ഢ", "ഠ"],
	["സ", "ഡ"],
	["ഞ", "ത"],
	["ഝ", "ഥ"],
	["ങ", "പ"],
	["ഘ", "ഫ"],
	["ള", "യ"],
	["ഴ", "ര"],
	["റ", "ല"],
	["ശ", "വ"],
	["ഹ", "ഷ"],
	["ൔ", "ൿ"],
	["ൕ", "ൾ"],
	["ട്‍", "ൺ"],
	["റ്‍", "ൽ"],
	["ൖ", "ർ"],
	["ച്‍", "ൻ"],
	["ഺ", "ഩ"]
]);
const conjunctsToReplace = ["ട്‍", "റ്‍", "ച്‍"];
/**
 * Swaps a character based on the predefined character map.
 * If the character exists in the map, returns its mapped value;
 * otherwise, returns the original character.
 * @param {string} value The input character to be swapped
 * @returns {string} The mapped character or the original character if no mapping exists
 */
const swapChar = value => charMap.get(value) || value;
/**
 * Checks if a target sequence exists at a specific index within a source array.
 * @param {string[]} source The source array to search within
 * @param {number} startIndex The starting index to begin the sequence comparison
 * @param {string[]} sequence The sequence to find
 * @returns {boolean} True if the entire sequence matches at the given index, false otherwise
 */
const hasSequenceAtIndex = (source, startIndex, sequence) => sequence.every((value, index) => source[startIndex + index] === value);
/**
 * Replaces Malayalam conjunct characters within an array of characters.
 * Finds and replaces specific conjunct patterns in the input character array.
 * @param {string[]} value The mutable array of characters to modify
 * @param {string} conjunct The conjunct character pattern to replace
 */
const replaceConjuncts = (value, conjunct) => {
	const chars = conjunct.match(/./gu);
	const firstChar = chars[0];
	const charCount = chars.length;
	const subArray = chars.slice(1);
	const spliceCount = charCount - 1;
	let index = value.indexOf(firstChar);
	while (index > -1 && index <= value.length - charCount) {
		if (hasSequenceAtIndex(value, index + 1, subArray)) {
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
	const chars = value.match(/[\s\S]/gu);
	conjunctsToReplace.forEach(conjunct => {
		if (value.indexOf(conjunct) > -1) {
			replaceConjuncts(chars, conjunct);
		}
	});
	return chars.map(swapChar).join("");
};