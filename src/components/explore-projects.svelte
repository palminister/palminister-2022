<script lang="ts">
	import Scrolly from '../utils/Scrolly.svelte';
	import ProjectsVisualization from './projects-visualization.svelte';
	import Dropdown from './dropdown.svelte';
	import Modal from './modal.svelte';
	import { onMount } from 'svelte';

	const choices = ['social impacts', 'cool stuff'];
	let currentChoice: string;

	type Point = {
		id: number;
		name: string;
		img: string;
		description: string;
		'social impacts': number;
		'cool stuff': number;
	};
	let hoveredPoint: Point;
	let lasthoveredPoint: Point;
	$: hoveredPoint ? (lasthoveredPoint = hoveredPoint) : null;

	let modalDiv: HTMLElement;
	$: modalInner = modalDiv ? (modalDiv.children[0] as HTMLElement) : null;
	let bodyElement: HTMLElement;
	let clicked: boolean = false;
	let opened: boolean = false;
	let openedElement = new Set();

	onMount(() => {
		bodyElement = document.body;
	});
	const onClicked = () => {
		clicked = !clicked;
	};
	const openModal = () => {
		try {
			if (modalInner) {
				modalInner.style.visibility = 'visible';
				modalInner.style.opacity = '0.98';
				modalInner.style.transform = 'translateY(0%) rotate(0deg)';
			}
			bodyElement ? (bodyElement.style.overflow = 'hidden') : null;
			opened = true;
			openedElement.add(lasthoveredPoint.id);
		} catch (error) {
			closeModal();
		}
	};
	const closeModal = () => {
		if (modalInner) {
			modalInner.style.opacity = '0';
			modalInner.style.transform = 'translateY(50%) rotate(-20deg)';
			modalInner.style.visibility = 'hidden';
		}
		bodyElement ? (bodyElement.style.overflow = '') : null;
		opened = false;
	};
	$: clicked ? openModal() : closeModal();

	// $: console.log(modalInner);

	let currentStep: number;
	let scrollY: number;
	let currentY: number;
	let vizElement: HTMLElement;

	$: if (currentStep === 0) {
		currentY = bodyElement.getBoundingClientRect().y;
	}

	$: if (currentStep === 0) {
		let scrollOffset = scrollY + currentY;
		if (scrollOffset > 325) {
			vizElement.style.width = '100%';
			vizElement.style.opacity = '1';
		}
	}

	// $: console.log(scrollY);
</script>

<svelte:window bind:scrollY />

<section class="flex flex-col m-auto max-w-screen-md">
	<div class="flex flex-col items-center justify-center md:flex-row">
		<p class="typo-h1 pr-4">I strive to craft</p>
		<Dropdown {choices} bind:currentChoice class="typo-h1 w-[315px] md:w-[370px]" />
	</div>
	<p class="flex m-auto typo-p2 mt-5 opacity-60">click to explore my projects</p>
	<Scrolly bind:value={currentStep}>
		<button
			class="transition-opacity duration-1000 ease-out"
			style="width: 50%; opacity:0"
			on:click={onClicked}
			bind:this={vizElement}
		>
			<ProjectsVisualization bind:hoveredPoint metric={currentChoice} {openedElement} />
		</button>
	</Scrolly>
	<div bind:this={modalDiv}>
		<Modal {onClicked} {opened} currentDetail={lasthoveredPoint} />
	</div>
</section>

<style>
	button,
	button:focus {
		outline: none;
	}
</style>
