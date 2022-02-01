<script lang="ts">
	import smoothscroll from 'smoothscroll-polyfill';
	import { onMount } from 'svelte';
	import 'virtual:windi.css';
	import '../styles/typography.css';

	onMount(() => smoothscroll.polyfill());
</script>

<slot />

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
	:global(body) {
		@apply typo-p1;
	}
</style>
