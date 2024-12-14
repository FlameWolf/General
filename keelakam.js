"use strict";

const charMap = new Map([
	["ആ", "ഈ"],
	["ഉ", "എ"],
	["ഊ", "ഏ"],
	["ഋ", "ഌ"],
	["ൠ", "ൡ"],
	["ഐ", "ഔ"],
	["ാ", "ീ"],
	["ു", "െ"],
	["ൂ", "േ"],
	["ൃ", "ൢ"],
	["ൄ", "ൣ"],
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
	["ര", "ശ"],
	["ല", "സ"],
	["ൿ", "ൺ"],
	["ൾ", "ർ"],
	["ൽ", "ൻ"],
	["ഈ", "ആ"],
	["എ", "ഉ"],
	["ഏ", "ഊ"],
	["ഌ", "ഋ"],
	["ൡ", "ൠ"],
	["ഔ", "ഐ"],
	["ീ", "ാ"],
	["െ", "ു"],
	["േ", "ൂ"],
	["ൢ", "ൃ"],
	["ൣ", "ൄ"],
	["ൗ", "ൈ"],
	["ൌ", "ൈ"],
	["പ", "ക"],
	["ഫ", "ഖ"],
	["ബ", "ഗ"],
	["ഭ", "ഘ"],
	["മ", "ങ"],
	["ത", "ച"],
	["ഥ", "ഛ"],
	["ദ", "ജ"],
	["ധ", "ഝ"],
	["ന", "ഞ"],
	["റ", "ട"],
	["ഴ", "ഠ"],
	["ഷ", "ഡ"],
	["ഹ", "ഢ"],
	["ള", "ണ"],
	["വ", "യ"],
	["ശ", "ര"],
	["സ", "ല"],
	["ൺ", "ൿ"],
	["ർ", "ൾ"],
	["ൻ", "ൽ"]
]);
/**
 * Swaps a character based on the predefined character map.
 * If the character exists in the map, returns its mapped value;
 * otherwise, returns the original character.
 * @param {string} value The input character to be swapped
 * @returns {string} The mapped character or the original character if no mapping exists
 */
const swapChar = value => charMap.get(value) || value;
/**
 * Performs character encoding/decoding transformation for Malayalam characters.
 * Converts each character in the input string using the prefedined character map.
 * @param {string} value The input string to be transformed
 * @returns {string} The transformed string with character mappings applied
 */
const encDec = value => value.split("").map(swapChar).join("");