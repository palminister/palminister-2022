export const generateArray = (length: number) => Array.from({ length }, (_, index) => index + 1);

export const shuffleArray = (array: any[]) => {
	// "Durstenfeld shuffle"
	let shuffle = [...array];
	for (let i = shuffle.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]];
	}
	return shuffle;
};

export const getRandomArbitrary = (min: number, max: number) => {
	//  Returns a random number between min (inclusive) and max (exclusive)
	return Math.random() * (max - min) + min;
};

export const findClosestPoint = (arr, [x, y]) => {
	let closest = null;
	let closestDistance = Infinity;
	for (let i = 0; i < arr.length; i++) {
		const distance = Math.sqrt(Math.pow(arr[i].x - x, 2) + Math.pow(arr[i].y - y, 2));
		if (distance < closestDistance) {
			closest = arr[i];
			closestDistance = distance;
		}
	}
	return closest;
};

export function clickOutside(node) {
	const handleClick = (event) => {
		if (!node.contains(event.target)) {
			node.dispatchEvent(new CustomEvent('outclick'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
