<script lang="ts">
	import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';

	let topAppBar: TopAppBar;
</script>

<TopAppBar bind:this={topAppBar} variant="fixed" color="secondary" class="mdc-elevation--z1">
	<Row>
		<Section>
			<img class="logo" src="/icon.png" alt="" />
			<Title>Pod viewer</Title>
		</Section>
	</Row>
</TopAppBar>
<AutoAdjust {topAppBar}>
	<slot />
</AutoAdjust>

<style>
	:global(main) {
		max-width: 80rem;
		margin-inline: auto;
	}

	.logo {
		height: 2.5em;
		width: 2.5em;
	}
</style>
