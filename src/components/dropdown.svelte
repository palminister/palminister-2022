<script lang="ts">
	export let choices = [];
	export let currentChoice = choices[0];

	let choiceContainer: HTMLElement;
	let arrowSymbol: HTMLElement;
	let toggle = true;

	const selectDropdown = () => {
		if (toggle) {
			choiceContainer.style.opacity = '1';
			choiceContainer.style.visibility = 'visible';
			choiceContainer.style.transform = 'translateY(0px)';
			arrowSymbol.style.transform = 'rotate(180deg)';
			toggle = false;
		} else {
			choiceContainer.style.opacity = '0';
			choiceContainer.style.visibility = 'hidden';
			choiceContainer.style.transform = 'translateY(-70px)';
			arrowSymbol.style.transform = 'rotate(0deg)';
			toggle = true;
		}
	};
	const selectChoice = (event) => {
		event.preventDefault();
		currentChoice = event.target.innerHTML;
		selectDropdown();
	};
</script>

<div class={$$props.class + ' dropdown'}>
	<button on:click={selectDropdown} class="dropdown-selection shadow-main">
		{currentChoice}
		<img
			class="w-4 mx-3 opacity-40"
			bind:this={arrowSymbol}
			src="images/icons/caret-down.svg"
			alt="down-icon"
		/>
	</button>
	<div bind:this={choiceContainer} class="dropdown-list shadow-main">
		{#each choices as choice}
			{#if choice !== currentChoice}
				<button on:click={selectChoice} class="dropdown-list-item">{choice}</button>
			{/if}
		{/each}
	</div>
</div>

<style>
	button,
	button:focus {
		outline: none;
	}
	.dropdown {
		position: relative;
	}
	.dropdown-selection {
		width: 100%;
		display: flex;
		position: relative;
		align-items: center;
		background-color: white;
		padding: 0.8rem;
		justify-content: space-between;
		z-index: 10;
	}
	.dropdown-list {
		width: 100%;
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 100%;
		color: black;
		visibility: hidden;
		opacity: 0;
		transform: translateY(-70px);
		transition: all 200ms cubic-bezier(0.65, 0.05, 0.36, 1);
		z-index: 5;
	}
	.dropdown-list-item {
		background-color: white;
		text-align: left;
		padding: 0.8rem;
	}
	.dropdown-list-item:hover {
		background-color: rgb(244, 244, 244);
	}
</style>
