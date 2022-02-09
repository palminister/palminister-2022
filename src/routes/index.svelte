<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import LandingStory from '../components/landing-stories.svelte';
	import ExploreProjects from '../components/explore-projects.svelte';
	import OutroMessage from '../components/outro-message.svelte';
	import ContactMe from '../components/contact-me.svelte';
	import Footer from '../components/footer.svelte';

	const META_TITLE = 'Palminister — 2022';
	const META_DESCRIPTION = 'portfolio of a generalist who strives to craft meaningful impacts';
	const META_IMAGE = 'https://i.ibb.co/PY2DGT1/palminister-2022-og.png';

	let innerWidth: number = 0;
	let scrollY: number = 0;
	let windowStore = writable({ scrollY, innerWidth });
	setContext('windowStore', windowStore);
	$: windowStore.set({ scrollY, innerWidth });
</script>

<svelte:head>
	<title>{META_TITLE}</title>
	<meta name="description" content={META_DESCRIPTION} />
	<meta property="og:title" content={META_TITLE} />
	<meta property="og:description" content={META_DESCRIPTION} />
	<meta property="og:image" content={META_IMAGE} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<svelte:window bind:innerWidth bind:scrollY />

<LandingStory />
<ExploreProjects />
<OutroMessage />
<ContactMe />
<Footer />
