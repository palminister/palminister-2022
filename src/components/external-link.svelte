<script lang="ts">
	export let href: string;
</script>

<a class={$$props.class} {href} target="_blank" rel="noreferrer noopener"><slot /></a>
