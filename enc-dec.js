const initVector = crypto.getRandomValues(new Uint8Array(64)); /* required for decryption */
const [encoder, decoder] = [new TextEncoder(), new TextDecoder()];
const encryptionKey = await crypto.subtle.generateKey(
	{
		name: "AES-GCM",
		length: 256
	},
	true,
	["encrypt", "decrypt"]
);
const getEncryptionParams = (key, data) => [
	{
		name: "AES-GCM",
		iv: initVector
	},
	key,
	data
];
const encryptMessage = async (key, plainText) => await crypto.subtle.encrypt(...getEncryptionParams(key, encoder.encode(plainText)));
const decryptMessage = async (key, ciphertext) => decoder.decode(await crypto.subtle.decrypt(...getEncryptionParams(key, ciphertext)));
/* Test implementation */
const textToEncrypt = "മാസങ്ങളിൽ മേടം പ്രധാനം";
const encryptedText = await encryptMessage(encryptionKey, textToEncrypt);
const bufferAsString = new Uint8Array(encryptedText).reduce((prev, curr) => `${prev}${String.fromCharCode(curr + 255)}`, "");
const stringAsBuffer = Uint8Array.from(output.split("").map(x => x.charCodeAt(0) - 255));
const decryptedText = await decryptMessage(encryptionKey, stringAsBuffer);
console.log(textToEncrypt === decryptedText ? ":)" : ":(");