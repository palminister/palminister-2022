<script lang="ts">
	import { generateArray, getRandomArbitrary } from '../utils/utils';
	let sample = 25;
	let width: number = 0;
	$: width > 768 ? (sample = 20) : (sample = 25);

	const radius = 300;
	const boxSize = 645;
	let rotation = 0;
	$: angle = 360 / sample;

	const angleToRadian = (angle: number) => angle * (Math.PI / 180);
	const xPosition = (rotation: number) => radius * (1 + Math.cos(angleToRadian(rotation)));
	const yPosition = (rotation: number) => radius * (1 + Math.sin(angleToRadian(rotation)));

	let randomNumber = 0;
	setInterval(() => {
		randomNumber = Math.ceil(getRandomArbitrary(0, 50));
	}, 100);
</script>

<svelte:window bind:innerWidth={width} />

<section
	style={`height:${boxSize}px;`}
	class="flex relative items-center overflow-hidden m-auto max-w-screen-sm p-5 text-center mt-48 md:mt-60"
>
	<!-- <p class="typo-h1 bg-white shadow-main p-5 bg-opacity-95 z-10">
		I’m exploring new ways to put my skills into creating "meaningful" values for our future
	</p> -->
	<p class="typo-h1 bg-white shadow-main p-5 bg-opacity-95 z-10">
		I’m exploring new ways to deliver meaningful values to the society
	</p>
	<div
		style={`width:${boxSize}px; height:${boxSize}px;`}
		class="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"
	>
		{#each generateArray(sample) as index}
			<img
				class="absolute m-auto w-[35px] h-[35px] md:(w-[45px] h-[45px])"
				style={`transform: translate(${xPosition(rotation + angle * (index - 1))}px, 
                ${yPosition(rotation + angle * (index - 1))}px)`}
				src={`images/characters/${((index + randomNumber) % 100) + 1}.png`}
				alt={`${((index + randomNumber) % 100) + 1}`}
			/>
		{/each}
	</div>
</section>
