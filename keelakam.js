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
/**
 * Swaps a Malayalam character based on the predefined character map.
 * @param {string} char The input character to be swapped
 * @returns {string} The mapped character or the original character if no mapping exists
 */
const swapChar = char => charMap.get(char) || char;
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
	// Second pass: Split into individual characters, preserving surrogate pairs, and apply character substitutions
	return inputString
		.match(/[\s\S]/gu)
		.map(swapChar)
		.join("");
};