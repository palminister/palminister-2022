<script>
	import { clickOutside } from '../utils/utils';
	import Button from './button.svelte';
	export let onClicked;
	export let opened;
	export let currentDetail;
	const closeOutside = () => (opened ? onClicked() : null);

	$: name = currentDetail ? currentDetail.name : '';
	$: image = currentDetail ? currentDetail.img : '';
	$: url = currentDetail ? currentDetail.url : '';
	$: description = currentDetail ? currentDetail.description : '';
	$: contributions = currentDetail ? currentDetail.contribution : '';

	const lineHackArticle = 'https://www.facebook.com/100001128037609/posts/3567378903309676/';
	const lineHackDeck =
		'https://drive.google.com/file/d/1VD8my7F7LW6lIJAEqf3BCWmU-t_7V9ac/view?usp=sharing';
</script>

<div
	class="fixed top-0 left-0 w-screen h-screen z-20 modal"
	style="visibility: hidden; opacity:0; transform: translateY(50%) rotate(-20deg)"
>
	<div class="flex w-screen h-screen">
		<div
			class="bg-white p-12px md:p-15px text-black shadow-main m-auto w-[95vw] h-max max-w-[900px] max-h-[90vh] overflow-x-hidden"
			use:clickOutside
			on:outclick={closeOutside}
		>
			<div class="flex w-full flex-wrap justify-end">
				<button on:click={onClicked} style="outline: none">
					<img src="images/icons/cross.svg" alt="cross" />
				</button>
			</div>
			<p class="main-text px-3 pb-3">{name}</p>
			<img src={image} alt={name} />
			<div class="px-3 pt-3 text-[12px] leading-5 md:(leading-6 text-[14px])">
				<p class="main-text py-3">Description:</p>
				<p class="font-sans">
					{@html description}
				</p>
				<p class="main-text py-3">Contributions:</p>
				<ul class="font-sans">
					{#each contributions as contribution}
						<li>{@html contribution}</li>
					{/each}
				</ul>
				<div class="flex justify-center mt-3">
					{#if name === 'MUIR Ambassador'}
						{''}
					{:else if name === 'NAMA: LINE HACKATHON 2020'}
						<div class="flex">
							<Button class="mr-3" url={lineHackArticle}>
								<p>See Related Article</p>
							</Button>
							<Button url={lineHackDeck}>
								<p>See Pitching Deck</p>
							</Button>
						</div>
					{:else}
						<Button {url}>
							<p>Visit Project</p>
						</Button>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.modal {
		transition: all 400ms cubic-bezier(0.65, 0.05, 0.36, 1);
	}
	.main-text {
		@apply typo-p1 font-bold;
	}
</style>
