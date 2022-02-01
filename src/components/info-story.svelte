<script lang="ts">
	import ExternalLink from './external-link.svelte';
	const styleGAN_url = 'https://en.wikipedia.org/wiki/Generative_adversarial_network';
	const fakePeople_url = 'https://thispersondoesnotexist.com/';
	export let trigger: number = 0;
	let seen = false;
	const key = 4;
	$: if (trigger === key) seen = true;
</script>

<p class={`typo-p1 md:max-w-[300px] pt-2 w-0 h-0 overflow-hidden ${seen ? 'info' : ''}`}>
	<img
		src="images/icons/info-icon.svg"
		alt="info"
		class="inline-block transform translate-y-[-2.5px]"
	/>
	The other 99 humans were
	<ExternalLink class="font-bold hover:opacity-80" href={styleGAN_url}>StyleGAN</ExternalLink> renders
	scraped from
	<ExternalLink class="font-bold hover:opacity-80" href={fakePeople_url}
		>ThisPerson<wbr />DoesNotExist</ExternalLink
	>
	😜
</p>

<style>
	.info {
		animation: fadeIn 1s cubic-bezier(0.24, 1.32, 0.5, 1) 1600ms forwards;
	}
	@keyframes fadeIn {
		0% {
			height: 100%;
			width: 40%;
			opacity: 0;
		}
		100% {
			height: 100%;
			width: 100%;
			opacity: 1;
		}
	}
</style>
