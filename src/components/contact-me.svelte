<script lang="ts">
	import ExternalLink from './external-link.svelte';
	import Button from './button.svelte';
	let copied = false;
	let tooltip: HTMLElement;
	const copyText = () => {
		navigator.clipboard.writeText('thanapatj.th@gmail.com');
		copied = true;
	};
	const mailMouseEnter = () => {
		tooltip.style.opacity = '0.97';
	};
	const mailMouseLeave = () => {
		tooltip.style.opacity = '0';
	};
	const resumeLink =
		'https://drive.google.com/file/d/1MUFRkVZynW_g2XAYBnK0qqFsf3-eA8bV/view?usp=sharing';
</script>

<section class="flex flex-col items-center my-48 md:my-60">
	<p class="typo-h1 text-center p-5">Let's create a <br /> better future together!</p>
	<div class="flex m-5">
		<ExternalLink href="https://www.facebook.com/palm.jumnongrat/">
			<img class="icon transition-this" src="images/icons/facebook.svg" alt="facebook" />
		</ExternalLink>

		<ExternalLink href="https://www.linkedin.com/in/palminister/">
			<img class="icon transition-this" src="images/icons/linkedin.svg" alt="linkedin" />
		</ExternalLink>

		<ExternalLink href="https://github.com/palminister">
			<img class="icon transition-this" src="images/icons/github.svg" alt="github" />
		</ExternalLink>

		<button
			class="relative"
			on:mouseenter={mailMouseEnter}
			on:mouseleave={mailMouseLeave}
			on:click={copyText}
		>
			<span bind:this={tooltip} class="tooltip-copy typo-p1">
				{copied ? 'copied!' : 'copy'}
			</span>
			<img class="icon transition-this" src="images/icons/mail.svg" alt="github" />
		</button>
	</div>
	<Button url={resumeLink}>Resume</Button>
</section>

<style>
	button,
	button:focus {
		outline: none;
	}
	.icon {
		@apply w-[40px] m-2;
	}
	.transition-this {
		@apply transition duration-100 hover:(opacity-70 transform scale-110);
	}
	.tooltip-copy {
		opacity: 0;
		position: absolute;
		top: -45px;
		left: 50%;
		padding: 0.6em 1em;
		transform: translateX(-50%);
		background: #fff;
		text-align: center;
		line-height: 1.4em;
		font-size: 0.9em;
		z-index: 10;
		transition: all 0.1s ease-out;
		pointer-events: none;
		@apply shadow-main;
	}

	.tooltip-copy:before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 12px;
		height: 12px;
		background: white;
		border: 1px solid #ddd;
		border-top-color: transparent;
		border-left-color: transparent;
		transform: translate(-50%, 50%) rotate(45deg);
		transform-origin: center center;
		z-index: 10;
		@apply shadow-main;
	}
</style>
