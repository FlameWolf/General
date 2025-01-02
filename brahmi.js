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
 * Bidirectional mapping between Malayalam and Brahmi script characters.
 */
const charMap = new Map([
	["അ", "𑀅"],
	["ആ", "𑀆"],
	["ഇ", "𑀇"],
	["ഈ", "𑀈"],
	["ൟ", "𑀈"],
	["ഉ", "𑀉"],
	["ഊ", "𑀊"],
	["ഋ", "𑀋"],
	["ൠ", "𑀌"],
	["ഌ", "𑀍"],
	["ൡ", "𑀎"],
	["എ", "𑁱"],
	["ഏ", "𑀏"],
	["ഐ", "𑀐"],
	["ഒ", "𑁲"],
	["ഓ", "𑀑"],
	["ഔ", "𑀒"],
	["ാ", "𑀸"],
	["ി", "𑀺"],
	["ീ", "𑀻"],
	["ു", "𑀼"],
	["ൂ", "𑀽"],
	["ൃ", "𑀾"],
	["ൄ", "𑀿"],
	["ൢ", "𑁀"],
	["ൣ", "𑁁"],
	["െ", "𑁳"],
	["േ", "𑁂"],
	["ൈ", "𑁃"],
	["ൊ", "𑁴"],
	["ോ", "𑁄"],
	["ൌ", "𑁅"],
	["ൗ", "𑁅"],
	["ം", "𑀁"],
	["ഃ", "𑀂"],
	["്", "𑁆"],
	["ക", "𑀓"],
	["ഖ", "𑀔"],
	["ഗ", "𑀕"],
	["ഘ", "𑀖"],
	["ങ", "𑀗"],
	["ച", "𑀘"],
	["ഛ", "𑀙"],
	["ജ", "𑀚"],
	["ഝ", "𑀛"],
	["ഞ", "𑀜"],
	["ട", "𑀝"],
	["ഠ", "𑀞"],
	["ഡ", "𑀟"],
	["ഢ", "𑀠"],
	["ണ", "𑀡"],
	["ത", "𑀢"],
	["ഥ", "𑀣"],
	["ദ", "𑀤"],
	["ധ", "𑀥"],
	["ന", "𑀦"],
	["പ", "𑀧"],
	["ഫ", "𑀨"],
	["ബ", "𑀩"],
	["ഭ", "𑀪"],
	["മ", "𑀫"],
	["യ", "𑀬"],
	["ര", "𑀭"],
	["ല", "𑀮"],
	["വ", "𑀯"],
	["ശ", "𑀰"],
	["ഷ", "𑀱"],
	["സ", "𑀲"],
	["ഹ", "𑀳"],
	["ള", "𑀴"],
	["ഴ", "𑀵"],
	["റ", "𑀶"],
	["ഩ", "𑀷"],
	["൦", "𑁦"],
	["൧", "𑁧"],
	["൨", "𑁨"],
	["൩", "𑁩"],
	["൪", "𑁪"],
	["൫", "𑁫"],
	["൬", "𑁬"],
	["൭", "𑁭"],
	["൮", "𑁮"],
	["൯", "𑁯"],
	["ഺ", "𑌟"],
	["ൎ", "𑀭𑁰"],
	["ൔ", "𑀫𑁰"],
	["ൕ", "𑀬𑁰"],
	["ൖ", "𑀵𑁰"],
	["ൺ", "𑀡𑁰"],
	["ൻ", "𑀷𑁰"],
	["ർ", "𑀭𑁰"],
	["ൽ", "𑀮𑁰"],
	["ൾ", "𑀴𑁰"],
	["ൿ", "𑀓𑁰"],
	["𑀅", "അ"],
	["𑀆", "ആ"],
	["𑀇", "ഇ"],
	["𑀈", "ഈ"],
	["𑀉", "ഉ"],
	["𑀊", "ഊ"],
	["𑀋", "ഋ"],
	["𑀌", "ൠ"],
	["𑀍", "ഌ"],
	["𑀎", "ൡ"],
	["𑁱", "എ"],
	["𑀏", "ഏ"],
	["𑀐", "ഐ"],
	["𑁲", "ഒ"],
	["𑀑", "ഓ"],
	["𑀒", "ഔ"],
	["𑀸", "ാ"],
	["𑀺", "ി"],
	["𑀻", "ീ"],
	["𑀼", "ു"],
	["𑀽", "ൂ"],
	["𑀾", "ൃ"],
	["𑀿", "ൄ"],
	["𑁀", "ൢ"],
	["𑁁", "ൣ"],
	["𑁳", "െ"],
	["𑁂", "േ"],
	["𑁃", "ൈ"],
	["𑁴", "ൊ"],
	["𑁄", "ോ"],
	["𑁅", "ൌ"],
	["𑀁", "ം"],
	["𑀂", "ഃ"],
	["𑁆", "്"],
	["𑀓", "ക"],
	["𑀔", "ഖ"],
	["𑀕", "ഗ"],
	["𑀖", "ഘ"],
	["𑀗", "ങ"],
	["𑀘", "ച"],
	["𑀙", "ഛ"],
	["𑀚", "ജ"],
	["𑀛", "ഝ"],
	["𑀜", "ഞ"],
	["𑀝", "ട"],
	["𑀞", "ഠ"],
	["𑀟", "ഡ"],
	["𑀠", "ഢ"],
	["𑀡", "ണ"],
	["𑀢", "ത"],
	["𑀣", "ഥ"],
	["𑀤", "ദ"],
	["𑀥", "ധ"],
	["𑀦", "ന"],
	["𑀧", "പ"],
	["𑀨", "ഫ"],
	["𑀩", "ബ"],
	["𑀪", "ഭ"],
	["𑀫", "മ"],
	["𑀬", "യ"],
	["𑀭", "ര"],
	["𑀮", "ല"],
	["𑀯", "വ"],
	["𑀰", "ശ"],
	["𑀱", "ഷ"],
	["𑀲", "സ"],
	["𑀳", "ഹ"],
	["𑀴", "ള"],
	["𑀵", "ഴ"],
	["𑀶", "റ"],
	["𑀷", "ഩ"],
	["𑁦", "൦"],
	["𑁧", "൧"],
	["𑁨", "൨"],
	["𑁩", "൩"],
	["𑁪", "൪"],
	["𑁫", "൫"],
	["𑁬", "൬"],
	["𑁭", "൭"],
	["𑁮", "൮"],
	["𑁯", "൯"],
	["𑌟", "ഺ"],
	["𑀫𑁰", "ൔ"],
	["𑀬𑁰", "ൕ"],
	["𑀵𑁰", "ൖ"],
	["𑀡𑁰", "ൺ"],
	["𑀷𑁰", "ൻ"],
	["𑀭𑁰", "ർ"],
	["𑀮𑁰", "ൽ"],
	["𑀴𑁰", "ൾ"],
	["𑀓𑁰", "ൿ"]
]);
/**
 * Multi-character Brahmi sequences from the predefined character map,
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
 * Swaps a Malayalam/Brahmi character based on the predefined character map.
 * @param {string} char The input character to be swapped
 * @returns {string} The mapped character or the original character if no mapping exists
 */
const swapChar = char => charMap.get(char) || char;
/**
 * Transforms Malayalam/Brahmi text by normalising visually identical Malayalam
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