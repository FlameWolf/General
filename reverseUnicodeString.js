const reverseUnicodeString = value =>
	value &&
	[...new Intl.Segmenter().segment(value)]
		.map(x => x.segment)
		.reverse()
		.join("");