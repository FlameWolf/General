const [encoder, decoder] = [new TextEncoder(), new TextDecoder()];
/**
 * Flattens a nested Uint8Array.
 * @param {Uint8Array} input The Uint8Array to flatten
 * @returns {Uint8Array} The flattened Uint8Array
 */
const flattenUint8Array = input => {
	let result = [];
	for (const item of input) {
		if (item instanceof Uint8Array) {
			result = result.concat(Array.from(flattenUint8Array(item)));
		} else {
			result.push(item);
		}
	}
	return new Uint8Array(result);
};
/**
 * Compresses a Uint8Array using the gzip algorithm.
 * @param {Uint8Array} input The Uint8Array to compress
 * @returns {Promise<Uint8Array>} A promise that resolves to the compressed Uint8Array
 */
const gzip = async input => {
	const cs = new CompressionStream("gzip");
	const writer = cs.writable.getWriter();
	writer.write(input);
	writer.close();
	const reader = cs.readable.getReader();
	const chunks = [];
	let [done, value] = [null, null];
	while ((({ done, value } = await reader.read()), !done)) {
		chunks.push(value);
	}
	return flattenUint8Array(chunks);
};
/**
 * Uncompresses a Uint8Array using the gzip algorithm.
 * @param {Uint8Array} input The Uint8Array to uncompress
 * @returns {Promise<Uint8Array>} A promise that resolves to the uncompressed Uint8Array
 */
const gunzip = async input => {
	const ds = new DecompressionStream("gzip");
	const writer = ds.writable.getWriter();
	writer.write(input);
	writer.close();
	const reader = ds.readable.getReader();
	const chunks = [];
	let [done, value] = [null, null];
	while ((({ done, value } = await reader.read()), !done)) {
		chunks.push(value);
	}
	return flattenUint8Array(chunks);
};
/**
 * Compresses a unicode string using the gzip algorithm and encodes the result into base-64.
 * @param {string} input The unicode string to convert to base-64
 * @returns {Promise<string>} A promise that resolves to the converted base-64 string
 */
const unicodeToBase64 = async input => btoa((await gzip(encoder.encode(input))).reduce((prev, curr) => `${prev}${String.fromCharCode(curr)}`, ""));
/**
 * Converts a gzipped and base-64 encoded string back into its original unicode representation.
 * @param {string} input The base-64 string to convert to unicode
 * @returns {Promise<string>} A promise that resolves to the converted unicode string
 */
const base64ToUnicode = async input => decoder.decode(await gunzip(Uint8Array.from(Array.from(atob(input)).map(x => x.charCodeAt(0)))));