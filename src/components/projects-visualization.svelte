<script>
	import * as d3 from 'd3';
	import { findClosestPoint } from '../utils/utils';
	import allProjects from '../data/projects.json';
	import { getContext } from 'svelte';

	export let metric = 'social impacts';
	export let openedElement;
	let wrapper;

	$: xAccessor = (d) => d[metric];

	let width = 400;
	let height = 400;
	const margin = 35;
	const shiftX = 60;

	let radius = 20;

	let windowStore = getContext('windowStore');
	$: $windowStore.innerWidth > 768 ? (radius = 25) : (radius = 17.5);
	$: xScale = d3
		.scaleLinear()
		.domain([1, 5])
		.range([margin, width - margin]);

	let projectPositions = [];
	let simulation = d3.forceSimulation();
	const updatePositions = () => {
		projectPositions = allProjects.map((d) => ({
			...d,
			x: xScale(xAccessor(d)),
			targetX: xScale(xAccessor(d)),
			y: height / 2
		}));
		simulation
			.nodes(projectPositions)
			.force('x', d3.forceX((d) => d.targetX).strength(1))
			.force('y', d3.forceY((d) => height / 2).strength(0.01))
			.force(
				'collide',
				d3
					.forceCollide((d) => radius + 4)
					.iterations(3)
					.strength(1)
			)
			.on('tick', (d) => {
				projectPositions = projectPositions;
			});

		simulation.alpha(0.00103);
		simulation.restart();
	};
	$: metric, width, updatePositions();

	let hoveredPointName = null;
	export let hoveredPoint;
	$: hoveredPoint = allProjects.find((d) => d.name === hoveredPointName) || undefined;
</script>

<div
	class="wrapper"
	bind:this={wrapper}
	bind:clientWidth={width}
	bind:clientHeight={height}
	on:mousemove={(e) => {
		if (!wrapper) return;
		const bounds = wrapper.getBoundingClientRect();
		const closest = findClosestPoint(projectPositions, [
			e.clientX - bounds.left + shiftX,
			e.clientY - bounds.top
		]);
		hoveredPointName = closest && closest.name;
	}}
	on:mouseleave={(e) => (hoveredPointName = null)}
>
	{#each projectPositions as project}
		<div class="absolute">
			<div
				class="pulse"
				style={`
				visibility: ${openedElement.has(project.id) ? 'hidden' : 'visible'};
				border-color: ${hoveredPointName === project.name ? project.color : 'transparent'};
				background-color: ${project.color}; 
				transform: translate(calc(-50% + ${project.x - shiftX}px), calc(-50% + ${project.y}px));`}
			/>
			<div
				class="pulse pulsing"
				style={`
				visibility: ${openedElement.has(project.id) ? 'hidden' : 'visible'};
				border-color: ${hoveredPointName === project.name ? project.color : 'transparent'};
				background-color: ${project.color}; 
				transform: translate(calc(-50% + ${project.x - shiftX}px), calc(-50% + ${project.y}px));`}
			/>
			<div
				class="image"
				style={`
		  opacity: ${openedElement.has(project.id) ? '0.3' : '1'};
          background-image: url(${project['img-sm']});
		  background-position: center;
          border-color: ${hoveredPointName === project.name ? project.color : 'transparent'};
          height: ${radius * 2}px;
          width: ${radius * 2}px;
          transform: translate(calc(-50% + ${project.x - shiftX}px), calc(-50% + ${project.y}px));
        `}
			/>
		</div>
	{/each}

	<div class="horizontal-line" />

	{#if hoveredPointName && hoveredPoint}
		<div
			style={`border-color: ${hoveredPoint.color}`}
			class="tooltip typo-p2 border-black font-bold border-2 p-2"
		>
			{hoveredPointName}
		</div>
	{/if}
</div>

<div class="label typo-p2">
	more {metric}
	<img class="w-4 ml-1" src="images/icons/arrow-right.svg" alt="arrow-right" />
</div>

<style>
	.wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 350px;
		margin-top: 50px;
		cursor: pointer;
	}

	.pulse {
		@apply absolute w-3 h-3 rounded-full -right-7 -top-[0.85rem] md:(w-4 h-4 -right-10 -top-[-1.4rem]) z-20;
		transition: transform 0.4s ease-out;
	}

	.pulsing {
		left: 1rem;
		@apply left-4 md:left-6;
		animation: animatePulse 1s cubic-bezier(0, 0, 0.2, 1) infinite;
	}

	@keyframes animatePulse {
		0% {
			width: 0.75rem;
			height: 0.75rem;
			opacity: 1;
		}
		100% {
			width: 2rem;
			height: 2rem;
			opacity: 0;
		}
	}

	.image {
		position: absolute;
		background-size: cover;
		border: 3px solid transparent;
		overflow: hidden;
		transition: transform 0.4s ease-out;
	}
	.label {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		text-align: center;
		opacity: 0.6;
		font-weight: 300;
		padding: 10px;
	}
	.tooltip {
		position: absolute;
		top: 0px;
		left: 50%;
		transform: translateX(-50%);
		pointer-events: none;
	}

	.horizontal-line {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		border-bottom: 1px solid black;
		height: 0;
		display: flex;
		justify-content: flex-end;
		text-align: left;
		font-size: 0.7em;
		opacity: 0.6;
		font-style: italic;
		font-weight: 300;
		z-index: -1;
	}
</style>
