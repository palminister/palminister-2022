<script lang="ts">
	import Scrolly from '../utils/Scrolly.svelte';
	import Characters from './characters.svelte';
	import InfoStory from './info-story.svelte';

	let currentStep: number;
	const steps = [
		'<p>In a room of 100 people... </p>',
		'<p>32 are generalists</p>',
		'<p>11 have a background in tech</p>',
		'<p>6 drive change with visuals</p>',
		'<p>1 actually exists </p>',
		'<p>Hi, I’m Palm Jumnongrat, and I’m an artist who codes</p>'
	];
</script>

<section>
	<div class="section-container max-w-screen-lg m-auto">
		<div class="steps-container">
			<Scrolly bind:value={currentStep}>
				{#each steps as text, i}
					<div class="step" class:active={currentStep === i}>
						<div class="step-content typo-h1">
							{@html text}
							{#if i === 4}
								<InfoStory trigger={currentStep} />
							{/if}
						</div>
					</div>
				{/each}
				<div class="h-[50vh]" />
			</Scrolly>
		</div>
		<div class="sticky">
			<Characters {currentStep} />
		</div>
	</div>
</section>

<style>
	:global(body) {
		overflow-x: hidden;
	}

	.sticky {
		position: sticky;
		top: 50%;
		flex: 1 1 60%;
		width: 60%;
		transform: translateY(-50%);
	}

	.section-container {
		text-align: center;
		transition: background 100ms;
		display: flex;
	}

	.step {
		height: 100vh;
		display: flex;
		place-items: center;
		justify-content: center;
	}

	.step-content {
		line-height: 1;
		background: white;
		padding: 0.7em;
		display: flex;
		flex-direction: column;
		justify-content: center;
		opacity: 0%;
		transition: all 800ms cubic-bezier(0.65, 0.05, 0.36, 1);
		text-align: left;
		width: 85%;
		margin: auto;
		max-width: 500px;
		transform: translateX(5%);
	}

	.step.active .step-content {
		opacity: 95%;
		color: black;
	}

	.steps-container,
	.sticky {
		height: 100%;
	}

	.steps-container {
		flex: 1 1 50%;
		z-index: 10;
	}

	@media screen and (max-width: 768px) {
		.step-content {
			@apply shadow-main;
			transform: translateX(0);
		}
		.section-container {
			flex-direction: column-reverse;
		}
		.sticky {
			width: 95%;
			margin: auto;
		}
	}
</style>
