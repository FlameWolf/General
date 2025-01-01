"use strict";

/**
 * Mappings between visually identical Malayalam glyph sequences and their atomic
 * equivalents. Where first glyph of each pair uses the sequence <base character> +
 * VIRAMA (്) + ZERO-WIDTH JOINER (ZWJ) to represent a chillu character, the second
 * glyph uses a single atomic chillu character instead.
 */
const similarPairs = [
	["ന്‍റ", "ൻ്റ"],
	["മ്‍", "ൔ"],
	["യ്‍", "ൕ"],
	["ഴ്‍", "ൖ"],
	["ണ്‍", "ൺ"],
	["ന്‍", "ൻ"],
	["ര്‍", "ർ"],
	["ല്‍", "ൽ"],
	["ള്‍", "ൾ"],
	["ക്‍", "ൿ"]
];
/**
 * Bidirectional Malayalam character substitution mappings.
 */
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
/**
 * List of Malayalam conjunct characters that need special handling during substitution.
 */
const conjunctsToReplace = ["ട്‍", "റ്‍", "ച്‍"];
/**
 * Swaps a Malayalam character based on the predefined character map.
 * @param {string} char The input character to be swapped
 * @returns {string} The mapped character or the original character if no mapping exists
 */
const swapChar = char => charMap.get(char) || char;
/**
 * Validates if a particular sequence exists at a specific index within an array.
 * @param {string[]} array The array to search within
 * @param {number} startIndex The starting index for sequence comparison
 * @param {string[]} sequence The sequence to find
 * @returns {boolean} True if the sequence matches at the given index
 */
const hasSequenceAtIndex = (array, startIndex, sequence) => sequence.every((value, index) => array[startIndex + index] === value);
/**
 * Finds Malayalam conjunct glyph sequences within an array and unifies them.
 * @param {string[]} charArray The mutable array of characters to modify
 * @param {string} conjunct The conjunct character pattern to replace
 */
const replaceConjuncts = (charArray, conjunct) => {
	const chars = conjunct.match(/./gu);
	const firstChar = chars[0];
	const charCount = chars.length;
	const subArray = chars.slice(1);
	let index = charArray.indexOf(firstChar);
	while (index > -1 && index <= charArray.length - charCount) {
		if (hasSequenceAtIndex(charArray, index + 1, subArray)) {
			charArray.splice(index, charCount, conjunct);
		}
		index = charArray.indexOf(firstChar, index + 1);
	}
};
/**
 * Transforms Malayalam text by normalising visually identical Malayalam
 * glyph sequences and substituting characters as per the predefined mappings.
 * @param {string} inputString The input Malayalam text to be transformed
 * @returns {string} The transformed text with character substitutions applied
 */
const encDec = inputString => {
	// First pass: Replace similar character pairs
	for (const [conjunct, atomic] of similarPairs) {
		inputString = inputString.replaceAll(conjunct, atomic);
	}
	// Split into individual characters while preserving surrogate pairs
	const chars = inputString.match(/[\s\S]/gu);
	// Second pass: Unify conjunct sequences
	conjunctsToReplace.forEach(conjunct => {
		if (inputString.includes(conjunct)) {
			replaceConjuncts(chars, conjunct);
		}
	});
	// Final pass: Apply character substitutions
	return chars.map(swapChar).join("");
};