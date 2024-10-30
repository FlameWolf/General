const shuffleArray = function (value) {
	const shuffledArray = [...value];
	let currentIndex = shuffledArray.length;
	while (currentIndex !== 0) {
		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[shuffledArray[currentIndex], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[currentIndex]];
	}
	return shuffledArray;
};