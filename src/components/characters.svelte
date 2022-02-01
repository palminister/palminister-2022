<script lang="ts">
	export let currentStep: number = 0;
	$: currentStep > 5 || currentStep === undefined ? (currentStep = 5) : currentStep;

	import { shuffleArray, generateArray } from '../utils/utils';
	const mainCharacter = 46;
	const survivorCount = { generalist: 32, tech: 11, visual: 6, exist: 1 };

	const keepMainCharacter = (mainCharacter: number, array: number[]) => {
		!array.includes(mainCharacter) ? (array[array.length - 1] = mainCharacter) : null;
		return array;
	};
	const array = generateArray(100);
	const shuffle = shuffleArray(array);
	const survivor = {
		all: shuffle,
		generalist: keepMainCharacter(mainCharacter, shuffle.slice(0, survivorCount.generalist)),
		tech: keepMainCharacter(mainCharacter, shuffle.slice(0, survivorCount.tech)),
		visual: keepMainCharacter(mainCharacter, shuffle.slice(0, survivorCount.visual)),
		exist: keepMainCharacter(mainCharacter, shuffle.slice(0, survivorCount.exist)),
		none: []
	};
	const surviorKey = Object.keys(survivor);
	// $: console.log('currentStep:', currentStep);
</script>

<div class="flex justify-center p-6">
	<div class="grid grid-cols-10 gap-2 max-w-[572px]">
		{#each array as character}
			<img
				id={`${character}`}
				class={survivor[surviorKey[currentStep]].includes(character)
					? 'opacity-100'
					: 'opacity-0 transform scale-20'}
				src={`images/characters/${character}.png`}
				alt={`${character}`}
			/>
		{/each}
	</div>
	<img
		class={currentStep === 5 ? 'my-image' : 'my-image-hidden'}
		src="images/characters/me-lg.png"
		alt="palm"
	/>
</div>

<style>
	img {
		transition: all 600ms cubic-bezier(0.65, 0.05, 0.36, 1) 300ms;
	}

	.my-image {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		opacity: 100;
		transition: all 0.75s cubic-bezier(0.24, 1.32, 0.5, 1) 300ms;
	}
	.my-image-hidden {
		position: absolute;
		top: 50%;
		transform: translateY(0) translateX(25px) scale(0);
		transform-origin: top;
		opacity: 0;
	}
</style>
