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
	["അ്‍", "ൿ"],
	["ഖ", "ഗ"],
	["ഘ", "ങ"],
	["ച", "ട"],
	["ഛ", "ഠ"],
	["ജ", "ഡ"],
	["ഝ", "ഢ"],
	["ഞ", "ണ"],
	["ഞ്‍", "ൺ"],
	["ത", "പ"],
	["ഥ", "ഫ"],
	["ദ", "ബ"],
	["ധ", "ഭ"],
	["ന", "മ"],
	["യ", "ശ"],
	["ൕ", "ശ്"],
	["ര", "ഷ"],
	["ർ", "ഷ്‍"],
	["ൎ", "ഷ്‍"],
	["ല", "സ"],
	["ൽ", "സ്‍"],
	["വ", "ഹ"],
	["ള", "ക്ഷ"],
	["ൾ", "ക്ഷ്‍"],
	["ഴ", "റ"],
	["ൖ", "റ്"],
	["റ്റ", "ഩ"],
	["ഺ", "ഩ"],
	["റ്റ്‍", "ൻ"],
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
	["ഡ", "ജ"],
	["ഢ", "ഝ"],
	["ണ", "ഞ"],
	["ൺ", "ഞ്‍"],
	["പ", "ത"],
	["ഫ", "ഥ"],
	["ബ", "ദ"],
	["ഭ", "ധ"],
	["മ", "ന"],
	["ൔ", "ന്"],
	["ശ", "യ"],
	["ഷ", "ര"],
	["ഷ്‍", "ർ"],
	["സ", "ല"],
	["സ്‍", "ൽ"],
	["ഹ", "വ"],
	["ക്ഷ", "ള"],
	["ക്ഷ്‍", "ൾ"],
	["റ", "ഴ"],
	["ഩ", "റ്റ"],
	["ൻ", "റ്റ്‍"]
]);
/**
 * List of Malayalam conjunct characters that need special handling during substitution.
 */
const conjunctsToReplace = ["അ്‍", "കാ", "കി", "കീ", "കു", "കൂ", "കൃ", "കൄ", "കൢ", "കൣ", "കെ", "കേ", "കൈ", "കൊ", "കോ", "കൗ", "കൌ", "കം", "കഃ", "ഞ്‍", "സ്‍", "ക്ഷ്‍", "ക്ഷ", "ഷ്‍", "റ്റ്‍", "റ്റ"];
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