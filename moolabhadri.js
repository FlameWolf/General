"use strict";

const charMap = new Map([
	["അ", "ക"],
	["ആ", "കാ"],
	["ഇ", "കി"],
	["ഈ", "കീ"],
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
	["ജ", "ഡ"],
	["ഝ", "ഢ"],
	["ഞ", "ണ"],
	["ത", "പ"],
	["ഥ", "ഫ"],
	["ദ", "ബ"],
	["ധ", "ഭ"],
	["ന", "മ"],
	["യ", "ശ"],
	["ര", "ഷ"],
	["ല", "സ"],
	["വ", "ഹ"],
	["ള", "ഩ"],
	["ഴ", "റ"],
	["റ്റ", "ക്ഷ"],
	["ൿ", "ൾ"],
	["ൺ", "ൽ"],
	["ൻ", "ർ"],
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
	["കൗ", "ഔ"],
	["കൌ", "ഔ"],
	["കം", "അം"],
	["കഃ", "അഃ"],
	["ഗ", "ഖ"],
	["ങ", "ഘ"],
	["ട", "ച"],
	["ഠ", "ഛ"],
	["ഡ", "ജ"],
	["ഢ", "ഝ"],
	["ണ", "ഞ"],
	["പ", "ത"],
	["ഫ", "ഥ"],
	["ബ", "ദ"],
	["ഭ", "ധ"],
	["മ", "ന"],
	["ശ", "യ"],
	["ഷ", "ര"],
	["സ", "ല"],
	["ഹ", "വ"],
	["ഩ", "ള"],
	["റ", "ഴ"],
	["ക്ഷ", "റ്റ"],
	["ൾ", "ൿ"],
	["ൽ", "ൺ"],
	["ർ", "ൻ"]
]);
const vowelMarks = ["ാ", "ി", "ീ", "ു", "ൂ", "ൃ", "ൄ", "ൢ", "ൣ", "െ", "േ", "ൈ", "ൊ", "ോ", "ൗ", "ൌ", "ം", "ഃ"];
const [ka, meethel, ra, sha, ksha, tta] = ["ക", "്", "റ", "ഷ", "ക്ഷ", "റ്റ"];
/**
 * @param {string} value
 * @returns {string}
 */
const swapChar = value => charMap.get(value) || value;
/**
 * @param {string[]} value
 */
const replaceKaConjuncts = value => {
	let index = value.indexOf(ka);
	while (index > -1 && index < value.length - 1) {
		const nextChar = value[index + 1];
		if (vowelMarks.indexOf(nextChar) > -1) {
			value[index] = `${ka}${nextChar}`;
			value.splice(index + 1, 1);
		}
		index = value.indexOf(ka, ++index);
	}
};
/**
 * @param {string[]} value
 */
const replaceKsha = value => {
	let index = value.indexOf(ka);
	while (index > -1 && index < value.length - 2) {
		if (value[index + 1] === meethel && value[index + 2] === sha) {
			value[index] = ksha;
			value.splice(index + 1, 2);
		}
		index = value.indexOf(ka, ++index);
	}
};
/**
 * @param {string[]} value
 */
const replaceTta = value => {
	let index = value.indexOf(ra);
	while (index > -1 && index < value.length - 2) {
		if (value[index + 1] === meethel && value[index + 2] === ra) {
			value[index] = tta;
			value.splice(index + 1, 2);
		}
		index = value.indexOf(ra, ++index);
	}
};
/**
 * @param {string} value
 * @returns {string}
 */
const encDec = value => {
	const chars = value.split("");
	replaceKaConjuncts(chars);
	if (value.indexOf(ksha) > -1) {
		replaceKsha(chars);
	}
	if (value.indexOf(tta) > -1) {
		replaceTta(chars);
	}
	return chars.map(swapChar).join("");
};