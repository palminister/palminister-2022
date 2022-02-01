<script lang="ts">
	import ExternalLink from './external-link.svelte';
	export let url: string = '';
</script>

<ExternalLink href={url}>
	<div
		class={`transition-hover flex main-text w-max text-white bg-black p-3 font-bold ${
			$$props.class || ''
		}`}
	>
		<slot />
	</div>
</ExternalLink>

<style>
	.transition-hover {
		@apply transition duration-100 hover:(opacity-70 transform scale-110);
	}
</style>
