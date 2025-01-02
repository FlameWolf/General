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
 * Multi-character Malayalam sequences from the predefined character map,
 * sorted by decreasing order of length for proper matching precedence.
 */
const mappedConjuncts = Array.from(charMap.keys())
	.filter(x => x.match(/./gu).length > 1)
	.sort((x, y) => x.length < y.length);
/**
 * Regular expression pattern for splitting Malayalam text
 * into tokens while preserving multi-character sequences.
 */
const tokenisationPattern = new RegExp(`(${mappedConjuncts.join("|")}|\\s|\\S)`, "gu");
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
	// Split text into tokens while preserving surrogate pairs and conjuncts
	const chars = inputString.match(tokenisationPattern);
	// Second pass: Apply character substitutions
	return chars.map(swapChar).join("");
};