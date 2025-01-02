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
	["അ്‍", "ൿ"],
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